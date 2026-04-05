import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
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
  Send,
  ArrowUpRight,
  MapPin,
  Calendar,
  Terminal
} from 'lucide-react';
import { cn } from './lib/utils';
import { Profile, Experience, Skill, Project } from './types';

// --- Components ---

const NavItem = ({ id, icon: Icon, label, active, onClick }: any) => (
  <button
    onClick={onClick}
    className={cn(
      "relative p-3 transition-all duration-500 group rounded-full",
      active ? "text-maroon-400 bg-white/5" : "text-gray-500 hover:text-white"
    )}
  >
    <Icon size={20} />
    <span className="absolute -top-12 left-1/2 -translate-x-1/2 bg-maroon-900 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap border border-maroon-800/50">
      {label}
    </span>
    {active && (
      <motion.div
        layoutId="nav-glow"
        className="absolute inset-0 bg-maroon-500/10 blur-md rounded-full -z-10"
      />
    )}
  </button>
);

const SectionHeading = ({ title, subtitle, icon: Icon }: { title: string, subtitle?: string, icon?: any }) => (
  <div className="mb-16 space-y-4">
    <div className="flex items-center gap-3">
      {Icon && <Icon className="text-maroon-500" size={24} />}
      <span className="text-maroon-500 font-mono text-xs font-bold uppercase tracking-[0.3em]">{subtitle || "Section"}</span>
    </div>
    <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">
      {title}
    </h2>
  </div>
);

const PremiumCard = ({ children, className, glow = true }: { children: React.ReactNode, className?: string, glow?: boolean }) => (
  <div className={cn(
    "glass rounded-[2rem] p-8 relative overflow-hidden group transition-all duration-700",
    glow && "hover:border-maroon-500/30",
    className
  )}>
    {glow && (
      <div className="absolute -inset-24 bg-maroon-500/5 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
    )}
    <div className="relative z-10">{children}</div>
  </div>
);

// --- Main App ---

