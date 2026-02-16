import Hero from './components/Hero';
import TechStackStrip from './components/TechStackStrip';
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
            scroller.scrollTo(section, {
                duration: 800,
                delay: 0,
                smooth: 'easeInOutQuart',
                offset: -100
            });
        }
    }, [hash]);

    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <TechStackStrip />
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
