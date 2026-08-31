import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2, ArrowUpRight } from 'lucide-react';

const Contact = () => {
    const formRef = useRef();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(formRef.current);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message'),
        };

        try {
            const response = await fetch('/api/inquiries', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setSuccess(true);
                formRef.current.reset();
                setTimeout(() => setSuccess(false), 5000);
            }
        } catch (error) {
            console.error('Submission error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="py-24 bg-[#060a12] text-white relative">
            <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl">
                {/* Headline Header */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 leading-tight"
                    >
                        Let's build an intelligent solution <span className="text-emerald-400">together.</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-slate-400 text-base md:text-lg"
                    >
                        Ready to elevate your digital presence? Send a message.
                    </motion.p>
                </div>

                {/* 2 Column Contact Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
                    {/* Left Column: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-7 bg-[#0b1322] border border-slate-800 rounded-3xl p-8 md:p-10"
                    >
                        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400">YOUR NAME</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        className="w-full bg-[#121c2e] border border-slate-700/80 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-emerald-400 transition-colors text-sm"
                                        placeholder="Alex Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400">EMAIL ADDRESS</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        className="w-full bg-[#121c2e] border border-slate-700/80 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-emerald-400 transition-colors text-sm"
                                        placeholder="alex@example.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">YOUR MESSAGE</label>
                                <textarea
                                    name="message"
                                    required
                                    rows="5"
                                    className="w-full bg-[#121c2e] border border-slate-700/80 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-emerald-400 transition-colors text-sm resize-none"
                                    placeholder="Tell me about your project..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95 text-sm uppercase tracking-wider"
                            >
                                {loading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
                                {loading ? 'SENDING...' : 'SEND MESSAGE'}
                            </button>

                            {success && (
                                <p className="text-emerald-400 text-center text-sm font-semibold pt-2">
                                    Message sent successfully! I will reply shortly.
                                </p>
                            )}
                        </form>
                    </motion.div>

                    {/* Right Column: Direct Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-5 bg-[#0b1322] border border-slate-800 rounded-3xl p-8 md:p-10 flex flex-col justify-between h-full space-y-10"
                    >
                        <div className="space-y-8">
                            <span className="inline-block px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest rounded-lg">
                                [Contact Info]
                            </span>

                            <div>
                                <a
                                    href="mailto:tarikunegesa19@gmail.com"
                                    className="text-xl md:text-2xl font-bold text-white hover:text-emerald-400 transition-colors block break-words"
                                >
                                    tarikunegesa19@gmail.com
                                </a>
                            </div>

                            <div>
                                <a
                                    href="tel:+251919421910"
                                    className="text-xl md:text-2xl font-bold text-white hover:text-emerald-400 transition-colors block"
                                >
                                    +251919421910
                                </a>
                                <p className="text-slate-400 text-sm mt-1">Addis Ababa, Ethiopia</p>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">FOLLOW ME</h4>
                            <div className="flex gap-3">
                                <a
                                    href="https://github.com/TarikuYe"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-[#121c2e] border border-slate-700/80 rounded-xl text-slate-200 hover:text-emerald-400 hover:border-emerald-400 text-xs font-bold transition-all flex items-center gap-1.5"
                                >
                                    <span>GH</span>
                                    <ArrowUpRight size={14} />
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/tarikunegesa"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-[#121c2e] border border-slate-700/80 rounded-xl text-slate-200 hover:text-emerald-400 hover:border-emerald-400 text-xs font-bold transition-all flex items-center gap-1.5"
                                >
                                    <span>LI</span>
                                    <ArrowUpRight size={14} />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
