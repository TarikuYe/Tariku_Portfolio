import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-[#060a12] border-t border-slate-800/80 py-10 text-white relative">
            <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    {/* Brand */}
                    <div className="text-sm font-bold text-white tracking-tight">
                        Tariku<span className="text-emerald-400">Negesa</span>
                    </div>

                    {/* Copyright */}
                    <div className="text-center text-slate-500">
                        &copy; 2026 TARIKU NEGESA. ALL RIGHTS RESERVED.
                    </div>

                    {/* Footer Links */}
                    <div className="flex items-center gap-6">
                        <Link to="/privacy-policy" className="hover:text-emerald-400 transition-colors">
                            Privacy Policy
                        </Link>
                        <Link to="/terms-of-service" className="hover:text-emerald-400 transition-colors">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
