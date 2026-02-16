import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2 } from 'lucide-react';

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fallbackArticles = [
        {
            title: "Mastering React Server Components in 2026",
            snippet: "Why the shift to RSC is the biggest change in the React ecosystem since Hooks.",
            date: "Feb 12, 2026"
        },
        {
            title: "The Case for TypeScript in Small Projects",
            snippet: "How static typing saves hours of debugging, even on a weekend 'toy' app.",
            date: "Jan 28, 2026"
        },
        {
            title: "Optimizing Framer Motion for 60fps",
            snippet: "A deep dive into hardware acceleration and layout transitions for fluid UI.",
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
        snippet: p.content.substring(0, 150).replace(/[#*`]/g, '') + '...',
        date: new Date(p.display_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    })) : fallbackArticles;

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

                    <motion.a
                        href="#"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-2 text-primary hover:text-secondary transition-colors font-medium group"
                    >
                        Read All Articles <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </motion.a>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="animate-spin text-primary" size={48} />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {displayArticles.map((article, index) => (
                            <motion.article
                                key={article.id || index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
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
        </section>
    );
};

export default Blog;
