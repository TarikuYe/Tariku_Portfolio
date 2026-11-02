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
import { scroller } from 'react-scroll';

function Home() {
    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const section = hash.replace('#', '');
            const targetEl = document.getElementById(section);
            if (targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth' });
            } else {
                setTimeout(() => {
                    const el = document.getElementById(section);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }, [hash]);

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
