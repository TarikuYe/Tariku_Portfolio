import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './Home';
import Blogs from './pages/Blogs';
import ProjectDetails from './pages/ProjectDetails';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    const homeSections = ['/work', '/services', '/about', '/contact'];
    if (!homeSections.includes(pathname)) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);
  return null;
};

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  if (!token) {
    return <Navigate to="/admin" replace />;
  }
  return children;
};

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.history.pushState(null, '', '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="bg-dark-darker min-h-screen relative text-slate-200">
        <Routes>
          <Route path="/" element={<Home targetSection="hero" />} />
          <Route path="/work" element={<Home targetSection="work" />} />
          <Route path="/services" element={<Home targetSection="services" />} />
          <Route path="/about" element={<Home targetSection="about" />} />
          <Route path="/contact" element={<Home targetSection="contact" />} />
          <Route path="/blog" element={<Blogs />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/project/:id" element={<ProjectDetails />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/admin/*" element={<Navigate to="/admin" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={scrollToTop}
              className="fixed bottom-8 right-8 p-4 bg-primary text-white rounded-2xl shadow-2xl shadow-primary/20 hover:shadow-primary/40 transition-all z-40 group"
              aria-label="Scroll to top"
            >
              <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;