export default function App() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.05], [1, 0.95]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profRes, expRes, skillRes, projRes] = await Promise.all([
          fetch('/api/profile'),
          fetch('/api/experiences'),
          fetch('/api/skills'),
          fetch('/api/projects')
        ]);

        if (profRes.ok) setProfile(await profRes.json());
        if (expRes.ok) setExperiences(await expRes.json());
        if (skillRes.ok) setSkills(await skillRes.json());
        if (projRes.ok) setProjects(await projRes.json());
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 border-2 border-maroon-900/30 border-t-maroon-500 rounded-full"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-maroon-500 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-maroon-500/30 selection:text-maroon-200">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#1a0505_0%,#000_100%)] opacity-50" />
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-maroon-900/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-maroon-950/20 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      {/* Navigation */}
      <nav className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass px-4 py-2.5 rounded-[2rem] flex items-center gap-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-white/5"
        >
          {[
            { id: 'home', icon: Home, label: 'Home' },
            { id: 'about', icon: User, label: 'About' },
            { id: 'experience', icon: Briefcase, label: 'Experience' },
            { id: 'skills', icon: Code, label: 'Skills' },
            { id: 'projects', icon: Layers, label: 'Projects' },
            { id: 'contact', icon: Send, label: 'Contact' }
          ].map((tab) => (
            <NavItem
              key={tab.id}
              id={tab.id}
              icon={tab.icon}
              label={tab.label}
              active={activeSection === tab.id}
              onClick={() => scrollTo(tab.id)}
            />
          ))}
        </motion.div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex flex-col justify-center py-20">
          <motion.div style={{ opacity, scale }} className="space-y-10">
            <div className="flex items-center gap-4">
              <div className="h-[1px] w-12 bg-maroon-500" />
              <span className="text-maroon-500 font-mono text-xs font-bold uppercase tracking-[0.4em]">Available for projects</span>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-7xl md:text-[10rem] font-black uppercase leading-[0.85] tracking-tighter">
                {profile?.name.split(' ').map((word, i) => (
                  <motion.span 
                    key={i} 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="block"
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 pt-10">
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xl md:text-2xl text-gray-400 max-w-xl leading-relaxed font-light"
              >
                <span className="text-white font-medium">{profile?.tagline.split(' & ')[0]}</span> & {profile?.tagline.split(' & ')[1]}
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-8"
              >
                <div className="text-right hidden md:block">
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Based in</p>
                  <p className="text-sm font-bold">{profile?.location || "Indonesia"}</p>
                </div>
                <button 
                  onClick={() => scrollTo('projects')}
                  className="w-20 h-20 rounded-full bg-maroon-600 flex items-center justify-center group hover:scale-110 transition-all duration-500 shadow-2xl shadow-maroon-900/50"
                >
                  <ArrowUpRight size={32} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
          >
            <span className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.3em]">Scroll</span>
            <div className="w-[1px] h-16 bg-gradient-to-b from-maroon-500 to-transparent" />
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="py-40 scroll-mt-20">
          <SectionHeading title="The Story" subtitle="About Me" icon={User} />
          <div className="grid lg:grid-cols-12 gap-20 items-start">
            <div className="lg:col-span-7 space-y-10">
              <p className="text-2xl md:text-4xl font-light leading-snug text-gray-300">
                {profile?.about}
              </p>
              <div className="flex flex-wrap gap-4">
                {[
                  { icon: Github, href: profile?.github, label: 'Github' },
                  { icon: Instagram, href: `https://instagram.com/${profile?.instagram.replace('@', '')}`, label: 'Instagram' },
                  { icon: Phone, href: `https://wa.me/${profile?.whatsapp}`, label: 'WhatsApp' }
                ].map((social) => (
                  <a 
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    className="glass px-6 py-4 rounded-2xl flex items-center gap-3 hover:bg-white/10 hover:border-maroon-500/50 transition-all group"
                  >
                    <social.icon size={20} className="text-maroon-400 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-bold uppercase tracking-widest">{social.label}</span>
                  </a>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5">
              <PremiumCard className="p-0 aspect-[4/5] group">
                <img 
                  src="/profilevin.jpeg" 
                  alt="Davin" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                  onError={(e) => { (e.target as HTMLImageElement).src = "https://picsum.photos/seed/davin/800/1000"; }}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-10 left-10 space-y-2">
                  <div className="flex items-center gap-2 text-maroon-400">
                    <MapPin size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Current Location</span>
                  </div>
                  <p className="text-2xl font-black uppercase tracking-tighter">{profile?.location || "Indonesia"}</p>
                </div>
              </PremiumCard>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-40 scroll-mt-20">
          <SectionHeading title="Milestones" subtitle="Experience" icon={Briefcase} />
          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <PremiumCard className="hover:bg-white/[0.03]">
                  <div className="flex flex-col md:flex-row gap-12 items-start">
                    <div className="w-full md:w-64 aspect-video md:aspect-square rounded-3xl overflow-hidden glass shrink-0 relative group/img">
                      <img 
                        src={`/${exp.image}`} 
                        alt={exp.title} 
                        className="w-full h-full object-cover grayscale group-hover/img:grayscale-0 group-hover/img:scale-110 transition-all duration-700"
                        onError={(e) => { (e.target as HTMLImageElement).src = "https://picsum.photos/seed/achievement/500/500"; }}
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-maroon-900/20 mix-blend-overlay" />
                    </div>
                    <div className="flex-1 space-y-6">
                      <div className="flex flex-wrap justify-between items-start gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3 text-maroon-500">
                            <Trophy size={16} />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Achievement</span>
                          </div>
                          <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">{exp.title}</h3>
                        </div>
                        <div className="flex items-center gap-2 bg-maroon-950/50 border border-maroon-800/30 px-4 py-2 rounded-full">
                          <Calendar size={14} className="text-maroon-400" />
                          <span className="text-xs font-bold text-maroon-200">{exp.period}</span>
                        </div>
                      </div>
                      <p className="text-xl text-maroon-300 font-medium">{exp.company}</p>
                      <p className="text-gray-400 text-lg font-light leading-relaxed max-w-3xl">{exp.description}</p>
                    </div>
                  </div>
                </PremiumCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-40 scroll-mt-20">
          <SectionHeading title="Stack" subtitle="Skills" icon={Terminal} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <PremiumCard className="text-center py-12 group hover:bg-maroon-900/10">
                  <div className="w-12 h-12 rounded-2xl bg-maroon-900/20 flex items-center justify-center mx-auto mb-6 group-hover:bg-maroon-500 group-hover:text-white transition-all duration-500">
                    <Code size={24} />
                  </div>
                  <p className="text-maroon-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-3">{skill.category}</p>
                  <p className="text-2xl font-black uppercase tracking-tighter group-hover:scale-110 transition-transform duration-500">{skill.name}</p>
                </PremiumCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-40 scroll-mt-20">
          <SectionHeading title="Works" subtitle="Portfolio" icon={Layers} />
          <div className="grid md:grid-cols-2 gap-10">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <PremiumCard className="p-0 group cursor-pointer">
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500 delay-100">
                        <ArrowUpRight size={24} />
                      </div>
                    </div>
                  </div>
                  <div className="p-10 space-y-6">
                    <div className="flex flex-wrap gap-2">
                      {project.tags?.map(tag => (
                        <span key={tag} className="text-[9px] font-bold uppercase tracking-widest text-maroon-400 bg-maroon-950/50 px-3 py-1.5 rounded-full border border-maroon-800/30">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-3xl font-black uppercase tracking-tighter group-hover:text-maroon-400 transition-colors">{project.title}</h3>
                      <p className="text-gray-400 font-light leading-relaxed">{project.description}</p>
                    </div>
                  </div>
                </PremiumCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-40 scroll-mt-20">
          <div className="text-center space-y-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <span className="text-maroon-500 font-mono text-xs font-bold uppercase tracking-[0.5em]">Let's talk</span>
              <h2 className="text-6xl md:text-[12rem] font-black uppercase tracking-tighter leading-none mt-6">
                Get In <span className="text-gradient">Touch</span>
              </h2>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-6 pt-20">
              {[
                { icon: Mail, label: 'Email', value: profile?.email, href: `mailto:${profile?.email}` },
                { icon: Instagram, label: 'Instagram', value: profile?.instagram, href: `https://instagram.com/${profile?.instagram.replace('@', '')}` },
                { icon: Phone, label: 'WhatsApp', value: profile?.whatsapp, href: `https://wa.me/${profile?.whatsapp}` }
              ].map((item) => (
                <a 
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  className="glass p-10 rounded-[2.5rem] flex flex-col items-center gap-6 hover:border-maroon-500 transition-all group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-maroon-900/20 flex items-center justify-center text-maroon-400 group-hover:bg-maroon-500 group-hover:text-white transition-all duration-500">
                    <item.icon size={28} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{item.label}</p>
                    <p className="text-lg font-bold">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-maroon-600 flex items-center justify-center font-black italic">D</div>
            <span className="font-bold uppercase tracking-tighter">Davin Pangestu</span>
          </div>
          <p className="text-gray-600 text-[10px] font-bold uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Davin Pangestu Kusumo. All Rights Reserved.
          </p>
          <div className="flex gap-6">
            <a href={profile?.github} className="text-gray-500 hover:text-white transition-colors"><Github size={18} /></a>
            <a href={`https://instagram.com/${profile?.instagram.replace('@', '')}`} className="text-gray-500 hover:text-white transition-colors"><Instagram size={18} /></a>
          </div>
        </footer>
      </main>
    </div>
  );
}
