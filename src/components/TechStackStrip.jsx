import { motion } from 'framer-motion';

const TechStackStrip = () => {
    const techs = [
        "React",
        "Node.js",
        "PostgreSQL",
        "Python",
        "AI/ML",
        "Tailwind"
    ];

    return (
        <section className="relative w-full bg-[#060a12] py-8 border-y border-slate-800/80 overflow-hidden">
            <div className="container mx-auto px-6 max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-wrap items-center justify-start md:justify-start gap-3 md:gap-5"
                >
                    {techs.map((tech, index) => (
                        <motion.div
                            key={tech}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.08, duration: 0.4 }}
                            className="px-5 py-2 rounded-full bg-[#0e1626] border border-slate-800 text-slate-300 hover:text-white hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all duration-300 flex items-center gap-2.5 text-sm font-medium cursor-default"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            <span>{tech}</span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default TechStackStrip;
