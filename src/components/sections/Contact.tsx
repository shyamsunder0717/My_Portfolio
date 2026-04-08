import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaGithub, FaLinkedin, FaLink, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';

export const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    try {
      // NOTE: To receive emails without an email client springing up, we use Web3Forms (A free backend for static sites).
      // You must replace "YOUR_WEB3FORMS_ACCESS_KEY" with your own key.
      // Get your free key here: https://web3forms.com/
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "8cb6b096-d1a4-4801-8f25-e07dd74b9781",
          name: name,
          email: email,
          message: message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          (e.target as HTMLFormElement).reset();
        }, 5000);
      } else {
        alert("Please set up your Web3Forms Access Key in Contact.tsx to receive emails directly.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative z-10 py-24 px-6 max-w-7xl mx-auto min-h-screen flex flex-col justify-center border-t border-white/5">

      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold mb-6 font-sans tracking-tight"
        >
          Let's Build Something <br className="md:hidden" />
          <span className="text-gradient drop-shadow-[0_0_15px_rgba(0,245,255,0.3)]">Secure Together</span>
        </motion.h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Whether you need a security audit, a robust backend, or an AI integration, I'm always open to discussing new opportunities and collaborations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto w-full">

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-7 glassmorphism rounded-3xl p-8 md:p-10"
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 ml-1">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="John Doe"
                  className="interactive w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all font-light"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 ml-1">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="john@example.com"
                  className="interactive w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all font-light"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Message</label>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="What's your project about?"
                className="interactive w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all font-light resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isSuccess}
              className={`interactive w-full py-4 rounded-xl text-white font-bold flex items-center justify-center gap-2 hover:opacity-90 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_20px_rgba(124,58,237,0.3)] ${isSuccess ? 'bg-[#43E660]' : 'bg-gradient-to-r from-cyan-500 to-purple-500'
                } ${(isSubmitting || isSuccess) ? 'opacity-80 pointer-events-none' : ''}`}
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : isSuccess ? (
                <>
                  <FaCheckCircle size={18} />
                  Message Sent!
                </>
              ) : (
                <>
                  <FaPaperPlane size={18} />
                  Send Message
                </>
              )}
            </button>
          </form>
        </motion.div>

        {/* Contact Info container */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-5 flex flex-col justify-between space-y-8"
        >
          <div className="glassmorphism-glow rounded-3xl p-8 flex-1 flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-white mb-8">Connect Directly</h3>

            <div className="space-y-6">
              <a href="mailto:shyamsunders0708@gmail.com" className="interactive flex items-center gap-4 text-gray-300 hover:text-cyan-400 transition-colors group">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                  <FaEnvelope size={20} />
                </div>
                <span className="font-medium">shyamsunders0708@gmail.com</span>
              </a>

              <a href="https://linkedin.com/in/shyam-sunder-sharma-987245s" target="_blank" rel="noreferrer" className="interactive flex items-center gap-4 text-gray-300 hover:text-purple-400 transition-colors group">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                  <FaLinkedin size={20} />
                </div>
                <span className="font-medium">LinkedIn Profile</span>
              </a>

              <a href="https://github.com/shyamsunder0717" target="_blank" rel="noreferrer" className="interactive flex items-center gap-4 text-gray-300 hover:text-white transition-colors group">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <FaGithub size={20} />
                </div>
                <span className="font-medium">shyamsunder0717</span>
              </a>

              <a href="https://linktr.ee/shyamsunder0708" target="_blank" rel="noreferrer" className="interactive flex items-center gap-4 text-gray-300 hover:text-[#43E660] transition-colors group">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#43E660]/20 transition-colors">
                  <FaLink size={20} />
                </div>
                <span className="font-medium">LinkTree</span>
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
