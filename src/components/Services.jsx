import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Codepen, Zap } from 'lucide-react';

const services = [
    
    {
        title: "Full-Stack Development",
        description: "Architecting robust server-side logic and responsive, user-friendly frontends.",
        icon: <Codepen className="w-8 h-8 text-secondary" />,
    },
    {
        title: "AI & ML Integration",
        description: "Embedding NLP, sentiment analysis, and API-based machine learning models into scalable systems.",
        icon: <Layout className="w-8 h-8 text-primary" />,
    },
    {
        title: "System Design & Security",
        description: "Implementing secure data handling, relational/NoSQL database design, and Role-Based Access Control (RBAC).",
        icon: <Zap className="w-8 h-8 text-accent" />,
    }
];

const Services = () => {
    return (
        <section id="services" className="section-padding bg-dark-darker relative overflow-hidden">
            <div className="container mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Services / <span className="text-gradient">Expertise</span></h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        What can I actually do for your next project or organization?
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="glass-card p-8 group"
                        >
                            <div className="mb-6 p-4 bg-dark-lighter w-fit rounded-2xl group-hover:scale-110 transition-transform duration-500">
                                {service.icon}
                            </div>
                            <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{service.title}</h3>
                            <p className="text-slate-400 leading-relaxed">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Decorative gradient */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />
        </section>
    );
};

export default Services;
