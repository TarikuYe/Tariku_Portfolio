import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Gavel, Copyright, AlertCircle, Mail } from 'lucide-react';

const TermsOfService = () => {
    return (
        <div className="bg-dark-darker min-h-screen">
            <Navbar />
            <section className="pt-32 pb-20 relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="mb-12">
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                                Terms of <span className="text-primary">Service</span>
                            </h1>
                            <p className="text-slate-400 text-lg">
                                Last updated: February 13, 2026
                            </p>
                        </div>

                        <div className="prose prose-invert max-w-none space-y-12">
                            <section>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                        <Gavel size={20} />
                                    </div>
                                    <h2 className="text-2xl font-semibold text-white m-0">Acceptance of Terms</h2>
                                </div>
                                <p className="text-slate-400 leading-relaxed">
                                    By accessing this website, you are agreeing to be bound by these Terms of Service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
                                </p>
                            </section>

                            <section>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                        <Copyright size={20} />
                                    </div>
                                    <h2 className="text-2xl font-semibold text-white m-0">Intellectual Property</h2>
                                </div>
                                <p className="text-slate-400 leading-relaxed">
                                    All materials on this website, including projects, photography, and text, are the intellectual property of Tariku Negesa unless otherwise stated. You may not reproduce, distribute, or use any content for commercial purposes without prior written consent.
                                </p>
                            </section>

                            <section>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                        <AlertCircle size={20} />
                                    </div>
                                    <h2 className="text-2xl font-semibold text-white m-0">Disclaimer</h2>
                                </div>
                                <p className="text-slate-400 leading-relaxed">
                                    The materials on this website are provided on an 'as is' basis. Tariku Negesa makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability.
                                </p>
                            </section>

                            <section>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                        <Mail size={20} />
                                    </div>
                                    <h2 className="text-2xl font-semibold text-white m-0">Contact Information</h2>
                                </div>
                                <p className="text-slate-400 leading-relaxed">
                                    If you have any questions about these Terms, please contact me through the contact form on the homepage.
                                </p>
                            </section>
                        </div>
                    </div>
                </div>

                {/* Background Decorations */}
                <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-blue-500/5 blur-[120px] -z-10 animate-pulse" />
                <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-primary/5 blur-[120px] -z-10" />
            </section>
            <Footer />
        </div>
    );
};

export default TermsOfService;
