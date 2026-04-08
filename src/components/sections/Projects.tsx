import { useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

interface Project {
  title: string;
  date?: string;
  stack: string[];
  description: string;
  status?: string;
  category: string;
  github?: string;
}

const projects: Project[] = [
  // AI / ML
  {
    title: "DeepGuard AI — Deepfake Detection",
    date: "In Progress",
    stack: ["FastAPI", "OpenCV", "NumPy", "Python", "AI"],
    category: "AI/ML",
    description: "AI-powered deepfake detection analyzing images/videos using forensic signals — noise, compression, metadata, face integrity — to generate explainable authenticity verdicts.",
    status: "In Progress"
  },
  {
    title: "Emissions Dashboard + RAG Chat",
    date: "Dec 2025",
    stack: ["Python", "Streamlit", "Plotly", "Pandas", "Gemini API", "Custom Search API"],
    category: "AI/ML",
    description: "AI-powered emissions analytics dashboard with RAG-based chat assistant using Gemini to answer dataset queries and generate real-time external insights."
  },
  {
    title: "AI Language Translator",
    date: "Jul 2025",
    stack: ["React.js", "TypeScript", "Tailwind CSS", "Gemini API"],
    category: "AI/ML",
    github: "https://github.com/shyamsunder0717/AI-Language-Translator",
    description: "Real-time language translation web app with auto-detect, instant language swap, and one-click copy. Buildless architecture using ES Modules and import maps. API key managed securely via environment variables."
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
    title: "Vulnerability Scanner",
    date: "Apr 2024",
    stack: ["Python", "Flask", "Beautiful Soup", "API Testing"],
    category: "Cybersecurity",
    github: "https://github.com/shyamsunder0717/Vulnerability_Scanner_Python_Based",
    description: "Two scanners: a Python-based tool for system vulnerability detection with automated reporting, and a web-based scanner for real-time browser-based security assessments. Multi-threaded scanning covering OWASP Top 10."
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
    title: "Full-Stack URL Shortener with Analytics",
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

const filters = ["All", "AI/ML", "Cybersecurity", "Web Dev"];

const TiltCard = ({ project }: { project: Project }) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useMotionTemplate`${mouseYSpring}deg`;
  const rotateY = useMotionTemplate`${mouseXSpring}deg`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct * 15);
    y.set(yPct * -15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Convert array to grid logic - if it ends up single column on mobile, handled by generic w-full
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      layout
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative w-full rounded-2xl glassmorphism p-8 flex flex-col h-full border border-white/10 group will-change-transform cursor-pointer"
    >
      {/* Internal hover glow effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-cyan-500/10 to-purple-500/10 pointer-events-none -z-10 shadow-[0_0_20px_rgba(0,245,255,0.15)]" />
      
      <div style={{ transform: "translateZ(30px)" }} className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{project.title}</h3>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-mono text-cyan-400">{project.category}</span>
            {project.date && (
              <span className="text-sm text-gray-500">• {project.date}</span>
            )}
            {project.status && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                {project.status}
              </span>
            )}
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex gap-2 shrink-0 ml-4">
          {project.github && (
            <a 
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="interactive w-10 h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/20 transition-colors text-white" 
              aria-label="GitHub Repository"
            >
              <FaGithub size={18} />
            </a>
          )}
          <button className="interactive w-10 h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-cyan-500/20 hover:text-cyan-400 transition-colors text-white" aria-label="Details">
            <FaExternalLinkAlt size={16} />
          </button>
        </div>
      </div>

      <p style={{ transform: "translateZ(20px)" }} className="text-gray-400 flex-grow mb-6 leading-relaxed text-sm md:text-base">
        {project.description}
      </p>

      <div style={{ transform: "translateZ(40px)" }} className="flex flex-wrap gap-2 mt-auto">
        {project.stack.map((tech, idx) => (
          <span 
            key={idx} 
            className="text-xs font-medium px-3 py-1 rounded-full bg-black/40 border border-gray-700 text-gray-300 shadow-sm"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = projects.filter(
    (project) => activeFilter === "All" || project.category === activeFilter
  );

  return (
    <section id="projects" className="relative z-10 py-24 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 font-sans tracking-tight text-center md:text-left">Featured Projects</h2>
        <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full mx-auto md:mx-0 mb-10" />
        
        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`interactive px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                activeFilter === filter 
                  ? 'bg-cyan-500 text-black border-cyan-500 shadow-[0_0_15px_rgba(0,245,255,0.4)] hover:scale-105' 
                  : 'bg-white/5 text-gray-300 border-white/10 hover:border-cyan-500/50 hover:text-cyan-400 hover:bg-white/10'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <motion.div 
        layout
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 perspective-[1000px] min-h-[300px] w-full"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, idx) => (
              <motion.div
                layout
                key={project.title}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="w-full"
              >
                <TiltCard project={project} />
              </motion.div>
            ))
          ) : (
            <motion.div
              layout
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="col-span-1 lg:col-span-2 flex flex-col items-center justify-center py-20 glassmorphism-glow rounded-3xl border border-white/5"
            >
              <div className="w-16 h-16 rounded-full bg-cyan-500/10 flex items-center justify-center mb-4">
                <span className="text-cyan-500 text-2xl">⚡</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Deploying Soon</h3>
              <p className="text-gray-400 text-center max-w-sm">
                No projects are currently published under the <span className="text-cyan-400">{activeFilter}</span> category. Check back later for updates!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
