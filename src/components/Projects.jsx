import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X, ExternalLink, Github, Loader2 } from 'lucide-react';

const DEFAULT_FALLBACK_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='500' viewBox='0 0 800 500'%3E%3Crect width='100%25' height='100%25' fill='%230f172a'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='system-ui, sans-serif' font-size='22' font-weight='600' fill='%2310b981'%3EProject Preview%3C/text%3E%3C/svg%3E";

const getDisplayImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('data:') || url.startsWith('/')) return url;
    if (url.includes('res.cloudinary.com')) {
        return `/api/proxy-image?url=${encodeURIComponent(url)}`;
    }
    return url;
};

const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = DEFAULT_FALLBACK_IMAGE;
};

const ProjectCard = ({ project, onClick }) => {
    const displayImage = getDisplayImageUrl(project.image_url);
    const tags = (project.tech_stack || '').split(',').filter(Boolean);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group bg-[#0b1322] border border-slate-800/90 rounded-3xl overflow-hidden cursor-pointer flex flex-col h-full hover:border-emerald-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/5"
            onClick={() => onClick(project)}
        >
            {/* Image Banner */}
            <div className="relative h-64 md:h-72 overflow-hidden bg-slate-900">
                {displayImage ? (
                    <img
                        src={displayImage}
                        alt={project.title}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                        onError={handleImageError}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-600 italic text-xs">
                        No Preview Available
                    </div>
                )}
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                    <div className="bg-emerald-500 text-slate-950 p-4 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <ArrowUpRight size={24} className="stroke-[3]" />
                    </div>
                </div>
            </div>

            {/* Card Content Body */}
            <div className="p-8 flex-grow flex flex-col justify-between">
                <div>
                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {tags.slice(0, 4).map((tech, i) => (
                            <span key={i} className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-md">
                                {tech.trim()}
                            </span>
                        ))}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors leading-tight">
                        {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                        {project.description}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

const ProjectModal = ({ project, isOpen, onClose }) => {
    if (!isOpen || !project) return null;
    const displayImage = getDisplayImageUrl(project.image_url);
    const tags = (project.tech_stack || '').split(',').filter(Boolean);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-slate-950/90 backdrop-blur-xl"
                onClick={onClose}
            >
                <motion.div
                    initial={{ y: 50, opacity: 0, scale: 0.95 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 50, opacity: 0, scale: 0.95 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-[#0b1322] w-full max-w-5xl rounded-[32px] overflow-hidden shadow-2xl relative max-h-[90vh] overflow-y-auto border border-slate-800"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 p-3 bg-slate-800/60 hover:bg-slate-700 text-white rounded-full transition-all z-20"
                    >
                        <X size={20} />
                    </button>

                    <div className="grid lg:grid-cols-2 h-full">
                        <div className="relative h-72 lg:h-full bg-slate-950 overflow-hidden flex items-center justify-center">
                            {displayImage ? (
                                <img
                                    src={displayImage}
                                    alt={project.title}
                                    referrerPolicy="no-referrer"
                                    className="w-full h-full object-cover"
                                    onError={handleImageError}
                                />
                            ) : (
                                <div className="text-slate-500 font-medium">No Image Provided</div>
                            )}
                        </div>

                        <div className="p-8 md:p-12 flex flex-col justify-between">
                            <div>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {tags.map((tech, i) => (
                                        <span key={i} className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold rounded-lg uppercase tracking-wider">
                                            {tech.trim()}
                                        </span>
                                    ))}
                                </div>

                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">{project.title}</h2>
                                <p className="text-slate-300 text-base leading-relaxed mb-8">{project.description}</p>
                            </div>

                            <div className="flex flex-wrap gap-4 pt-6 border-t border-slate-800">
                                {project.github_url && project.github_url !== '#' && (
                                    <a
                                        href={project.github_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl flex items-center gap-2 text-sm transition-all"
                                    >
                                        <Github size={18} />
                                        <span>GitHub Repository</span>
                                    </a>
                                )}
                                {project.demo_url && project.demo_url !== '#' && (
                                    <a
                                        href={project.demo_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl flex items-center gap-2 text-sm transition-all"
                                    >
                                        <ExternalLink size={18} />
                                        <span>Live Demo</span>
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
    const [loading, setLoading] = useState(true);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('/api/projects');
                if (response.ok) {
                    const data = await response.json();
                    setProjects(data);
                }
            } catch (err) {
                console.error('Database fetch projects error:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    return (
        <section id="work" className="py-24 bg-[#060a12] text-white relative">
            <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-4">
                            Featured <span className="text-emerald-400">Projects.</span>
                        </h2>
                        <p className="text-slate-400 text-base md:text-lg max-w-xl">
                            Showcasing my best work dynamically fetched from the database. Everything you see here is updated in real-time.
                        </p>
                    </div>

                    <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-slate-950 shadow-lg shadow-emerald-500/20">
                        <ArrowUpRight size={24} className="stroke-[3]" />
                    </div>
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="animate-spin text-emerald-400" size={40} />
                    </div>
                ) : projects.length === 0 ? (
                    <div className="text-center py-16 bg-[#0b1322] border border-slate-800 rounded-3xl text-slate-400">
                        No projects found in database.
                    </div>
                ) : (
                    /* Dynamic Database Projects Grid */
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                        {projects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                onClick={(p) => setSelectedProject(p)}
                            />
                        ))}
                    </div>
                )}
            </div>

            <ProjectModal
                project={selectedProject}
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </section>
    );
};

export default Projects;
