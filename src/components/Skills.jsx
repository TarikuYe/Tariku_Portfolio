import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { skills } from '../data/portfolio';

const SkillBar = ({ name, level, index }) => {
    return (
        <div className="mb-4">
            <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{name}</span>
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{level}%</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
                <motion.div
                    className="bg-blue-600 h-2.5 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${level}%` }}
                    transition={{ duration: 1, delay: 0.1 * index }}
                    viewport={{ once: true }}
                ></motion.div>
            </div>
        </div>
    );
};

const Skills = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <section id="skills" className="py-20 relative">
            <div className="container mx-auto px-6">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Skills</h2>
                    <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
                    <p className="mt-4 text-slate-600 dark:text-slate-400">My technical proficiency across various domains</p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {Object.entries(skills).map(([category, items], catIndex) => (
                        <motion.div
                            key={category}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                            className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700"
                        >
                            <h3 className="text-xl font-bold mb-6 capitalize border-b pb-2 border-slate-100 dark:border-slate-700">
                                {category === 'ai' ? 'AI / ML' : category}
                            </h3>
                            <div>
                                {items.map((skill, index) => (
                                    <SkillBar key={skill.name} name={skill.name} level={skill.level} index={index} />
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
