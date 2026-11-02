import React from 'react';
import { 
    MapPin, 
    Utensils, 
    CheckCircle2, 
    ArrowUpRight,
    Compass
} from 'lucide-react';

const getDisplayImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('data:')) return url;
    if (url.startsWith('uploads/')) return '/' + url;
    if (url.startsWith('/')) return url;
    if (url.includes('res.cloudinary.com')) {
        return `/api/proxy-image?url=${encodeURIComponent(url)}`;
    }
    return url;
};

// --- Custom Vector Screen Previews (displayed only when no custom image is available) ---

const WeeklyReportPreview = () => (
    <div className="w-full h-full bg-[#0a0f1d] text-slate-300 p-4 select-none flex flex-col justify-between font-mono text-[11px] overflow-hidden">
        {/* Top metrics bar */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-semibold text-slate-200 text-xs">NLP INGESTION PIPELINE</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                <span>99.4% ACCURACY</span>
            </div>
        </div>

        {/* Dashboard Center Grid */}
        <div className="grid grid-cols-12 gap-2 my-2 flex-grow">
            <div className="col-span-4 flex flex-col gap-2">
                <div className="bg-[#0f172a]/90 p-2 rounded-lg border border-slate-800">
                    <span className="text-[9px] text-slate-500 uppercase block">Weekly Reports</span>
                    <span className="text-sm md:text-base font-bold text-white">1,420</span>
                    <span className="text-[9px] text-emerald-400 block mt-0.5">+14.2% vs last week</span>
                </div>
                <div className="bg-[#0f172a]/90 p-2 rounded-lg border border-slate-800">
                    <span className="text-[9px] text-slate-500 uppercase block">Avg Sentiment</span>
                    <span className="text-sm md:text-base font-bold text-emerald-400">0.89 (High)</span>
                    <div className="w-full bg-slate-800 h-1 rounded-full mt-1 overflow-hidden">
                        <div className="bg-emerald-400 h-full w-[89%]" />
                    </div>
                </div>
            </div>

            <div className="col-span-8 bg-[#0f172a]/90 p-2.5 rounded-lg border border-slate-800 flex flex-col justify-between">
                <div className="flex items-center justify-between text-[10px] text-slate-400 pb-1">
                    <span>Sentiment Classification Flow</span>
                    <span className="text-emerald-400">Sub-second Latency</span>
                </div>
                <div className="relative h-16 md:h-20 w-full flex items-end">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 240 80" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                                <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                            </linearGradient>
                        </defs>
                        <path
                            d="M0,60 Q30,20 60,35 T120,15 T180,30 T240,10 L240,80 L0,80 Z"
                            fill="url(#chartGlow)"
                        />
                        <path
                            d="M0,60 Q30,20 60,35 T120,15 T180,30 T240,10"
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="2.5"
                        />
                    </svg>
                </div>
                <div className="space-y-1 pt-1 border-t border-slate-800/80 text-[9px]">
                    <div className="flex justify-between text-slate-400">
                        <span className="truncate">✓ Q3_Operations_Fin.xlsx</span>
                        <span className="text-emerald-400 font-bold">Processed (0.4s)</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Footer status bar */}
        <div className="flex items-center justify-between text-[9px] text-slate-500 pt-1 border-t border-slate-800/80">
            <span>FastAPI + PyTorch Transformer v2.4</span>
            <span className="text-emerald-400">Status: Nominal (100% Uptime)</span>
        </div>
    </div>
);

