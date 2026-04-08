import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const skills = {
    "Languages": ["Python", "Java", "SQL", "HTML", "CSS", "Bash"],
    "Cybersecurity": ["Penetration Testing", "SOC", "Networking", "SIEM", "OWASP Top 10", "Cryptography", "Burp Suite", "Nmap", "Wireshark", "Metasploit", "Wazuh"],
    "Cloud & AI": ["GCP", "Azure", "Researcher", "LLMs", "GPT", "Gemini"],
    "Development": ["SDLC", "Web Development", "API Integration", "FastAPI", "Spring Boot", "REST APIs", "MySQL", "Docker", "Git", "GitHub Actions"]
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger reveal the cards
      gsap.fromTo(cardsRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToCardsRef = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <section ref={sectionRef} className="relative z-10 py-24 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 font-sans tracking-tight">About Me</h2>
        <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Bio Card */}
        <div ref={addToCardsRef} className="lg:col-span-12 glassmorphism-glow rounded-3xl p-8 md:p-12">
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light">
            CSE Hons. Information Security graduate passionate about Cybersecurity, AI, and Development.
            Experienced in penetration testing, SOC operations, SIEM monitoring, and building secure
            intelligent systems combining <span className="text-cyan-400 font-medium">Cybersecurity</span>,
            <span className="text-purple-400 font-medium"> AI</span>, and
            <span className="text-cyan-400 font-medium"> Software Engineering</span>.
          </p>
        </div>

        {/* Education column */}
        <div className="lg:col-span-5 space-y-6">
          <h3 className="text-2xl font-semibold text-white mb-6">Education</h3>

          <div ref={addToCardsRef} className="glassmorphism rounded-2xl p-6 border-l-4 border-l-cyan-500 hover:-translate-y-1 transition-transform">
            <h4 className="text-xl font-bold text-white">B.E. CSE Hons. Information Security</h4>
            <p className="text-purple-400 mb-2">Chandigarh University</p>
            <div className="flex justify-between items-center text-sm text-gray-400">
              <span>2022 – 2025</span>
              <span className="bg-white/10 px-3 py-1 rounded-full text-cyan-400">CGPA: 7.88/10</span>
            </div>
          </div>

          <div ref={addToCardsRef} className="glassmorphism rounded-2xl p-6 border-l-4 border-l-purple-500 hover:-translate-y-1 transition-transform">
            <h4 className="text-xl font-bold text-white">Diploma CSE</h4>
            <p className="text-cyan-400 mb-2">Govt. Polytechnic College, Panchkula</p>
            <div className="flex justify-between items-center text-sm text-gray-400">
              <span>2020 – 2022</span>
              <span className="bg-white/10 px-3 py-1 rounded-full text-purple-400">69.62%</span>
            </div>
          </div>
        </div>

        {/* Skills column */}
        <div ref={addToCardsRef} className="lg:col-span-7 glassmorphism rounded-3xl p-8">
          <h3 className="text-2xl font-semibold text-white mb-8">Technical Arsenal</h3>

          <div className="space-y-8">
            {Object.entries(skills).map(([category, items], idx) => (
              <div key={idx}>
                <h5 className="text-sm uppercase tracking-widest text-gray-500 mb-4">{category}</h5>
                <div className="flex flex-wrap gap-3">
                  {items.map((skill, sIdx) => (
                    <motion.span
                      key={sIdx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * (sIdx % 5) }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="interactive px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 hover:bg-white/10 hover:border-cyan-500/50 hover:text-cyan-400 transition-colors cursor-none"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
