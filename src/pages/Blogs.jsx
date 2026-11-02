import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ArrowLeft, 
    ArrowRight, 
    Loader2, 
    X, 
    Calendar, 
    Clock, 
    Search, 
    BookOpen,
    Sparkles,
    Tag
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { initialBlogPosts } from '../data/portfolio';

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

// Full Article Reading Modal
const PostModal = ({ post, isOpen, onClose }) => {
    if (!isOpen || !post) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-slate-950/90 backdrop-blur-xl"
                onClick={onClose}
            >
                <motion.div
                    initial={{ y: 50, opacity: 0, scale: 0.95 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 50, opacity: 0, scale: 0.95 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-[#0b1322] w-full max-w-4xl rounded-[32px] overflow-hidden shadow-2xl relative max-h-[90vh] overflow-y-auto border border-slate-800"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 p-3 bg-slate-800/80 hover:bg-slate-700 text-white rounded-full transition-all z-20"
                        aria-label="Close modal"
                    >
                        <X size={20} />
                    </button>

                    <div className="p-8 md:p-14">
                        <div className="flex items-center gap-4 mb-6 text-emerald-400 text-xs uppercase font-bold tracking-widest">
                            <span className="flex items-center gap-1.5">
                                <Calendar size={14} />
                                {post.date}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1.5">
                                <Clock size={14} />
                                {post.read_time || '5 MIN READ'}
                            </span>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                            {post.title}
                        </h2>

                        {(post.image_url || post.imageUrl) && (
                            <div className="w-full relative rounded-2xl overflow-hidden mb-8 border border-slate-800 shadow-2xl bg-slate-950 flex items-center justify-center min-h-[220px] max-h-[500px]">
                                <img
                                    src={getDisplayImageUrl(post.image_url || post.imageUrl)}
                                    alt=""
                                    className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 pointer-events-none"
                                />
                                <img
                                    src={getDisplayImageUrl(post.image_url || post.imageUrl)}
                                    alt={post.title}
                                    className="relative z-10 w-full max-h-[500px] h-auto object-contain rounded-2xl"
                                />
                            </div>
                        )}

                        <div className="prose prose-invert max-w-none prose-p:text-slate-300 prose-headings:text-white prose-strong:text-emerald-400 prose-code:text-cyan-400 leading-relaxed text-base md:text-lg">
                            <ReactMarkdown
                                components={{
                                    img: ({ node, ...props }) => (
                                        <div className="my-6 relative rounded-2xl overflow-hidden border border-slate-800 shadow-xl bg-slate-950 flex items-center justify-center min-h-[200px] max-h-[500px]">
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
    const [posts, setPosts] = useState(initialBlogPosts);
    const [loading, setLoading] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('/api/blog');
                if (response.ok) {
                    const data = await response.json();
                    if (Array.isArray(data) && data.length > 0) {
                        setPosts(data);
                    }
                }
            } catch (error) {
                console.error('Fetch blogs failed:', error);
            }
        };
        fetchPosts();
    }, []);

    const categories = ['All', 'AI & Machine Learning', 'Frontend Engineering', 'System Architecture'];

    const displayArticles = posts.map(p => {
        const rawDate = p.display_date || p.published_date || p.created_at || p.date;
        return {
            id: p.id,
            title: p.title,
            content: p.content,
            imageUrl: p.image_url || p.imageUrl,
            snippet: p.content ? p.content.substring(0, 160).replace(/[#*`]/g, '') + '...' : '',
            date: formatBlogDate(rawDate) || 'FEB 2026',
            read_time: p.read_time || '5 MIN READ',
            category: p.title.toLowerCase().includes('ai') ? 'AI & Machine Learning' : 
                      p.title.toLowerCase().includes('tailwind') || p.title.toLowerCase().includes('css') ? 'Frontend Engineering' : 'System Architecture'
        };
    });

    const filteredArticles = displayArticles.filter(article => {
        const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              article.content.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="bg-[#060a12] text-slate-200 min-h-screen relative overflow-hidden">
            {/* Background lighting accents matching Featured Projects & Hero */}
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute top-1/2 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

            <Navbar />

            <main className="pt-32 pb-24 relative z-10">
                <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl">
                    {/* Top Breadcrumb Navigation */}
                    <div className="mb-8">
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 text-slate-400 hover:text-emerald-400 text-sm font-semibold transition-colors group"
                        >
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            <span>Back to Home</span>
                        </Link>
                    </div>

                    {/* Section Header matching the first page */}
                    <div className="text-center mb-14 max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-6 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-widest">
                            <Sparkles size={13} />
                            <span>KNOWLEDGE BASE & ARTICLES</span>
                        </div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6"
                        >
                            Latest <span className="text-emerald-400">Insights.</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-slate-400 text-base md:text-lg leading-relaxed"
                        >
                            Exploring real-world engineering challenges, machine learning pipelines, scalable backend design, and modern front-end architectures.
                        </motion.p>
                    </div>

                    {/* Search & Filter Bar */}
                    <div className="max-w-3xl mx-auto mb-14 space-y-6">
                        {/* Search Input */}
                        <div className="relative">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                            <input
                                type="text"
                                placeholder="Search insights by topic, keyword, or technology..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-[#0b1322] border border-slate-800/90 rounded-2xl py-4 pl-14 pr-12 focus:outline-none focus:border-emerald-500/50 text-white placeholder:text-slate-500 transition-all text-sm md:text-base shadow-xl"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-white rounded-full transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            )}
                        </div>

                        {/* Category Filter Pills */}
                        <div className="flex flex-wrap items-center justify-center gap-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-4 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                                        selectedCategory === cat
                                            ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                                            : 'bg-[#0b1322] border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Blog Articles Grid matching the first page card design */}
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-24 gap-4">
                            <Loader2 className="animate-spin text-emerald-400" size={44} />
                            <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">Loading Insights...</p>
                        </div>
                    ) : filteredArticles.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredArticles.map((article, index) => (
                                <motion.article
                                    key={article.id || index}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.05 }}
                                    onClick={() => setSelectedPost(article)}
                                    className="bg-[#0b1322] border border-slate-800 rounded-3xl p-6 md:p-8 group cursor-pointer hover:border-emerald-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/5 flex flex-col justify-between"
                                >
                                    <div>
                                        {/* Cover Image Container */}
                                        <div className="h-52 rounded-2xl bg-[#090e1a] border border-slate-800 mb-6 flex items-center justify-center overflow-hidden group-hover:border-emerald-500/40 transition-colors relative">
                                            {article.imageUrl ? (
                                                <>
                                                    <img
                                                        src={getDisplayImageUrl(article.imageUrl)}
                                                        alt=""
                                                        className="absolute inset-0 w-full h-full object-cover blur-xl opacity-30 pointer-events-none"
                                                    />
                                                    <img
                                                        src={getDisplayImageUrl(article.imageUrl)}
                                                        alt={article.title}
                                                        className="relative z-10 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                </>
                                            ) : (
                                                <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                                                    <ArrowRight size={20} />
                                                </div>
                                            )}
                                        </div>

                                        {/* Meta Header */}
                                        <div className="text-xs uppercase font-bold tracking-widest text-slate-400 mb-3 flex items-center gap-2">
                                            <span className="text-emerald-400">{article.date}</span>
                                            <span>•</span>
                                            <span>{article.read_time}</span>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors leading-snug">
                                            {article.title}
                                        </h3>

                                        {/* Excerpt */}
                                        <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 mb-6 font-normal">
                                            {article.snippet}
                                        </p>
                                    </div>

                                    {/* Footer CTA */}
                                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 group-hover:translate-x-1 transition-transform pt-4 border-t border-slate-800/80">
                                        <span>Read Full Article</span>
                                        <ArrowRight size={14} />
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-[#0b1322] border border-slate-800 rounded-3xl max-w-md mx-auto p-8">
                            <BookOpen className="mx-auto text-slate-600 mb-4" size={48} />
                            <h3 className="text-xl font-bold text-white mb-2">No Insights Found</h3>
                            <p className="text-slate-400 text-sm mb-6">No articles matched your search query. Try searching for a different keyword or topic.</p>
                            <button
                                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                                className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-emerald-500/20"
                            >
                                Reset Filters
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
