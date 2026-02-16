import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Github, Linkedin, Twitter, Loader2 } from 'lucide-react';

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
        <section id="contact" className="section-padding bg-dark-darker relative overflow-hidden">
            <div className="absolute inset-0 glow-mesh opacity-20" />

            <div className="container mx-auto relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-7xl font-bold mb-8 leading-tight"
                    >
                        Let's build an intelligent solution <span className="text-gradient underline decoration-primary/30 underline-offset-8">together.</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-slate-400"
                    >
                        Ready to elevate your digital presence? Reach out now.
                    </motion.p>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="glass-card p-10"
                    >
                        <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-primary transition-colors text-white"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-primary transition-colors text-white"
                                        placeholder="johndoe@gmail.com"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Your Message</label>
                                <textarea
                                    name="message"
                                    required
                                    rows="5"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-primary transition-colors text-white resize-none"
                                    placeholder="Tell me about your project..."
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-5 bg-primary hover:bg-primary/80 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-3 group"
                            >
                                {loading ? <Loader2 className="animate-spin" /> : <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                                {loading ? 'SENDING...' : 'SEND MESSAGE'}
                            </button>
                            {success && (
                                <p className="text-primary text-center text-sm font-medium">Message sent! I'll be in touch shortly.</p>
                            )}
                        </form>
                    </motion.div>

                    <div className="space-y-12">
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-6">Contact Info</h3>
                            <a href="mailto:tarikunegesa19@gmail.com" className="text-3xl md:text-4xl font-light hover:text-primary transition-colors break-words">
                                tarikunegesa19@gmail.com
                            </a>
                            <br />
                            <br />
                            <a href="tel:+251919421910" className="text-3xl md:text-4xl font-light hover:text-primary transition-colors break-words">
                                +251919421910
                            </a>
                            <br />
                            <br />
                            <a href="#" className="text-3xl md:text-4xl font-light hover:text-primary transition-colors break-words">
                                Addis Ababa, Ethiopia
                            </a>
                        </div>

                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-secondary mb-6">Follow Me</h3>
                            <div className="flex gap-6">
                                {[
                                    { icon: Linkedin, href: "https://www.linkedin.com/in/tarikunegesa" },
                                    { icon: Github, href: "https://github.com/TarikuYe" },
                                    // { icon: Instagram, href: "#" }
                                ].map((social, i) => (
                                    <a
                                        key={i}
                                        href={social.href}
                                        className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-primary transition-all text-slate-400 hover:text-white"
                                    >
                                        <social.icon size={24} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
