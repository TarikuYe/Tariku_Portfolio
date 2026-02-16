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
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import path from 'path';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Cloudinary Storage for Multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'portfolio_uploads',
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
        transformation: [{ width: 1000, height: 1000, crop: 'limit' }]
    },
});

const upload = multer({ storage });

// PostgreSQL Pool - Refined for Vercel + Supabase/Neon SSL
const pool = new Pool({
    connectionString: process.env.POSTGRES_URL || process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false // Required for Supabase/Neon self-signed certs
    }
});

// Health Check
app.get('/api/health', async (req, res) => {
    try {
        await pool.query('SELECT 1');
        res.json({ status: 'active', database: 'connected', timestamp: new Date() });
    } catch (err) {
        console.error('Health check database error:', err.message);
        res.status(503).json({ status: 'inactive', database: 'disconnected', error: err.message });
    }
});

// Image Upload Endpoint
app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file || !req.file.path) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    res.json({ imageUrl: req.file.path });
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
        const result = await pool.query(
            'INSERT INTO messages (name, email, message) VALUES ($1, $2, $3) RETURNING *',
            [name, email, message]
        );
        res.status(201).json(result.rows[0]);
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

export default app;
