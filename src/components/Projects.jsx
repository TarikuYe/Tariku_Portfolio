import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, X, ArrowUpRight, Loader2, Download, ShoppingBag } from 'lucide-react';

const ProjectCard = ({ project, onClick }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="group glass-card overflow-hidden cursor-pointer flex flex-col h-full rounded-3xl"
            onClick={() => onClick(project)}
        >
            <div className="relative h-64 overflow-hidden bg-white/5">
                {project.image_url ? (
                    <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-600 italic text-xs">
                        No Preview Available
                    </div>
                )}
                <div className="absolute inset-0 bg-dark-darker/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-full">
                        <ArrowUpRight className="text-white" size={32} />
                    </div>
                </div>
            </div>

            <div className="p-8 flex-grow flex flex-col">
                <div className="flex gap-2 mb-4">
                    {project.tech_stack.split(',').slice(0, 3).map((tech, i) => (
                        <span key={i} className="text-[10px] uppercase tracking-widest font-bold text-primary bg-primary/10 px-2 py-1 rounded-md">
                            {tech.trim()}
                        </span>
                    ))}
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed line-clamp-3">
                    {project.description}
                </p>
            </div>
        </motion.div>
    );
};

const ProjectModal = ({ project, isOpen, onClose }) => {
    if (!isOpen || !project) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-dark-darker/95 backdrop-blur-xl"
                onClick={onClose}
            >
                <motion.div
                    initial={{ y: 50, opacity: 0, scale: 0.9 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 50, opacity: 0, scale: 0.9 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-dark-lighter w-full max-w-6xl rounded-[40px] overflow-hidden shadow-2xl relative max-h-full overflow-y-auto border border-white/5"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-8 right-8 p-3 bg-white/5 hover:bg-white/10 text-white rounded-full transition-all z-20 border border-white/10"
                    >
                        <X size={24} />
                    </button>

                    <div className="grid lg:grid-cols-2 h-full min-h-[600px]">
                        <div className="relative h-80 lg:h-full bg-black/20 overflow-hidden flex items-center justify-center">
                            {project.image_url ? (
                                <>
                                    {/* Blurred Background for Fitting */}
                                    <img
                                        src={project.image_url}
                                        alt=""
                                        className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-30 scale-110"
                                    />
                                    {/* Main Image */}
                                    <img
                                        src={project.image_url}
                                        alt={project.title}
                                        className="relative z-10 w-full h-full object-contain shadow-2xl"
                                    />
                                </>
                            ) : (
                                <div className="text-slate-500 font-medium">No Image Provided</div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-r from-dark-lighter/10 to-transparent pointer-events-none"></div>
                        </div>

                        <div className="p-8 md:p-16 flex flex-col">
                            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">{project.title}</h2>

                            <div className="flex flex-wrap gap-3 mb-10">
                                {project.tech_stack.split(',').map((tech, i) => (
                                    <span key={i} className="px-4 py-2 bg-white/5 border border-white/10 text-xs font-medium rounded-xl text-slate-300">
                                        {tech.trim()}
                                    </span>
                                ))}
                            </div>

                            <p className="text-slate-400 text-lg leading-relaxed mb-12 flex-grow">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-4 mt-auto">
                                {project.source_url && (
                                    <a
                                        href={project.source_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`flex-1 min-w-[220px] py-5 rounded-2xl flex items-center justify-center gap-3 transition-all font-bold tracking-widest text-xs uppercase shadow-xl ${parseFloat(project.price) > 0
                                            ? 'bg-accent text-white shadow-accent/20 hover:bg-accent/80'
                                            : 'bg-primary text-white shadow-primary/20 hover:bg-primary/80'
                                            }`}
                                    >
                                        {parseFloat(project.price) > 0 ? (
                                            <>
                                                <ShoppingBag size={20} /> Buy Project - ${project.price}
                                            </>
                                        ) : (
                                            <>
                                                <Download size={20} /> Free Download
                                            </>
                                        )}
                                    </a>
                                )}
                                {project.github_url && (
                                    <a
                                        href={project.github_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 min-w-[220px] py-5 bg-[#24292e] hover:bg-[#2f363d] text-white rounded-2xl flex items-center justify-center gap-3 transition-all font-bold tracking-widest text-xs uppercase shadow-xl shadow-black/20"
                                    >
                                        <Github size={20} /> View Source
                                    </a>
                                )}
                                {project.demo_url && (
                                    <a
                                        href={project.demo_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 min-w-[220px] py-5 bg-white/5 border border-white/10 text-white rounded-2xl flex items-center justify-center gap-3 hover:bg-white/10 transition-all font-bold tracking-widest text-xs uppercase"
                                    >
                                        <ExternalLink size={20} /> Live Preview
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('/api/projects');
                if (!response.ok) {
                    console.error('Server error fetching projects');
                    return;
                }
                const data = await response.json();
                if (Array.isArray(data)) {
                    setProjects(data);
                }
            } catch (error) {
                console.error('Fetch projects error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
        const interval = setInterval(fetchProjects, 10000); // Poll every 10s
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="work" className="section-padding bg-dark relative overflow-hidden">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8"
                >
                    <div className="max-w-2xl">
                        <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter">Featured <span className="text-gradient underline decoration-primary/20 underline-offset-8">Projects.</span></h2>
                        <p className="text-slate-400 text-lg leading-relaxed font-light">
                            Showcasing my best work from the dashboard. Everything you see here is updated in real-time.
                        </p>
                    </div>
                </motion.div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="animate-spin text-primary" size={48} />
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        <AnimatePresence mode="popLayout">
                            {projects.map(project => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    onClick={setSelectedProject}
                                />
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>

            {selectedProject && (
                <ProjectModal
                    project={selectedProject}
                    isOpen={!!selectedProject}
                    onClose={() => setSelectedProject(null)}
                />
            )}

            {/* Background Accent */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-secondary/5 blur-[120px] rounded-full -z-10" />
        </section>
    );
};

export default Projects;

