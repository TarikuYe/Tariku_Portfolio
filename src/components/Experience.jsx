import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { timeline, services } from '../data/portfolio';
import { BookOpen, Briefcase, Globe, Layers, Flame, CreditCard, Brain } from 'lucide-react';

const iconMap = {
    Globe: Globe,
    Layers: Layers,
    Flame: Flame,
    CreditCard: CreditCard,
    Brain: Brain
};

const Experience = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <div className="py-20">
            <div className="container mx-auto px-6">
                {/* Services Section embedded */}
                <div id="services" className="mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Services</h2>
                        <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" ref={ref}>
                        {services.map((service, index) => {
                            const Icon = iconMap[service.icon];
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="p-8 bg-white dark:bg-slate-800 rounded-xl shadow-lg border-b-4 border-blue-600 hover:-translate-y-2 transition-transform duration-300"
                                >
                                    <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400">
                                        <Icon size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                        {service.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Timeline Section */}
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Journey</h2>
                        <div className="w-20 h-1 bg-purple-600 mx-auto rounded-full"></div>
                    </motion.div>

                    <div className="relative border-l-2 border-slate-200 dark:border-slate-700 ml-4 md:ml-0 space-y-12">
                        {timeline.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className="relative pl-8 md:pl-0"
                            >
                                {/* Timeline Dot */}
                                <div className="absolute top-0 left-[-9px] w-6 h-6 bg-blue-600 rounded-full border-4 border-white dark:border-slate-900 md:left-1/2 md:-ml-3 z-10"></div>

                                <div className={`md:flex items-center justify-between w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                    <div className="hidden md:block w-5/12"></div>
                                    <div className="md:w-5/12 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border border-slate-100 dark:border-slate-700 relative">
                                        {index % 2 === 0 && <div className="hidden md:block absolute top-6 left-[-10px] w-0 h-0 border-t-[10px] border-t-transparent border-r-[10px] border-r-white dark:border-r-slate-800 border-b-[10px] border-b-transparent"></div>}
                                        {index % 2 !== 0 && <div className="hidden md:block absolute top-6 right-[-10px] w-0 h-0 border-t-[10px] border-t-transparent border-l-[10px] border-l-white dark:border-l-slate-800 border-b-[10px] border-b-transparent"></div>}

                                        <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold rounded-full mb-3">
                                            {item.year}
                                        </span>
                                        <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                                        <h4 className="text-md font-medium text-slate-500 dark:text-slate-400 mb-4 flex items-center gap-2">
                                            <Briefcase size={16} /> {item.company}
                                        </h4>
                                        <p className="text-slate-600 dark:text-slate-400 text-sm">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Experience;
