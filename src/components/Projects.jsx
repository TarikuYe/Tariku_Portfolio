import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ArrowUpRight, 
    ArrowRight, 
    X, 
    Github, 
    Loader2, 
    Smartphone 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { initialProjects, matchProjectDetails } from '../data/portfolio';
import ProjectDeviceMockup from './ProjectDeviceMockup';

// --- Quick Modal for In-Place Inspection ---
const ProjectModal = ({ project, isOpen, onClose }) => {
    const navigate = useNavigate();
    if (!isOpen || !project) return null;

    const tags = project.techBadges || (project.tech_stack || '').split(',').map(s => s.trim()).filter(Boolean);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-slate-950/90 backdrop-blur-xl"
                onClick={onClose}
            >
                <motion.div
                    initial={{ y: 50, opacity: 0, scale: 0.95 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 50, opacity: 0, scale: 0.95 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-[#0b1322] w-full max-w-5xl rounded-[32px] overflow-hidden shadow-2xl relative max-h-[92vh] overflow-y-auto border border-slate-800"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-5 right-5 p-3 bg-slate-800/80 hover:bg-slate-700 text-white rounded-full transition-all z-20"
                        aria-label="Close modal"
                    >
                        <X size={18} />
                    </button>

                    <div className="grid lg:grid-cols-12 h-full">
                        {/* Left: Device Mockup Showcase */}
                        <div className="lg:col-span-6 p-6 md:p-8 bg-slate-950/80 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-slate-800">
                            <div className="w-full">
                                <ProjectDeviceMockup project={project} />
                            </div>
                        </div>

                        {/* Right: Info & Actions */}
                        <div className="lg:col-span-6 p-6 md:p-10 flex flex-col justify-between">
                            <div>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {tags.slice(0, 5).map((tech, i) => (
                                        <span key={i} className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded-md uppercase tracking-wider">
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4 leading-tight">
                                    {project.title}
                                </h2>

                                <p className="text-slate-300 text-sm leading-relaxed mb-6 font-normal">
                                    {project.overview || project.description}
                                </p>

                                {project.impactStats && project.impactStats.length > 0 && (
                                    <div className="grid grid-cols-2 gap-3 mb-6 p-4 rounded-2xl bg-[#080d19] border border-slate-800/80">
                                        {project.impactStats.slice(0, 2).map((stat, i) => (
                                            <div key={i}>
                                                <span className="text-xl font-black text-emerald-400 block">{stat.value}</span>
                                                <span className="text-[10px] text-slate-400 uppercase font-bold">{stat.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Modal Action Buttons */}
                            <div className="space-y-3 pt-4 border-t border-slate-800">
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => {
                                            onClose();
                                            navigate(`/projects/${project.slug || project.id}`);
                                        }}
                                        className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20"
                                    >
                                        <span>View Full Project Details</span>
                                        <ArrowRight size={14} />
                                    </button>

                                    {project.github_url && project.github_url !== '#' && (
                                        <a
                                            href={project.github_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-4 py-3 bg-[#0d1628] hover:bg-slate-800 border border-slate-700 text-white rounded-xl flex items-center gap-2 text-xs transition-all"
                                        >
                                            <Github size={16} />
                                            <span className="hidden sm:inline">GitHub</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

// --- Standard Project Card (2x2 Grid) ---
const FeaturedCard = ({ project, onQuickView: _onQuickView }) => {
    const navigate = useNavigate();
    const tags = project.techBadges || (project.tech_stack || '').split(',').map(s => s.trim()).filter(Boolean);

    const handleCardClick = () => {
        navigate(`/projects/${project.slug || project.id}`);
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group bg-[#0b1322] border border-slate-800/80 rounded-[28px] overflow-hidden flex flex-col h-full hover:border-emerald-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/5"
        >
            {/* Top Image Preview Container */}
            <div 
                className="cursor-pointer p-4 md:p-6 pb-0"
                onClick={handleCardClick}
            >
                <ProjectDeviceMockup project={project} />
            </div>

            {/* Card Content Body */}
            <div className="p-6 md:p-8 flex-grow flex flex-col justify-between">
                <div>
                    {/* Tech Badges Row */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {tags.slice(0, 5).map((tech, i) => (
                            <span 
                                key={i} 
                                className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-md"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>

                    {/* Title */}
                    <h3 
                        onClick={handleCardClick}
                        className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors leading-snug cursor-pointer"
                    >
                        {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 mb-6 font-normal">
                        {project.description}
                    </p>
                </div>

                {/* Card Footer Bar */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 text-xs">
                    <span className="text-[11px] font-mono tracking-wider text-slate-500 uppercase font-semibold">
                        {project.metaFooter || `${project.timeline || '2024'} / ${project.category || 'FULL STACK'}`}
                    </span>

                    <button
                        onClick={handleCardClick}
                        className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-bold uppercase tracking-wider text-xs transition-colors group/link"
                    >
                        <span>{project.ctaText || 'CASE STUDY'}</span>
                        <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

// --- Horizontal Full-Width Banner Card (Kids Learning App) ---
const HorizontalBannerCard = ({ project, onQuickView: _onQuickView }) => {
    const navigate = useNavigate();
    const tags = project.techBadges || (project.tech_stack || '').split(',').map(s => s.trim()).filter(Boolean);

    const handleCardClick = () => {
        navigate(`/projects/${project.slug || project.id || 'kids-learning-android-app'}`);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group bg-[#0b1322] border border-slate-800/90 rounded-[28px] p-6 md:p-8 hover:border-emerald-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/5"
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                {/* Left Device Icon Container */}
                <div className="flex items-center gap-5">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 group-hover:scale-105 group-hover:bg-emerald-500/20 transition-all">
                        <Smartphone size={28} className="stroke-[2.2]" />
                    </div>

                    <div className="space-y-2">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag, i) => (
                                <span 
                                    key={i} 
                                    className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-md"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Title */}
                        <h3 
                            onClick={handleCardClick}
                            className="text-xl md:text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors cursor-pointer"
                        >
                            {project.title}
                        </h3>

                        {/* Description */}
                        <p className="text-slate-400 text-sm max-w-3xl leading-relaxed">
                            {project.description}
                        </p>
                    </div>
                </div>

                {/* Right Action Button */}
                <div className="shrink-0 flex items-center gap-3">
                    <button
                        onClick={handleCardClick}
                        className="px-6 py-3 bg-[#0d1628] hover:bg-emerald-500 text-slate-200 hover:text-slate-950 border border-slate-700 hover:border-emerald-400 font-bold text-xs uppercase tracking-wider rounded-xl flex items-center gap-2 transition-all shadow-lg active:scale-95 group/btn"
                    >
                        <span>View Project Details</span>
                        <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

// --- Master Projects Component ---
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
                    if (Array.isArray(data) && data.length > 0) {
                        // Merge with initial rich properties using semantic matcher
                        const merged = data.map(dbItem => {
                            const template = matchProjectDetails(dbItem) || {};
                            const rawImg = dbItem.image_url;
                            const isUnsplash = rawImg && rawImg.includes('unsplash.com');
                            const isTallUpload = rawImg && (rawImg.includes('1770844') || rawImg.includes('1771012'));
                            const finalImg = (!rawImg || isUnsplash || isTallUpload) ? (template.image_url || rawImg) : rawImg;

                            return { 
                                ...template, 
                                ...dbItem,
                                slug: template.slug || dbItem.slug || `project-${dbItem.id}`,
                                layout: template.layout || (dbItem.title && (dbItem.title.toLowerCase().includes('kid') || dbItem.title.toLowerCase().includes('learn')) ? 'banner' : undefined),
                                image_url: finalImg
                            };
                        });
                        setProjects(merged);
                        return;
                    }
                }
            } catch (err) {
                console.error('Database fetch projects error:', err);
            } finally {
                setLoading(false);
            }
            // Fallback to high-fidelity initialProjects
            setProjects(initialProjects);
        };

        fetchProjects();
    }, []);

    // Explicitly identify the Kids Learning App for the horizontal banner card
    const bannerProject = projects.find(p => 
        p.layout === 'banner' || 
        (p.title && (p.title.toLowerCase().includes('kid') || p.title.toLowerCase().includes('learn'))) ||
        (p.slug && p.slug.includes('kid'))
    ) || projects.find(p => p.id === 4) || projects[3];

    // Grid contains all other projects (up to 4)
    const gridProjects = projects
        .filter(p => p.id !== bannerProject?.id && p.slug !== bannerProject?.slug)
        .slice(0, 4);

    const extraProjects = projects
        .filter(p => p.id !== bannerProject?.id && p.slug !== bannerProject?.slug)
        .slice(4);

    return (
        <section id="work" className="py-24 bg-[#060a12] text-white relative overflow-hidden">
            {/* Background lighting accents */}
            <div className="absolute top-1/3 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl relative z-10">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="max-w-2xl">
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-4"
                        >
                            Featured <span className="text-emerald-400">Projects.</span>
                        </motion.h2>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-slate-400 text-sm md:text-base leading-relaxed"
                        >
                            Showcasing my proudest work spanning intelligent full-stack systems, computer vision, and machine learning. Everything here is built for scale, performance & UX.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="hidden md:flex items-center gap-3"
                    >
                        <div className="w-12 h-12 rounded-full bg-[#0d1628] border border-slate-700/80 flex items-center justify-center text-emerald-400 shadow-lg shadow-black/40 group hover:border-emerald-500 transition-colors">
                            <ArrowUpRight size={22} className="stroke-[2.5]" />
                        </div>
                    </motion.div>
                </div>

                {/* Loading State */}
                {loading && projects.length === 0 ? (
                    <div className="flex justify-center items-center py-24">
                        <Loader2 className="animate-spin text-emerald-400" size={40} />
                    </div>
                ) : (
                    <div className="space-y-8">
                        {/* 2x2 Grid of Primary Featured Projects */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                            {gridProjects.map((project) => (
                                <FeaturedCard
                                    key={project.id || project.slug}
                                    project={project}
                                    onQuickView={(p) => setSelectedProject(p)}
                                />
                            ))}
                        </div>

                        {/* Horizontal Full-Width Banner Card (Kids Learning App) */}
                        {bannerProject && (
                            <HorizontalBannerCard
                                project={bannerProject}
                                onQuickView={(p) => setSelectedProject(p)}
                            />
                        )}

                        {/* Additional projects if any */}
                        {extraProjects.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 pt-4">
                                {extraProjects.map((project) => (
                                    <FeaturedCard
                                        key={project.id || project.slug}
                                        project={project}
                                        onQuickView={(p) => setSelectedProject(p)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Quick Preview Modal */}
            <ProjectModal
                project={selectedProject}
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </section>
    );
};

export default Projects;
