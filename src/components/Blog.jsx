import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, Calendar, Clock } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
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
                        className="absolute top-6 right-6 p-3 bg-slate-800/60 hover:bg-slate-700 text-white rounded-full transition-all z-20"
                    >
                        <X size={20} />
                    </button>

                    <div className="p-8 md:p-14">
                        <div className="flex items-center gap-4 mb-6 text-emerald-400 text-xs uppercase font-bold tracking-widest">
                            <span className="flex items-center gap-1.5">
                                <Calendar size={14} />
                                {formatBlogDate(post.date || post.display_date || post.published_date)}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1.5">
                                <Clock size={14} />
                                {post.read_time || '5 MIN READ'}
                            </span>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
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

                        <div className="prose prose-invert max-w-none prose-p:text-slate-300 prose-headings:text-white prose-strong:text-emerald-400 prose-code:text-cyan-400 leading-relaxed">
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

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('/api/blog');
                if (response.ok) {
                    const data = await response.json();
                    if (data && data.length > 0) {
                        setPosts(data);
                        return;
                    }
                }
            } catch (err) {
                console.error('Fetch blog error:', err);
            }
            setPosts(initialBlogPosts);
        };
        fetchPosts();
    }, []);

    const displayList = posts.length > 0 ? posts : initialBlogPosts;
    const limitedArticles = displayList.slice(0, 3);

    return (
        <section id="blog" className="py-24 bg-[#060a12] text-white relative">
            <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl">
                {/* Section Header */}
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4"
                    >
                        Latest <span className="text-emerald-400">Insights</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-slate-400 text-base md:text-lg"
                    >
                        Sharing thoughts and tutorials on software development, AI, and modern web technologies.
                    </motion.p>
                </div>

                {/* 3 Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
                    {limitedArticles.map((article, index) => {
                        const rawDate = article.display_date || article.published_date || article.date;
                        const formattedDate = formatBlogDate(rawDate) || 'FEB 2026';
                        return (
                            <motion.article
                                key={article.id || index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                onClick={() => setSelectedPost({ ...article, date: formattedDate })}
                                className="bg-[#0b1322] border border-slate-800 rounded-3xl p-8 group cursor-pointer hover:border-emerald-500/40 transition-all duration-500 flex flex-col justify-between"
                            >
                                <div>
                                    {/* Cover Image Banner */}
                                    <div className="h-48 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-slate-900 border border-slate-800 mb-6 flex items-center justify-center overflow-hidden group-hover:border-emerald-500/30 transition-colors relative">
                                        {(article.image_url || article.imageUrl) ? (
                                            <>
                                                <img
                                                    src={getDisplayImageUrl(article.image_url || article.imageUrl)}
                                                    alt=""
                                                    className="absolute inset-0 w-full h-full object-cover blur-xl opacity-30 pointer-events-none"
                                                />
                                                <img
                                                    src={getDisplayImageUrl(article.image_url || article.imageUrl)}
                                                    alt={article.title}
                                                    className="relative z-10 w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 p-1"
                                                />
                                            </>
                                        ) : (
                                            <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                                                <ArrowRight size={20} />
                                            </div>
                                        )}
                                    </div>

                                    {/* Meta info */}
                                    <div className="text-xs uppercase font-bold tracking-widest text-slate-400 mb-3 flex items-center gap-2">
                                        <span>{formattedDate}</span>
                                        <span>•</span>
                                        <span>{article.read_time || '5 MIN READ'}</span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors leading-tight">
                                        {article.title}
                                    </h3>

                                    {/* Snippet */}
                                    <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 mb-6">
                                        {article.content ? article.content.substring(0, 140).replace(/[#*`]/g, '') + '...' : ''}
                                    </p>
                                </div>

                                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 group-hover:translate-x-1 transition-transform">
                                    <span>Read Article</span>
                                    <ArrowRight size={14} />
                                </div>
                            </motion.article>
                        );
                    })}
                </div>

                {/* View All Posts Button */}
                <div className="text-center">
                    <Link
                        to="/blog"
                        className="inline-flex items-center gap-2 px-8 py-3.5 border border-slate-700 hover:border-emerald-400 text-white hover:text-emerald-400 font-bold text-sm rounded-xl bg-[#0b1322] transition-all duration-300"
                    >
                        <span>View All Posts</span>
                        <ArrowRight size={16} />
                    </Link>
                </div>
            </div>

            <PostModal
                post={selectedPost}
                isOpen={!!selectedPost}
                onClose={() => setSelectedPost(null)}
            />
        </section>
    );
};

export default Blog;
