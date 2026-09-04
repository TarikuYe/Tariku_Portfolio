import { motion } from 'framer-motion';
import { ArrowRight, FileText } from 'lucide-react';
import { Link } from 'react-scroll';

const Hero = () => {
    return (
        <section
            id="hero"
            className="min-h-screen relative overflow-hidden bg-[#060a12] text-white flex flex-col justify-center pt-28 pb-12"
        >
            {/* Background Glow Mesh */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl relative z-10">
                <div className="max-w-4xl">
                    {/* Status Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2.5 px-4 py-2 mb-8 rounded-full bg-[#0d1726] border border-emerald-500/30 text-emerald-400 text-xs md:text-sm font-semibold tracking-wider uppercase shadow-inner"
                    >
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                        </span>
                        <span>OPEN FOR FREELANCE WORK 2026</span>
                    </motion.div>

                    {/* Main Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-8 leading-[1.08] tracking-tight text-white"
                    >
                        Intelligent <span className="text-emerald-400 drop-shadow-[0_0_25px_rgba(16,185,129,0.3)]">Systems.</span> <br />
                        Building the Future of AI.
                    </motion.h1>

                    {/* Subtitle Paragraph */}
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-slate-300 text-lg md:text-xl lg:text-2xl mb-12 max-w-3xl leading-relaxed font-normal"
                    >
                        Computer Science graduate specializing in building data-driven applications with Next.js, Node.js, and fine-tuned AI capabilities (NLP).
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex flex-wrap gap-5 items-center"
                    >
                        <Link
                            to="work"
                            smooth={true}
                            offset={-80}
                            className="cursor-pointer px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-base rounded-xl flex items-center gap-3 shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all duration-300 active:scale-95"
                        >
                            <span>View Projects</span>
                            <ArrowRight size={20} />
                        </Link>

                        <a
                            href="https://drive.google.com/file/d/1cJlM2MmqCWY2iy0H1vXMhSFJPat8BFNp/view?usp=sharing"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-4 bg-[#0e1626]/80 border border-slate-700/80 hover:border-slate-500 text-white font-bold text-base rounded-xl flex items-center gap-3 hover:bg-white/5 transition-all duration-300 active:scale-95"
                        >
                            <FileText size={18} className="text-emerald-400" />
                            <span>Download Resume</span>
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
