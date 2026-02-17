import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Loader2, X, Calendar, Clock } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';

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
                    className="bg-dark-lighter w-full max-w-4xl rounded-[40px] overflow-hidden shadow-2xl relative max-h-full overflow-y-auto border border-white/5"
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

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPost, setSelectedPost] = useState(null);

    const fallbackArticles = [
        {
            title: "Mastering React Server Components in 2026",
            content: "# Mastering React Server Components in 2026\n\nWhy the shift to RSC is the biggest change in the React ecosystem since Hooks.\n\nReact Server Components (RSC) represent a paradigm shift in how we build web applications. By allowing components to render on the server and stream to the client, we can significantly reduce bundle sizes and improve performance.",
            date: "Feb 12, 2026"
        },
        {
            title: "The Case for TypeScript in Small Projects",
            content: "# The Case for TypeScript in Small Projects\n\nHow static typing saves hours of debugging, even on a weekend 'toy' app.\n\nMany developers believe TypeScript is only for large-scale enterprise applications. However, the benefits of type safety and better IDE support are just as valuable for small personal projects.",
            date: "Jan 28, 2026"
        },
        {
            title: "Optimizing Framer Motion for 60fps",
            content: "# Optimizing Framer Motion for 60fps\n\nA deep dive into hardware acceleration and layout transitions for fluid UI.\n\nAnimations can make or break a user interface. Using Framer Motion incorrectly can lead to janky performance. Learn how to leverage GPU acceleration for buttery smooth transitions.",
            date: "Jan 15, 2026"
        }
    ];

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

    const displayArticles = posts.length > 0 ? posts.map(p => ({
        id: p.id,
        title: p.title,
        content: p.content,
        snippet: p.content.substring(0, 150).replace(/[#*`]/g, '') + '...',
        date: new Date(p.display_date || p.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    })) : fallbackArticles;

    // Only show top 3 on home page
    const limitedArticles = displayArticles.slice(0, 3);

    return (
        <section id="blog" className="section-padding bg-dark relative">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">Latest <span className="text-gradient">Insights</span></h2>
                        <p className="text-slate-400">Positioning thought leadership through technical writing.</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Link
                            to="/blog"
                            className="flex items-center gap-2 text-primary hover:text-secondary transition-colors font-medium group"
                        >
                            Read All Articles <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="animate-spin text-primary" size={48} />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {limitedArticles.map((article, index) => (
                            <motion.article
                                key={article.id || index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
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
                                    Read Article <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </motion.article>
                        ))}
                    </div>
                )}
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
