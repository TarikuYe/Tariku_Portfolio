import { Github, Linkedin, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-dark-darker border-t border-white/5 py-12 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
                    <div>
                        <span className="text-2xl font-bold tracking-tighter text-white">
                            Tariku<span className="text-primary">Negesa</span>
                        </span>
                        <p className="text-slate-500 mt-2 text-sm max-w-xs">
                            Beautiful digital products with a focus on performance and accessibility.
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        {[
                            { icon: Linkedin, href: "https://www.linkedin.com/in/tarikunegesa" },
                            { icon: Github, href: "https://github.com/TarikuYe" }
                            // { icon: Twitter, href: "#" }
                        ].map((social, i) => (
                            <a
                                key={i}
                                href={social.href}
                                className="w-10 h-10 rounded-lg border border-white/5 flex items-center justify-center text-slate-500 hover:text-primary hover:border-primary transition-all"
                            >
                                <social.icon size={18} />
                            </a>
                        ))}
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] text-slate-600">
                    <p>&copy; 2026 Tariku Negesa. All rights reserved.</p>
                    <div className="flex gap-8">
                        <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>

            {/* Ambient Glow */}
            <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-full max-w-4xl h-40 bg-primary/5 blur-[100px] pointer-events-none" />
        </footer>
    );
};

export default Footer;

