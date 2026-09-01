import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Loader2, X, Calendar, Clock, Search, BookOpen } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const getDisplayImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('data:') || url.startsWith('/')) return url;
    if (url.includes('res.cloudinary.com')) {
        return `/api/proxy-image?url=${encodeURIComponent(url)}`;
    }
    return url;
};

const formatBlogDate = (rawDate) => {
    if (!rawDate) return '';
    const str = String(rawDate).trim();
    const dateOnly = str.includes('T') ? str.split('T')[0] : str;
    const parts = dateOnly.split('-');
    if (parts.length === 3) {
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const day = parseInt(parts[2], 10);
        const dateObj = new Date(year, month, day);
        if (!isNaN(dateObj.getTime())) {
            return dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        }
    }
    return dateOnly;
};

const PostModal = ({ post, isOpen, onClose }) => {
    if (!isOpen || !post) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-dark-darker/95 backdrop-blur-xl"
                onClick={onClose}
            >
                <motion.div
                    initial={{ y: 50, opacity: 0, scale: 0.9 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 50, opacity: 0, scale: 0.9 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-dark-lighter w-full max-w-4xl rounded-[40px] overflow-hidden shadow-2xl relative max-h-[90vh] overflow-y-auto border border-white/5"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-8 right-8 p-3 bg-white/5 hover:bg-white/10 text-white rounded-full transition-all z-20 border border-white/10"
                    >
                        <X size={24} />
                    </button>

                    <div className="p-8 md:p-16">
                        <div className="flex items-center gap-4 mb-8 text-primary font-mono text-sm">
                            <span className="flex items-center gap-2">
                                <Calendar size={14} />
                                {formatBlogDate(post.date || post.display_date || post.published_date)}
                            </span>
                            <span className="w-1 h-1 bg-white/20 rounded-full" />
                            <span className="flex items-center gap-2">
                                <Clock size={14} />
                                {Math.ceil(post.content.split(' ').length / 200)} min read
                            </span>
                        </div>

                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
                            {post.title}
                        </h2>

                        {(post.image_url || post.imageUrl) && (
                            <div className="w-full relative rounded-3xl overflow-hidden mb-12 border border-white/10 shadow-2xl bg-black/40 flex items-center justify-center min-h-[240px] max-h-[500px]">
                                <img
                                    src={getDisplayImageUrl(post.image_url || post.imageUrl)}
                                    alt=""
                                    className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 pointer-events-none"
                                />
                                <img
                                    src={getDisplayImageUrl(post.image_url || post.imageUrl)}
                                    alt={post.title}
                                    className="relative z-10 w-full max-h-[500px] h-auto object-contain rounded-3xl"
                                />
                            </div>
                        )}

                        <div className="prose prose-invert max-w-none prose-p:text-slate-400 prose-headings:text-white prose-strong:text-primary prose-code:text-secondary">
                            <ReactMarkdown
                                components={{
                                    img: ({ node, ...props }) => (
                                        <div className="my-6 relative rounded-2xl overflow-hidden border border-white/10 shadow-xl bg-black/40 flex items-center justify-center min-h-[200px] max-h-[500px]">
                                            <img
                                                src={props.src}
                                                alt=""
                                                className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 pointer-events-none"
                                            />
                                            <img
                                                {...props}
                                                className="relative z-10 w-full max-h-[500px] h-auto object-contain rounded-2xl"
                                            />
                                        </div>
                                    )
                                }}
                            >
                                {post.content}
                            </ReactMarkdown>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

const Blogs = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPost, setSelectedPost] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('/api/blog');
                if (response.ok) {
                    const data = await response.json();
                    setPosts(data);
                }
            } catch (error) {
                console.error('Fetch blogs failed:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    const displayArticles = posts.map(p => ({
        id: p.id,
        title: p.title,
        content: p.content,
        imageUrl: p.image_url || p.imageUrl,
        snippet: p.content.substring(0, 150).replace(/[#*`]/g, '') + '...',
        date: formatBlogDate(p.display_date || p.published_date || p.created_at)
    }));

    const filteredArticles = displayArticles.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="bg-dark min-h-screen">
            <Navbar />

            <main className="pt-32 pb-20">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-primary transition-colors mb-8 group">
                            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                            Back to Home
                        </Link>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-bold text-white mb-6"
                        >
                            The <span className="text-gradient">Blog</span>
                        </motion.h1>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                            Sharing my thoughts on AI, software engineering, and the future of technology.
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto mb-16 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary/50 text-white transition-all text-lg"
                        />
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <Loader2 className="animate-spin text-primary" size={48} />
                            <p className="text-slate-500 animate-pulse font-mono uppercase tracking-widest text-sm">Synchronizing Insights...</p>
                        </div>
                    ) : filteredArticles.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredArticles.map((article, index) => (
                                <motion.article
                                    key={article.id || index}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.05 }}
                                    onClick={() => setSelectedPost(article)}
                                    className="glass-card group cursor-pointer overflow-hidden p-8 flex flex-col h-full rounded-3xl"
                                >
                                    {article.imageUrl && (
                                        <div className="h-48 w-full rounded-2xl overflow-hidden mb-6 border border-white/10 bg-black/40 relative flex items-center justify-center">
                                            <img
                                                src={getDisplayImageUrl(article.imageUrl)}
                                                alt=""
                                                className="absolute inset-0 w-full h-full object-cover blur-xl opacity-30 pointer-events-none"
                                            />
                                            <img
                                                src={getDisplayImageUrl(article.imageUrl)}
                                                alt={article.title}
                                                className="relative z-10 w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 p-1"
                                            />
                                        </div>
                                    )}
                                    <span className="text-sm text-primary mb-4 block font-mono">{article.date}</span>
                                    <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors leading-tight">
                                        {article.title}
                                    </h3>
                                    <p className="text-slate-400 mb-6 leading-relaxed line-clamp-3">
                                        {article.snippet}
                                    </p>
                                    <div className="mt-auto flex items-center gap-2 text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">
                                        Read Full Article <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 glass rounded-[40px] border border-white/5 max-w-lg mx-auto">
                            <BookOpen className="mx-auto text-slate-700 mb-6" size={64} />
                            <h3 className="text-2xl font-bold text-white mb-2">No Articles Found</h3>
                            <p className="text-slate-400">We couldn't find any articles matching your search criteria.</p>
                            <button
                                onClick={() => setSearchQuery('')}
                                className="mt-6 text-primary hover:underline font-bold"
                            >
                                Clear Search
                            </button>
                        </div>
                    )}
                </div>
            </main>

            <Footer />

            <PostModal
                post={selectedPost}
                isOpen={!!selectedPost}
                onClose={() => setSelectedPost(null)}
            />
        </div>
    );
};

export default Blogs;