const QrStudioPreview = () => (
    <div className="w-full h-full bg-[#090d18] text-slate-300 p-4 select-none flex flex-col justify-between font-sans overflow-hidden">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">QR</span>
                <span className="font-bold text-white text-xs tracking-tight">QR Studio Workspace</span>
            </div>
            <div className="flex items-center gap-1.5">
                <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300 font-mono">SVG 4K</span>
                <span className="text-[10px] bg-emerald-500 text-slate-950 font-bold px-2 py-0.5 rounded">EXPORT</span>
            </div>
        </div>

        <div className="grid grid-cols-12 gap-3 my-2 items-center flex-grow">
            <div className="col-span-5 space-y-2 text-[10px]">
                <div className="bg-[#0f172a] p-2 rounded-lg border border-slate-800">
                    <span className="text-slate-400 text-[9px] uppercase font-bold block mb-1">Color Palette</span>
                    <div className="flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-full bg-emerald-400 ring-2 ring-emerald-400/50" />
                        <span className="w-4 h-4 rounded-full bg-cyan-400" />
                        <span className="w-4 h-4 rounded-full bg-purple-500" />
                        <span className="w-4 h-4 rounded-full bg-white" />
                    </div>
                </div>
            </div>

            <div className="col-span-7 flex flex-col items-center justify-center">
                <div className="relative p-3 bg-white rounded-xl shadow-2xl flex items-center justify-center border-4 border-slate-900 group">
                    <svg className="w-24 h-24 md:w-28 md:h-28 text-slate-900" viewBox="0 0 100 100" fill="currentColor">
                        <rect x="5" y="5" width="28" height="28" rx="6" fill="#0f172a" />
                        <rect x="9" y="9" width="20" height="20" rx="4" fill="white" />
                        <rect x="13" y="13" width="12" height="12" rx="2" fill="#10b981" />
                        <rect x="67" y="5" width="28" height="28" rx="6" fill="#0f172a" />
                        <rect x="71" y="9" width="20" height="20" rx="4" fill="white" />
                        <rect x="75" y="13" width="12" height="12" rx="2" fill="#10b981" />
                        <rect x="5" y="67" width="28" height="28" rx="6" fill="#0f172a" />
                        <rect x="9" y="71" width="20" height="20" rx="4" fill="white" />
                        <rect x="13" y="75" width="12" height="12" rx="2" fill="#10b981" />
                        <rect x="38" y="10" width="6" height="6" rx="2" fill="#0f172a" />
                        <rect x="48" y="10" width="6" height="6" rx="2" fill="#0f172a" />
                        <rect x="38" y="38" width="8" height="8" rx="3" fill="#06b6d4" />
                        <rect x="52" y="38" width="6" height="6" rx="2" fill="#0f172a" />
                        <rect x="68" y="38" width="6" height="6" rx="2" fill="#10b981" />
                    </svg>
                    <div className="absolute w-6 h-6 rounded-full bg-[#0a0f1d] border-2 border-white flex items-center justify-center text-emerald-400 font-black text-[9px] shadow-md">
                        TN
                    </div>
                </div>
            </div>
        </div>

        <div className="flex items-center justify-between text-[9px] text-slate-500 pt-1 border-t border-slate-800">
            <span>Dynamic Redirect Active</span>
            <span className="text-emerald-400">Scans: 4,892 (Real-time Sync)</span>
        </div>
    </div>
);

const TourismSystemPreview = () => (
    <div className="w-full h-full bg-[#070b14] text-slate-300 p-4 select-none flex flex-col justify-between font-sans overflow-hidden">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-white text-xs">Tourism & Review Sentiment Dashboard</span>
            </div>
            <div className="flex items-center gap-1.5 text-[9px] bg-slate-800/80 px-2 py-0.5 rounded text-emerald-400 font-mono">
                <span>ONLINE PORTAL</span>
            </div>
        </div>

        <div className="grid grid-cols-12 gap-2.5 my-2 flex-grow items-center">
            <div className="col-span-5 space-y-1.5 text-[10px]">
                <div className="bg-[#0e1628] p-2 rounded-lg border border-slate-800">
                    <span className="font-bold text-white block">Destinations & Hotspots</span>
                    <span className="text-emerald-400 text-[9px] font-bold">96% Positive Feedback</span>
                </div>
            </div>

            <div className="col-span-7 bg-[#0b1222] p-2.5 rounded-lg border border-slate-800 relative h-full flex flex-col justify-between overflow-hidden">
                <div className="relative w-full h-20 bg-[#080d19] rounded-md border border-slate-800/80 my-1 overflow-hidden flex items-center justify-center">
                    <div className="relative z-10 bg-slate-900/90 border border-emerald-500/50 px-2 py-1 rounded text-[9px] text-white flex items-center gap-1.5 shadow-lg">
                        <MapPin size={10} className="text-emerald-400" />
                        <span>Interactive GIS Layer</span>
                    </div>
                </div>
            </div>
        </div>

        <div className="flex items-center justify-between text-[9px] text-slate-500 pt-1 border-t border-slate-800">
            <span>Sentiment Model: Multilingual BERT</span>
            <span className="text-slate-400">Web Portal + Android App</span>
        </div>
    </div>
);

