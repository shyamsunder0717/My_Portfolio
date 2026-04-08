import { useEffect, useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string;
}

const experiences: ExperienceItem[] = [
  {
    title: "Penetration Testing Intern",
    company: "Hacktify Cyber Security",
    period: "Jul 2024 – Aug 2024",
    description: "Conducted black-box and white-box penetration tests; identified SQLi and XSS vulnerabilities. Delivered remediation reports improving application security posture by 30%."
  },
  {
    title: "Cybersecurity Intern",
    company: "ShadowFox",
    period: "Apr 2024 – May 2024",
    description: "Supported security audits and vulnerability assessments."
  },
  {
    title: "SOC Analyst Intern",
    company: "CFSS Cyber & Forensics Security Solutions",
    period: "Apr 2024 – May 2024",
    description: "SIEM monitoring, incident detection, log analysis using Wazuh."
  },
  {
    title: "Penetration Tester Intern",
    company: "CFSS Cyber & Forensics Security Solutions",
    period: "Jan 2024 – Feb 2024",
    description: "Executed network and web application penetration tests, discovering and documenting critical security flaws."
  },
  {
    title: "Java Development Intern",
    company: "CBitss",
    period: "Jan 2023 – Mar 2023",
    description: "Built production-level REST APIs with Spring Boot. Optimized MySQL queries, reducing response time by 20%."
  },
  {
    title: "Python/Web Developer Intern",
    company: "Solitaire Infosys",
    period: "Aug 2021 – Oct 2021",
    description: "Automated backend workflows using Python."
  }
];

const TiltExperienceCard = ({ exp }: { exp: ExperienceItem }) => {
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

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative w-full rounded-2xl glassmorphism p-6 md:p-8 flex flex-col h-full border border-white/10 group will-change-transform shadow-[0_0_15px_rgba(0,0,0,0.5)] cursor-default"
    >
      {/* Internal hover glow effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-cyan-500/10 to-purple-500/10 pointer-events-none -z-10" />
      
      <div style={{ transform: "translateZ(30px)" }}>
        <span className="text-sm font-mono text-cyan-400 mb-2 inline-block">{exp.period}</span>
        <h3 className="text-xl font-bold text-white mb-1">{exp.title}</h3>
        <h4 className="text-md text-purple-400 mb-4 font-medium">{exp.company}</h4>
      </div>
      
      <p style={{ transform: "translateZ(20px)" }} className="text-gray-400 text-sm leading-relaxed mt-2">
        {exp.description}
      </p>
    </motion.div>
  );
};

export const Experience = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the central line growing down
      if (lineRef.current) {
        gsap.fromTo(lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 50%",
              end: "bottom 80%",
              scrub: 1,
            }
          }
        );
      }

      // Animate each node fading in and sliding
      nodesRef.current.forEach((node, i) => {
        if (!node) return;
        const isLeft = i % 2 === 0;
        gsap.fromTo(node,
          {
            opacity: 0,
            x: isLeft ? -50 : 50
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: node,
              start: "top 85%",
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const addToNodesRef = (el: HTMLDivElement | null) => {
    if (el && !nodesRef.current.includes(el)) {
      nodesRef.current.push(el);
    }
  };

  return (
    <section className="relative z-10 py-24 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="mb-20 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 font-sans tracking-tight">Experience</h2>
        <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full mx-auto" />
      </div>

      <div ref={containerRef} className="relative max-w-4xl mx-auto">

        {/* The central line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-white/10 -translate-x-1/2 rounded-full overflow-hidden">
          <div ref={lineRef} className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-cyan-500 via-purple-500 to-cyan-500 origin-top" />
        </div>

        <div className="space-y-12">
          {experiences.map((exp, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <div
                key={idx}
                ref={addToNodesRef}
                className={`relative flex items-center justify-between md:justify-normal w-full ${isLeft ? "md:flex-row-reverse" : ""}`}
              >
                {/* Center Node dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-navy border-2 border-cyan-500 shadow-[0_0_15px_rgba(0,245,255,0.8)] -translate-x-1/2 z-10" />

                <div className="w-[calc(100%-3rem)] md:w-5/12 ml-auto md:ml-0 md:px-8 perspective-[1000px]">
                  <TiltExperienceCard exp={exp} />
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
