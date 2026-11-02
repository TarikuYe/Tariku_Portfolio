import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const location = useLocation();
    const navigate = useNavigate();

    const homePaths = ['/', '/work', '/services', '/about', '/contact'];
    const isHomePage = homePaths.includes(location.pathname);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
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

    // Active link highlighting & clean URL update on scroll
    useEffect(() => {
        if (!isHomePage) {
            if (location.pathname === '/blog') {
                setActiveSection('blog');
            }
            return;
        }

        const sections = ['hero', 'work', 'services', 'about', 'contact'];
        const handleScrollSpy = () => {
            const scrollPosition = window.scrollY + 180;
            for (let i = sections.length - 1; i >= 0; i--) {
                const el = document.getElementById(sections[i]);
                if (el && el.offsetTop <= scrollPosition) {
                    setActiveSection(sections[i]);
                    const cleanPath = sections[i] === 'hero' ? '/' : `/${sections[i]}`;
                    if (window.location.pathname !== cleanPath && !window.location.pathname.startsWith('/projects') && !window.location.pathname.startsWith('/blog') && !window.location.pathname.startsWith('/admin')) {
                        window.history.replaceState(null, '', cleanPath);
                    }
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScrollSpy, { passive: true });
        handleScrollSpy();
        return () => window.removeEventListener('scroll', handleScrollSpy);
    }, [isHomePage, location.pathname]);

    const navLinks = [
        { name: 'Work', path: '/work', sectionId: 'work' },
        { name: 'Services', path: '/services', sectionId: 'services' },
        { name: 'About', path: '/about', sectionId: 'about' },
        { name: 'Blog', path: '/blog', sectionId: 'blog' },
        { name: 'Contact', path: '/contact', sectionId: 'contact' },
    ];

    const scrollToSectionId = (sectionId) => {
        const el = document.getElementById(sectionId);
        if (el) {
            const offset = 80;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = el.getBoundingClientRect().top;
            const offsetPosition = elementRect - bodyRect - offset;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    const handleNavClick = (link, e) => {
        if (e) e.preventDefault();
        setIsOpen(false);

        if (link.path === '/blog') {
            navigate('/blog');
            return;
        }

        if (isHomePage) {
            window.history.pushState(null, '', link.path);
            scrollToSectionId(link.sectionId);
        } else {
            navigate(link.path);
        }
    };

    const handleLogoClick = (e) => {
        if (e) e.preventDefault();
        setIsOpen(false);
        if (isHomePage) {
            window.history.pushState(null, '', '/');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            navigate('/');
        }
    };

    const handleContactClick = (e) => {
        if (e) e.preventDefault();
        setIsOpen(false);
        if (isHomePage) {
            window.history.pushState(null, '', '/contact');
            scrollToSectionId('contact');
        } else {
            navigate('/contact');
        }
    };

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'py-3' : 'py-5'}`}>
            <div className="container mx-auto px-4 md:px-8 max-w-7xl">
                <div className="flex justify-between items-center bg-[#0d1424]/85 backdrop-blur-xl border border-slate-800/80 px-6 md:px-8 py-3.5 rounded-full shadow-2xl shadow-black/50">
                    {/* Brand Logo */}
                    <Link
                        to="/"
                        onClick={handleLogoClick}
                        className="cursor-pointer text-lg md:text-xl font-bold tracking-tight text-white group flex items-center gap-1.5"
                    >
                        <span className="font-extrabold tracking-tight">Tariku</span>
                        <span className="text-emerald-400 group-hover:text-emerald-300 transition-colors font-medium">Negesa</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    </Link>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8 lg:space-x-10">
                        {navLinks.map((link) => {
                            const isActive = isHomePage
                                ? activeSection === link.sectionId
                                : location.pathname === link.path;

                            return (
                                <a
                                    key={link.name}
                                    href={link.path}
                                    onClick={(e) => handleNavClick(link, e)}
                                    className={`text-sm font-medium transition-all relative group cursor-pointer ${
                                        isActive ? 'text-emerald-400 font-semibold' : 'text-slate-300 hover:text-white'
                                    }`}
                                >
                                    {link.name}
                                    <span
                                        className={`absolute -bottom-1 left-0 h-[2px] bg-emerald-400 transition-all duration-300 ${
                                            isActive ? 'w-full' : 'w-0 group-hover:w-full'
                                        }`}
                                    />
                                </a>
                            );
                        })}
                    </div>

                    {/* Right Action CTA Pill */}
                    <div className="hidden md:flex items-center">
                        <button
                            onClick={handleContactClick}
                            className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-full shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all duration-300 flex items-center gap-1.5 cursor-pointer active:scale-95"
                        >
                            LET'S TALK
                            <ArrowUpRight size={14} />
                        </button>
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
                                <span className="text-lg font-bold text-white flex items-center gap-1">
                                    Tariku<span className="text-emerald-400">Negesa</span>
                                </span>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 bg-slate-800/50 rounded-full text-slate-300 hover:text-white"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="flex-grow py-8 space-y-4">
                                {navLinks.map((link) => {
                                    const isActive = isHomePage
                                        ? activeSection === link.sectionId
                                        : location.pathname === link.path;

                                    return (
                                        <a
                                            key={link.name}
                                            href={link.path}
                                            onClick={(e) => handleNavClick(link, e)}
                                            className={`block px-4 py-3 text-base font-medium rounded-xl transition-all cursor-pointer ${
                                                isActive
                                                    ? 'text-emerald-400 bg-emerald-500/10 font-bold'
                                                    : 'text-slate-300 hover:text-emerald-400 hover:bg-slate-800/40'
                                            }`}
                                        >
                                            {link.name}
                                        </a>
                                    );
                                })}
                            </div>

                            <div className="pt-6 border-t border-slate-800">
                                <button
                                    onClick={handleContactClick}
                                    className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-center rounded-xl block shadow-lg shadow-emerald-500/20"
                                >
                                    LET'S TALK
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
