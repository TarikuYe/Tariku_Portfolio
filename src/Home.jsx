import Hero from './components/Hero';
import Projects from './components/Projects';
import Blog from './components/Blog';
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Home({ targetSection: initialSection }) {
    const location = useLocation();

    // Clean up any legacy hash from URL immediately (converts /#work -> /work)
    useEffect(() => {
        if (window.location.hash) {
            const hashSection = window.location.hash.replace('#', '');
            const cleanPath = hashSection === 'hero' ? '/' : `/${hashSection}`;
            window.history.replaceState(null, '', cleanPath);
        }
    }, []);

    // Handle clean section routing (/work, /services, /about, /contact)
    useEffect(() => {
        const path = location.pathname;
        const section = initialSection || (path !== '/' ? path.replace('/', '') : null);

        if (section && section !== 'hero') {
            const scrollToTarget = () => {
                const el = document.getElementById(section);
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
            const timer = setTimeout(scrollToTarget, 100);
            return () => clearTimeout(timer);
        } else if (path === '/' && !location.hash) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [initialSection, location.pathname]);

    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <Projects />
                <Services />
                <About />
                <Blog />
                <Contact />
            </main>
            <Footer />
        </>
    );
}

export default Home;
