import React, { useState, useEffect, useRef } from 'react';

import { 
  Cpu, Crosshair, ShieldAlert, Activity, BarChart3, Layers, Wind, Zap, 
  ChevronRight, Globe, CheckCircle2, Menu, X, ArrowRight, 
  Server, TowerControl, TrainFront, Target, Hexagon, MousePointer2,
  TriangleAlert, Skull, Timer, FileWarning, TrendingDown, Ban,
  HeartPulse, Radar, Database, Wifi, Lock, Terminal, Map, Video, Thermometer,
  Maximize2, MoreHorizontal, AlertTriangle, Play, Download, Eye, RotateCw, Sun, Snowflake
} from 'lucide-react';

import { motion, useScroll, useTransform, AnimatePresence, useInView, useSpring, useMotionValue } from 'framer-motion';

// --- CONFIG & THEME ---

const BRAND = {
  name: "DRONE",
  suffix: "VISION",
  tagline: "Intelligence Aérienne Autonome"
};

// --- DATA ---

const PARTNERS = ["STEG", "Tunisie Telecom", "SNCFT", "TotalEnergies", "General Electric", "Siemens", "Airbus", "Ooredoo"];

const METRICS = [
  { label: "Inspection", value: "4x", sub: "Plus Rapide" },
  { label: "Précision IA", value: "99.8%", sub: "Taux de Détection" },
  { label: "Économies", value: "-60%", sub: "Opérationnelles" },
];

const INDUSTRIES = [
  {
    id: 'energy',
    label: 'Énergie & Utilities',
    icon: Zap,
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
    border: "border-yellow-400/20",
    title: "Inspection Thermographique & Structurelle",
    desc: "Automatisez l'inspection des lignes haute tension et des parcs solaires. Détection précoce des points chauds et micro-fissures invisibles à l'œil nu.",
    features: ["Thermographie Infrarouge", "Modélisation LiDAR", "Rapports ISO 9001"]
  },
  {
    id: 'telecom',
    label: 'Télécoms',
    icon: TowerControl,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/20",
    title: "Audit d'Actifs Verticaux",
    desc: "Jumeaux numériques de pylônes pour valider l'inventaire, l'alignement des antennes et la corrosion structurelle sans risque d'ascension.",
    features: ["Inventaire Automatisé", "Calcul d'Azimut", "Analyse de Rouille"]
  },
  {
    id: 'transport',
    label: 'Infrastructures',
    icon: TrainFront,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/20",
    title: "Génie Civil & Ouvrages d'Art",
    desc: "Surveillance millimétrique des ponts, viaducs et voies ferrées. Détection des mouvements de terrain et fissures béton évolutives.",
    features: ["Photogrammétrie HD", "Comparaison Temporelle", "Détection Fissures >0.1mm"]
  }
];

// --- UTILS COMPONENT ---

const CountUp = ({ value, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 30, stiffness: 100 });
  const [displayValue, setDisplayValue] = useState("");

  const match = typeof value === 'string' ? value.match(/^([^\d-]*)?(-?\d+(\.\d+)?)([^\d]*)$/) : null;

  useEffect(() => {
    if (match && isInView) {
      const num = parseFloat(match[2]);
      motionValue.set(num);
    } else if (typeof value === 'number' && isInView) {
      motionValue.set(value);
    }
  }, [value, isInView, match, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (match) {
        const [_, prefix = "", numStr, decimalPart, suffix = ""] = match;
        const isFloat = !!decimalPart || numStr.includes('.');
        const precision = decimalPart ? decimalPart.length - 1 : 0;
        const formatted = latest.toFixed(precision);
        setDisplayValue(`${prefix}${formatted}${suffix}`);
      } else if (typeof value === 'number') {
        setDisplayValue(Math.round(latest));
      } else {
        setDisplayValue(value);
      }
    });
  }, [springValue, match, value]);

  if (!displayValue && match) return <span ref={ref} className={className}>{match[1]}0{match[4]}</span>;
  return <span ref={ref} className={className}>{displayValue || value}</span>;
};

// --- COMPONENTS ---

const GlowButton = ({ children, primary = true, icon: Icon }) => (
  <button className={`
    relative group px-8 py-4 rounded-sm font-bold text-sm tracking-wide uppercase transition-all duration-300
    ${primary 
      ? 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-[0_0_20px_-5px_rgba(6,182,212,0.5)] hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.7)]' 
      : 'bg-transparent border border-slate-700 text-white hover:bg-slate-800 hover:border-slate-600'}
  `}>
    <span className="flex items-center gap-2 relative z-10">
      {children}
      {Icon && <Icon size={18} />}
    </span>
  </button>
);

