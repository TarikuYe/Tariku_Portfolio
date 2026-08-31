import { motion } from 'framer-motion';
import { aboutMe } from '../data/portfolio';

const About = () => {
    return (
        <section id="about" className="py-24 bg-[#060a12] text-white relative">
            <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                    {/* Left Column: About Story & Stat */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-6 space-y-8"
                    >
                        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
                            About <span className="text-emerald-400">Me</span>
                        </h2>

                        <div className="space-y-6 text-slate-300 text-base md:text-lg leading-relaxed font-normal">
                            <p>{aboutMe.bio1}</p>
                            <p>{aboutMe.bio2}</p>
                        </div>

                        {/* Experience Stat Card */}
                        <div className="pt-4">
                            <div className="inline-block bg-[#0b1322] border border-slate-800 rounded-3xl p-6 md:p-8 min-w-[200px]">
                                <span className="block text-4xl md:text-5xl font-extrabold text-emerald-400 mb-1">
                                    {aboutMe.yearsExperience}
                                </span>
                                <span className="text-xs uppercase tracking-widest font-bold text-slate-400">
                                    YEARS EXPERIENCE
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Technical Toolkit & Education */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-6 bg-[#0b1322] border border-slate-800 rounded-3xl p-8 md:p-10 space-y-10"
                    >
                        {/* Technical Toolkit */}
                        <div>
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-6">Technical Toolkit</h3>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">LANGUAGES</h4>
                                    <div className="flex flex-wrap gap-2.5">
                                        {aboutMe.toolkit.languages.map((item) => (
                                            <span key={item} className="px-3.5 py-1.5 bg-[#121c2e] border border-slate-700/80 rounded-lg text-slate-200 text-xs font-medium">
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">FRONTEND</h4>
                                    <div className="flex flex-wrap gap-2.5">
                                        {aboutMe.toolkit.frontend.map((item) => (
                                            <span key={item} className="px-3.5 py-1.5 bg-[#121c2e] border border-slate-700/80 rounded-lg text-slate-200 text-xs font-medium">
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">BACKEND</h4>
                                    <div className="flex flex-wrap gap-2.5">
                                        {aboutMe.toolkit.backend.map((item) => (
                                            <span key={item} className="px-3.5 py-1.5 bg-[#121c2e] border border-slate-700/80 rounded-lg text-slate-200 text-xs font-medium">
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">OTHER</h4>
                                    <div className="flex flex-wrap gap-2.5">
                                        {aboutMe.toolkit.other.map((item) => (
                                            <span key={item} className="px-3.5 py-1.5 bg-[#121c2e] border border-slate-700/80 rounded-lg text-slate-200 text-xs font-medium">
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Education */}
                        <div className="pt-8 border-t border-slate-800">
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-4">Education</h3>
                            <div>
                                <h4 className="text-lg font-bold text-white mb-1">{aboutMe.education.degree}</h4>
                                <p className="text-slate-400 text-sm font-medium">{aboutMe.education.institution}</p>
                                <p className="text-emerald-400 text-xs font-semibold mt-2">{aboutMe.education.period}</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
