import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pkg from 'pg';
const { Pool } = pkg;
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import path from 'path';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));

// Multer Memory Storage for Vercel Serverless
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// PostgreSQL Connection Helper (Strips sslmode query parameter to prevent SSL verification overrides)
function getDbConnectionString() {
    const rawUrl = process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL || process.env.DATABASE_URL || process.env.POSTGRES_PRISMA_URL;
    if (rawUrl) {
        try {
            const parsed = new URL(rawUrl);
            parsed.searchParams.delete('sslmode');
            parsed.searchParams.delete('supa');
            return parsed.toString();
        } catch (e) {
            return rawUrl;
        }
    }

    if (process.env.POSTGRES_HOST && process.env.POSTGRES_USER) {
        return `postgres://${encodeURIComponent(process.env.POSTGRES_USER)}:${encodeURIComponent(process.env.POSTGRES_PASSWORD || '')}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT || 5432}/${process.env.POSTGRES_DATABASE || 'postgres'}`;
    }

    return null;
}

const dbConnectionString = getDbConnectionString();

function isLocalHost(urlStr) {
    if (!urlStr) return true;
    return urlStr.includes('localhost') || urlStr.includes('127.0.0.1');
}

// PostgreSQL Pool Config
const pool = new Pool(
    dbConnectionString
        ? {
              connectionString: dbConnectionString,
              ssl: isLocalHost(dbConnectionString) ? false : { rejectUnauthorized: false }
          }
        : {
              user: process.env.DB_USER,
              host: process.env.DB_HOST,
              database: process.env.DB_NAME || 'portfolio_admin',
              password: process.env.DB_PASSWORD,
              port: process.env.DB_PORT || 5432,
              ssl: isLocalHost(process.env.DB_HOST) ? false : { rejectUnauthorized: false }
          }
);

