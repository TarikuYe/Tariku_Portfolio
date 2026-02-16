import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pkg from 'pg';
const { Pool } = pkg;
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
// Serve uploads folder statically
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Health Check
app.get('/api/health', async (req, res) => {
    try {
        const result = await pool.query('SELECT 1');
        res.json({ status: 'active', database: 'connected', timestamp: new Date() });
    } catch (err) {
        console.error('Health check database error:', err.message);
        res.status(503).json({ status: 'inactive', database: 'disconnected', error: err.message });
    }
});

// Global Error Handlers to catch crashes
process.on('unhandledRejection', (reason, promise) => {
    console.error('CRITICAL: Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
    console.error('CRITICAL: Uncaught Exception thrown:', err);
});


// Multer Storage Config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// PostgreSQL Pool
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME || 'portfolio_admin',
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,
    // Pool settings for stability
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
    keepAlive: true
});

// Test DB Connection & Error Handling
pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
});

const connectDB = async () => {
    try {
        const client = await pool.connect();
        console.log('PostgreSQL connected successfully via pool');

        // Migration: Add published_date to blog_posts if missing
        await client.query('ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS published_date DATE DEFAULT CURRENT_DATE;');

        client.release();
    } catch (err) {
        console.error('Initial Database connection error:', err.message);
    }
};
connectDB();

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
    service: 'gmail', // Or any other service
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// --- Routes ---

// Image Upload Endpoint
app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    const imageUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;
    res.json({ imageUrl });
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
    console.log(`Attempting to update project ID: ${id}`);
    try {
        const result = await pool.query(
            'UPDATE projects SET title = $1, description = $2, image_url = $3, tech_stack = $4, source_url = $5, demo_url = $6, github_url = $7, price = $8 WHERE id = $9 RETURNING *',
            [title, description, image_url, tech_stack, source_url, demo_url, github_url, price, id]
        );
        if (result.rows.length === 0) {
            console.warn(`Project ID: ${id} not found in database`);
            return res.status(404).json({ message: 'Project not found' });
        }
        console.log(`Successfully updated project ID: ${id}`);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(`Error updating project ID: ${id}`, err);
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
            [title, content, date, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Blog post not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4. Inquiries: Tracking and Email Notification
app.post('/api/inquiries', async (req, res) => {
    const { name, email, message } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO messages (name, email, message) VALUES ($1, $2, $3) RETURNING *',
            [name, email, message]
        );

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.ADMIN_EMAIL,
            subject: `New Inquiry from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Email error:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });

        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/inquiries', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM messages ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 5. Stats
app.get('/api/stats', async (req, res) => {
    let totalProjectViews = 0;
    let recentBlogComments = 0;

    try {
        const projectViews = await pool.query('SELECT COALESCE(SUM(views), 0) as sum FROM projects');
        totalProjectViews = projectViews.rows[0].sum || 0;
    } catch (err) {
        console.error('Error fetching project views stats:', err.message);
        // If 'views' column is missing, this is expected if the schema wasn't fully applied
    }

    try {
        const commentCount = await pool.query('SELECT COUNT(*) as count FROM comments');
        recentBlogComments = commentCount.rows[0].count || 0;
    } catch (err) {
        console.error('Error fetching comments stats:', err.message);
        // If 'comments' table is missing, this is expected if the schema wasn't fully applied
    }

    res.json({
        totalProjectViews: parseInt(totalProjectViews),
        recentBlogComments: parseInt(recentBlogComments),
        dbStatus: 'Connected',
    });
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

app.delete('/api/inquiries/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM messages WHERE id = $1', [id]);
        res.json({ message: 'Inquiry deleted' });
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

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`❌ CRITICAL ERROR: Port ${PORT} is already in use!`);
        console.error(`Please kill the process running on port ${PORT} or change the PORT in .env`);
    } else {
        console.error('❌ CRITICAL ERROR: Server failed to start:', err);
    }
    process.exit(1);
});
