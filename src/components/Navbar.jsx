import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const isHomePage = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'py-3' : 'py-5'}`}>
            <div className="container mx-auto px-4 md:px-8 max-w-7xl">
                <div className="flex justify-between items-center bg-[#0d1424]/80 backdrop-blur-xl border border-slate-800/80 px-6 md:px-8 py-3.5 rounded-full shadow-2xl shadow-black/50">
                    {/* Brand Logo */}
                    {isHomePage ? (
                        <ScrollLink to="hero" smooth={true} className="cursor-pointer text-lg md:text-xl font-bold tracking-tight text-white group flex items-center gap-1">
                            Tariku<span className="text-emerald-400 group-hover:text-emerald-300 transition-colors">Projects</span>
                        </ScrollLink>
                    ) : (
                        <RouterLink to="/" className="cursor-pointer text-lg md:text-xl font-bold tracking-tight text-white group flex items-center gap-1">
                            Tariku<span className="text-emerald-400 group-hover:text-emerald-300 transition-colors">Projects</span>
                        </RouterLink>
                    )}

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8 lg:space-x-10">
                        {navLinks.map((link) => (
                            isHomePage ? (
                                <ScrollLink
                                    key={link.name}
                                    to={link.to}
                                    smooth={true}
                                    spy={true}
                                    offset={-90}
                                    activeClass="text-emerald-400 font-semibold"
                                    className="text-sm font-medium text-slate-300 hover:text-white cursor-pointer transition-all relative group"
                                >
                                    {link.name}
                                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-emerald-400 transition-all duration-300 group-hover:w-full" />
                                </ScrollLink>
                            ) : (
                                <RouterLink
                                    key={link.name}
                                    to={`/#${link.to}`}
                                    className="text-sm font-medium text-slate-300 hover:text-white cursor-pointer transition-all relative group"
                                >
                                    {link.name}
                                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-emerald-400 transition-all duration-300 group-hover:w-full" />
                                </RouterLink>
                            )
                        ))}
                    </div>

                    {/* Right Hire Me CTA */}
                    <div className="hidden md:flex items-center">
                        {isHomePage ? (
                            <ScrollLink
                                to="contact"
                                smooth={true}
                                className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-full shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all duration-300 flex items-center gap-1.5 cursor-pointer active:scale-95"
                            >
                                HIRE ME
                                <ArrowUpRight size={14} />
                            </ScrollLink>
                        ) : (
                            <RouterLink
                                to="/#contact"
                                className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-full shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all duration-300 flex items-center gap-1.5 cursor-pointer active:scale-95"
                            >
                                HIRE ME
                                <ArrowUpRight size={14} />
                            </RouterLink>
                        )}
                    </div>

                    {/* Mobile Hamburger Toggle */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 text-slate-300 hover:text-white rounded-xl transition-all"
                            aria-label="Toggle Navigation"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[90] md:hidden"
                        />

                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 bottom-0 w-[300px] bg-[#090e1a] border-l border-slate-800 z-[100] md:hidden flex flex-col p-6 shadow-2xl"
                        >
                            <div className="flex justify-between items-center pb-6 border-b border-slate-800">
                                <span className="text-lg font-bold text-white">
                                    Tariku<span className="text-emerald-400">Projects</span>
                                </span>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 bg-slate-800/50 rounded-full text-slate-300 hover:text-white"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="flex-grow py-8 space-y-4">
                                {navLinks.map((link) => (
                                    isHomePage ? (
                                        <ScrollLink
                                            key={link.name}
                                            to={link.to}
                                            smooth={true}
                                            spy={true}
                                            offset={-90}
                                            onClick={() => setIsOpen(false)}
                                            className="block px-4 py-3 text-base font-medium text-slate-300 hover:text-emerald-400 hover:bg-slate-800/40 rounded-xl transition-all cursor-pointer"
                                        >
                                            {link.name}
                                        </ScrollLink>
                                    ) : (
                                        <RouterLink
                                            key={link.name}
                                            to={`/#${link.to}`}
                                            onClick={() => setIsOpen(false)}
                                            className="block px-4 py-3 text-base font-medium text-slate-300 hover:text-emerald-400 hover:bg-slate-800/40 rounded-xl transition-all cursor-pointer"
                                        >
                                            {link.name}
                                        </RouterLink>
                                    )
                                ))}
                            </div>

                            <div className="pt-6 border-t border-slate-800">
                                {isHomePage ? (
                                    <ScrollLink
                                        to="contact"
                                        smooth={true}
                                        onClick={() => setIsOpen(false)}
                                        className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-center rounded-xl block shadow-lg shadow-emerald-500/20"
                                    >
                                        HIRE ME
                                    </ScrollLink>
                                ) : (
                                    <RouterLink
                                        to="/#contact"
                                        onClick={() => setIsOpen(false)}
                                        className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-center rounded-xl block shadow-lg shadow-emerald-500/20"
                                    >
                                        HIRE ME
                                    </RouterLink>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
