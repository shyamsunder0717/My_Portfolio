import { motion } from 'framer-motion';
import { FaAward, FaTrophy, FaCheckCircle } from 'react-icons/fa';

const certifications = [
  "Certified Blue Team Practitioner (CBTP)",
  "Certified Network Security Practitioner (CNSP)",
  "Certified AppSec Practitioner (CAP)",
  "Certified Cyber Security Analyst (C3SA)",
  "Oracle Cloud Infrastructure 2024 Certified",
  "Java Certified (J2SE)",
  "ISO 27001 ISMS — Alison",
  "SOC Analyst Certified",
  "Cyber Security Pledge — ISEA, Government of India"
];

const achievements = [
  {
    title: "Kaggle AnaVerse 2.0_N 2025",
    desc: "Ranked 172/1090 (Top 16%) — Anomaly detection ML model",
    icon: <FaTrophy className="text-[#FFD700]" />
  },
  {
    title: "TCS CodeVita 2024",
    desc: "Ranked 3700/9504 (Top 40%) — Algorithmic problem solving",
    icon: <FaTrophy className="text-[#C0C0C0]" />
  },
  {
    title: "TCS HackQuest 2025",
    desc: "Top 20% — Real-world security challenges",
    icon: <FaTrophy className="text-cyan-400" />
  }
];

export const CertificationsAchievements = () => {
  return (
    <section className="relative z-10 py-24 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

        {/* Certifications */}
        <div>
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-4 font-sans tracking-tight">Certifications</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {certifications.map((cert, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-start gap-3 p-4 glassmorphism rounded-xl hover:border-cyan-500/50 transition-colors"
              >
                <div className="mt-1 flex-shrink-0">
                  <FaAward size={18} className="text-purple-400" />
                </div>
                <span className="text-gray-300 text-sm md:text-base leading-tight font-medium">
                  {cert}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-4 font-sans tracking-tight">Achievements</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full" />
          </div>

          <div className="space-y-6">
            {achievements.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, type: "spring" }}
                className="glassmorphism-glow rounded-2xl p-6 flex gap-4 items-center group"
              >
                <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <FaCheckCircle size={14} className="text-cyan-500" />
                    <span>{item.desc}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