const SectionBadge = ({ text, color = "text-cyan-400", border = "border-slate-800", bg = "bg-slate-900", dotColor = "bg-cyan-500" }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${bg} border ${border} ${color} text-[10px] font-mono uppercase tracking-[0.2em] mb-6 shadow-inner`}
  >
    <span className={`w-1.5 h-1.5 rounded-full ${dotColor} animate-pulse`}></span>
    {text}
  </motion.div>
);

const GridOverlay = () => (
  <div className="absolute inset-0 z-0 pointer-events-none">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-50" />
  </div>
);

// --- SECTIONS ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${isScrolled ? 'bg-slate-950/90 backdrop-blur-md border-slate-800 py-4' : 'bg-transparent border-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-3 group cursor-pointer">
          <img 
            src="/DroneVision_logo_workspace.png" 
            alt="DroneVision Logo" 
            className="h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="hidden md:flex items-center gap-8">
          {["Problème", "Solutions", "Plateforme", "Données", "Secteurs"].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(/é|è/g,'e').replace('à','a').replace(/ê/g,'e').replace(' ','-')}`} className="text-sm font-medium text-slate-400 hover:text-white transition-colors relative group">
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyan-500 transition-all group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: "auto", opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-slate-950 border-b border-slate-800 overflow-hidden"
          >
            <div className="p-6 space-y-4">
              {["Problème", "Solutions", "Plateforme", "Données", "Secteurs"].map((item) => (
                <a key={item} href={`#${item.toLowerCase().replace(/é|è/g,'e').replace('à','a').replace(/ê/g,'e').replace(' ','-')}`} className="block text-lg font-medium text-slate-300">{item}</a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const [activeAnomaly, setActiveAnomaly] = useState(0);
  const anomalies = [
    { id: 0, x: "68%", y: "35%", type: "CRITIQUE", title: "Corrosion Sévère", conf: "98.4%", grade: "Grade A", color: "text-red-500", border: "border-red-500", bg: "bg-red-500", rec: "Intervention immédiate requise." },
    { id: 1, x: "45%", y: "62%", type: "WARNING", title: "Boulon Manquant", conf: "87.2%", grade: "Grade B", color: "text-orange-500", border: "border-orange-500", bg: "bg-orange-500", rec: "Planifier inspection visuelle." }
  ];
  const currentAlert = anomalies.find(a => a.id === activeAnomaly) || anomalies[0];

  return (
    <section className="relative min-h-screen flex items-center pt-20 bg-slate-950 overflow-hidden selection:bg-cyan-500/30">
      <GridOverlay />
      <div className="absolute top-1/4 -left-64 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[128px]" />
      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-12 gap-12 items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/50 border border-slate-800 text-cyan-400 text-xs font-medium mb-8 backdrop-blur-sm">
            <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span></span>
            Nouveau : Inspection LiDAR Autonome v3.0
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">Révélez l'invisible.<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">Anticipez le futur.</span></h1>
          <p className="text-lg text-slate-400 mb-10 max-w-xl leading-relaxed">La première plateforme unifiée combinant <strong>Drones Autonomes</strong> et <strong>Intelligence Artificielle</strong> pour sécuriser vos infrastructures critiques. Zéro risque humain. Précision millimétrique.</p>
          <div className="grid grid-cols-3 gap-8 border-t border-slate-800 pt-8">
            {METRICS.map((m, i) => (<div key={i}><div className="text-3xl font-bold text-white mb-1"><CountUp value={m.value} /></div><div className="text-sm text-slate-500 font-medium">{m.label}</div><div className="text-xs text-cyan-500/70 mt-1">{m.sub}</div></div>))}
          </div>
        </motion.div>
        <motion.div style={{ y: y1 }} className="lg:col-span-5 relative h-[500px] w-full">
          <div className="absolute inset-0 bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl group">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-60 transition-transform duration-1000 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50" />
            {anomalies.map((anom) => (
              <motion.div key={anom.id} className="absolute z-20 cursor-crosshair group/spot" style={{ top: anom.y, left: anom.x }} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 1 + anom.id * 0.5 }} onMouseEnter={() => setActiveAnomaly(anom.id)}>
                <div className={`relative w-12 h-12 border-2 ${anom.border} opacity-80 group-hover/spot:opacity-100 transition-opacity`}><div className={`absolute inset-0 ${anom.bg} opacity-20 animate-pulse`} /><div className={`absolute -top-1 -left-1 w-1.5 h-1.5 border-t-2 border-l-2 ${anom.border}`} /><div className={`absolute -top-1 -right-1 w-1.5 h-1.5 border-t-2 border-r-2 ${anom.border}`} /><div className={`absolute -bottom-1 -left-1 w-1.5 h-1.5 border-b-2 border-l-2 ${anom.border}`} /><div className={`absolute -bottom-1 -right-1 w-1.5 h-1.5 border-b-2 border-r-2 ${anom.border}`} /><div className={`absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900/90 px-1.5 py-0.5 rounded border ${anom.border} shadow-lg backdrop-blur-sm`}><span className={`text-[8px] font-bold tracking-wider ${anom.color} animate-pulse`}>{anom.type} DETECTED</span></div></div>
              </motion.div>
            ))}
            <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none z-10">
              <div className="flex justify-between items-start font-mono text-[10px] text-cyan-400/80"><div className="space-y-1"><div className="flex items-center gap-2"><div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"/> REC 00:14:23</div><div>CAM_01 [MAIN]</div><div>ISO 800 • F/2.8</div></div><div className="text-right space-y-1"><div>BAT 82%</div><div>GPS LOCK [12 SAT]</div><div>SIG -84dBm</div></div></div>
              <div className="absolute inset-0 flex items-center justify-center"><div className="relative w-64 h-64 border border-cyan-500/10 rounded-full flex items-center justify-center"><div className="absolute inset-0 border-t border-b border-cyan-500/30 w-64 h-64 rounded-full animate-[spin_8s_linear_infinite]" /><div className="w-1.5 h-1.5 bg-cyan-400/50 rounded-full" /><div className="absolute top-1/2 w-full h-px bg-cyan-500/10" /><div className="absolute left-1/2 h-full w-px bg-cyan-500/10" /><motion.div animate={{ top: ["10%", "80%", "40%", "10%"], left: ["10%", "30%", "70%", "10%"], opacity: [0, 0.5, 0.5, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "linear" }} className="absolute w-16 h-16 border border-white/20 rounded-sm" /></div></div>
              <div className="flex justify-between items-end font-mono text-[10px] text-cyan-400/80"><div className="flex gap-4"><div>ALT: 142M</div><div>SPD: 12M/S</div></div><div className="w-32 h-8 border border-cyan-500/30 rounded bg-slate-900/50 relative overflow-hidden"><div className="absolute inset-0 bg-cyan-500/20" style={{ width: '45%' }} /><div className="flex items-end justify-between h-full px-1 pb-1">{[...Array(10)].map((_, i) => (<motion.div key={i} animate={{ height: ["20%", "80%", "40%"] }} transition={{ duration: 0.5 + Math.random(), repeat: Infinity }} className="w-1 bg-cyan-400/50 rounded-full" />))}</div></div></div>
            </div>
          </div>
          <motion.div key={activeAnomaly} initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.3 }} className="absolute -left-12 bottom-20 bg-slate-950/90 backdrop-blur-md p-5 rounded-xl border border-slate-800 shadow-2xl z-30 max-w-[260px] ring-1 ring-white/10">
            <div className="flex items-center gap-3 mb-4 border-b border-slate-800 pb-3"><div className={`${currentAlert.bg}/20 p-2 rounded-lg border ${currentAlert.border}/20`}><ShieldAlert className={`${currentAlert.color} w-5 h-5`} /></div><div><div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Alerte Détectée</div><div className="text-sm text-white font-bold">{currentAlert.title}</div></div></div>
            <div className="space-y-3"><div className="flex justify-between items-center text-[11px]"><span className="text-slate-400">Confiance IA</span><span className="text-white font-mono font-bold bg-slate-800 px-1.5 py-0.5 rounded"><CountUp value={currentAlert.conf} /></span></div><div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: currentAlert.conf }} transition={{ duration: 1, ease: "easeOut" }} className={`h-full ${currentAlert.bg}`} /></div><div className="bg-slate-900 rounded p-2 border border-slate-800 mt-2"><div className="text-[10px] text-slate-500 leading-tight"><span className={`${currentAlert.color} font-bold`}>Recommandation:</span> {currentAlert.rec}</div></div></div>
            <div className={`absolute top-0 right-0 w-3 h-3 border-t border-r ${currentAlert.border}`} /><div className={`absolute bottom-0 left-0 w-3 h-3 border-b border-l ${currentAlert.border}`} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const Partners = () => (
  <div className="bg-slate-950 border-y border-slate-900 py-10 overflow-hidden relative">
    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-950 to-transparent z-10" />
    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-950 to-transparent z-10" />
    <div className="flex items-center gap-16 animate-[marquee_30s_linear_infinite] whitespace-nowrap">
      {[...PARTNERS, ...PARTNERS, ...PARTNERS].map((p, i) => (
        <span key={i} className="text-xl font-bold text-slate-700 uppercase tracking-widest hover:text-slate-500 transition-colors cursor-default">{p}</span>
      ))}
    </div>
    <style>{`
      @keyframes marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-100%); }
      }
    `}</style>
  </div>
);

