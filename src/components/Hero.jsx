import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, FileText } from 'lucide-react';

const Hero = () => {
    const techPills = [
        "React",
        "Node.js",
        "PostgreSQL",
        "Python",
        "NLP",
        "Tailwind"
    ];

    const handleViewWork = () => {
        window.history.pushState(null, '', '/work');
        const element = document.getElementById('work');
        if (element) {
            const offset = 80;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const offsetPosition = elementRect - bodyRect - offset;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section
            id="hero"
            className="min-h-screen relative overflow-hidden bg-[#060a12] text-white flex flex-col justify-center items-center text-center pt-32 pb-20"
        >
            {/* Background Glow Mesh */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute top-1/2 right-1/4 w-[500px] h-[350px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-5xl relative z-10 flex flex-col items-center">
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
                    <span>OPEN FOR FREELANCE & ROLES</span>
                </motion.div>

                {/* Main Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-[1.08] tracking-tight text-white max-w-4xl"
                >
                    Intelligent <span className="text-emerald-400 drop-shadow-[0_0_30px_rgba(16,185,129,0.35)]">Systems.</span> <br />
                    Building the Future of AI.
                </motion.h1>

                {/* Subtitle Paragraph */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-slate-300 text-lg md:text-xl lg:text-2xl mb-10 max-w-3xl leading-relaxed font-normal"
                >
                    Computer Science graduate specializing in building scalable data-driven applications with Next.js, Node.js, and Machine Learning capabilities (NLP).
                </motion.p>

                {/* Tech Stack Pills from Mockup */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.35 }}
                    className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 mb-12 max-w-2xl"
                >
                    {techPills.map((tech) => (
                        <div
                            key={tech}
                            className="px-4 py-1.5 rounded-full bg-[#0d1628] border border-slate-800 text-slate-300 hover:text-white hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all duration-300 flex items-center gap-2 text-xs md:text-sm font-medium"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            <span>{tech}</span>
                        </div>
                    ))}
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex flex-wrap gap-4 sm:gap-5 items-center justify-center"
                >
                    <button
                        onClick={handleViewWork}
                        className="cursor-pointer px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm md:text-base rounded-full flex items-center gap-2.5 shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 active:scale-95"
                    >
                        <span>View Featured Projects</span>
                        <ArrowRight size={18} />
                    </button>

                    <a
                        href="https://drive.google.com/file/d/1cJlM2MmqCWY2iy0H1vXMhSFJPat8BFNp/view?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-4 bg-[#0e1626]/90 border border-slate-700/80 hover:border-slate-500 text-white font-bold text-sm md:text-base rounded-full flex items-center gap-2.5 hover:bg-white/5 transition-all duration-300 active:scale-95"
                    >
                        <FileText size={18} className="text-emerald-400" />
                        <span>Download Resume</span>
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
