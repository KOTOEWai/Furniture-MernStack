import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Facebook, Twitter, Instagram } from 'lucide-react';

export default function Contact() {
    return (
        <div className="min-h-screen bg-slate-50 py-20 px-4">
            <div className="container mx-auto max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Get in Touch</h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Have a question or looking to customize your furniture? We're here to help you create your dream space.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Contact Info */}
                    <div className="lg:col-span-1 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex items-start gap-4"
                        >
                            <div className="p-3 bg-amber-100 text-amber-600 rounded-xl">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 mb-1">Our Studio</h3>
                                <p className="text-slate-600">No. 123, Furniture Street, <br />Yangon, Myanmar</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex items-start gap-4"
                        >
                            <div className="p-3 bg-amber-100 text-amber-600 rounded-xl">
                                <Mail className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 mb-1">Email Us</h3>
                                <p className="text-slate-600">hello@furniture.com</p>
                                <p className="text-slate-600">support@furniture.com</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex items-start gap-4"
                        >
                            <div className="p-3 bg-amber-100 text-amber-600 rounded-xl">
                                <Phone className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 mb-1">Call Us</h3>
                                <p className="text-slate-600">+95 9 123 456 789</p>
                                <p className="text-slate-600">+95 1 222 333</p>
                            </div>
                        </motion.div>

                        <div className="flex gap-4 px-4">
                            {[Facebook, Twitter, Instagram].map((Icon, i) => (
                                <a key={i} href="#" className="p-3 bg-white text-slate-600 rounded-full hover:bg-amber-600 hover:text-white transition-all duration-300 shadow-sm border border-slate-100">
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-2 bg-white p-8 md:p-12 rounded-[40px] shadow-xl border border-slate-50"
                    >
                        <form className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700 ml-1">Full Name</label>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-300"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="john@example.com"
                                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-300"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 ml-1">Subject</label>
                                <input
                                    type="text"
                                    placeholder="Inquiry about custom sofa"
                                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-300"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 ml-1">Message</label>
                                <textarea
                                    rows={5}
                                    placeholder="Tell us what you're looking for..."
                                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-300"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-5 bg-amber-600 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-amber-700 transition-all duration-300 shadow-xl shadow-amber-900/10 active:scale-[0.98]"
                            >
                                Send Message
                                <Send className="w-5 h-5" />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