const ProblemSection = () => (
  <section id="probleme" className="py-32 bg-slate-950 relative overflow-hidden">
    <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-red-900/10 rounded-full blur-[128px] pointer-events-none" />
    <div className="container mx-auto px-6 relative z-10">
      <div className="text-center mb-16">
        <SectionBadge text="LE PROBLÈME" color="text-red-400" border="border-red-900/30" bg="bg-red-950/10" dotColor="bg-red-500" />
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
          L'Inspection Manuelle est <br className="hidden md:block" />
          <span className="text-white">Obsolète.</span>
        </h2>
        <p className="text-lg text-slate-400">Danger humain, coûts exorbitants et données incomplètes.</p>
      </div>
      <div className="grid lg:grid-cols-2 gap-8 items-stretch">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 md:p-12 relative overflow-hidden flex flex-col justify-center group">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="mb-8 relative"><div className="w-16 h-16 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/20 relative z-10"><TriangleAlert className="text-red-500 w-8 h-8" /></div><div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full animate-pulse" /></div>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">Coût Humain</h3>
          <div className="relative pl-6 mb-8 border-l-4 border-red-500"><p className="text-slate-300 text-lg italic leading-relaxed">"Chaque année, des milliers de techniciens risquent leur vie sur des infrastructures instables ou à haute tension."</p></div>
          <div className="flex flex-wrap gap-4 mt-auto"><div className="flex items-center gap-2 px-4 py-2 rounded border border-red-500/30 bg-red-500/5 text-red-400 text-xs font-bold uppercase tracking-wider"><Skull size={14} /> Risque Mortel</div><div className="flex items-center gap-2 px-4 py-2 rounded border border-red-500/30 bg-red-500/5 text-red-400 text-xs font-bold uppercase tracking-wider"><Ban size={14} /> Arrêt Production</div></div>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[{ val: "$1.2T", label: "PERTES ANNUELLES", sub: "Défaillances infra.", color: "text-blue-400", icon: TrendingDown }, { val: "1000+", label: "ACCIDENTS/AN", sub: "Chutes & risques.", color: "text-white", icon: Skull }, { val: "46-S", label: "DÉLAIS RAPPORTS", sub: "Semaines vs Heures.", color: "text-white", icon: Timer }, { val: "30%", label: "DONNÉES PERDUES", sub: "Erreur humaine.", color: "text-white", icon: FileWarning }].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-slate-900/30 border border-slate-800 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-slate-800/50 transition-colors hover:border-slate-700 group">
              <item.icon className="text-slate-600 w-6 h-6 mb-4 group-hover:text-slate-400 transition-colors" />
              <div className={`text-4xl md:text-5xl font-extrabold mb-2 ${item.color}`}><CountUp value={item.val} /></div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{item.label}</div>
              <div className="text-xs text-slate-600">{item.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const Features = () => (
  <section id="solutions" className="py-32 bg-slate-950 relative">
    <div className="container mx-auto px-6">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <SectionBadge text="Technologie" />
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">L'Intelligence Artificielle au service <br/> de la <span className="text-cyan-400">Maintenance Prédictive</span></h2>
        <p className="text-slate-400 text-lg">Notre stack technologique propriétaire transforme les données brutes en plans d'action stratégiques.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { icon: Cpu, title: "Deep Learning Embarqué", desc: "Traitement des images en temps réel directement sur le drone (Edge AI). Détection instantanée des anomalies sans latence cloud." },
          { icon: Layers, title: "Jumeaux Numériques", desc: "Reconstruction 3D photogrammétrique pour créer une réplique virtuelle exacte de vos infrastructures consultable sur navigateur." },
          { icon: Activity, title: "Analyses Temporelles", desc: "Comparaison automatique des inspections successives (4D) pour suivre l'évolution précise d'une fissure ou de la rouille dans le temps." }
        ].map((f, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2 }} className="group p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:bg-slate-900 hover:border-cyan-500/30 transition-all hover:shadow-2xl hover:shadow-cyan-500/10">
            <div className="w-14 h-14 rounded-xl bg-slate-800 flex items-center justify-center mb-6 group-hover:bg-cyan-500 group-hover:scale-110 transition-all duration-300"><f.icon className="text-cyan-400 group-hover:text-slate-950 w-7 h-7 transition-colors" /></div>
            <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
            <p className="text-slate-400 leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const IndustriesTab = () => {
  const [active, setActive] = useState('energy');
  const data = INDUSTRIES.find(i => i.id === active);
  return (
    <section id="secteurs" className="py-24 bg-slate-900 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/3">
            <SectionBadge text="Applications" />
            <h2 className="text-4xl font-bold text-white mb-8">Expertise <br/>Sectorielle</h2>
            <div className="space-y-3">
              {INDUSTRIES.map((ind) => (
                <button key={ind.id} onClick={() => setActive(ind.id)} className={`w-full text-left p-4 rounded-xl border flex items-center gap-4 transition-all duration-300 ${active === ind.id ? `bg-slate-800 ${ind.border} shadow-lg` : 'bg-transparent border-transparent hover:bg-slate-800/50'}`}>
                  <div className={`p-2 rounded-lg ${active === ind.id ? ind.bg : 'bg-slate-800'}`}><ind.icon className={`w-6 h-6 ${active === ind.id ? ind.color : 'text-slate-500'}`} /></div>
                  <span className={`font-bold text-lg ${active === ind.id ? 'text-white' : 'text-slate-500'}`}>{ind.label}</span>
                  {active === ind.id && <ChevronRight className="ml-auto text-white" size={16} />}
        </button>
              ))}
            </div>
          </div>
          <div className="lg:w-2/3">
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }} className="h-full bg-slate-950 rounded-3xl p-8 md:p-12 border border-slate-800 relative overflow-hidden shadow-2xl">
                <div className={`absolute -right-10 -bottom-10 opacity-5 ${data.color}`}><data.icon size={300} /></div>
                <h3 className="text-3xl font-bold text-white mb-4">{data.title}</h3>
                <p className="text-lg text-slate-400 mb-10 leading-relaxed max-w-xl">{data.desc}</p>
                <div className="grid sm:grid-cols-3 gap-4 mb-10">
                  {data.features.map((feat, i) => (<div key={i} className="flex items-center gap-3 text-sm text-slate-300 font-medium bg-slate-900/50 p-3 rounded border border-slate-800"><CheckCircle2 size={16} className={data.color.replace('text-', 'text-')} /> {feat}</div>))}
                </div>
                <button className={`flex items-center gap-2 font-bold transition-colors ${data.color} hover:text-white`}>Découvrir les cas d'usage {data.label} <ArrowRight size={18} /></button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- PERFECTED INTERACTIVE DASHBOARD DEMO ---

const InteractiveDashboard = () => {
  const [activeTab, setActiveTab] = useState('map'); // 'map', 'camera', 'analytics'
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [thermalMode, setThermalMode] = useState(false);
  const [actionStatus, setActionStatus] = useState(null);
  const [showTutorial, setShowTutorial] = useState(true);

  const assets = [
    { id: 1, type: "Pylône HT", status: "critical", lat: "30%", lng: "20%", health: 42, temp: "68°C", lastScan: "Il y a 2 min" },
    { id: 2, type: "Éolienne", status: "warning", lat: "60%", lng: "50%", health: 78, temp: "45°C", lastScan: "Il y a 10 min" },
    { id: 3, type: "Panneau Solaire", status: "ok", lat: "20%", lng: "70%", health: 98, temp: "32°C", lastScan: "Il y a 1h" },
  ];

  // Auto-select first critical asset for demo if nothing selected
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!selectedAsset && showTutorial) {
        // Optional: Pulse effect logic here
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [selectedAsset, showTutorial]);

  const handleAction = (action) => {
    setActionStatus(action);
    setTimeout(() => setActionStatus(null), 2500);
  };

  const handleAssetClick = (asset) => {
    setSelectedAsset(asset);
    setShowTutorial(false);
  };

  return (
    <section id="plateforme" className="py-32 bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-slate-900/20 -skew-y-6 origin-top-left scale-110 z-0 pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header Text */}
        <div className="text-center mb-16">
          <SectionBadge text="DÉMO INTERACTIVE" dotColor="bg-green-500" />
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Le Centre de Contrôle</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Explorez notre interface opérationnelle. Cliquez sur les actifs pour analyser leur état en temps réel.
          </p>
        </div>

        {/* Dashboard Window Container */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-xl border border-slate-700 bg-slate-900 shadow-2xl overflow-hidden max-w-6xl mx-auto flex flex-col h-[700px] relative"
        >
          {/* Toast Notification */}
          <AnimatePresence>
            {actionStatus && (
               <motion.div 
                 initial={{ y: -50, opacity: 0 }}
                 animate={{ y: 20, opacity: 1 }}
                 exit={{ y: -50, opacity: 0 }}
                 className="absolute top-0 left-1/2 -translate-x-1/2 z-50 bg-emerald-500 text-slate-950 px-6 py-2 rounded-full font-bold shadow-lg flex items-center gap-2"
               >
                 <CheckCircle2 size={18} />
                 {actionStatus === 'scan' ? 'Scan LiDAR lancé avec succès' : 'Rapport généré et envoyé'}
               </motion.div>
            )}
          </AnimatePresence>

          {/* Window Title Bar */}
          <div className="h-10 bg-slate-800 border-b border-slate-700 flex items-center justify-between px-4 select-none z-30 relative">
             <div className="flex gap-2">
               <div className="w-3 h-3 rounded-full bg-red-500/50" />
               <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
               <div className="w-3 h-3 rounded-full bg-green-500/50" />
             </div>
             <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
               <Lock size={10} /> app.dronevision.io / mission-control
             </div>
             <div className="flex gap-3 text-slate-400">
               <MoreHorizontal size={14} />
             </div>
          </div>

          {/* Main Layout */}
          <div className="flex flex-1 overflow-hidden relative">
            
            {/* Sidebar */}
            <div className="w-16 bg-slate-950 border-r border-slate-800 flex flex-col items-center py-6 gap-6 z-20">
              <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400 mb-4"><Target size={20} /></div>
              {['map', 'camera', 'analytics'].map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`p-2 rounded-lg transition-all relative ${activeTab === tab ? 'bg-slate-800 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  {tab === 'map' && <Map size={20} />}
                  {tab === 'camera' && <Video size={20} />}
                  {tab === 'analytics' && <BarChart3 size={20} />}
                  
                  {/* Active Indicator */}
                  {activeTab === tab && <motion.div layoutId="active-tab" className="absolute left-0 top-2 bottom-2 w-1 bg-cyan-500 rounded-r-full" />}
                </button>
              ))}
              <div className="mt-auto text-slate-600"><Server size={20} /></div>
            </div>

            {/* Central Viewport */}
            <div className="flex-1 relative bg-slate-950 overflow-hidden group">
              
              <AnimatePresence mode="wait">
                {activeTab === 'map' && (
                  <motion.div 
                    key="map"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-slate-950"
                  >
                    {/* Map Background */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1e293b_0%,#020617_100%)]" />
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-[size:40px_40px]" />
                    
                    {/* Tutorial Hint */}
                    <AnimatePresence>
                      {showTutorial && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none"
                        >
                          <div className="bg-cyan-500/90 text-slate-950 px-4 py-2 rounded-full font-bold text-sm shadow-[0_0_30px_rgba(6,182,212,0.5)] animate-bounce">
                            👆 Cliquez sur un actif
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Assets on Map */}
                    {assets.map(asset => (
                      <motion.button
                        key={asset.id}
                        style={{ top: asset.lat, left: asset.lng }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none"
                        onClick={() => handleAssetClick(asset)}
                        whileHover={{ scale: 1.2 }}
                      >
                        {/* Scanning Radar Effect around selected asset */}
                        {selectedAsset?.id === asset.id && (
                          <div className="absolute -inset-8 border border-cyan-500/30 rounded-full animate-ping opacity-50" />
                        )}
                        
                        <div className={`relative w-4 h-4 rounded-full border-2 border-white shadow-lg ${asset.status === 'critical' ? 'bg-red-500' : asset.status === 'warning' ? 'bg-orange-500' : 'bg-green-500'}`} />
                        
                        {/* Tooltip */}
                        <div className="absolute top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-xs px-2 py-1 rounded border border-slate-700 whitespace-nowrap z-10 pointer-events-none flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${asset.status === 'critical' ? 'bg-red-500' : asset.status === 'warning' ? 'bg-orange-500' : 'bg-green-500'}`} />
                          {asset.type}
                        </div>
                      </motion.button>
                    ))}

                    {/* Drone Moving + Path */}
                    <svg className="absolute inset-0 pointer-events-none opacity-30">
                       <path d="M 100 100 Q 250 200 400 300 T 600 100" fill="none" stroke="cyan" strokeWidth="1" strokeDasharray="5,5" />
                    </svg>
                    <motion.div 
                      animate={{ x: [100, 400, 600, 100], y: [100, 300, 100, 100] }}
                      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                      className="absolute w-8 h-8 flex items-center justify-center pointer-events-none"
                    >
                       <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[12px] border-b-cyan-400 transform -rotate-45 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
                       <div className="absolute w-32 h-32 border border-cyan-500/10 rounded-full animate-ping" />
                       {/* Scan Cone */}
                       <div className="absolute top-full left-1/2 -translate-x-1/2 w-16 h-32 bg-gradient-to-b from-cyan-500/20 to-transparent [clip-path:polygon(50%_0%,_0%_100%,_100%_100%)]" />
                    </motion.div>

                    <div className="absolute bottom-6 left-6 bg-slate-900/90 backdrop-blur p-3 rounded-lg border border-slate-800 text-xs font-mono text-slate-400">
                       <div>LAT: 36.8065 N</div>
                       <div>LNG: 10.1815 E</div>
                       <div className="text-emerald-500 mt-1 flex items-center gap-1"><Wifi size={10} /> CONNECTÉ</div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'camera' && (
                  <motion.div key="camera" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black">
                    <div
                      className="absolute inset-0 bg-[url('/anomalie.jpg')] bg-cover bg-center transition-all duration-500"
                      style={{
                        filter: thermalMode ? 'contrast(1.2) saturate(1.5) hue-rotate(180deg) invert(1)' : 'none',
                        opacity: 0.8
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50" />
                    
                    {/* Camera UI Overlay */}
                    <div className="absolute top-4 right-4 flex gap-2 z-20">
                       <button 
                         onClick={() => setThermalMode(!thermalMode)}
                         className={`px-3 py-1 text-xs font-bold rounded flex items-center gap-2 transition-colors ${thermalMode ? 'bg-orange-500 text-white' : 'bg-slate-800 text-slate-300'}`}
                       >
                         {thermalMode ? <Sun size={12}/> : <Snowflake size={12}/>}
                         {thermalMode ? 'THERMAL' : 'OPTICAL'}
                       </button>
                       <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded animate-pulse">LIVE</span>
                    </div>

                  </motion.div>
                )}

                {activeTab === 'analytics' && (
                   <motion.div key="analytics" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900 p-8 flex flex-col items-center justify-center">
                      {/* Fake Charts */}
                      <div className="w-full max-w-lg grid grid-cols-2 gap-8">
                        <div className="bg-slate-950 p-4 rounded border border-slate-800">
                          <h4 className="text-xs text-slate-400 mb-4">DÉFAUTS PAR MOIS</h4>
                          <div className="flex items-end justify-between h-32 gap-2">
                            {[30, 50, 45, 70, 90, 60, 80].map((h, i) => (
                              <motion.div 
                                key={i}
                                initial={{ height: 0 }}
                                animate={{ height: `${h}%` }}
                                transition={{ delay: i * 0.1, type: 'spring' }}
                                className="w-full bg-cyan-500/50 rounded-t"
                              />
                            ))}
                          </div>
                        </div>
                        <div className="bg-slate-950 p-4 rounded border border-slate-800">
                           <h4 className="text-xs text-slate-400 mb-4">COUVERTURE RÉSEAU</h4>
                           <div className="relative h-32 flex items-center justify-center">
                              <svg viewBox="0 0 100 100" className="w-24 h-24 rotate-[-90deg]">
                                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#1e293b" strokeWidth="10" />
                                <motion.circle 
                                  cx="50" cy="50" r="40" fill="transparent" stroke="#10b981" strokeWidth="10" 
                                  strokeDasharray="251.2" strokeDashoffset="251.2"
                                  animate={{ strokeDashoffset: 50 }} // ~80%
                                  transition={{ duration: 1.5, ease: "easeOut" }}
                                />
                              </svg>
                              <div className="absolute text-xl font-bold text-white">80%</div>
                           </div>
                        </div>
                      </div>
                   </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Inspector Panel (Right Side) */}
            <div className="w-80 bg-slate-900 border-l border-slate-800 p-6 flex flex-col z-20 relative shadow-2xl">
               <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-6 flex items-center gap-2">
                 <Activity size={14} /> Données Temps Réel
               </h3>

               {selectedAsset ? (
                 <motion.div 
                   initial={{ opacity: 0, x: 20 }} 
                   animate={{ opacity: 1, x: 0 }} 
                   key={selectedAsset.id}
                   className="space-y-6"
                 >
                   <div>
                     <div className="text-2xl font-bold text-white mb-1 flex justify-between items-center">
                        {selectedAsset.type}
                        <span className="text-sm font-mono text-slate-500">#{selectedAsset.id}</span>
                     </div>
                     <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold uppercase ${
                        selectedAsset.status === 'critical' ? 'bg-red-500/10 text-red-500' : 
                        selectedAsset.status === 'warning' ? 'bg-orange-500/10 text-orange-500' : 'bg-emerald-500/10 text-emerald-500'
                     }`}>
                       {selectedAsset.status === 'critical' ? <AlertTriangle size={10} /> : <CheckCircle2 size={10} />}
                       {selectedAsset.status === 'critical' ? 'Critique' : selectedAsset.status === 'warning' ? 'Attention' : 'Opérationnel'}
                     </div>
                   </div>

                   {/* History Graph Sparkline */}
                   <div className="bg-slate-950 p-3 rounded border border-slate-800">
                     <div className="flex justify-between text-sm mb-2">
                       <span className="text-slate-400 text-xs">Historique Santé (7j)</span>
                       <span className={`text-xs font-bold ${selectedAsset.health < 100 ? 'text-red-400' : 'text-emerald-400'}`}>
                         {selectedAsset.health < 100 ? '-2%' : '+0%'}
                       </span>
                     </div>
                     <div className="flex items-end gap-1 h-10">
                       {[80, 85, 82, 80, 75, 60, selectedAsset.health].map((val, i) => (
                         <div key={i} className="w-full bg-slate-800 rounded-sm overflow-hidden relative h-full">
                            <motion.div 
                              initial={{ height: 0 }}
                              animate={{ height: `${val}%` }}
                              className={`absolute bottom-0 w-full ${val < 50 ? 'bg-red-500' : 'bg-cyan-500'}`}
                            />
                         </div>
                       ))}
                     </div>
                   </div>

                   <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                         <div className="bg-slate-950 p-3 rounded border border-slate-800 text-center">
                            <Thermometer size={16} className="text-slate-500 mx-auto mb-1" />
                            <div className="text-lg font-bold text-white">{selectedAsset.temp}</div>
                            <div className="text-[10px] text-slate-500 uppercase">Température</div>
                         </div>
                         <div className="bg-slate-950 p-3 rounded border border-slate-800 text-center">
                            <Timer size={16} className="text-slate-500 mx-auto mb-1" />
                            <div className="text-sm font-bold text-white mt-1">{selectedAsset.lastScan.replace("Il y a ", "")}</div>
                            <div className="text-[10px] text-slate-500 uppercase">Dernier Scan</div>
                         </div>
                      </div>
                   </div>

                   <div className="bg-slate-950 p-4 rounded border border-slate-800">
                      <h4 className="text-xs font-bold text-white mb-2">Actions Rapides</h4>
                      <div className="flex flex-col gap-2">
                        <button 
                          onClick={() => handleAction('scan')}
                          className="w-full py-2 bg-cyan-500/10 text-cyan-400 text-xs font-bold rounded hover:bg-cyan-500/20 transition-colors flex items-center justify-center gap-2 group"
                        >
                          <RotateCw size={12} className="group-hover:animate-spin"/> Lancer Scan Détaillé
                        </button>
                        <button 
                          onClick={() => handleAction('report')}
                          className="w-full py-2 bg-slate-800 text-slate-300 text-xs font-bold rounded hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
                        >
                          <Download size={12}/> Générer Rapport PDF
                        </button>
                      </div>
                   </div>

                 </motion.div>
               ) : (
                 <div className="flex-1 flex flex-col items-center justify-center text-center text-slate-500">
                    <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
                      <MousePointer2 size={24} className="opacity-50 animate-pulse" />
                    </div>
                    <p className="text-sm font-medium text-white">Aucun actif sélectionné</p>
                    <p className="text-xs mt-2 max-w-[150px]">Cliquez sur un marqueur sur la carte pour voir l'analyse IA.</p>
                 </div>
               )}
               
               <div className="mt-auto pt-6 border-t border-slate-800">
                  <div className="flex justify-between items-center text-xs text-slate-500">
                     <span>Système: <span className="text-emerald-500">En Ligne</span></span>
                     <span>v2.4.1</span>
                  </div>
               </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

const LiveTelemetrySection = () => {
  const [logs, setLogs] = useState([
    { time: "14:20:01", event: "Drone #4A connect to Relay", type: "info" },
    { time: "14:20:05", event: "LiDAR Scan initiated", type: "info" },
    { time: "14:20:12", event: "Thermal anomaly detected (Sector 7)", type: "warning" },
  ]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      const newLog = { 
        time: new Date().toLocaleTimeString(), 
        event: Math.random() > 0.7 ? "Data packet uploaded (12MB)" : "Telemetry sync OK", 
        type: "success" 
      };
      setLogs(prev => [...prev.slice(-4), newLog]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="donnees" className="py-24 bg-slate-950 border-t border-slate-900 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
             <SectionBadge text="TELEMETRY STREAM" color="text-emerald-400" border="border-emerald-900/30" bg="bg-emerald-950/10" dotColor="bg-emerald-500" />
             <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">Vos Données.<br/><span className="text-emerald-400">En Temps Réel.</span></h2>
             <p className="text-slate-400 text-lg mb-8">Ne travaillez plus sur des archives. DroneVision stream les données de vol et d'inspection instantanément vers vos serveurs ou notre cloud sécurisé.</p>
             <div className="space-y-6">
               {[{ icon: Wifi, title: "Transmission Ultra-Low Latency", desc: "Protocoles optimisés pour la 4G/5G." }, { icon: Database, title: "Archivage Automatique", desc: "Sauvegarde redondante et versioning des scans." }, { icon: Lock, title: "Chiffrement de Bout en Bout", desc: "Normes militaires AES-256." }].map((item, i) => (
                 <div key={i} className="flex gap-4"><div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 text-emerald-400"><item.icon size={20} /></div><div><h4 className="text-white font-bold text-sm">{item.title}</h4><p className="text-slate-500 text-sm">{item.desc}</p></div></div>
               ))}
             </div>
          </div>
          <div className="lg:w-1/2 w-full">
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} className="bg-slate-950 border border-slate-800 rounded-xl shadow-2xl overflow-hidden font-mono text-sm relative group">
              <div className="bg-slate-900 p-3 border-b border-slate-800 flex justify-between items-center"><div className="flex items-center gap-2 text-slate-400"><Terminal size={14} /><span>live_feed.sh</span></div><div className="flex gap-1"><div className="w-2 h-2 bg-slate-700 rounded-full" /><div className="w-2 h-2 bg-slate-700 rounded-full" /></div></div>
              <div className="p-6 bg-black/50 min-h-[300px] relative">
                <div className="mb-6 pb-6 border-b border-slate-800/50"><div className="flex justify-between text-xs text-slate-500 mb-2"><span>BANDWIDTH USAGE</span><span className="text-emerald-400"><CountUp value="24.5 MB/s" /></span></div><div className="flex items-end justify-between h-16 gap-1">{[...Array(20)].map((_, i) => (<motion.div key={i} animate={{ height: ["10%", "60%", "30%", "90%"] }} transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: i * 0.1 }} className="w-full bg-emerald-500/20 rounded-sm" />))}</div></div>
                <div className="space-y-2"><div className="text-xs text-slate-500 mb-2">SYSTEM LOGS</div>{logs.map((log, i) => (<motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className={`flex gap-3 border-l-2 pl-3 ${log.type === 'warning' ? 'border-yellow-500 text-yellow-200' : log.type === 'success' ? 'border-emerald-500 text-emerald-200' : 'border-slate-700 text-slate-300'}`}><span className="opacity-50">{log.time}</span><span>{log.event}</span></motion.div>))}</div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent opacity-50 pointer-events-none animate-scan" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CTA = () => (
  <section className="py-32 bg-slate-950 relative border-t border-slate-900 flex flex-col items-center text-center px-6">
    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-950 z-0" />
    <div className="relative z-10 max-w-4xl">
      <div className="mb-8 flex justify-center">
        <div className="p-3 bg-cyan-500/10 rounded-full border border-cyan-500/20 text-cyan-400"><MousePointer2 size={32} /></div>
      </div>
      <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-8 tracking-tight">Ne subissez plus les pannes.<br /><span className="text-cyan-400">Prenez le contrôle.</span></h2>
      <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">Rejoignez les leaders industriels qui ont réduit leurs coûts de maintenance de 60% tout en sauvant des vies.</p>
      <div className="mt-12 text-sm text-slate-500 flex items-center justify-center gap-6">
        <span className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-500"/> Pas de carte requise</span>
        <span className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-500"/> Déploiement rapide</span>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-slate-950 pt-20 pb-10 border-t border-slate-900">
    <div className="container mx-auto px-6">
      <div className="grid md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-6"><Target className="text-cyan-400" /><span className="text-xl font-bold text-white">DRONE<span className="text-cyan-400">VISION</span></span></div>
          <p className="text-slate-500 max-w-xs leading-relaxed mb-6">La référence en inspection d'infrastructures par drones autonomes et intelligence artificielle.</p>
          <div className="flex gap-4">{[1,2,3,4].map(i => <div key={i} className="w-8 h-8 bg-slate-900 rounded flex items-center justify-center text-slate-500 hover:bg-cyan-500 hover:text-slate-950 transition-colors cursor-pointer"><Globe size={14} /></div>)}</div>
        </div>
        <div><h4 className="text-white font-bold mb-6">Produit</h4><ul className="space-y-3 text-sm text-slate-500"><li className="hover:text-cyan-400 cursor-pointer">Technologie</li><li className="hover:text-cyan-400 cursor-pointer">Sécurité</li><li className="hover:text-cyan-400 cursor-pointer">Intégrations</li><li className="hover:text-cyan-400 cursor-pointer">Tarification</li></ul></div>
        <div><h4 className="text-white font-bold mb-6">Entreprise</h4><ul className="space-y-3 text-sm text-slate-500"><li className="hover:text-cyan-400 cursor-pointer">À Propos</li><li className="hover:text-cyan-400 cursor-pointer">Carrières <span className="text-xs bg-cyan-500/20 text-cyan-400 px-1.5 py-0.5 rounded ml-2">Hiring</span></li><li className="hover:text-cyan-400 cursor-pointer">Blog</li><li className="hover:text-cyan-400 cursor-pointer">Contact</li></ul></div>
      </div>
      <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between text-xs text-slate-600">
        <div>&copy; 2024 DroneVision Systems Inc. Tous droits réservés.</div>
        <div className="flex gap-6 mt-4 md:mt-0"><span className="hover:text-slate-400 cursor-pointer">Confidentialité</span><span className="hover:text-slate-400 cursor-pointer">Conditions</span><span className="hover:text-slate-400 cursor-pointer">Plan du site</span></div>
      </div>
    </div>
  </footer>
);

// --- APP ---

const App = () => {
  return (
    <div className="bg-slate-950 min-h-screen font-sans text-slate-200 selection:bg-cyan-500/30 selection:text-cyan-100 overflow-x-hidden">
      <style>{`
        html {
          scroll-behavior: smooth;
        }
        section[id] {
          scroll-margin-top: 100px;
        }
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .animate-scan {
          animation: scan 3s linear infinite;
        }
      `}</style>
      <Navbar />
      <main>
        <Hero />
        <Partners />
        <ProblemSection />
        <Features />
        <IndustriesTab />
        <InteractiveDashboard />
        <LiveTelemetrySection />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default App;
