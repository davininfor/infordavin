import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, 
  Instagram, 
  Mail, 
  Phone, 
  Trophy, 
  Gamepad2, 
  Code, 
  ExternalLink, 
  ChevronRight,
  Home,
  User,
  Briefcase,
  Layers,
  Send
} from 'lucide-react';
import { cn } from './lib/utils';

// --- Types ---
interface Profile {
  name: string;
  email: string;
  instagram: string;
  whatsapp: string;
  github: string;
  tagline: string;
  about: string;
}

interface Experience {
  id: number;
  title: string;
  company: string;
  period: string;
  description: string;
}

interface Skill {
  id: number;
  name: string;
  category: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
}

// --- Components ---

const Navbar = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'portfolio', icon: Layers, label: 'Portfolio' }
  ];

  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <div className="glass px-6 py-3 rounded-full flex items-center gap-8 shadow-2xl">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "relative p-2 transition-colors duration-300 group",
              activeTab === tab.id ? "text-maroon-400" : "text-gray-400 hover:text-white"
            )}
          >
            <tab.icon size={24} />
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-maroon-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {tab.label}
            </span>
            {activeTab === tab.id && (
              <motion.div
                layoutId="nav-glow"
                className="absolute inset-0 bg-maroon-500/20 blur-lg rounded-full -z-10"
              />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
};

const SectionTitle = ({ children, icon: Icon }: { children: React.ReactNode, icon?: any }) => (
  <div className="flex items-center gap-3 mb-8">
    {Icon && <Icon className="text-maroon-500" size={28} />}
    <h2 className="text-3xl font-bold tracking-tight text-gradient">{children}</h2>
  </div>
);

const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn("glass rounded-2xl p-6 hover:border-maroon-500/50 transition-all duration-500 group", className)}>
    {children}
  </div>
);

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [profile, setProfile] = useState<Profile | null>(null);
  const [experiences, setExperiences] = useState<(Experience & { image?: string })[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profRes, expRes, skillRes, projRes] = await Promise.all([
          fetch('/api/profile'),
          fetch('/api/experiences'),
          fetch('/api/skills'),
          fetch('/api/projects')
        ]);

        setProfile(await profRes.json());
        setExperiences(await expRes.json());
        setSkills(await skillRes.json());
        setProjects(await projRes.json());
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-16 h-16 rounded-full bg-maroon-600 blur-xl"
        />
      </div>
    );
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-black selection:bg-maroon-500 selection:text-white pb-32">
      {/* Background Accents */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-maroon-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] bg-maroon-800/10 blur-[100px] rounded-full" />
      </div>

      {/* Floating Navigation */}
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <div className="glass px-6 py-3 rounded-full flex items-center gap-6 shadow-2xl">
          {[
            { id: 'home', icon: Home, label: 'Home' },
            { id: 'about', icon: User, label: 'About' },
            { id: 'experience', icon: Briefcase, label: 'Experience' },
            { id: 'skills', icon: Code, label: 'Skills' },
            { id: 'contact', icon: Send, label: 'Contact' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => scrollToSection(tab.id)}
              className="relative p-2 transition-colors duration-300 group text-gray-400 hover:text-white"
            >
              <tab.icon size={20} />
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-maroon-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pt-20">
        {/* Home Section */}
        <section id="home" className="flex flex-col md:flex-row items-center gap-12 py-24 min-h-[80vh]">
          <div className="flex-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-maroon-950 border border-maroon-800/50 text-maroon-400 text-xs font-medium"
            >
              <span className="w-2 h-2 rounded-full bg-maroon-500 animate-pulse" />
              SYSTEM STATUS: OPTIMIZED
            </motion.div>
            <h1 className="text-6xl md:text-8xl font-black uppercase leading-none tracking-tighter">
              {profile?.name.split(' ').map((word, i) => (
                <span key={i} className="block">{word}</span>
              ))}
            </h1>
            <p className="text-xl text-gray-400 max-w-lg">
              <span className="text-maroon-400 font-semibold">{profile?.tagline.split(' & ')[0]}</span> & {profile?.tagline.split(' & ')[1]}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button 
                onClick={() => scrollToSection('experience')}
                className="bg-maroon-600 hover:bg-maroon-500 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all group shadow-lg shadow-maroon-900/20"
              >
                View Experience <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="glass hover:bg-white/10 text-white px-8 py-4 rounded-xl font-bold transition-all"
              >
                Contact Me
              </button>
            </div>
          </div>
          <div className="w-full md:w-[400px] aspect-[3/4] rounded-3xl overflow-hidden glass relative group">
            <img 
              src="/profilevin.jpeg" 
              alt="Davin" 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://picsum.photos/seed/davin/800/1200";
              }}
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-8 left-8">
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Based in</p>
              <p className="text-2xl font-bold">INDONESIA</p>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 scroll-mt-20">
          <SectionTitle icon={User}>About Me</SectionTitle>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
              <p>{profile?.about}</p>
              <div className="flex gap-4">
                <a href={profile?.github} target="_blank" className="p-3 glass rounded-xl hover:text-maroon-400 transition-colors">
                  <Github size={24} />
                </a>
                <a href={`https://instagram.com/${profile?.instagram.replace('@', '')}`} target="_blank" className="p-3 glass rounded-xl hover:text-maroon-400 transition-colors">
                  <Instagram size={24} />
                </a>
                <a href={`https://wa.me/${profile?.whatsapp}`} target="_blank" className="p-3 glass rounded-xl hover:text-maroon-400 transition-colors">
                  <Phone size={24} />
                </a>
              </div>
            </div>
            <Card className="maroon-gradient border-maroon-800/30">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Gamepad2 className="text-maroon-400" /> Esports Background
              </h3>
              <p className="text-gray-400 mb-6">
                Competitive gaming has taught me the value of split-second decision making, team coordination, and relentless practice. I translate these skills into my development workflow.
              </p>
              <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                <p className="text-maroon-400 text-sm font-bold uppercase tracking-wider mb-1">Top Achievement</p>
                <p className="text-white font-semibold">Juara 3 SMALACUP 2k25 - PUBG Tournament</p>
              </div>
            </Card>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-24 scroll-mt-20">
          <SectionTitle icon={Briefcase}>Experience</SectionTitle>
          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="w-full md:w-48 aspect-video md:aspect-square rounded-2xl overflow-hidden glass shrink-0">
                    <img 
                      src={exp.image?.startsWith('http') ? exp.image : `/${exp.image}`} 
                      alt={exp.title} 
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://picsum.photos/seed/achievement/400/400";
                      }}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap justify-between items-center gap-2 mb-2">
                      <h3 className="text-2xl font-bold">{exp.title}</h3>
                      <span className="text-sm font-mono text-maroon-400 bg-maroon-950 px-3 py-1 rounded-full border border-maroon-900/50">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-maroon-200 font-medium mb-4">{exp.company}</p>
                    <p className="text-gray-400 text-lg leading-relaxed">{exp.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-24 scroll-mt-20">
          <SectionTitle icon={Code}>Coding Skills</SectionTitle>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="text-center py-8 group hover:bg-maroon-900/20">
                  <p className="text-maroon-400 text-xs font-bold uppercase tracking-widest mb-2 group-hover:text-maroon-300 transition-colors">
                    {skill.category}
                  </p>
                  <p className="text-xl font-bold group-hover:scale-110 transition-transform">{skill.name}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 scroll-mt-20">
          <SectionTitle icon={Send}>Get In Touch</SectionTitle>
          <div className="grid md:grid-cols-3 gap-6">
            <a 
              href={`mailto:${profile?.email}`}
              className="glass p-8 rounded-3xl flex flex-col items-center gap-4 hover:border-maroon-500 transition-all group"
            >
              <div className="p-4 rounded-2xl bg-maroon-900/30 text-maroon-400 group-hover:scale-110 transition-transform">
                <Mail size={32} />
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500 uppercase font-bold tracking-widest mb-1">Email</p>
                <p className="text-lg font-medium">{profile?.email}</p>
              </div>
            </a>
            <a 
              href={`https://instagram.com/${profile?.instagram.replace('@', '')}`}
              target="_blank"
              className="glass p-8 rounded-3xl flex flex-col items-center gap-4 hover:border-maroon-500 transition-all group"
            >
              <div className="p-4 rounded-2xl bg-maroon-900/30 text-maroon-400 group-hover:scale-110 transition-transform">
                <Instagram size={32} />
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500 uppercase font-bold tracking-widest mb-1">Instagram</p>
                <p className="text-lg font-medium">{profile?.instagram}</p>
              </div>
            </a>
            <a 
              href={`https://wa.me/${profile?.whatsapp}`}
              target="_blank"
              className="glass p-8 rounded-3xl flex flex-col items-center gap-4 hover:border-maroon-500 transition-all group"
            >
              <div className="p-4 rounded-2xl bg-maroon-900/30 text-maroon-400 group-hover:scale-110 transition-transform">
                <Phone size={32} />
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500 uppercase font-bold tracking-widest mb-1">WhatsApp</p>
                <p className="text-lg font-medium">{profile?.whatsapp}</p>
              </div>
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-32 pt-12 border-t border-white/5 text-center">
          <p className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} Davin Pangestu Kusumo. Built with Passion & Code.
          </p>
        </footer>
      </main>
    </div>
  );
}
