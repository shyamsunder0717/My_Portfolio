import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { FaGithub, FaLinkedin, FaEnvelope, FaLink, FaDownload } from 'react-icons/fa';

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Initial reveal animation
    const ctx = gsap.context(() => {
      gsap.fromTo(
        nameRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power4.out", delay: 0.5 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center z-10 px-6 pt-20"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left Content */}
        <div className="flex flex-col items-start gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-block px-4 py-1 rounded-full glassmorphism border-cyan-500/30 text-cyan-500 font-medium tracking-wide text-sm"
          >
            Available for new opportunities
          </motion.div>

          <div className="space-y-4">
            <h1
              ref={nameRef}
              className="text-5xl md:text-7xl font-bold tracking-tighter opacity-0 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
            >
              SHYAM SUNDER <br /> SHARMA
            </h1>

            <div className="h-10 md:h-12 flex items-center">
              <span className="text-xl md:text-3xl text-purple-500 font-semibold inline-block">
                Building Secure & Defending Systems
              </span>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-gray-400 max-w-lg text-lg leading-relaxed"
          >
            Bridging offensive security and defense — with practical exposure
            to security tooling, Python scripting, and AI-assisted workflows.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-wrap gap-4 mt-4"
          >
            <a
              href="#projects"
              className="interactive px-8 py-3 rounded-full bg-cyan-500 hover:bg-white text-black font-bold transition-all duration-300 shadow-[0_0_20px_rgba(0,245,255,0.4)] hover:shadow-[0_0_40px_rgba(0,245,255,0.8)] hover:scale-105 hover:-translate-y-1 flex items-center justify-center"
            >
              View My Work
            </a>
            <a
              href="https://drive.google.com/file/d/17i9StSzqZpOKl6HNlgOoP96JpfkGtynk/view?usp=sharing"
              target="_blank"
              rel="noreferrer"
              className="interactive group px-8 py-3 rounded-full glassmorphism-glow flex items-center justify-center gap-3 font-medium transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:bg-white/10 border border-white/10 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(124,58,237,0.3)]"
            >
              <FaDownload size={18} className="text-purple-400 group-hover:-translate-y-1 group-hover:scale-110 transition-all duration-300" />
              Download Resume
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex items-center gap-6 mt-6"
          >
            <SocialLink href="https://github.com/shyamsunder0717" icon={<FaGithub />} label="GitHub" />
            <SocialLink href="https://linkedin.com/in/shyam-sunder-sharma-987245s" icon={<FaLinkedin />} label="LinkedIn" />
            <SocialLink href="mailto:shyamsunders0708@gmail.com" icon={<FaEnvelope />} label="Email" />
            <SocialLink href="https://linktr.ee/shyamsunder0708" icon={<FaLink />} label="LinkTree" />
          </motion.div>

        </div>

        {/* Right Content - Space for 3D element rendering in background */}
        <div className="hidden lg:block h-full"></div>

      </div>
    </section>
  );
};

const SocialLink = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    aria-label={label}
    className="interactive w-12 h-12 flex items-center justify-center rounded-full glassmorphism hover:bg-white/10 hover:scale-110 transition-all hover:text-cyan-500 text-gray-300"
  >
    {icon}
  </a>
);