// Auto-migration helper to ensure tables exist on Supabase
let tablesMigrated = false;
const ensureTablesExist = async () => {
    if (tablesMigrated) return;
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS projects (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                image_url TEXT,
                tech_stack TEXT,
                source_url TEXT,
                demo_url TEXT,
                github_url TEXT,
                price DECIMAL(10, 2) DEFAULT 0.00,
                views INTEGER DEFAULT 0,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
            CREATE TABLE IF NOT EXISTS blog_posts (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                content TEXT NOT NULL,
                published_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
            CREATE TABLE IF NOT EXISTS messages (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                message TEXT NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
            CREATE TABLE IF NOT EXISTS comments (
                id SERIAL PRIMARY KEY,
                post_id INTEGER REFERENCES blog_posts(id),
                name VARCHAR(255),
                content TEXT,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
            ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS published_date DATE DEFAULT CURRENT_DATE;
        `);
        tablesMigrated = true;
    } catch (err) {
        console.error('Auto-migration error:', err.message);
    }
};

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Health Check Endpoint
app.get('/api/health', async (req, res) => {
    try {
        await pool.query('SELECT 1');
        await ensureTablesExist();
        res.json({ status: 'active', database: 'connected', timestamp: new Date() });
    } catch (err) {
        console.error('Health check database error:', err.message);
        res.status(503).json({ status: 'inactive', database: 'disconnected', error: err.message });
    }
});

// Image Upload Endpoint (Cloudinary with Vercel Serverless compatibility)
app.post('/api/upload', (req, res, next) => {
    upload.single('image')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ message: `Upload error: ${err.message}` });
        } else if (err) {
            return res.status(500).json({ message: `Processing error: ${err.message}` });
        }
        next();
    });
}, async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No image file uploaded' });
        }

        const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
        const apiKey = process.env.CLOUDINARY_API_KEY;
        const apiSecret = process.env.CLOUDINARY_API_SECRET;

        if (!cloudName || !apiKey || !apiSecret) {
            console.error('Cloudinary environment variables missing on Vercel');
            return res.status(500).json({
                message: 'Cloudinary credentials missing. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in your Vercel Environment Variables.'
            });
        }

        // Configure Cloudinary
        cloudinary.config({
            cloud_name: cloudName,
            api_key: apiKey,
            api_secret: apiSecret,
            secure: true
        });

        // Upload buffer directly to Cloudinary via stream
        const uploadResult = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    folder: 'portfolio_uploads',
                    resource_type: 'auto',
                },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            );
            stream.end(req.file.buffer);
        });

        return res.json({ imageUrl: uploadResult.secure_url });
    } catch (err) {
        console.error('Cloudinary Upload Exception:', err);
        return res.status(500).json({ message: `Cloudinary upload failed: ${err.message || err}` });
    }
});

// 1. Auth: Login
app.post('/api/admin/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        if (email === process.env.ADMIN_EMAIL) {
            const isMatch = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH);
            if (isMatch) {
                const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
                return res.json({ token });
            }
        }
        return res.status(401).json({ message: 'Invalid credentials' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. CMS: Projects
app.get('/api/projects', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM projects ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/projects', async (req, res) => {
    const { title, description, image_url, tech_stack, source_url, demo_url, github_url, price } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO projects (title, description, image_url, tech_stack, source_url, demo_url, github_url, price) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [title, description, image_url, tech_stack, source_url, demo_url, github_url, price || 0]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/projects/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, image_url, tech_stack, source_url, demo_url, github_url, price } = req.body;
    try {
        const result = await pool.query(
            'UPDATE projects SET title = $1, description = $2, image_url = $3, tech_stack = $4, source_url = $5, demo_url = $6, github_url = $7, price = $8 WHERE id = $9 RETURNING *',
            [title, description, image_url, tech_stack, source_url, demo_url, github_url, price, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/projects/:id/view', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('UPDATE projects SET views = COALESCE(views, 0) + 1 WHERE id = $1', [id]);
        res.json({ message: 'View counted' });
    } catch (err) {
        console.error('Error incrementing view:', err.message);
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/projects/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM projects WHERE id = $1', [id]);
        res.json({ message: 'Project deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. CMS: Blog
app.get('/api/blog', async (req, res) => {
    try {
        const result = await pool.query('SELECT *, COALESCE(published_date, created_at) as display_date FROM blog_posts ORDER BY display_date DESC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/blog', async (req, res) => {
    const { title, content, date } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO blog_posts (title, content, published_date) VALUES ($1, $2, $3) RETURNING *',
            [title, content, date || new Date()]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/blog/:id', async (req, res) => {
    const { id } = req.params;
    const { title, content, date } = req.body;
    try {
        const result = await pool.query(
            'UPDATE blog_posts SET title = $1, content = $2, published_date = $3 WHERE id = $4 RETURNING *',
            [title, content, date || new Date(), id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Blog post not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/blog/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM blog_posts WHERE id = $1', [id]);
        res.json({ message: 'Blog post deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4. Inquiries
app.get('/api/inquiries', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM messages ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/inquiries', async (req, res) => {
    const { name, email, message } = req.body;
    try {
        // 1. Save to Database
        const result = await pool.query(
            'INSERT INTO messages (name, email, message) VALUES ($1, $2, $3) RETURNING *',
            [name, email, message]
        );

        // 2. Send Email Notification
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.ADMIN_EMAIL,
            subject: `New Inquiry from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        };

        // Use Promise-based sendMail for Serverless stability
        await transporter.sendMail(mailOptions);

        console.log('Notification email sent successfully');
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Inquiry error:', err.message);
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/inquiries/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM messages WHERE id = $1', [id]);
        res.json({ message: 'Inquiry deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 5. Stats
app.get('/api/stats', async (req, res) => {
    try {
        const projectViews = await pool.query('SELECT COALESCE(SUM(views), 0) as sum FROM projects');
        const blogCount = await pool.query('SELECT COUNT(*) as count FROM blog_posts');
        res.json({
            totalProjectViews: parseInt(projectViews.rows[0].sum || 0),
            recentBlogComments: parseInt(blogCount.rows[0].count || 0),
            dbStatus: 'Connected',
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Global Express Error Handler
app.use((err, req, res, next) => {
    console.error('Unhandled API Error:', err);
    res.status(500).json({ message: err.message || 'Internal Server Error' });
});

export default app;
