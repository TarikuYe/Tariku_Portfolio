import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft,
    ArrowRight,
    ExternalLink,
    Github,
    FolderCode,
    Share2,
    Check,
    Calendar,
    Eye,
    Code2,
    Tag,
    Maximize2,
    X,
    ImageOff,
    Loader2,
    FileText
} from 'lucide-react';
import { initialProjects } from '../data/portfolio';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const getDisplayImageUrl = (url) => {
    if (!url || typeof url !== 'string') return '';
    const trimmed = url.trim();
    if (!trimmed) return '';
    if (trimmed.startsWith('data:')) return trimmed;
    if (trimmed.startsWith('uploads/')) return `/${trimmed}`;
    if (trimmed.startsWith('/')) return trimmed;
    if (trimmed.includes('res.cloudinary.com')) {
        return `/api/proxy-image?url=${encodeURIComponent(trimmed)}`;
    }
    return trimmed;
};

const normalizeExternalUrl = (url) => {
    if (!url || typeof url !== 'string') return '';
    const trimmed = url.trim();
    if (!trimmed || trimmed === '#') return '';
    if (/^(https?:\/\/|\/|mailto:)/i.test(trimmed)) return trimmed;
    return `https://${trimmed}`;
};

const slugify = (text = '') =>
    String(text)
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

const SLUG_KEYWORDS = {
    'kids-learning-android-app': ['kid', 'learn', 'kg'],
    'qr-studio-generator-platform': ['qr'],
    'tourism-management-sentiment-analysis': ['tour', 'sentiment', 'wolaita', 'wolkite'],
    'digital-menu-restaurant-management': ['menu', 'restaurant', 'hotel', 'dining'],
    'weekly-report-automation': ['weekly', 'report', 'automation']
};

const findProjectInList = (list, idParam) => {
    if (!Array.isArray(list) || list.length === 0) return null;
    if (!idParam) return list[0];

    const needle = String(idParam).toLowerCase().trim();

    // 1. Direct DB id match or "project-<id>" match
    let match = list.find(
        (p) => String(p.id).toLowerCase() === needle || `project-${String(p.id).toLowerCase()}` === needle
    );
    if (match) return match;

    // 2. Direct slug field match
    match = list.find((p) => p.slug && p.slug.toLowerCase() === needle);
    if (match) return match;

    // 3. Exact slugified title match
    match = list.find((p) => slugify(p.title) === needle);
    if (match) return match;

    // 4. Canonical slug-to-title match (preserves compatibility with links from Projects grid)
    const keywords = SLUG_KEYWORDS[needle];
    if (keywords) {
        match = list.find((p) => {
            const title = (p.title || '').toLowerCase();
            return keywords.some((kw) => title.includes(kw));
        });
        if (match) return match;
    }

    // 5. Partial slugified title match
    match = list.find((p) => {
        const titleSlug = slugify(p.title);
        return titleSlug && (titleSlug.includes(needle) || needle.includes(titleSlug));
    });

    return match || null;
};

const parseTechStack = (techStack = '') =>
    String(techStack)
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);

const formatPrice = (price) => {
    const numeric = Number(price);
    if (!Number.isFinite(numeric) || numeric <= 0) {
        return { label: 'Free', isFree: true };
    }
    return { label: `$${numeric.toFixed(2)}`, isFree: false };
};

const formatDate = (dateValue) => {
    if (!dateValue) return '';
    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) return '';
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

const stripToAdminFields = (item) => ({
    id: item.id,
    title: item.title || '',
    description: item.description || '',
    image_url: item.image_url || '',
    tech_stack: item.tech_stack || '',
    source_url: item.source_url || '',
    demo_url: item.demo_url || '',
    github_url: item.github_url || '',
    price: item.price ?? 0,
    views: item.views ?? null,
    created_at: item.created_at || null
});

