import { motion } from 'framer-motion';

const TechStackStrip = () => {
    const techs = [
        "React",
        "Node.js",
        "Firebase",
        "Python",
        "AI/NLP",
        "Tailwind"
    ];

    return (
        <section className="relative w-full bg-dark-darker py-10 border-y border-white/5 overflow-hidden">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-wrap items-center justify-center gap-4 md:gap-x-12 gap-y-6"
                >
                    {techs.map((tech, index) => (
                        <motion.div
                            key={tech}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                delay: 0.1 * index,
                                duration: 0.5,
                                ease: "easeOut"
                            }}
                            whileHover={{
                                y: -5,
                                transition: { duration: 0.2 }
                            }}
                            className="relative"
                        >
                            <div className="group px-6 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm 
                                          hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 
                                          flex items-center gap-3 cursor-default active:scale-95">
                                {/* Glowing Bullet */}
                                <div className="relative flex items-center justify-center">
                                    <span className="w-2 h-2 rounded-full bg-primary" />
                                    <span className="absolute w-2 h-2 rounded-full bg-primary animate-ping opacity-75" />
                                </div>

                                <span className="text-slate-300 group-hover:text-white font-medium tracking-wide transition-colors">
                                    {tech}
                                </span>

                                {/* Subtle background glow on hover */}
                                <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </section>
    );
};

export default TechStackStrip;