const DigitalMenuPreview = () => (
    <div className="w-full h-full bg-[#0a0d17] text-slate-200 p-4 select-none flex flex-col justify-between font-sans overflow-hidden">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
                <Utensils className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-white text-xs">Digital Menu & Dining Management</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                <span>LIVE KITCHEN SYNC</span>
            </div>
        </div>

        <div className="grid grid-cols-12 gap-2 my-2 flex-grow items-center">
            <div className="col-span-6 bg-[#0f172a] p-2 rounded-xl border border-slate-800 flex flex-col justify-between h-full">
                <div>
                    <div className="w-full h-14 bg-gradient-to-tr from-amber-600/40 via-emerald-600/20 to-slate-800 rounded-lg mb-1.5 flex items-center justify-center text-xl">
                        🥩
                    </div>
                    <span className="font-bold text-white text-[11px] block truncate">Prime Dining Special</span>
                </div>
                <div className="flex items-center justify-between mt-1 pt-1 border-t border-slate-800/80">
                    <span className="font-bold text-emerald-400 text-xs">$24.00</span>
                    <span className="text-[9px] bg-emerald-500 text-slate-950 px-2 py-0.5 rounded font-bold">QR Order</span>
                </div>
            </div>

            <div className="col-span-6 bg-[#0f172a] p-2 rounded-xl border border-slate-800 flex flex-col justify-between h-full">
                <div>
                    <div className="w-full h-14 bg-gradient-to-tr from-orange-600/40 via-red-600/20 to-slate-800 rounded-lg mb-1.5 flex items-center justify-center text-xl">
                        🥗
                    </div>
                    <span className="font-bold text-white text-[11px] block truncate">Mediterranean Salad</span>
                </div>
                <div className="flex items-center justify-between mt-1 pt-1 border-t border-slate-800/80">
                    <span className="font-bold text-emerald-400 text-xs">$14.50</span>
                    <span className="text-[9px] bg-emerald-500 text-slate-950 px-2 py-0.5 rounded font-bold">QR Order</span>
                </div>
            </div>
        </div>

        <div className="flex items-center justify-between text-[9px] bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-1 rounded-lg text-emerald-300">
            <div className="flex items-center gap-1.5">
                <CheckCircle2 size={12} className="text-emerald-400" />
                <span>Contactless Ordering Active</span>
            </div>
            <span className="font-bold text-emerald-400 uppercase text-[8px]">
                Ready
            </span>
        </div>
    </div>
);

const KidssomingAndroidPreview = () => (
    <div className="w-full h-full bg-[#0d1424] text-slate-200 p-4 select-none flex flex-col justify-between font-sans overflow-hidden">
        <div className="my-auto text-center space-y-2">
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[9px] font-bold">
                ⭐ Interactive Phonics & Quizzes
            </div>
            <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-14 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-xl flex flex-col items-center justify-center text-white font-black text-xl shadow-lg border border-white/20">
                    A
                </div>
                <div className="w-12 h-14 bg-gradient-to-b from-emerald-500 to-teal-600 rounded-xl flex flex-col items-center justify-center text-white font-black text-xl shadow-lg border border-white/20">
                    B
                </div>
                <div className="w-12 h-14 bg-gradient-to-b from-purple-500 to-pink-600 rounded-xl flex flex-col items-center justify-center text-white font-black text-xl shadow-lg border border-white/20">
                    C
                </div>
            </div>
        </div>

        <div className="flex items-center justify-between text-[9px] bg-slate-900/80 px-2 py-1 rounded-lg border border-slate-800 text-slate-400">
            <span>🔊 SoundPool Audio</span>
            <span className="text-emerald-400 font-bold">Offline Room DB</span>
        </div>
    </div>
);

