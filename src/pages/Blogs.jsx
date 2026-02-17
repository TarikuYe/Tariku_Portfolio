import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Loader2, X, Calendar, Clock, Search, BookOpen } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

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
                                {post.date}
                            </span>
                            <span className="w-1 h-1 bg-white/20 rounded-full" />
                            <span className="flex items-center gap-2">
                                <Clock size={14} />
                                {Math.ceil(post.content.split(' ').length / 200)} min read
                            </span>
                        </div>

                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-12 leading-tight">
                            {post.title}
                        </h2>

                        <div className="prose prose-invert max-w-none prose-p:text-slate-400 prose-headings:text-white prose-strong:text-primary prose-code:text-secondary">
                            <ReactMarkdown>{post.content}</ReactMarkdown>
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
        snippet: p.content.substring(0, 150).replace(/[#*`]/g, '') + '...',
        date: new Date(p.display_date || p.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
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
