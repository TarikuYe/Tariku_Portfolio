import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, Server } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Placeholder for JWT login logic
        console.log('Login attempt:', { email, password });
        // After successful login, redirect to dashboard
        // For now, let's just navigate
        navigate('/admin/dashboard');
    };

    return (
        <div className="min-h-screen bg-dark-darker flex items-center justify-center p-6 glow-mesh">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass p-8 rounded-3xl w-full max-w-md border border-white/10"
            >
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/10 text-primary mb-4">
                        <Server size={32} />
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
                        Tariku's <span className="text-gradient">Command Center</span>
                    </h1>
                    <p className="text-slate-400">Admin Authentication Required</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" size={18} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all text-white"
                                placeholder="commander@tariku.ai"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300 ml-1">Password</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" size={18} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all text-white"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all transform hover:-translate-y-1 active:translate-y-0"
                    >
                        Access Control
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-center gap-2 text-xs text-slate-500 uppercase tracking-widest">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    Protected by JWT-based Authorization
                </div>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
