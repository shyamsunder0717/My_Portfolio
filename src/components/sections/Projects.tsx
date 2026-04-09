import { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaLock, FaBrain, FaCode } from 'react-icons/fa';

interface Project {
  title: string;
  date?: string;
  stack: string[];
  description: string;
  status?: string;
  category: string;
  github?: string;
}

const CATEGORY_META: Record<string, { color: string; glow: string; border: string; icon: React.ReactNode }> = {
  'Cybersecurity/AI': {
    color: 'text-rose-400',
    glow: 'from-rose-500/20 to-purple-500/20',
    border: 'hover:border-rose-500/50',
    icon: <FaLock size={11} />,
  },
  'AI': {
    color: 'text-violet-400',
    glow: 'from-violet-500/20 to-cyan-500/20',
    border: 'hover:border-violet-500/50',
    icon: <FaBrain size={11} />,
  },
  'Cybersecurity': {
    color: 'text-cyan-400',
    glow: 'from-cyan-500/20 to-blue-500/20',
    border: 'hover:border-cyan-500/50',
    icon: <FaLock size={11} />,
  },
  'Web Dev': {
    color: 'text-emerald-400',
    glow: 'from-emerald-500/20 to-cyan-500/20',
    border: 'hover:border-emerald-500/50',
    icon: <FaCode size={11} />,
  },
};

const projects: Project[] = [
  // AI / ML
  {
    title: "DeepGuard AI — Deepfake Detection",
    date: "In Progress",
    stack: ["FastAPI", "OpenCV", "NumPy", "Python", "AI"],
    category: "Cybersecurity/AI",
    github: "https://github.com/shyamsunder0717/DeepGuard-AI",
    description: "AI-powered deepfake detection analyzing images/videos using forensic signals — noise, compression, metadata, face integrity — to generate explainable authenticity verdicts.",
    status: "In Progress"
  },
  {
    title: "Emissions Dashboard + RAG Chat",
    date: "Dec 2025",
    stack: ["Python", "Streamlit", "Plotly", "Pandas", "Gemini API", "Custom Search API"],
    category: "AI",
    github: "https://github.com/shyamsunder0717/Emissions-Dashboard",
    description: "AI-powered emissions analytics dashboard with RAG-based chat assistant using Gemini to answer dataset queries and generate real-time external insights."
  },
  {
    title: "AI Language Translator",
    date: "Jul 2025",
    stack: ["React.js", "TypeScript", "Tailwind CSS", "Gemini API"],
    category: "AI",
    github: "https://github.com/shyamsunder0717/AI-Language-Translator",
    description: "Real-time language translation web app with auto-detect, instant language swap, and one-click copy. Buildless architecture using ES Modules and import maps."
  },

  // Cybersecurity
  {
    title: "Secure SIEM Tool — Wazuh",
    date: "Jan 2025",
    stack: ["Wazuh", "Bash", "Linux"],
    category: "Cybersecurity",
    github: "https://github.com/shyamsunder0717/SEIM_Tool-WAZUH",
    description: "Real-time log analysis and alerting system reducing detection time by 40%. Custom alert rules, log parsing from multiple sources, dashboards for key security metrics, and compliance management across distributed Linux environments."
  },
  {
    title: "Vulnerability Scanner (Python)",
    date: "Apr 2024",
    stack: ["Python", "Flask", "Beautiful Soup", "API Testing"],
    category: "Cybersecurity",
    github: "https://github.com/shyamsunder0717/Vulnerability_Scanner_Python_Based",
    description: "Python-based vulnerability detection tool with automated reporting, multi-threaded scanning covering OWASP Top 10, and comprehensive system security assessments."
  },
  {
    title: "Vulnerability Scanner (Website)",
    date: "Apr 2024",
    stack: ["JavaScript", "HTML", "CSS", "Web Security"],
    category: "Cybersecurity",
    github: "https://github.com/shyamsunder0717/Vulnerability_Scanner_Website_Based",
    description: "Web-based vulnerability scanner for real-time browser-based security assessments, covering OWASP Top 10 vulnerabilities with an intuitive dashboard interface."
  },
  {
    title: "Wi-Fi De-Authentication Tool",
    stack: ["Python", "Network Security", "Scapy"],
    category: "Cybersecurity",
    github: "https://github.com/shyamsunder0717/Wifi-Deauthentication",
    description: "Targeted Wi-Fi de-authentication attack tool for educational and security testing. Demonstrates deep knowledge of wireless protocols, Wi-Fi frame structure, and ethical hacking principles."
  },
  {
    title: "Keylogger with Email Alerts",
    stack: ["Python", "Automation", "Email Integration"],
    category: "Cybersecurity",
    github: "https://github.com/shyamsunder0717/Keylogger-Email-Alerts",
    description: "Python keylogger with real-time email alert system for captured keystrokes. Built for cybersecurity research, parental controls, and system monitoring with ethical use guidelines."
  },

  // Web Dev
  {
    title: "Full-Stack URL Shortener",
    stack: ["Node.js", "Express.js", "JavaScript", "Docker", "Google Cloud Run"],
    category: "Web Dev",
    github: "https://github.com/shyamsunder0717/URL-Shortener-Site",
    description: "Production-scale URL shortener with full analytics suite. Features Base62 encoding, simulated Redis cache, API rate limiting, admin dashboard, and containerized deployment on Google Cloud Run."
  },
  {
    title: "3D Portfolio",
    stack: ["HTML", "CSS", "JavaScript", "Three.js", "WebGL"],
    category: "Web Dev",
    github: "https://github.com/shyamsunder0717/3D-Portfolio",
    description: "Immersive 3D portfolio with WebGL-powered environments, smooth animations, and interactive 3D elements. Showcases advanced front-end and graphical design skills."
  },
  {
    title: "Hostel Management System",
    stack: ["HTML", "CSS", "JavaScript", "Database"],
    category: "Web Dev",
    github: "https://github.com/shyamsunder0717/Hostel-Management-System",
    description: "Full-stack hostel management system with room allocation, fee management, and maintenance request modules. Separate admin and student interfaces with responsive design."
  },
  {
    title: "Hotel Management System",
    stack: ["Java", "NetBeans", "Database"],
    category: "Web Dev",
    github: "https://github.com/shyamsunder0717/Hotel-Management-System",
    description: "Comprehensive hotel management system with reservation management, room assignment, billing, and guest feedback. Automation features reduce manual effort and increase operational efficiency."
  }
];