const ProjectDetails = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [allProjects, setAllProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState(false);
    const [copied, setCopied] = useState(false);
    const [imgError, setImgError] = useState(false);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const lastViewedIdRef = useRef(null);

    useEffect(() => {
        const controller = new AbortController();

        const loadProject = async () => {
            setLoading(true);
            setFetchError(false);
            setImgError(false);
            setLightboxOpen(false);

            let fetchedList = null;

            try {
                const response = await fetch('/api/projects', { signal: controller.signal });
                if (response.ok) {
                    const data = await response.json();
                    if (Array.isArray(data)) {
                        fetchedList = data.map(stripToAdminFields);
                    }
                }
            } catch (err) {
                if (err.name === 'AbortError') return;
                console.error('Error fetching project details:', err);
                setFetchError(true);
            }

            if (controller.signal.aborted) return;

            // Offline fallback only when the API is unreachable
            const resolvedList =
                fetchedList !== null
                    ? fetchedList
                    : initialProjects.map(stripToAdminFields);

            const foundFromDb = findProjectInList(resolvedList, id);
            const fallbackTemplate =
                !foundFromDb && id
                    ? initialProjects.find(
                          (p) => p.slug && p.slug.toLowerCase() === String(id).toLowerCase().trim()
                      )
                    : null;
            const found =
                foundFromDb || (fallbackTemplate ? stripToAdminFields(fallbackTemplate) : null);

            setAllProjects(resolvedList);
            setProject(found);
            setLoading(false);

            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Record view count for real DB projects
            if (fetchedList !== null && foundFromDb?.id && lastViewedIdRef.current !== foundFromDb.id) {
                lastViewedIdRef.current = foundFromDb.id;
                fetch(`/api/projects/${foundFromDb.id}/view`, { method: 'POST' }).catch(() => {});
            }
        };

        loadProject();

        return () => controller.abort();
    }, [id]);

    const handleCopyUrl = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#060a12] text-white flex flex-col">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center gap-3 px-6 pt-24">
                    <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
                    <span className="text-slate-400 text-sm font-medium">
                        Loading project details...
                    </span>
                </div>
                <Footer />
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-screen bg-[#060a12] text-white flex flex-col">
                <Navbar />
                <main className="flex-1 flex items-center justify-center px-6 pt-28 pb-20">
                    <div className="max-w-md w-full p-8 rounded-3xl bg-[#0b1322] border border-slate-800 text-center space-y-5">
                        <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-400">
                            <FileText size={26} />
                        </div>
                        <div className="space-y-2">
                            <h1 className="text-2xl font-bold text-white">Project Not Found</h1>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                {fetchError
                                    ? 'Unable to load project details right now. Please try again shortly.'
                                    : 'This project does not exist or may have been removed from the portfolio.'}
                            </p>
                        </div>
                        <Link
                            to="/work"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all"
                        >
                            <ArrowLeft size={15} />
                            <span>Back to Projects</span>
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    const tags = parseTechStack(project.tech_stack);
    const displayImage = getDisplayImageUrl(project.image_url);
    const hasImage = Boolean(displayImage && !imgError);
    const githubUrl = normalizeExternalUrl(project.github_url);
    const demoUrl = normalizeExternalUrl(project.demo_url);
    const sourceUrl = normalizeExternalUrl(project.source_url);
    const hasAnyLink = Boolean(demoUrl || githubUrl || sourceUrl);
    const priceInfo = formatPrice(project.price);
    const publishedDate = formatDate(project.created_at);

    const currentIndex = allProjects.findIndex((p) => String(p.id) === String(project.id));
    const hasSiblings = allProjects.length > 1 && currentIndex >= 0;
    const prevProject = hasSiblings
        ? allProjects[(currentIndex - 1 + allProjects.length) % allProjects.length]
        : null;
    const nextProject = hasSiblings
        ? allProjects[(currentIndex + 1) % allProjects.length]
        : null;

    const descriptionParagraphs = String(project.description || '')
        .split(/\r?\n\s*\r?\n/)
        .map((p) => p.trim())
        .filter(Boolean);

    return (
        <div className="min-h-screen bg-[#060a12] text-slate-200 flex flex-col">
            <Navbar />

            <main className="flex-1 pt-28 pb-20">
                {/* Top Breadcrumb & Quick Actions */}
                <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-6xl mb-8">
                    <div className="flex flex-wrap items-center justify-between gap-4 py-3.5 border-b border-slate-800/80">
                        <Link
                            to="/work"
                            className="inline-flex items-center gap-2 text-slate-400 hover:text-emerald-400 text-sm font-semibold transition-colors group"
                        >
                            <ArrowLeft
                                size={16}
                                className="group-hover:-translate-x-1 transition-transform"
                            />
                            <span>Back to Projects</span>
                        </Link>

                        <div className="flex flex-wrap items-center gap-2.5">
                            <button
                                onClick={handleCopyUrl}
                                className="px-3.5 py-1.5 rounded-full bg-[#0d1527] border border-slate-800 hover:border-slate-600 text-xs font-medium text-slate-300 flex items-center gap-1.5 transition-all"
                            >
                                {copied ? (
                                    <Check size={14} className="text-emerald-400" />
                                ) : (
                                    <Share2 size={14} />
                                )}
                                <span>{copied ? 'Link Copied' : 'Share'}</span>
                            </button>

                            {githubUrl && (
                                <a
                                    href={githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-3.5 py-1.5 rounded-full bg-[#0d1527] border border-slate-700 hover:border-slate-500 text-xs font-semibold text-white flex items-center gap-1.5 transition-all"
                                >
                                    <Github size={14} />
                                    <span>GitHub</span>
                                </a>
                            )}

                            {sourceUrl && (
                                <a
                                    href={sourceUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-3.5 py-1.5 rounded-full bg-[#0d1527] border border-slate-700 hover:border-slate-500 text-xs font-semibold text-white flex items-center gap-1.5 transition-all"
                                >
                                    <FolderCode size={14} />
                                    <span>Source</span>
                                </a>
                            )}

                            {demoUrl && (
                                <a
                                    href={demoUrl}
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

                {/* Hero Header (Strictly Admin-Authored Title, Tech Stack & DB Metadata) */}
                <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-6xl mb-10">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45 }}
                        className="space-y-5"
                    >
                        <div className="flex flex-wrap items-center gap-3 text-xs">
                            <span
                                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-bold border ${
                                    priceInfo.isFree
                                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                                        : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                                }`}
                            >
                                <Tag size={12} />
                                <span>{priceInfo.isFree ? 'Free' : priceInfo.label}</span>
                            </span>

                            {publishedDate && (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0b1322] border border-slate-800 text-slate-400 font-medium">
                                    <Calendar size={12} className="text-emerald-400" />
                                    <span>{publishedDate}</span>
                                </span>
                            )}

                            {typeof project.views === 'number' && (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0b1322] border border-slate-800 text-slate-400 font-medium">
                                    <Eye size={12} className="text-emerald-400" />
                                    <span>{project.views} {project.views === 1 ? 'view' : 'views'}</span>
                                </span>
                            )}
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
                            {project.title}
                        </h1>

                        {tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 pt-1">
                                {tags.map((tech, idx) => (
                                    <span
                                        key={idx}
                                        className="px-3 py-1 rounded-lg bg-[#0b1322] border border-slate-800 text-emerald-400 text-xs font-bold uppercase tracking-wider"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </div>

                {/* Project Image Showcase (Frame-Free, Admin Image Only) */}
                <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-6xl mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="relative rounded-3xl bg-[#0b1322] border border-slate-800/90 overflow-hidden shadow-2xl"
                    >
                        {hasImage ? (
                            <div className="relative group bg-[#070b14] flex items-center justify-center min-h-[260px] sm:min-h-[360px] max-h-[560px] overflow-hidden">
                                {/* Subtle ambient backdrop for non-16:9 images */}
                                <img
                                    src={displayImage}
                                    alt=""
                                    aria-hidden="true"
                                    referrerPolicy="no-referrer"
                                    className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-20 scale-110 pointer-events-none"
                                />
                                <img
                                    src={displayImage}
                                    alt={project.title}
                                    referrerPolicy="no-referrer"
                                    onError={() => setImgError(true)}
                                    onClick={() => setLightboxOpen(true)}
                                    className="relative z-10 w-full max-h-[560px] object-contain cursor-zoom-in transition-transform duration-500 group-hover:scale-[1.01]"
                                />
                                <button
                                    type="button"
                                    onClick={() => setLightboxOpen(true)}
                                    aria-label="View full image"
                                    className="absolute bottom-4 right-4 z-20 p-2.5 rounded-xl bg-[#0b1322]/90 hover:bg-emerald-500 text-slate-200 hover:text-slate-950 border border-slate-700/80 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all shadow-lg"
                                >
                                    <Maximize2 size={16} />
                                </button>
                            </div>
                        ) : (
                            <div className="h-64 sm:h-80 flex flex-col items-center justify-center gap-3 text-slate-500 bg-[#070b14]">
                                <ImageOff size={32} className="text-slate-600" />
                                <span className="text-sm font-medium">No project image provided</span>
                            </div>
                        )}
                    </motion.div>
                </div>

                {/* Main Content: Admin Description + Sidebar (Links, Price, Tech Stack) */}
                <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-6xl mb-16">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Left Column: Project Description */}
                        <div className="lg:col-span-8">
                            <div className="p-6 sm:p-8 md:p-10 rounded-3xl bg-[#0b1322] border border-slate-800">
                                <h2 className="text-xl md:text-2xl font-bold text-white mb-6 pb-4 border-b border-slate-800/80">
                                    About This Project
                                </h2>

                                {descriptionParagraphs.length > 0 ? (
                                    <div className="space-y-4 text-slate-300 text-base md:text-lg leading-relaxed">
                                        {descriptionParagraphs.map((paragraph, idx) => (
                                            <p key={idx} className="whitespace-pre-line">
                                                {paragraph}
                                            </p>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-slate-400 text-sm italic">
                                        No description provided.
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Right Column: Access Links, Price & Tech Stack */}
                        <aside className="lg:col-span-4 space-y-6">
                            {/* Project Links & Price Card */}
                            <div className="p-6 md:p-7 rounded-3xl bg-[#0b1322] border border-slate-800 space-y-5">
                                <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
                                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                        Project Access
                                    </span>
                                    <span
                                        className={`text-sm font-extrabold ${
                                            priceInfo.isFree ? 'text-emerald-400' : 'text-amber-300'
                                        }`}
                                    >
                                        {priceInfo.label}
                                    </span>
                                </div>

                                <div className="space-y-3">
                                    {demoUrl && (
                                        <a
                                            href={demoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20"
                                        >
                                            <span>Live Preview</span>
                                            <ExternalLink size={14} />
                                        </a>
                                    )}

                                    {githubUrl && (
                                        <a
                                            href={githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full py-3 px-4 bg-[#0d1628] hover:bg-slate-800 border border-slate-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all"
                                        >
                                            <Github size={15} />
                                            <span>GitHub Repository</span>
                                        </a>
                                    )}

                                    {sourceUrl && (
                                        <a
                                            href={sourceUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full py-3 px-4 bg-[#0d1628] hover:bg-slate-800 border border-slate-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all"
                                        >
                                            <FolderCode size={15} className="text-emerald-400" />
                                            <span>Source Files</span>
                                        </a>
                                    )}

                                    {!hasAnyLink && (
                                        <Link
                                            to="/contact"
                                            className="w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20"
                                        >
                                            <span>Inquire About Project</span>
                                            <ArrowRight size={14} />
                                        </Link>
                                    )}
                                </div>
                            </div>

                            {/* Tech Stack Card */}
                            {tags.length > 0 && (
                                <div className="p-6 md:p-7 rounded-3xl bg-[#0b1322] border border-slate-800">
                                    <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                                        <Code2 size={18} className="text-emerald-400" />
                                        <span>Tech Stack</span>
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {tags.map((tech, idx) => (
                                            <span
                                                key={idx}
                                                className="px-3 py-1.5 bg-[#10192b] border border-slate-700/80 rounded-lg text-slate-200 text-xs font-semibold"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </aside>
                    </div>
                </div>

                {/* Prev / Next Navigation Across Database Projects */}
                {hasSiblings && (
                    <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-6xl pt-10 border-t border-slate-800/80">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <Link
                                to={`/projects/${prevProject.id}`}
                                className="p-5 sm:p-6 rounded-2xl bg-[#0b1322] border border-slate-800 hover:border-emerald-500/50 transition-all group flex items-center justify-between gap-4"
                            >
                                <div className="min-w-0">
                                    <span className="text-[11px] uppercase font-bold text-slate-400 block mb-1">
                                        ← Previous Project
                                    </span>
                                    <h4 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors truncate">
                                        {prevProject.title}
                                    </h4>
                                </div>
                                <span className="w-10 h-10 shrink-0 rounded-full bg-slate-800 group-hover:bg-emerald-500 group-hover:text-slate-950 flex items-center justify-center transition-all">
                                    <ArrowLeft size={16} />
                                </span>
                            </Link>

                            <Link
                                to={`/projects/${nextProject.id}`}
                                className="p-5 sm:p-6 rounded-2xl bg-[#0b1322] border border-slate-800 hover:border-emerald-500/50 transition-all group flex items-center justify-between gap-4"
                            >
                                <div className="min-w-0">
                                    <span className="text-[11px] uppercase font-bold text-slate-400 block mb-1">
                                        Next Project →
                                    </span>
                                    <h4 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors truncate">
                                        {nextProject.title}
                                    </h4>
                                </div>
                                <span className="w-10 h-10 shrink-0 rounded-full bg-slate-800 group-hover:bg-emerald-500 group-hover:text-slate-950 flex items-center justify-center transition-all">
                                    <ArrowRight size={16} />
                                </span>
                            </Link>
                        </div>
                    </div>
                )}
            </main>

            {/* Full-Screen Image Lightbox */}
            <AnimatePresence>
                {lightboxOpen && hasImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setLightboxOpen(false)}
                        className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-lg flex items-center justify-center p-4 sm:p-8"
                    >
                        <button
                            type="button"
                            onClick={() => setLightboxOpen(false)}
                            aria-label="Close image preview"
                            className="absolute top-5 right-5 p-3 rounded-full bg-slate-800/90 hover:bg-slate-700 text-white border border-slate-700 transition-colors"
                        >
                            <X size={20} />
                        </button>
                        <motion.img
                            initial={{ scale: 0.96, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.96, opacity: 0 }}
                            src={displayImage}
                            alt={project.title}
                            referrerPolicy="no-referrer"
                            onClick={(e) => e.stopPropagation()}
                            className="max-w-full max-h-[88vh] object-contain rounded-2xl border border-slate-800 shadow-2xl"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
        </div>
    );
};

export default ProjectDetails;
