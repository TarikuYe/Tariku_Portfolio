import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { Link } from 'react-scroll';

const Hero = () => {
    return (
        <section
            id="hero"
            className="min-h-screen relative overflow-hidden bg-dark-darker"
        >
            {/* Background Effects */}
            <div className="absolute inset-0 glow-mesh opacity-50" />
            <div className="absolute inset-0 bg-grid-subtle opacity-30" />

            <div className="container mx-auto px-6 relative z-10 pt-40 pb-20">
                <div className="max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="inline-block px-4 py-1.5 mb-8 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium tracking-wider uppercase"
                        >
                            Open for Opportunities 2026
                        </motion.div>

                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-10 leading-[1] tracking-tighter text-white">
                            Intelligent <span className="text-gradient">Systems.</span> <br />
                            Building the Future of AI.
                        </h1>

                        <p className="text-slate-400 text-xl md:text-2xl mb-12 max-w-2xl leading-relaxed font-light">
                            I am a Computer Science graduate specializing in building data-driven applications with React.js, Node.js, and integrated AI capabilities like NLP.
                        </p>

                        <div className="flex flex-wrap gap-6 items-center">
                            <Link
                                to="work"
                                smooth={true}
                                className="group relative cursor-pointer px-10 py-5 bg-primary text-white font-bold transition-all rounded-xl flex items-center gap-3 active:scale-95 shadow-2xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 duration-300"
                            >
                                <span className="relative z-10">VIEW MY PROJECTS</span>
                                <ArrowDown size={18} className="relative z-10 group-hover:translate-y-1 transition-transform" />
                            </Link>

                            <motion.a
                                href="https://drive.google.com/file/d/1v95i9CMK9bQD9gtJuqHDbRqUC8QG7bHD/view?usp=drive_link"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05, translateY: -5 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-10 py-5 border border-white/10 hover:border-primary text-white font-bold transition-all rounded-xl flex items-center gap-3 backdrop-blur-sm shadow-xl hover:shadow-primary/20 hover:bg-white/5 duration-300"
                            >
                                <span>Resume</span>
                            </motion.a>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Floating Element */}
            <motion.div
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, 5, 0]
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute right-[10%] top-[20%] w-64 h-64 bg-primary/10 rounded-full blur-[80px] -z-10"
            />

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
            >
                <div className="w-5 h-10 border-2 border-white rounded-full flex justify-center p-1">
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
