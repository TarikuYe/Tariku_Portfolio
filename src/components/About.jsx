import { motion } from 'framer-motion';
import { aboutMe } from '../data/portfolio';

const About = () => {
    return (
        <section id="about" className="section-padding bg-dark-darker relative">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-8 italic">About <span className="text-gradient">Me</span></h2>
                        <div className="space-y-6 text-xl text-slate-400 leading-relaxed font-light">
                            <p>
                                I’m a full-stack developer who thrives at the intersection of design and engineering. With 3+ years of experience in the React ecosystem, I build clean, scalable, and maintainable applications that deliver real-world impact and exceptional user experiences.
                            </p>
                            <p>
                                I believe great software is more than just code—it’s an experience. My approach combines rigorous engineering principles with a designer’s eye for detail. I specialize in transforming complex system and AI model outputs into intuitive, user-friendly interfaces while ensuring every solution is scalable, ethical, and performance-driven.
                            </p>
                        </div>

                        <div className="mt-12 grid grid-cols-2 gap-8">
                            <div className="glass-card p-6">
                                <span className="block text-4xl font-bold text-primary mb-2">3+</span>
                                <span className="text-sm text-slate-500 uppercase tracking-widest">Years Experience</span>
                            </div>
                            {/* <div className="glass-card p-6">
                                <span className="block text-4xl font-bold text-secondary mb-2"></span>
                                <span className="text-sm text-slate-500 uppercase tracking-widest">Global Clients</span>
                            </div> */}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-dark-lighter/50 rounded-3xl p-10 border border-white/5 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full" />

                        <div className="space-y-12">
                            <section>
                                <h3 className="text-2xl font-bold mb-8">Technical Toolkit</h3>
                                <div className="space-y-8">
                                    {Object.entries(aboutMe.toolkit).map(([category, items]) => (
                                        <div key={category}>
                                            <h4 className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-4 opacity-70">
                                                {category}
                                            </h4>
                                            <div className="flex flex-wrap gap-3">
                                                {items.map(item => (
                                                    <span key={item} className="px-4 py-2 bg-white/5 rounded-xl text-slate-300 border border-white/5 text-sm hover:border-primary/30 transition-colors">
                                                        {item}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section className="pt-8 border-t border-white/5">
                                <h3 className="text-2xl font-bold mb-8">Education</h3>
                                <div className="space-y-6">
                                    {aboutMe.education.map((edu, idx) => (
                                        <div key={idx} className="group">
                                            <h4 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                                                {edu.degree}
                                            </h4>
                                            <p className="text-slate-400 font-medium">
                                                {edu.institution}
                                            </p>
                                            <p className="text-primary text-sm font-mono mt-2">
                                                {edu.period}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
