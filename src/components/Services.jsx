import { motion } from 'framer-motion';
import { Code2, Cpu, ShieldCheck } from 'lucide-react';

const services = [
    {
        title: "Full-Stack Development",
        description: "Architecting robust server-side logic and responsive, user-friendly frontends.",
        icon: <Code2 className="w-6 h-6 text-emerald-400" />,
    },
    {
        title: "AI & ML Integration",
        description: "Embedding NLP, sentiment analysis, and LLM-based machine learning models into scalable systems.",
        icon: <Cpu className="w-6 h-6 text-emerald-400" />,
    },
    {
        title: "System Design & Security",
        description: "Implementing secure data handling, relational/NoSQL database design, and Role-Based Access Control (RBAC).",
        icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
    }
];

const Services = () => {
    return (
        <section id="services" className="py-24 bg-[#060a12] text-white relative">
            <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl">
                {/* Section Header */}
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4"
                    >
                        Services / <span className="text-emerald-400">Expertise</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-slate-400 text-base md:text-lg"
                    >
                        What I can actually do for your next product or organization
                    </motion.p>
                </div>

                {/* Services Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="bg-[#0b1322] border border-slate-800/90 rounded-3xl p-8 group hover:border-emerald-500/40 transition-all duration-500 flex flex-col justify-between"
                        >
                            <div>
                                <div className="mb-6 w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    {service.icon}
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    {service.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
