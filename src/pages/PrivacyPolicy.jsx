import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ShieldCheck, Eye, Lock, FileText } from 'lucide-react';

const PrivacyPolicy = () => {
    return (
        <div className="bg-dark-darker min-h-screen">
            <Navbar />
            <section className="pt-32 pb-20 relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="mb-12">
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                                Privacy <span className="text-primary">Policy</span>
                            </h1>
                            <p className="text-slate-400 text-lg">
                                Last updated: February 13, 2026
                            </p>
                        </div>

                        <div className="prose prose-invert max-w-none space-y-12">
                            <section>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                        <Eye size={20} />
                                    </div>
                                    <h2 className="text-2xl font-semibold text-white m-0">Information We Collect</h2>
                                </div>
                                <p className="text-slate-400 leading-relaxed">
                                    I only collect information that you voluntarily provide when using the contact form or reaching out via email. This may include your name, email address, and any message you send. This information is used solely to respond to your inquiries.
                                </p>
                            </section>

                            <section>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                        <ShieldCheck size={20} />
                                    </div>
                                    <h2 className="text-2xl font-semibold text-white m-0">How Your Data is Used</h2>
                                </div>
                                <p className="text-slate-400 leading-relaxed">
                                    The data I collect is strictly used for professional communication. I do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. Your information helps me provide better service and response to your needs.
                                </p>
                            </section>

                            <section>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                        <Lock size={20} />
                                    </div>
                                    <h2 className="text-2xl font-semibold text-white m-0">Data Security</h2>
                                </div>
                                <p className="text-slate-400 leading-relaxed">
                                    I implement appropriate security measures to maintain the safety of your personal information. However, please note that no method of transmission over the internet is 100% secure, and I cannot guarantee absolute security.
                                </p>
                            </section>

                            <section>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                        <FileText size={20} />
                                    </div>
                                    <h2 className="text-2xl font-semibold text-white m-0">Your Rights</h2>
                                </div>
                                <p className="text-slate-400 leading-relaxed">
                                    You have the right to request access to the personal data I hold about you, to request corrections, or to ask for your data to be deleted. To exercise these rights, please contact me through the contact information provided on this website.
                                </p>
                            </section>
                        </div>
                    </div>
                </div>

                {/* Background Decorations */}
                <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 blur-[120px] -z-10 animate-pulse" />
                <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-500/5 blur-[120px] -z-10" />
            </section>
            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
