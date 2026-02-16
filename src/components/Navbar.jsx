import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const isHomePage = location.pathname === '/';

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const navLinks = [
        { name: 'Work', to: 'work' },
        { name: 'Services', to: 'services' },
        { name: 'About', to: 'about' },
        { name: 'Blog', to: 'blog' },
        { name: 'Contact', to: 'contact' },
    ];

    const handleLogoClick = () => {
        if (isHomePage) {
            // Scroll to hero if on home page
        } else {
            navigate('/');
        }
    };

    return (
        <nav className="fixed w-full z-50 py-4 items-center">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-center bg-dark-lighter/40 backdrop-blur-lg border border-white/5 px-8 py-4 rounded-3xl shadow-2xl">
                    {isHomePage ? (
                        <ScrollLink to="hero" smooth={true} className="cursor-pointer text-xl md:text-2xl font-bold tracking-tighter text-white group z-[60]">
                            Tariku<span className="text-primary group-hover:text-secondary transition-colors">Negesa</span>
                        </ScrollLink>
                    ) : (
                        <RouterLink to="/" className="cursor-pointer text-xl md:text-2xl font-bold tracking-tighter text-white group z-[60]">
                            Tariku<span className="text-primary group-hover:text-secondary transition-colors">Negesa</span>
                        </RouterLink>
                    )}

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-12">
                        {navLinks.map((link) => (
                            isHomePage ? (
                                <ScrollLink
                                    key={link.name}
                                    to={link.to}
                                    smooth={true}
                                    spy={true}
                                    offset={-100}
                                    activeClass="text-primary font-bold"
                                    className="text-sm uppercase tracking-widest text-slate-400 hover:text-white cursor-pointer transition-all relative group"
                                >
                                    {link.name}
                                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all group-hover:w-full" />
                                </ScrollLink>
                            ) : (
                                <RouterLink
                                    key={link.name}
                                    to={`/#${link.to}`}
                                    className="text-sm uppercase tracking-widest text-slate-400 hover:text-white cursor-pointer transition-all relative group"
                                >
                                    {link.name}
                                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all group-hover:w-full" />
                                </RouterLink>
                            )
                        ))}
                        {isHomePage ? (
                            <ScrollLink
                                to="contact"
                                smooth={true}
                                className="px-6 py-2 border border-primary/50 text-primary hover:bg-primary hover:text-white transition-all rounded-full text-xs font-bold tracking-widest cursor-pointer"
                            >
                                HIRE ME
                            </ScrollLink>
                        ) : (
                            <RouterLink
                                to="/#contact"
                                className="px-6 py-2 border border-primary/50 text-primary hover:bg-primary hover:text-white transition-all rounded-full text-xs font-bold tracking-widest cursor-pointer"
                            >
                                HIRE ME
                            </RouterLink>
                        )}
                    </div>

                    {/* Mobile Toggle */}
                    <div className="md:hidden flex items-center z-[60]">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 text-white hover:bg-white/5 rounded-xl transition-all"
                            aria-label="Toggle Menu"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu (YouTube Style Sidebar) */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Overlay Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-dark-darker/60 backdrop-blur-sm z-[90] md:hidden"
                        />

                        {/* Sidebar Drawer */}
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                            className="fixed top-0 left-0 bottom-0 w-[280px] bg-dark-lighter border-r border-white/5 z-[100] md:hidden flex flex-col shadow-2xl"
                        >
                            <div className="p-6 border-b border-white/5 flex items-center gap-4">
                                {isHomePage ? (
                                    <ScrollLink to="hero" smooth={true} onClick={() => setIsOpen(false)} className="text-xl font-bold tracking-tighter text-white cursor-pointer">
                                        Tariku<span className="text-primary">Negesa</span>
                                    </ScrollLink>
                                ) : (
                                    <RouterLink to="/" onClick={() => setIsOpen(false)} className="text-xl font-bold tracking-tighter text-white">
                                        Tariku<span className="text-primary">Negesa</span>
                                    </RouterLink>
                                )}
                            </div>

                            <div className="flex-grow overflow-y-auto py-4">
                                {navLinks.map((link) => (
                                    isHomePage ? (
                                        <ScrollLink
                                            key={link.name}
                                            to={link.to}
                                            smooth={true}
                                            spy={true}
                                            offset={-100}
                                            onClick={() => setIsOpen(false)}
                                            activeClass="bg-white/5 text-primary border-r-4 border-primary"
                                            className="flex items-center px-6 py-4 text-sm font-bold uppercase tracking-widest text-slate-400 hover:bg-white/5 hover:text-white transition-all cursor-pointer"
                                        >
                                            {link.name}
                                        </ScrollLink>
                                    ) : (
                                        <RouterLink
                                            key={link.name}
                                            to={`/#${link.to}`}
                                            onClick={() => setIsOpen(false)}
                                            className="flex items-center px-6 py-4 text-sm font-bold uppercase tracking-widest text-slate-400 hover:bg-white/5 hover:text-white transition-all cursor-pointer"
                                        >
                                            {link.name}
                                        </RouterLink>
                                    )
                                ))}
                            </div>

                            <div className="p-6 mt-auto border-t border-white/5">
                                <div className="space-y-4">
                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">Quick Contact</p>
                                    <a href="mailto:tarikunegesa19@gmail.com" className="text-sm font-bold text-white hover:text-primary transition-colors block">
                                        tarikunegesa19@gmail.com
                                    </a>
                                    <div className="flex gap-4 pt-2">
                                        {[
                                            { name: 'LinkedIn', url: 'https://www.linkedin.com/in/tarikunegesa' },
                                            { name: 'Github', url: 'https://github.com/TarikuYe' }
                                        ].map(social => (
                                            <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors">
                                                {social.name}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
