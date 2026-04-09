import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const skillCategories = [
    {
      id: "cybersecurity",
      label: "CYBERSECURITY",
      tier: "hero",
      items: [
        "Penetration Testing", "SOC", "SIEM", "Networking",
        "OWASP Top 10", "Cryptography", "Application Security",
        "Burp Suite", "Nmap", "Wireshark", "Metasploit", "Wazuh", "Aircrack-ng"
      ]
    },
    {
      id: "security-research",
      label: "SECURITY RESEARCH",
      tier: "mid",
      items: [
        "Vulnerability Research", "Threat Analysis", "OSINT",
        "Technical Documentation", "Remediation Reporting"
      ]
    },
    {
      id: "languages",
      label: "LANGUAGES & SCRIPTING",
      tier: "base",
      items: ["Python", "Bash", "SQL", "Java"]
    },
    {
      id: "tools",
      label: "SUPPORTING TOOLS",
      tier: "base",
      items: [
        "Git", "Docker", "GCP", "Oracle Cloud", "FastAPI",
        "API Integration", "REST APIs", "MySQL", "GitHub Actions",
        "LLM APIs (Gemini · GPT)"
      ]
    }
  ];

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
            CSE Hons. Information Security graduate with hands-on experience in penetration testing, SOC operations, SIEM-based threat detection, and vulnerability research. I find weaknesses in systems, analyze threats, and build security tools using Python — with working knowledge of modern AI APIs and cloud platforms to support security workflows.
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
            {skillCategories.map((cat) => (
              <div key={cat.id}>
                {/* Category header */}
                {cat.tier === 'hero' ? (
                  <h5
                    className="text-base uppercase tracking-widest mb-4 font-bold"
                    style={{
                      color: '#22d3ee',
                      textShadow: '0 0 12px rgba(34,211,238,0.8), 0 0 28px rgba(34,211,238,0.4)',
                    }}
                  >
                    {cat.label}
                  </h5>
                ) : cat.tier === 'mid' ? (
                  <h5 className="text-sm uppercase tracking-widest text-purple-400/80 mb-4 font-semibold">
                    {cat.label}
                  </h5>
                ) : cat.tier === 'base' ? (
                  <h5 className="text-xs uppercase tracking-widest text-gray-400 mb-4 font-medium">
                    {cat.label}
                  </h5>
                ) : (
                  <h5 className="text-xs uppercase tracking-widest text-gray-600 mb-4">
                    {cat.label}
                  </h5>
                )}

                {/* Divider */}
                <div
                  className="w-full h-px mb-4"
                  style={{
                    background:
                      cat.tier === 'hero'
                        ? 'linear-gradient(to right, rgba(34,211,238,0.5), transparent)'
                        : cat.tier === 'mid'
                          ? 'linear-gradient(to right, rgba(168,85,247,0.3), transparent)'
                          : cat.tier === 'base'
                            ? 'linear-gradient(to right, rgba(255,255,255,0.15), transparent)'
                            : 'linear-gradient(to right, rgba(255,255,255,0.05), transparent)',
                  }}
                />

                {/* Pills */}
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((skill, sIdx) => {
                    const isHero = cat.tier === 'hero';
                    const isMid = cat.tier === 'mid';
                    const isBase = cat.tier === 'base';

                    return (
                      <motion.span
                        key={sIdx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.05 * (sIdx % 8) }}
                        whileHover={{ scale: 1.06, y: -2 }}
                        className="interactive cursor-none transition-all duration-200"
                        style={{
                          padding: isHero ? '8px 18px' : isMid ? '5px 14px' : '4px 11px',
                          borderRadius: '9999px',
                          fontSize: isHero ? '0.9rem' : isMid ? '0.78rem' : '0.7rem',
                          fontWeight: isHero ? 600 : 400,
                          background: isHero
                            ? 'rgba(34,211,238,0.08)'
                            : isMid
                              ? 'rgba(168,85,247,0.06)'
                              : isBase
                                ? 'rgba(255,255,255,0.05)'
                                : 'rgba(255,255,255,0.02)',
                          border: isHero
                            ? '1px solid rgba(34,211,238,0.4)'
                            : isMid
                              ? '1px solid rgba(168,85,247,0.25)'
                              : isBase
                                ? '1px solid rgba(255,255,255,0.15)'
                                : '1px solid rgba(255,255,255,0.05)',
                          color: isHero ? '#67e8f9' : isMid ? '#c4b5fd' : isBase ? '#d1d5db' : '#6b7280',
                          boxShadow: isHero
                            ? '0 0 10px rgba(34,211,238,0.2), inset 0 0 8px rgba(34,211,238,0.05)'
                            : isMid
                              ? '0 0 6px rgba(168,85,247,0.1)'
                              : 'none',
                        }}
                      >
                        {skill}
                      </motion.span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
