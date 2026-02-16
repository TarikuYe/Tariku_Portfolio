import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME || 'portfolio_admin',
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,
});

const migrate = async () => {
    try {
        console.log('Starting schema repair...');

        // 1. Ensure projects table exists
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
        `);

        // 2. Ensure blog_posts table exists
        await pool.query(`
            CREATE TABLE IF NOT EXISTS blog_posts (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                content TEXT NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // 3. Ensure messages table exists
        await pool.query(`
            CREATE TABLE IF NOT EXISTS messages (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                message TEXT NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // 4. Ensure comments table exists
        await pool.query(`
            CREATE TABLE IF NOT EXISTS comments (
                id SERIAL PRIMARY KEY,
                post_id INTEGER REFERENCES blog_posts(id),
                name VARCHAR(255),
                content TEXT,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // 5. Ensure 'views' column exists in projects (in case table existed but was old)
        await pool.query(`
            DO $$ 
            BEGIN 
                IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='views') THEN
                    ALTER TABLE projects ADD COLUMN views INTEGER DEFAULT 0;
                END IF;
                IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='github_url') THEN
                    ALTER TABLE projects ADD COLUMN github_url TEXT;
                END IF;
            END $$;
        `);

        console.log('Schema repair completed successfully.');
    } catch (err) {
        console.error('Schema repair failed:', err.message);
    } finally {
        await pool.end();
    }
};

migrate();
