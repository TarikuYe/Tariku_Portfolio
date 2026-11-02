import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ArrowLeft, 
    ArrowRight, 
    ExternalLink, 
    Github, 
    CheckCircle2, 
    Layers, 
    Cpu, 
    Database, 
    Globe, 
    Share2, 
    Check, 
    Terminal, 
    Sparkles, 
    Shield, 
    Zap,
    Clock,
    User,
    Building2,
    Calendar
} from 'lucide-react';
import { initialProjects } from '../data/portfolio';
import ProjectDeviceMockup from '../components/ProjectDeviceMockup';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ProjectDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [allProjects, setAllProjects] = useState(initialProjects);
    const [copied, setCopied] = useState(false);
    const [activeTab, setActiveTab] = useState('preview'); // 'preview' | 'architecture' | 'code'

    useEffect(() => {
        // Fetch from API or fallback
        const loadProject = async () => {
            let list = initialProjects;
            try {
                const response = await fetch('/api/projects');
                if (response.ok) {
                    const data = await response.json();
                    if (Array.isArray(data) && data.length > 0) {
                        // Merge or use data
                        const merged = data.map(dbItem => {
                            const initial = initialProjects.find(p => p.id === dbItem.id) || {};
                            return { ...initial, ...dbItem };
                        });
                        list = merged;
                    }
                }
            } catch (err) {
                console.error('Error fetching projects:', err);
            }

            setAllProjects(list);

            // Find project by id or slug
            const found = list.find(p => 
                String(p.id) === String(id) || 
                p.slug === id || 
                (p.title && p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').includes(id.toLowerCase()))
            ) || list[0];

            setProject(found);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };

        loadProject();
    }, [id]);

    if (!project) {
        return (
            <div className="min-h-screen bg-[#060a12] text-white flex items-center justify-center">
                <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-slate-400 font-medium">Loading project details...</span>
                </div>
            </div>
        );
    }

    // Determine Prev & Next project
    const currentIndex = allProjects.findIndex(p => p.id === project.id);
    const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : allProjects[allProjects.length - 1];
    const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : allProjects[0];

    const tags = project.techBadges || (project.tech_stack || '').split(',').map(s => s.trim()).filter(Boolean);

    const handleCopyUrl = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    return (
        <div className="min-h-screen bg-[#060a12] text-slate-200">
            <Navbar />

            <main className="pt-28 pb-20">
                {/* Top Breadcrumb & Action Toolbar */}
                <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-3 border-b border-slate-800/80">
                        <Link
                            to="/#work"
                            className="inline-flex items-center gap-2 text-slate-400 hover:text-emerald-400 text-sm font-semibold transition-colors group"
                        >
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            <span>Back to Featured Projects</span>
                        </Link>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleCopyUrl}
                                className="px-3.5 py-1.5 rounded-full bg-[#0d1527] border border-slate-800 hover:border-slate-600 text-xs text-slate-300 flex items-center gap-1.5 transition-all"
                            >
                                {copied ? <Check size={14} className="text-emerald-400" /> : <Share2 size={14} />}
                                <span>{copied ? 'Link Copied' : 'Share Project'}</span>
                            </button>

                            {project.github_url && project.github_url !== '#' && (
                                <a
                                    href={project.github_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-1.5 rounded-full bg-[#0d1527] border border-slate-700 hover:border-slate-500 text-xs font-semibold text-white flex items-center gap-1.5 transition-all"
                                >
                                    <Github size={14} />
                                    <span>GitHub</span>
                                </a>
                            )}

                            {project.demo_url && project.demo_url !== '#' && (
                                <a
                                    href={project.demo_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-1.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-all shadow-lg shadow-emerald-500/20"
                                >
                                    <span>Live Demo</span>
                                    <ExternalLink size={14} />
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Hero Header Section */}
                <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl"
                    >
                        {/* Category Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-widest">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            <span>{project.category || 'AI & FULL STACK SYSTEM'}</span>
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
                            {project.title}
                        </h1>

                        {/* Subtitle */}
                        <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-8">
                            {project.subtitle || project.description}
                        </p>

                        {/* Project Meta Attributes Strip */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-[#0b1322] border border-slate-800">
                            <div>
                                <span className="flex items-center gap-1.5 text-[11px] uppercase font-bold text-slate-400 mb-1">
                                    <User size={13} className="text-emerald-400" />
                                    Role
                                </span>
                                <span className="text-sm font-semibold text-white block truncate">
                                    {project.role || 'Full-Stack Engineer'}
                                </span>
                            </div>

                            <div>
                                <span className="flex items-center gap-1.5 text-[11px] uppercase font-bold text-slate-400 mb-1">
                                    <Calendar size={13} className="text-emerald-400" />
                                    Timeline
                                </span>
                                <span className="text-sm font-semibold text-white block truncate">
                                    {project.timeline || '2024'}
                                </span>
                            </div>

                            <div>
                                <span className="flex items-center gap-1.5 text-[11px] uppercase font-bold text-slate-400 mb-1">
                                    <Building2 size={13} className="text-emerald-400" />
                                    Context
                                </span>
                                <span className="text-sm font-semibold text-white block truncate">
                                    {project.client || 'Featured System'}
                                </span>
                            </div>

                            <div>
                                <span className="flex items-center gap-1.5 text-[11px] uppercase font-bold text-slate-400 mb-1">
                                    <CheckCircle2 size={13} className="text-emerald-400" />
                                    Status
                                </span>
                                <span className="text-sm font-semibold text-emerald-400 block truncate">
                                    {project.status || 'Production Ready'}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Showcase Showcase Frame with Tab Navigation */}
                <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="bg-[#0b1322] border border-slate-800/80 rounded-3xl p-4 md:p-8"
                    >
                        {/* Tab Switcher */}
                        <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-800/80">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setActiveTab('preview')}
                                    className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all ${
                                        activeTab === 'preview'
                                            ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                                            : 'bg-[#0f172a] text-slate-400 hover:text-white'
                                    }`}
                                >
                                    Interactive UI Preview
                                </button>
                                {project.architecture && (
                                    <button
                                        onClick={() => setActiveTab('architecture')}
                                        className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all ${
                                            activeTab === 'architecture'
                                                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                                                : 'bg-[#0f172a] text-slate-400 hover:text-white'
                                        }`}
                                    >
                                        Architecture & Flow
                                    </button>
                                )}
                                {project.codeSnippet && (
                                    <button
                                        onClick={() => setActiveTab('code')}
                                        className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all hidden sm:block ${
                                            activeTab === 'code'
                                                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                                                : 'bg-[#0f172a] text-slate-400 hover:text-white'
                                        }`}
                                    >
                                        Core Implementation
                                    </button>
                                )}
                            </div>

                            <span className="text-xs font-mono text-slate-500 hidden md:inline">
                                HIGH-FIDELITY SYSTEM ENGINE
                            </span>
                        </div>

                        {/* Tab Contents */}
                        <AnimatePresence mode="wait">
                            {activeTab === 'preview' && (
                                <motion.div
                                    key="preview"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="max-w-5xl mx-auto"
                                >
                                    <ProjectDeviceMockup project={project} className="shadow-2xl" />
                                </motion.div>
                            )}

                            {activeTab === 'architecture' && (
                                <motion.div
                                    key="architecture"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="max-w-4xl mx-auto p-6 md:p-8 bg-[#070c17] rounded-2xl border border-slate-800"
                                >
                                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                        <Layers className="text-emerald-400" size={20} />
                                        <span>System Architecture Overview</span>
                                    </h3>
                                    <p className="text-slate-300 leading-relaxed text-base mb-6">
                                        {project.architecture}
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="p-4 rounded-xl bg-[#0b1322] border border-slate-800">
                                            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                                                Data Flow & Ingestion
                                            </span>
                                            <p className="text-xs text-slate-400 leading-relaxed">
                                                Asynchronous ingestion queues normalize incoming payload data with zero-drop resilience and automated validation.
                                            </p>
                                        </div>
                                        <div className="p-4 rounded-xl bg-[#0b1322] border border-slate-800">
                                            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                                                Security & Availability
                                            </span>
                                            <p className="text-xs text-slate-400 leading-relaxed">
                                                Strict TLS encryption, parameterized query enforcement, and fine-grained role-based permissions ensure zero attack surface.
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'code' && (
                                <motion.div
                                    key="code"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="max-w-4xl mx-auto rounded-2xl overflow-hidden border border-slate-800 bg-[#070b14]"
                                >
                                    <div className="flex items-center justify-between px-4 py-2.5 bg-[#0a0f1d] border-b border-slate-800 text-xs text-slate-400 font-mono">
                                        <div className="flex items-center gap-2">
                                            <Terminal size={14} className="text-emerald-400" />
                                            <span>core_pipeline_implementation</span>
                                        </div>
                                        <span className="text-emerald-400">Production Code</span>
                                    </div>
                                    <pre className="p-6 overflow-x-auto text-xs md:text-sm font-mono text-emerald-300 leading-relaxed bg-[#060a12]/90">
                                        <code>{project.codeSnippet}</code>
                                    </pre>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>

                {/* Impact & Performance Stat Counters */}
                {project.impactStats && project.impactStats.length > 0 && (
                    <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl mb-16">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                            {project.impactStats.map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className="p-6 md:p-8 rounded-3xl bg-[#0b1322] border border-slate-800 hover:border-emerald-500/40 transition-all text-center group"
                                >
                                    <span className="block text-3xl md:text-5xl font-black text-white group-hover:text-emerald-400 transition-colors mb-2 tracking-tight">
                                        {stat.value}
                                    </span>
                                    <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                                        {stat.label}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Deep Dive: Overview, Challenges, Solutions */}
                <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl mb-16">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        {/* Left Column: Context & The Challenge vs Solution */}
                        <div className="lg:col-span-8 space-y-10">
                            {/* Overview */}
                            <div className="p-8 md:p-10 rounded-3xl bg-[#0b1322] border border-slate-800">
                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                                    Project Background & Architecture
                                </h2>
                                <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-6 font-normal">
                                    {project.overview || project.description}
                                </p>
                                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800/80">
                                    {tags.map((tag, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 bg-[#10192b] border border-slate-700/80 text-emerald-400 text-xs font-bold rounded-lg uppercase tracking-wider"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Challenge & Solution Cards */}
                            {project.challenges && project.solutions && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* The Challenge */}
                                    <div className="p-8 rounded-3xl bg-[#0b1322] border border-slate-800">
                                        <h3 className="text-lg font-bold text-amber-400 mb-4 flex items-center gap-2">
                                            <span>⚠️</span>
                                            <span>The Core Engineering Challenges</span>
                                        </h3>
                                        <ul className="space-y-3">
                                            {project.challenges.map((c, i) => (
                                                <li key={i} className="text-xs md:text-sm text-slate-300 leading-relaxed flex items-start gap-2.5">
                                                    <span className="text-amber-400 mt-1 font-bold">•</span>
                                                    <span>{c}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* The Solution */}
                                    <div className="p-8 rounded-3xl bg-[#0b1322] border border-slate-800">
                                        <h3 className="text-lg font-bold text-emerald-400 mb-4 flex items-center gap-2">
                                            <Zap size={18} className="text-emerald-400" />
                                            <span>Engineered Solutions</span>
                                        </h3>
                                        <ul className="space-y-3">
                                            {project.solutions.map((s, i) => (
                                                <li key={i} className="text-xs md:text-sm text-slate-300 leading-relaxed flex items-start gap-2.5">
                                                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                                                    <span>{s}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}

                            {/* Key Features */}
                            {project.keyFeatures && (
                                <div className="p-8 md:p-10 rounded-3xl bg-[#0b1322] border border-slate-800">
                                    <h2 className="text-2xl font-bold text-white mb-6">
                                        Key Functional Capabilities
                                    </h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        {project.keyFeatures.map((feat, i) => (
                                            <div key={i} className="p-5 rounded-2xl bg-[#0e1628] border border-slate-800/80">
                                                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold mb-3">
                                                    {i + 1}
                                                </div>
                                                <h4 className="text-base font-bold text-white mb-2">{feat.title}</h4>
                                                <p className="text-xs md:text-sm text-slate-400 leading-relaxed">{feat.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Column: Technical Toolkit Details & Direct Actions */}
                        <div className="lg:col-span-4 space-y-6">
                            {/* Technology Stack Breakdown */}
                            <div className="p-6 md:p-8 rounded-3xl bg-[#0b1322] border border-slate-800">
                                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                    <Cpu className="text-emerald-400" size={18} />
                                    <span>Technology Stack</span>
                                </h3>

                                <div className="space-y-5">
                                    {project.techDetails ? (
                                        Object.entries(project.techDetails).map(([category, items]) => {
                                            if (!items || items.length === 0) return null;
                                            return (
                                                <div key={category}>
                                                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest block mb-2">
                                                        {category.replace('_', ' / ')}
                                                    </span>
                                                    <div className="flex flex-wrap gap-2">
                                                        {items.map((item, idx) => (
                                                            <span
                                                                key={idx}
                                                                className="px-2.5 py-1 bg-[#121c2e] border border-slate-700/80 rounded-lg text-slate-200 text-xs font-medium"
                                                            >
                                                                {item}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <div className="flex flex-wrap gap-2">
                                            {tags.map((tag, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-3 py-1 bg-[#121c2e] border border-slate-700 rounded-lg text-emerald-400 text-xs font-bold"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Direct Project Action Box */}
                            <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-[#0c182c] to-[#070d19] border border-emerald-500/30 text-center space-y-4">
                                <h4 className="text-lg font-bold text-white">Experience This System</h4>
                                <p className="text-xs text-slate-400 leading-relaxed">
                                    Explore the repository or request a private architectural walkthrough.
                                </p>
                                <div className="space-y-3 pt-2">
                                    {project.demo_url && project.demo_url !== '#' ? (
                                        <a
                                            href={project.demo_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20"
                                        >
                                            <span>Launch Live System</span>
                                            <ExternalLink size={14} />
                                        </a>
                                    ) : (
                                        <button
                                            onClick={() => navigate('/#contact')}
                                            className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20"
                                        >
                                            <span>Request Live Demo</span>
                                            <ArrowRight size={14} />
                                        </button>
                                    )}

                                    {project.github_url && project.github_url !== '#' && (
                                        <a
                                            href={project.github_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full py-3 bg-[#0d1628] hover:bg-slate-800 border border-slate-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all"
                                        >
                                            <Github size={14} />
                                            <span>View Source Code</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Next / Prev Project Navigation Strip */}
                <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl pt-10 border-t border-slate-800">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Prev Project Card */}
                        <Link
                            to={`/projects/${prevProject.slug || prevProject.id}`}
                            className="p-6 rounded-2xl bg-[#0b1322] border border-slate-800 hover:border-emerald-500/50 transition-all group flex items-center justify-between"
                        >
                            <div>
                                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                                    ← Previous Project
                                </span>
                                <h4 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                                    {prevProject.title}
                                </h4>
                            </div>
                            <span className="w-10 h-10 rounded-full bg-slate-800 group-hover:bg-emerald-500 group-hover:text-slate-950 flex items-center justify-center transition-all">
                                <ArrowLeft size={16} />
                            </span>
                        </Link>

                        {/* Next Project Card */}
                        <Link
                            to={`/projects/${nextProject.slug || nextProject.id}`}
                            className="p-6 rounded-2xl bg-[#0b1322] border border-slate-800 hover:border-emerald-500/50 transition-all group flex items-center justify-between"
                        >
                            <div>
                                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                                    Next Project →
                                </span>
                                <h4 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                                    {nextProject.title}
                                </h4>
                            </div>
                            <span className="w-10 h-10 rounded-full bg-slate-800 group-hover:bg-emerald-500 group-hover:text-slate-950 flex items-center justify-center transition-all">
                                <ArrowRight size={16} />
                            </span>
                        </Link>
                    </div>

                    {/* Bottom CTA Banner */}
                    <div className="mt-12 p-8 md:p-12 rounded-3xl bg-gradient-to-r from-[#0b1426] via-[#0e1c36] to-[#0a1120] border border-emerald-500/30 text-center max-w-3xl mx-auto space-y-4">
                        <h3 className="text-2xl md:text-3xl font-extrabold text-white">
                            Ready to build something intelligent together?
                        </h3>
                        <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto">
                            Whether you need full-stack engineering, custom machine learning integrations, or high-performance APIs, I'm ready to collaborate.
                        </p>
                        <div className="pt-2">
                            <Link
                                to="/#contact"
                                className="inline-flex items-center gap-2 px-8 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm uppercase tracking-wider rounded-full shadow-xl shadow-emerald-500/20 transition-all active:scale-95"
                            >
                                <span>Start a Conversation</span>
                                <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ProjectDetails;