const TiltCard = ({ project, index }: { project: Project; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const meta = CATEGORY_META[project.category] ?? CATEGORY_META['Web Dev'];

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useMotionTemplate`${mouseYSpring}deg`;
  const rotateY = useMotionTemplate`${mouseXSpring}deg`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct * 12);
    y.set(yPct * -12);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: 'easeOut' }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className={`relative w-full rounded-2xl flex flex-col h-full group will-change-transform cursor-pointer overflow-hidden
        border border-white/8 ${meta.border} transition-[border-color] duration-300
        bg-gradient-to-br from-white/4 to-white/1 backdrop-blur-xl`}
    >
      {/* Animated gradient glow on hover */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${meta.glow} pointer-events-none`}
      />

      {/* Top shimmer line */}
      <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-white/40 transition-all duration-500`} />

      {/* Index badge */}
      <div
        className="absolute top-4 right-4 text-xs font-mono text-white/15 select-none"
        style={{ transform: 'translateZ(10px)' }}
      >
        #{String(index + 1).padStart(2, '0')}
      </div>

      {/* Card body */}
      <div className="flex flex-col h-full p-6 md:p-7" style={{ transform: 'translateZ(20px)' }}>

        {/* Category badge */}
        <div className="flex items-center gap-2 mb-4">
          <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${meta.color} border-current/30 bg-current/5`}>
            {meta.icon}
            {project.category}
          </span>
          {project.date && (
            <span className="text-xs text-white/30 font-mono">{project.date}</span>
          )}
          {project.status && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 animate-pulse">
              ● {project.status}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className={`text-lg md:text-xl font-bold text-white mb-3 leading-snug group-hover:${meta.color} transition-colors duration-300`}>
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-white/50 flex-grow leading-relaxed mb-5">
          {project.description}
        </p>

        {/* Stack chips */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.stack.map((tech, idx) => (
            <span
              key={idx}
              className="text-xs font-medium px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white/60"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* CTA row — both buttons link to GitHub */}
        {project.github && (
          <div className="flex gap-3 mt-auto pt-4 border-t border-white/8">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold
                bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20
                text-white/70 hover:text-white transition-all duration-200`}
              aria-label="View on GitHub"
            >
              <FaGithub size={15} />
              GitHub
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold
                bg-gradient-to-r from-cyan-500/20 to-purple-500/20
                hover:from-cyan-500/30 hover:to-purple-500/30
                border border-cyan-500/20 hover:border-cyan-400/40
                text-cyan-300 hover:text-cyan-200 transition-all duration-200`}
              aria-label="View Repository"
            >
              <FaExternalLinkAlt size={13} />
              View Repo
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export const Projects = () => {
  return (
    <section id="projects" className="relative z-10 py-28 px-6 max-w-7xl mx-auto">

      {/* Section header */}
      <div className="mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-cyan-400 uppercase mb-4 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          Portfolio
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl font-extrabold text-white mb-5 tracking-tight"
        >
          Featured{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
            Projects
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/40 text-base max-w-xl mx-auto"
        >
          A curated showcase of cybersecurity tools, AI systems, and full-stack applications.
        </motion.p>

        {/* Decorative divider */}
        <div className="mt-8 flex items-center gap-4 justify-center">
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-cyan-500/50" />
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
          <div className="h-px w-20 bg-gradient-to-l from-transparent to-purple-500/50" />
        </div>
      </div>

      {/* Project grid */}
      <motion.div
        layout
        className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 perspective-[1200px]"
      >
        <AnimatePresence mode="popLayout">
          {projects.map((project, idx) => (
            <motion.div
              layout
              key={project.title}
              exit={{ opacity: 0, scale: 0.85 }}
              className="w-full"
            >
              <TiltCard project={project} index={idx} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Footer note */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-14 text-center"
      >
        <a
          href="https://github.com/shyamsunder0717"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-white/4
            text-white/50 hover:text-white hover:border-white/25 hover:bg-white/8
            text-sm font-medium transition-all duration-300 group"
        >
          <FaGithub size={16} className="group-hover:text-cyan-400 transition-colors" />
          View all repositories on GitHub
          <FaExternalLinkAlt size={11} className="opacity-50" />
        </a>
      </motion.div>
    </section>
  );
};
