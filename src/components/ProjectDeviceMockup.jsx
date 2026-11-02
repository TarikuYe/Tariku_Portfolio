import React from 'react';
import { 
    ExternalLink, 
    Sparkles, 
    TrendingUp, 
    BarChart3, 
    FileText, 
    QrCode, 
    MapPin, 
    Utensils, 
    Smartphone, 
    Layers, 
    CheckCircle2, 
    ArrowUpRight,
    Search,
    Sliders,
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

// --- Custom Vector Screen Previews ---

const WeeklyReportPreview = () => (
    <div className="w-full h-full bg-[#0a0f1d] text-slate-300 p-3 md:p-4 select-none flex flex-col justify-between font-mono text-[11px] overflow-hidden">
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
            {/* Left summary cards */}
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
                <div className="bg-[#0f172a]/90 p-2 rounded-lg border border-slate-800 hidden sm:block">
                    <span className="text-[9px] text-slate-500 uppercase block">Extracted Anomaly</span>
                    <span className="text-xs font-bold text-cyan-400">0 Detected</span>
                </div>
            </div>

            {/* Right chart & live feed */}
            <div className="col-span-8 bg-[#0f172a]/90 p-2.5 rounded-lg border border-slate-800 flex flex-col justify-between">
                <div className="flex items-center justify-between text-[10px] text-slate-400 pb-1">
                    <span>Sentiment Classification Flow</span>
                    <span className="text-emerald-400">Sub-second Latency</span>
                </div>
                {/* SVG Area Sparkline */}
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
                {/* Simulated live rows */}
                <div className="space-y-1 pt-1 border-t border-slate-800/80 text-[9px]">
                    <div className="flex justify-between text-slate-400">
                        <span className="truncate">✓ Q3_Operations_Fin.xlsx</span>
                        <span className="text-emerald-400 font-bold">Processed (0.4s)</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                        <span className="truncate">✓ Client_Sentiment_Log.pdf</span>
                        <span className="text-emerald-400 font-bold">Processed (0.6s)</span>
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
    <div className="w-full h-full bg-[#090d18] text-slate-300 p-3 md:p-4 select-none flex flex-col justify-between font-sans overflow-hidden">
        {/* Top toolbar */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">QR</span>
                <span className="font-bold text-white text-xs tracking-tight">QR Studio Studio Workspace</span>
            </div>
            <div className="flex items-center gap-1.5">
                <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300 font-mono">SVG 4K</span>
                <span className="text-[10px] bg-emerald-500 text-slate-950 font-bold px-2 py-0.5 rounded">EXPORT</span>
            </div>
        </div>

        {/* Workspace Center */}
        <div className="grid grid-cols-12 gap-3 my-2 items-center flex-grow">
            {/* Controls Palette */}
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
                <div className="bg-[#0f172a] p-2 rounded-lg border border-slate-800">
                    <span className="text-slate-400 text-[9px] uppercase font-bold block mb-1">Corner Eye Style</span>
                    <div className="flex items-center gap-1 text-[9px] text-slate-300">
                        <span className="px-1.5 py-0.5 bg-emerald-500/20 text-emerald-300 rounded border border-emerald-500/40">Smooth</span>
                        <span className="px-1.5 py-0.5 bg-slate-800 rounded">Square</span>
                        <span className="px-1.5 py-0.5 bg-slate-800 rounded">Dots</span>
                    </div>
                </div>
                <div className="bg-[#0f172a] p-2 rounded-lg border border-slate-800 hidden sm:block">
                    <div className="flex justify-between text-[9px] text-slate-400 mb-1">
                        <span>Error Correction</span>
                        <span className="text-emerald-400 font-bold">Level H (30%)</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-emerald-400 h-full w-[85%]" />
                    </div>
                </div>
            </div>

            {/* Central Vector QR Artboard */}
            <div className="col-span-7 flex flex-col items-center justify-center">
                <div className="relative p-3 bg-white rounded-xl shadow-2xl shadow-emerald-500/10 flex items-center justify-center border-4 border-slate-900 group">
                    {/* Simulated High-Res Vector QR Code */}
                    <svg className="w-24 h-24 md:w-32 md:h-32 text-slate-900" viewBox="0 0 100 100" fill="currentColor">
                        {/* Top-Left Eye */}
                        <rect x="5" y="5" width="28" height="28" rx="6" fill="#0f172a" />
                        <rect x="9" y="9" width="20" height="20" rx="4" fill="white" />
                        <rect x="13" y="13" width="12" height="12" rx="2" fill="#10b981" />

                        {/* Top-Right Eye */}
                        <rect x="67" y="5" width="28" height="28" rx="6" fill="#0f172a" />
                        <rect x="71" y="9" width="20" height="20" rx="4" fill="white" />
                        <rect x="75" y="13" width="12" height="12" rx="2" fill="#10b981" />

                        {/* Bottom-Left Eye */}
                        <rect x="5" y="67" width="28" height="28" rx="6" fill="#0f172a" />
                        <rect x="9" y="71" width="20" height="20" rx="4" fill="white" />
                        <rect x="13" y="75" width="12" height="12" rx="2" fill="#10b981" />

                        {/* Pattern Dots */}
                        <rect x="38" y="10" width="6" height="6" rx="2" fill="#0f172a" />
                        <rect x="48" y="10" width="6" height="6" rx="2" fill="#0f172a" />
                        <rect x="38" y="22" width="6" height="6" rx="2" fill="#10b981" />
                        <rect x="54" y="22" width="6" height="6" rx="2" fill="#0f172a" />
                        <rect x="10" y="38" width="6" height="6" rx="2" fill="#0f172a" />
                        <rect x="22" y="38" width="6" height="6" rx="2" fill="#0f172a" />
                        <rect x="38" y="38" width="8" height="8" rx="3" fill="#06b6d4" />
                        <rect x="52" y="38" width="6" height="6" rx="2" fill="#0f172a" />
                        <rect x="68" y="38" width="6" height="6" rx="2" fill="#10b981" />
                        <rect x="82" y="38" width="6" height="6" rx="2" fill="#0f172a" />
                        <rect x="38" y="52" width="6" height="6" rx="2" fill="#0f172a" />
                        <rect x="52" y="52" width="6" height="6" rx="2" fill="#10b981" />
                        <rect x="68" y="52" width="6" height="6" rx="2" fill="#0f172a" />
                        <rect x="82" y="52" width="6" height="6" rx="2" fill="#0f172a" />
                        <rect x="38" y="68" width="6" height="6" rx="2" fill="#0f172a" />
                        <rect x="52" y="68" width="6" height="6" rx="2" fill="#0f172a" />
                        <rect x="68" y="68" width="6" height="6" rx="2" fill="#10b981" />
                        <rect x="82" y="68" width="6" height="6" rx="2" fill="#0f172a" />
                        <rect x="38" y="82" width="6" height="6" rx="2" fill="#10b981" />
                        <rect x="52" y="82" width="6" height="6" rx="2" fill="#0f172a" />
                        <rect x="68" y="82" width="6" height="6" rx="2" fill="#0f172a" />
                        <rect x="82" y="82" width="6" height="6" rx="2" fill="#10b981" />
                    </svg>

                    {/* Central embedded brand badge */}
                    <div className="absolute w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#0a0f1d] border-2 border-white flex items-center justify-center text-emerald-400 font-black text-[9px] shadow-md">
                        TN
                    </div>
                </div>
            </div>
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between text-[9px] text-slate-500 pt-1 border-t border-slate-800">
            <span>Dynamic URL: qr.studio/tariku-portfolio</span>
            <span className="text-emerald-400">Scans: 4,892 (Real-time Sync)</span>
        </div>
    </div>
);

const TourismSystemPreview = () => (
    <div className="w-full h-full bg-[#070b14] text-slate-300 p-3 md:p-4 select-none flex flex-col justify-between font-sans overflow-hidden">
        {/* Top nav */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-white text-xs">Wolkite Tourism GIS & Sentiment Dashboard</span>
            </div>
            <div className="flex items-center gap-1.5 text-[9px] bg-slate-800/80 px-2 py-0.5 rounded text-emerald-400 font-mono">
                <span>ONLINE PORTAL</span>
            </div>
        </div>

        {/* GIS & Telemetry Center */}
        <div className="grid grid-cols-12 gap-2.5 my-2 flex-grow items-center">
            {/* Left destination list */}
            <div className="col-span-5 space-y-1.5 text-[10px]">
                <div className="bg-[#0e1628] p-2 rounded-lg border border-slate-800">
                    <div className="flex justify-between items-center">
                        <span className="font-bold text-white">Gubre Hot Springs</span>
                        <span className="text-emerald-400 text-[9px] font-bold">96% Pos</span>
                    </div>
                    <span className="text-[9px] text-slate-400">120+ Verified Reviews</span>
                </div>
                <div className="bg-[#0e1628] p-2 rounded-lg border border-slate-800">
                    <div className="flex justify-between items-center">
                        <span className="font-bold text-white">Gurage Cultural Center</span>
                        <span className="text-emerald-400 text-[9px] font-bold">92% Pos</span>
                    </div>
                    <span className="text-[9px] text-slate-400">85+ Verified Reviews</span>
                </div>
                <div className="bg-[#0e1628] p-2 rounded-lg border border-slate-800 hidden sm:block">
                    <div className="flex justify-between items-center">
                        <span className="font-bold text-white">Wabe Shebelle Lodge</span>
                        <span className="text-cyan-400 text-[9px] font-bold">88% Pos</span>
                    </div>
                    <span className="text-[9px] text-slate-400">210+ Bookings</span>
                </div>
            </div>

            {/* Right Map GIS Simulation */}
            <div className="col-span-7 bg-[#0b1222] p-2.5 rounded-lg border border-slate-800 relative h-full flex flex-col justify-between overflow-hidden">
                <div className="flex justify-between items-center text-[9px] text-slate-400 z-10">
                    <span>GIS Satellite Layer</span>
                    <span className="text-emerald-400 font-mono">BERT-NLP ACTIVE</span>
                </div>

                {/* Simulated Map Grid */}
                <div className="relative w-full h-20 md:h-24 bg-[#080d19] rounded-md border border-slate-800/80 my-1 overflow-hidden flex items-center justify-center">
                    {/* Grid lines */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b22_1px,transparent_1px),linear-gradient(to_bottom,#1e293b22_1px,transparent_1px)] bg-[size:16px_16px]" />
                    
                    {/* Glowing Route Line */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 100">
                        <path d="M 20 80 Q 80 20 120 50 T 180 30" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="4 2" />
                        <circle cx="20" cy="80" r="4" fill="#06b6d4" />
                        <circle cx="120" cy="50" r="4" fill="#10b981" />
                        <circle cx="180" cy="30" r="5" fill="#10b981" className="animate-ping opacity-75" />
                        <circle cx="180" cy="30" r="4" fill="#10b981" />
                    </svg>

                    {/* Floating Radar Pin */}
                    <div className="relative z-10 bg-slate-900/90 border border-emerald-500/50 px-2 py-1 rounded text-[9px] text-white flex items-center gap-1.5 shadow-lg">
                        <MapPin size={10} className="text-emerald-400" />
                        <span>Wolkite Destination Hub</span>
                    </div>
                </div>

                <div className="flex justify-between text-[9px] text-slate-500">
                    <span>Multilingual Support: Amharic / English</span>
                    <span className="text-emerald-400 font-bold">17+ Active Sites</span>
                </div>
            </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-[9px] text-slate-500 pt-1 border-t border-slate-800">
            <span>Client: Wolkite Municipality Tourism Bureau</span>
            <span className="text-slate-400">Web Portal + Android App</span>
        </div>
    </div>
);

const DigitalMenuPreview = () => (
    <div className="w-full h-full bg-[#0a0d17] text-slate-200 p-3 md:p-4 select-none flex flex-col justify-between font-sans overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
                <Utensils className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-white text-xs">Gourmet Bistro & Lounge — Table #08</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                <span>LIVE KITCHEN SYNC</span>
            </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 my-1.5 text-[10px]">
            <span className="px-2.5 py-0.5 bg-emerald-500 text-slate-950 font-bold rounded-full">All Meals</span>
            <span className="px-2.5 py-0.5 bg-slate-800 text-slate-300 rounded-full">Chef's Special</span>
            <span className="px-2.5 py-0.5 bg-slate-800 text-slate-300 rounded-full">Beverages</span>
            <span className="px-2.5 py-0.5 bg-slate-800 text-slate-300 rounded-full hidden sm:inline">Desserts</span>
        </div>

        {/* Menu Items Cards Grid */}
        <div className="grid grid-cols-12 gap-2 my-1 flex-grow items-center">
            {/* Dish Card 1 */}
            <div className="col-span-6 bg-[#0f172a] p-2 rounded-xl border border-slate-800 flex flex-col justify-between h-full">
                <div>
                    <div className="w-full h-12 md:h-14 bg-gradient-to-tr from-amber-600/40 via-emerald-600/20 to-slate-800 rounded-lg mb-1.5 relative overflow-hidden flex items-center justify-center">
                        <span className="text-xl">🥩</span>
                        <span className="absolute top-1 right-1 text-[8px] bg-emerald-500 text-slate-950 px-1 py-0.2 rounded font-bold">BEST</span>
                    </div>
                    <span className="font-bold text-white text-[11px] block truncate">Prime Tenderloin Steak</span>
                    <span className="text-[9px] text-slate-400 block truncate">Rosemary garlic jus, truffle mash</span>
                </div>
                <div className="flex items-center justify-between mt-1 pt-1 border-t border-slate-800/80">
                    <span className="font-bold text-emerald-400 text-xs">$24.00</span>
                    <span className="text-[9px] bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-white px-2 py-0.5 rounded font-bold cursor-pointer">+ Add</span>
                </div>
            </div>

            {/* Dish Card 2 */}
            <div className="col-span-6 bg-[#0f172a] p-2 rounded-xl border border-slate-800 flex flex-col justify-between h-full">
                <div>
                    <div className="w-full h-12 md:h-14 bg-gradient-to-tr from-orange-600/40 via-red-600/20 to-slate-800 rounded-lg mb-1.5 relative overflow-hidden flex items-center justify-center">
                        <span className="text-xl">🥗</span>
                        <span className="absolute top-1 right-1 text-[8px] bg-cyan-500 text-slate-950 px-1 py-0.2 rounded font-bold">VEGAN</span>
                    </div>
                    <span className="font-bold text-white text-[11px] block truncate">Mediterranean Bowl</span>
                    <span className="text-[9px] text-slate-400 block truncate">Crisp greens, avocado, quinoa</span>
                </div>
                <div className="flex items-center justify-between mt-1 pt-1 border-t border-slate-800/80">
                    <span className="font-bold text-emerald-400 text-xs">$14.50</span>
                    <span className="text-[9px] bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-white px-2 py-0.5 rounded font-bold cursor-pointer">+ Add</span>
                </div>
            </div>
        </div>

        {/* Bottom Live Order Drawer */}
        <div className="flex items-center justify-between text-[9px] bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-1.5 rounded-lg text-emerald-300">
            <div className="flex items-center gap-1.5">
                <CheckCircle2 size={12} className="text-emerald-400" />
                <span>Current Order: 3 Items ($52.50)</span>
            </div>
            <span className="font-bold text-white uppercase text-[8px] tracking-wider bg-emerald-500 text-slate-950 px-2 py-0.5 rounded">
                Send to Kitchen
            </span>
        </div>
    </div>
);

const KidssomingAndroidPreview = () => (
    <div className="w-full h-full bg-[#0d1424] text-slate-200 p-3 select-none flex flex-col justify-between font-sans overflow-hidden">
        {/* Android status bar */}
        <div className="flex items-center justify-between text-[8px] text-slate-400 pb-1 border-b border-slate-800">
            <span>09:41</span>
            <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>100%</span>
            </div>
        </div>

        {/* Fun Educational Center */}
        <div className="my-auto text-center space-y-2">
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[9px] font-bold">
                ⭐ 150 Stars Collected!
            </div>
            <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-14 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-xl flex flex-col items-center justify-center text-white font-black text-xl shadow-lg border border-white/20">
                    A
                    <span className="text-[8px] font-normal opacity-80">Apple</span>
                </div>
                <div className="w-12 h-14 bg-gradient-to-b from-emerald-500 to-teal-600 rounded-xl flex flex-col items-center justify-center text-white font-black text-xl shadow-lg border border-white/20">
                    B
                    <span className="text-[8px] font-normal opacity-80">Ball</span>
                </div>
                <div className="w-12 h-14 bg-gradient-to-b from-purple-500 to-pink-600 rounded-xl flex flex-col items-center justify-center text-white font-black text-xl shadow-lg border border-white/20">
                    C
                    <span className="text-[8px] font-normal opacity-80">Cat</span>
                </div>
            </div>
            <div className="text-[10px] font-medium text-slate-300">
                Phonics & Audio Tracing Level 2
            </div>
        </div>

        {/* Bottom Audio Play indicator */}
        <div className="flex items-center justify-between text-[9px] bg-slate-900/80 px-2 py-1 rounded-lg border border-slate-800 text-slate-400">
            <span>🔊 SoundPool Active</span>
            <span className="text-emerald-400 font-bold">Offline Room DB</span>
        </div>
    </div>
);

// --- Master Project Device Mockup Component ---

export const ProjectDeviceMockup = ({ project, className = "" }) => {
    const [imgError, setImgError] = React.useState(false);
    const rawImageUrl = project.image_url || project.imageUrl;
    const displayImage = rawImageUrl ? getDisplayImageUrl(rawImageUrl) : null;
    const hasCustomImage = Boolean(displayImage && !displayImage.includes('data:image/svg'));

    // Determine custom visual preview based on project ID or title/slug
    const renderCustomScreen = () => {
        const id = Number(project.id);
        const slug = (project.slug || project.title || '').toLowerCase();

        if (id === 1 || slug.includes('weekly') || slug.includes('report') || slug.includes('automation')) {
            return <WeeklyReportPreview />;
        }
        if (id === 2 || slug.includes('qr') || slug.includes('generator')) {
            return <QrStudioPreview />;
        }
        if (id === 3 || slug.includes('tourism') || slug.includes('sentiment') || slug.includes('wolkite')) {
            return <TourismSystemPreview />;
        }
        if (id === 4 || slug.includes('menu') || slug.includes('restaurant') || slug.includes('hotel')) {
            return <DigitalMenuPreview />;
        }
        if (id === 5 || slug.includes('kids') || slug.includes('android') || slug.includes('kg')) {
            return <KidssomingAndroidPreview />;
        }
        return <WeeklyReportPreview />;
    };

    const getSimulatedUrl = () => {
        const id = Number(project.id);
        const slug = (project.slug || project.title || '').toLowerCase();
        if (id === 1 || slug.includes('report')) return 'https://automation.tariku.dev/analytics';
        if (id === 2 || slug.includes('qr')) return 'https://qrstudio.app/workspace';
        if (id === 3 || slug.includes('tourism')) return 'https://tourism.wolkite.gov.et/portal';
        if (id === 4 || slug.includes('menu')) return 'https://menu.gourmetbistro.com/table/08';
        if (id === 5 || slug.includes('kids')) return 'com.tariku.kidssoming.app';
        return 'https://app.tariku.dev';
    };

    return (
        <div className={`relative w-full group overflow-hidden ${className}`}>
            {/* Ambient Background Aura Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-emerald-500/5 rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            {/* Laptop / Display Chassis */}
            <div className="relative bg-[#0d1424] border border-slate-700/60 rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 group-hover:border-emerald-500/50 group-hover:shadow-emerald-500/10">
                {/* Browser Titlebar */}
                <div className="bg-[#090d18] px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
                    {/* Traffic Lights */}
                    <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                    </div>

                    {/* Address pill */}
                    <div className="bg-[#121a2d] border border-slate-800 text-slate-400 text-[10px] px-3 py-1 rounded-full flex items-center gap-1.5 max-w-[220px] sm:max-w-xs truncate font-mono">
                        <span className="text-emerald-400">🔒</span>
                        <span className="truncate">{getSimulatedUrl()}</span>
                    </div>

                    {/* Right window actions */}
                    <div className="flex items-center gap-2 text-slate-500">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                    </div>
                </div>

                {/* Device Screen Canvas */}
                <div className="relative h-60 sm:h-64 md:h-72 w-full overflow-hidden bg-slate-950">
                    {hasCustomImage && !imgError ? (
                        <div className="relative w-full h-full">
                            <img
                                src={displayImage}
                                alt={project.title}
                                referrerPolicy="no-referrer"
                                loading="lazy"
                                onError={() => setImgError(true)}
                                className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700 opacity-95 group-hover:opacity-100"
                            />
                            {/* Inner Glass Glare Line */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent pointer-events-none" />
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
        </div>
    );
};

export default ProjectDeviceMockup;