// --- Master Project Preview Component (No Fake Browser Frames) ---

export const ProjectDeviceMockup = ({ project, className = "" }) => {
    const [imgError, setImgError] = React.useState(false);
    const rawImageUrl = project.image_url || project.imageUrl;
    const displayImage = rawImageUrl ? getDisplayImageUrl(rawImageUrl) : null;
    const hasCustomImage = Boolean(displayImage && !displayImage.includes('data:image/svg'));

    const renderCustomScreen = () => {
        const id = Number(project.id);
        const titleAndSlug = `${project.slug || ''} ${project.title || ''}`.toLowerCase();

        // 1. Kids learning app check
        if (titleAndSlug.includes('kid') || titleAndSlug.includes('learn') || titleAndSlug.includes('kg') || id === 4) {
            return <KidssomingAndroidPreview />;
        }
        // 2. QR Studio check
        if (titleAndSlug.includes('qr') || id === 1) {
            return <QrStudioPreview />;
        }
        // 3. Tourism check
        if (titleAndSlug.includes('tour') || titleAndSlug.includes('sentiment') || titleAndSlug.includes('wolaita') || titleAndSlug.includes('wolkite') || id === 2) {
            return <TourismSystemPreview />;
        }
        // 4. Digital Menu check
        if (titleAndSlug.includes('menu') || titleAndSlug.includes('restaurant') || titleAndSlug.includes('hotel') || titleAndSlug.includes('dining') || id === 3) {
            return <DigitalMenuPreview />;
        }
        // 5. Weekly Report check
        if (titleAndSlug.includes('report') || titleAndSlug.includes('weekly') || titleAndSlug.includes('automation') || id === 5) {
            return <WeeklyReportPreview />;
        }

        return <KidssomingAndroidPreview />;
    };

    return (
        <div className={`relative w-full group overflow-hidden ${className}`}>
            {/* Clean, Frame-Free Image Container */}
            <div className="relative bg-[#070b14] rounded-2xl overflow-hidden border border-slate-800/80 h-64 sm:h-72 md:h-80 w-full flex items-center justify-center transition-all duration-500 group-hover:border-emerald-500/40">
                {hasCustomImage && !imgError ? (
                    <div className="relative w-full h-full flex items-center justify-center bg-[#070b14] overflow-hidden">
                        <img
                            src={displayImage}
                            alt={project.title}
                            referrerPolicy="no-referrer"
                            loading="lazy"
                            onError={() => setImgError(true)}
                            className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 opacity-95 group-hover:opacity-100"
                        />
                    </div>
                ) : (
                    <div className="w-full h-full transform group-hover:scale-[1.02] transition-transform duration-700">
                        {renderCustomScreen()}
                    </div>
                )}

                {/* Floating Frosted Glass Overlay Badge on Image */}
                <div className="absolute bottom-3 left-3 z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0a101f]/85 backdrop-blur-md border border-slate-700/80 text-white text-[11px] font-bold shadow-lg shadow-black/50 group-hover:border-emerald-500/50 transition-colors">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="tracking-wider uppercase text-emerald-300">
                            {project.liveBadge || (project.category ? project.category : "LIVE SYSTEM")}
                        </span>
                    </div>
                </div>

                {/* Hover Quick Action Indicator */}
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                    <div className="bg-emerald-500 text-slate-950 font-bold px-4 py-2 rounded-full shadow-xl flex items-center gap-2 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300 text-xs">
                        <span>VIEW DETAILS</span>
                        <ArrowUpRight size={16} className="stroke-[2.5]" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDeviceMockup;
