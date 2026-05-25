import { useState, useMemo, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  User,
  GraduationCap,
  Award,
  BookOpen,
  Briefcase,
  Compass,
  Search,
  Copy,
  Check,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CheckCircle,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Sliders,
  Send,
  Zap,
  BookMarked,
  Printer,
  Sparkles,
  Info
} from 'lucide-react';
import {
  PERSONAL_INFO,
  EXECUTIVE_SUMMARY,
  EDUCATIONS,
  CERTIFICATIONS,
  EXPERIENCES,
  PROJECTS_GALLERY,
  EDUCATOR_PHILOSOPHY,
  FORMULA_CATALOGUE,
  CourseProject,
  FormulaCard
} from './data';

export default function App() {
  // UI State Managers
  const [lang, setLang] = useState<"en" | "mm">("mm");
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  
  // Formulas Sandbox State
  const [formulaValue, setFormulaValue] = useState<number>(5); // Default value for sliders
  const [activeFormulaId, setActiveFormulaId] = useState<string>("form-2"); // Default is Newton's Second Law

  // Inquiry Form State
  const [formName, setFormName] = useState("");
  const [formContact, setFormContact] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [formInterest, setFormInterest] = useState("IGCSE Math (0606)");
  const [formToast, setFormToast] = useState<string | null>(null);

  // Active Main Section Index Scroll Tracker
  const [activeSection, setActiveSection] = useState("about");

  // Handle Copy Clipboard
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    showToast(lang === "mm" ? `${label} ကို Clipboard သို့ ကူးယူပြီးပါပြီ` : `${label} copied to clipboard!`);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Toast System
  const showToast = (message: string) => {
    setFormToast(message);
    setTimeout(() => {
      setFormToast(null);
    }, 3000);
  };

  // Handle Submission of Inquiry form
  const handleSubmitInquiry = (e: FormEvent) => {
    e.preventDefault();
    if (!formName || !formContact) {
      showToast(lang === "mm" ? "ကျေးဇူးပြု၍ အမည်နှင့် ဆက်သွယ်ရန်အချက်အလက် ဖြည့်စွက်ပါ" : "Please provide name and contact info!");
      return;
    }
    
    // Simulate submission success
    showToast(lang === "mm" ? "စုံစမ်းမေးမြန်းမှုအောင်မြင်ပါသည်။ ဆရာမိုးကိုထွန်းမှ မကြာမီပြန်လည်ဆက်သွယ်ပါမည်။" : "Inquiry submitted! Teacher Moe Ko Tun will reach back shortly.");
    setFormName("");
    setFormContact("");
    setFormMessage("");
  };

  // Handle theme toggling
  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
  };

  // Synchronize HTML root element class with the current state
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // Dynamic Filtering for the Project / Curriculum Gallery
  const filteredCourses = useMemo(() => {
    return PROJECTS_GALLERY.filter((course) => {
      // Filter by subject
      if (selectedSubjectFilter !== "all" && course.subject !== selectedSubjectFilter) {
        return false;
      }
      // Filter by search query
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchesTitle = course.title.toLowerCase().includes(query) || course.myanmarTitle.includes(query);
        const matchesDesc = course.description.toLowerCase().includes(query) || course.myanmarDescription.includes(query);
        const matchesLevel = course.level.toLowerCase().includes(query);
        const matchesSyllabus = course.syllabusCode.toLowerCase().includes(query);
        const matchesTopics = course.keyTopics.some((t) => t.toLowerCase().includes(query));
        return matchesTitle || matchesDesc || matchesLevel || matchesSyllabus || matchesTopics;
      }
      return true;
    });
  }, [selectedSubjectFilter, searchQuery]);

  // Dynamic formula calculation helper for Sandbox
  const calculatedFormulaResult = useMemo(() => {
    const activeFormula = FORMULA_CATALOGUE.find((f) => f.id === activeFormulaId);
    if (!activeFormula) return { label: "", value: "" };

    if (activeFormula.baseFormulaEx === "roots") {
      // Solve ax^2 + 5x + 4 = 0 where a is the variable
      const a = formulaValue || 1;
      const b = 5;
      const c = 4;
      const discriminant = b * b - 4 * a * c;
      if (discriminant < 0) {
        return { label: `Roots of ${a}x² + 5x + 4 = 0`, value: "Complex Roots (No intersection with x-axis)" };
      } else {
        const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
        return { label: `Real Roots for ${a}x² + 5x + 4 = 0`, value: `x₁ = ${root1.toFixed(2)}, x₂ = ${root2.toFixed(2)}` };
      }
    } else if (activeFormula.baseFormulaEx === "force") {
      // F = m * a, where mass is varying, assume constant Acceleration a = 9.81 m/s²
      const mass = formulaValue;
      const acc = 9.81;
      const force = mass * acc;
      return { label: `Force F = ${mass}kg × 9.81m/s²`, value: `${force.toFixed(2)} Newtons (N)` };
    } else if (activeFormula.baseFormulaEx === "euler") {
      // Exponential representation e^(i*theta). theta varies
      const rad = (formulaValue / 10) * Math.PI; // slice PI
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);
      return { label: `e^(i × ${formulaValue}π/10)`, value: `${cos.toFixed(2)} + ${sin.toFixed(2)}i (Magnitude = 1.00)` };
    } else if (activeFormula.baseFormulaEx === "massenergy") {
      // E = m * c^2, mass in grams. c = 3 * 10^8 m/s
      const massKg = formulaValue / 1000; // grams to kg
      const c = 3e8;
      const energyJoules = massKg * c * c;
      return { label: `Energy output for ${formulaValue}g of mass`, value: `${energyJoules.toExponential(3)} Joules` };
    }
    return { label: "", value: "" };
  }, [activeFormulaId, formulaValue]);

  // Handle PDF/Print trigger
  const handlePrint = () => {
    window.print();
  };

  // Section items for side-navigation
  const navigationItems = [
    { id: "about", mm: "ကိုယ်ရေးအကျဉ်းချုပ်", en: "Executive Summary", icon: User },
    { id: "personal", mm: "ကိုယ်ရေးအချက်အလက်", en: "Personal Info", icon: Info },
    { id: "education", mm: "ပညာရေးရမှတ်များ", en: "Academic Background", icon: GraduationCap },
    { id: "certifications", mm: "လိုင်စင်နှင့်လက်မှတ်များ", en: "Certifications", icon: Award },
    { id: "gallery", mm: "သင်ရိုးညွှန်းတမ်းပြခန်း", en: "Program Gallery", icon: BookMarked },
    { id: "experience", mm: "လုပ်ငန်းအတွေ့အကြုံ", en: "Teaching History", icon: Briefcase },
    { id: "sandbox", mm: "သီအိုရီပုံဖော်ခန်း", en: "STEM Sandbox", icon: Sliders },
    { id: "contact", mm: "ဆက်သွယ်မေးမြန်းရန်", en: "Get In Touch", icon: Mail },
  ];

  // Auto-scroll logic observer to highlight correctly
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const item of navigationItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0f172a] text-[#f1f5f9]' : 'bg-[#f8fafc] text-[#334155]'}`}>
      
      {/* Dynamic Background Atmospheric Radiance (Hidden in print mode) */}
      <div className="absolute top-0 right-0 w-[45vw] h-[45vw] rounded-full bg-gradient-to-br from-[#818cf8]/5 to-transparent blur-3xl pointer-events-none print:hidden" />
      <div className="absolute top-[30vh] left-0 w-[35vw] h-[35vw] rounded-full bg-gradient-to-tr from-[#818cf8]/5 to-transparent blur-3xl pointer-events-none print:hidden" />

      {/* Modern High-End Top Navigation (Static in print) */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-[#0f172a]/80 border-b border-slate-200 dark:border-slate-800/80 shadow-sm transition-colors duration-300 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          
          {/* Logo / Brand Name */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollToId("about")}>
            <div className="w-10 h-10 rounded bg-[#1e293b] border border-[#334155] flex items-center justify-center text-[#818cf8] font-black tracking-tighter text-lg shadow-sm">
              MK
            </div>
            <div>
              <h1 className="text-md sm:text-base font-extrabold tracking-tight text-slate-800 dark:text-slate-100 flex items-center font-sans">
                {PERSONAL_INFO.nameMM}
                <span className="hidden sm:inline-block text-[10px] text-[#818cf8] border border-[#818cf8]/30 bg-[#818cf8]/5 rounded-sm px-2 py-0.5 ml-2 font-semibold">
                  Math & Physics
                </span>
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {PERSONAL_INFO.name} • Specialist Educator
              </p>
            </div>
          </div>

          {/* Quick Control Center */}
          <div className="flex items-center space-x-3">
            
            {/* Quick Language Toggle */}
            <button
              onClick={() => {
                setLang(lang === "mm" ? "en" : "mm");
                showToast(lang === "mm" ? "Switched to English context" : "မြန်မာဘာသာသို့ ပြောင်းလဲလိုက်ပါပြီ");
              }}
              className="flex items-center space-x-1 px-3 py-1.5 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-[#818cf8] border border-slate-200 dark:border-slate-700 transition-all cursor-pointer text-xs font-semibold"
              title="Toggle Language"
            >
              <span>{lang === "mm" ? "English 🇬🇧" : "မြန်မာဘာသာ 🇲🇲"}</span>
            </button>

            {/* Dark Mode Switcher */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all cursor-pointer"
              title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={theme}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                >
                  {theme === "light" ? "🌙" : "☀️"}
                </motion.span>
              </AnimatePresence>
            </button>

            {/* Print Resume Shortcut */}
            <button
              onClick={handlePrint}
              className="p-2 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-[#818cf8] hover:text-white transition-all cursor-pointer"
              title={lang === "mm" ? "PDF/စာရွက်ထုတ်ရန်" : "Print Portfolio / Save PDF"}
            >
              <Printer className="w-5 h-5" />
            </button>

          </div>
        </div>
      </header>

      {/* Main Core Layout Grid (Desktop: 2 Columns - 1 left sidebar, 1 right content panel) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Floating Print-Header Notification Banner */}
        <div className="hidden print:block text-slate-950 bg-slate-100 p-6 border border-slate-300 mb-10 rounded text-center">
          <h1 className="text-2xl font-bold">{PERSONAL_INFO.nameMM} • {PERSONAL_INFO.name}</h1>
          <p className="text-sm font-medium">{PERSONAL_INFO.titleEN} • {PERSONAL_INFO.experienceYears} Years Experience</p>
          <p className="text-xs text-slate-600 mt-1">{PERSONAL_INFO.emails[0]} | {PERSONAL_INFO.phones.join(" / ")} | Residence: Yangon, Myanmar</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* L1: Left Sticky Panel (Interactive side directory) */}
          <aside className="lg:col-span-3 sticky top-24 space-y-6 hidden lg:block print:hidden pb-10">
            <div className={`p-5 rounded border transition-colors duration-300 ${theme === 'dark' ? 'bg-[#1e293b] border-slate-700' : 'bg-white border-slate-200'} shadow-sm`}>
              
              <div className="text-center mb-6">
                <div className="w-20 h-20 mx-auto rounded-sm bg-gradient-to-tr from-[#818cf8] to-[#4f46e5] text-white font-extrabold text-2xl flex items-center justify-center shadow-md mb-3">
                  U MK
                </div>
                <h2 className="text-base font-bold text-slate-800 dark:text-slate-100 leading-tight">
                  {lang === "mm" ? PERSONAL_INFO.nameMM : PERSONAL_INFO.name}
                </h2>
                <span className="text-xs text-[#818cf8] font-semibold block mt-1">
                  {lang === "mm" ? "Math & Physics Master" : "STEM Specialist Educator"}
                </span>
              </div>

              {/* Navigation Menu */}
              <nav className="space-y-1">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToId(item.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded text-xs font-semibold text-left transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#818cf8] text-white shadow-sm'
                          : 'text-slate-600 dark:text-slate-300 hover:bg-[#818cf8]/10 hover:text-[#818cf8]'
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className="truncate">{lang === "mm" ? item.mm : item.en}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Compact Contact Quick links */}
              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400">
                  <Mail className="w-3.5 h-3.5" />
                  <span className="truncate hover:underline" onClick={() => handleCopy(PERSONAL_INFO.emails[0], "Email")}>
                    {PERSONAL_INFO.emails[0]}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400">
                  <Phone className="w-3.5 h-3.5" />
                  <span>{PERSONAL_INFO.phones[0]}</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span className="line-clamp-1">{lang === "mm" ? "ရွှေလင်ပန်း၊ လှိုင်သာယာ" : "Yangon, Myanmar"}</span>
                </div>
              </div>

              {/* Experience metrics widget */}
              <div className="mt-4 p-3 bg-[#818cf8]/5 dark:bg-[#818cf8]/10 rounded border border-[#818cf8]/20">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-600 dark:text-slate-300">{lang === "mm" ? "သင်ကြားမှုသက်တမ်း" : "Exp. Years"}</span>
                  <span className="text-[#818cf8]">{PERSONAL_INFO.experienceYears} {lang === "mm" ? "နှစ်တာ" : "Years"}</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-1 rounded mt-1.5 overflow-hidden">
                  <div className="bg-[#818cf8] h-full" style={{ width: '100%' }} />
                </div>
              </div>

            </div>
          </aside>

          {/* L2: Right Detail Work Panel */}
          <main className="lg:col-span-9 space-y-12 pb-24">

            {/* Mobile Header Hero (Hidden in desktop and print) */}
            <div className={`p-6 rounded border text-center relative overflow-hidden lg:hidden print:hidden transition-colors duration-300 ${theme === 'dark' ? 'bg-[#1e293b] border-slate-800' : 'bg-white border-slate-200'}`}>
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#818cf8]/15 rounded blur-2xl pointer-events-none" />
              <div className="w-16 h-16 mx-auto rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-[#818cf8] text-xl border border-slate-200 dark:border-slate-700 mb-3 shadow-inner">
                MK
              </div>
              <h2 className="text-xl font-black text-slate-900 dark:text-slate-50">
                {lang === "mm" ? PERSONAL_INFO.nameMM : PERSONAL_INFO.name}
              </h2>
              <p className="text-xs text-[#818cf8] font-semibold mt-1">
                {lang === "mm" ? PERSONAL_INFO.titleMM : PERSONAL_INFO.titleEN}
              </p>
              
              <div className="mt-4 flex flex-wrap gap-2 justify-center text-xs">
                <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-medium font-sans">
                  🌟 {PERSONAL_INFO.experienceYears}+ {lang === "mm" ? "နှစ်တာ" : "Years Experience"}
                </span>
                <span className="px-3 py-1 bg-emerald-50 dark:bg-emerald-950/20 rounded border border-emerald-100 dark:border-emerald-800/40 text-emerald-800 dark:text-emerald-300 font-semibold font-sans">
                  ✓ MOE Registered No. 005960
                </span>
              </div>
            </div>

            {/* SECTION 1: ABOUT (EXECUTIVE SUMMARY) */}
            <section id="about" className="scroll-mt-24">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-1.5 h-6 bg-[#818cf8] rounded-full" />
                <h3 className="text-lg font-black tracking-tight uppercase text-neutral-800 dark:text-neutral-100 font-sans">
                  {lang === "mm" ? "၁။ ကိုယ်ရေးအကျဉ်းချုပ် (Executive Summary)" : "1. Executive Summary"}
                </h3>
              </div>

              <div className={`p-6 sm:p-8 rounded border leading-relaxed text-justify relative transition-colors duration-300 ${theme === 'dark' ? 'bg-[#1e293b] border-slate-700/80 text-slate-300' : 'bg-white border-slate-200 text-neutral-600'}`}>
                
                {/* Visual quote indicator */}
                <div className="text-6xl text-[#818cf8]/10 font-serif absolute top-4 left-4 pointer-events-none">“</div>
                
                <p className="text-sm sm:text-base relative z-10 font-normal leading-relaxed">
                  {lang === "mm" ? EXECUTIVE_SUMMARY.mm : EXECUTIVE_SUMMARY.en}
                </p>

                {/* Micro pillars summarizing his expertise */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-stone-100 dark:border-slate-800">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div className="text-left font-sans">
                      <p className="text-xs font-bold text-neutral-900 dark:text-neutral-100">16+ Years</p>
                      <p className="text-[10px] text-neutral-500 dark:text-neutral-400 font-sans">Total Teaching Tenure</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-sky-500/10 text-sky-400 flex items-center justify-center shrink-0">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div className="text-left font-sans">
                      <p className="text-xs font-bold text-neutral-900 dark:text-neutral-100">Official Exam update</p>
                      <p className="text-[10px] text-neutral-500 dark:text-neutral-400 font-sans">Cambridge Additional Math</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                    <div className="text-left font-sans">
                      <p className="text-xs font-bold text-neutral-900 dark:text-neutral-100">MOE License 005960</p>
                      <p className="text-[10px] text-neutral-500 dark:text-neutral-400 font-sans">High School Teacher Permit</p>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* SECTION 2: PERSONAL INFORMATION */}
            <section id="personal" className="scroll-mt-24">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-1.5 h-6 bg-[#818cf8] rounded-full" />
                <h3 className="text-lg font-black tracking-tight uppercase text-neutral-800 dark:text-neutral-100 font-sans">
                  {lang === "mm" ? "၂။ ကိုယ်ရေးအချက်အလက်များ" : "2. Personal Specifications"}
                </h3>
              </div>

              <div className={`border rounded overflow-hidden transition-colors duration-300 ${theme === 'dark' ? 'border-slate-700 bg-[#1e293b]' : 'bg-white border-slate-200'}`}>
                
                {/* Structured details table */}
                <div className="divide-y divide-stone-100 dark:divide-slate-800">
                  
                  {/* Name */}
                  <div className="grid grid-cols-1 md:grid-cols-3 p-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <span className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 font-sans">
                      {lang === "mm" ? "အမည်" : "Full Name"}
                    </span>
                    <span className="md:col-span-2 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 font-sans">
                      {PERSONAL_INFO.nameMM} ({PERSONAL_INFO.name})
                    </span>
                  </div>

                  {/* Father's Name */}
                  <div className="grid grid-cols-1 md:grid-cols-3 p-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <span className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 font-sans">
                      {lang === "mm" ? "ဖခင်အမည်" : "Father's Name"}
                    </span>
                    <span className="md:col-span-2 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                      {PERSONAL_INFO.fatherNameMM} ({PERSONAL_INFO.fatherName})
                    </span>
                  </div>

                  {/* Date of Birth */}
                  <div className="grid grid-cols-1 md:grid-cols-3 p-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <span className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 font-sans">
                      {lang === "mm" ? "မွေးသက္ကရာဇ်" : "Date of Birth"}
                    </span>
                    <span className="md:col-span-2 text-xs sm:text-sm text-slate-800 dark:text-slate-200 flex items-center space-x-2 font-sans">
                      <Calendar className="w-3.5 h-3.5 text-[#818cf8]" />
                      <span>{lang === "mm" ? PERSONAL_INFO.dobMM : PERSONAL_INFO.dob}</span>
                    </span>
                  </div>

                  {/* National ID */}
                  <div className="grid grid-cols-1 md:grid-cols-3 p-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <span className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 font-sans">
                      {lang === "mm" ? "နိုင်ငံသားစိစစ်ရေးကတ်အမှတ်" : "National Registration Card (NRC)"}
                    </span>
                    <span className="md:col-span-2 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-mono">
                      {lang === "mm" ? PERSONAL_INFO.nrcMM : PERSONAL_INFO.nrc}
                    </span>
                  </div>

                  {/* Address */}
                  <div className="grid grid-cols-1 md:grid-cols-3 p-4 hover:bg-stone-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <span className="text-xs sm:text-sm font-semibold text-neutral-500 dark:text-neutral-400">
                      {lang === "mm" ? "နေရပ်လိပ်စာ" : "Permanent Address"}
                    </span>
                    <span className="md:col-span-2 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 font-normal leading-relaxed">
                      {lang === "mm" ? PERSONAL_INFO.addressMM : PERSONAL_INFO.address}
                    </span>
                  </div>

                  {/* Email & Contact Details with Dynamic Copy Action */}
                  <div className="grid grid-cols-1 md:grid-cols-3 p-4 hover:bg-stone-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <span className="text-xs sm:text-sm font-semibold text-neutral-500 dark:text-neutral-400">
                      {lang === "mm" ? "ဆက်သွယ်ရန် အီးမေးလ်" : "Personal Email"}
                    </span>
                    <div className="md:col-span-2 flex items-center justify-between text-xs sm:text-sm text-[#818cf8] font-semibold break-all font-sans">
                      <a href={`mailto:${PERSONAL_INFO.emails[0]}`} className="hover:underline">
                        {PERSONAL_INFO.emails[0]}
                      </a>
                      <button
                        onClick={() => handleCopy(PERSONAL_INFO.emails[0], "Email")}
                        className="ml-2 p-1.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-[#818cf8] hover:bg-[#818cf8]/10 transition-all cursor-pointer"
                        title="Copy Email"
                      >
                        {copiedText === "Email" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Phone contacts */}
                  <div className="grid grid-cols-1 md:grid-cols-3 p-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors/20">
                    <span className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 font-sans">
                      {lang === "mm" ? "ဖုန်းနံပါတ်များ" : "Primary Phone Numbers"}
                    </span>
                    <div className="md:col-span-2 flex flex-col space-y-2">
                      {PERSONAL_INFO.phones.map((phone, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                          <span className="font-mono">{phone}</span>
                          <button
                            onClick={() => handleCopy(phone, `${lang === "mm" ? "ဖုန်းနံပါတ်" : "Phone"} ${idx + 1}`)}
                            className="p-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-[#818cf8] hover:bg-[#818cf8]/10 transition-all cursor-pointer"
                            title="Copy Phone"
                          >
                            {copiedText === `${lang === "mm" ? "ဖုန်းနံပါတ်" : "Phone"} ${idx + 1}` ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            </section>

            {/* SECTION 3: ACADEMIC BACKGROUND */}
            <section id="education" className="scroll-mt-24">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-1.5 h-6 bg-[#818cf8] rounded-full" />
                <h3 className="text-lg font-black tracking-tight uppercase text-neutral-800 dark:text-neutral-100 font-sans">
                  {lang === "mm" ? "၃။ ပညာရေးနောက်ခံ (Educational Background)" : "3. Academic Accreditations"}
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {EDUCATIONS.map((edu, idx) => (
                  <motion.div
                    key={edu.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    className={`p-6 rounded border transition-colors duration-300 relative ${theme === 'dark' ? 'bg-[#1e293b] border-slate-700' : 'bg-white border-slate-200'}`}
                  >
                    <div className="absolute top-4 right-4 text-xs font-extrabold text-[#818cf8] bg-[#818cf8]/10 px-3 py-1 rounded border border-[#818cf8]/20 font-sans">
                      {edu.year}
                    </div>

                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 rounded bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-tight font-sans">
                          {lang === "mm" ? edu.degreeMM : edu.degree}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5 font-sans">
                          {edu.institution}
                        </p>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 ml-1 leading-relaxed mt-2 font-sans">
                      {edu.details}
                    </p>

                    {edu.specialNote && (
                      <div className="mt-3 p-3 bg-[#818cf8]/5 dark:bg-[#818cf8]/10 border-l-2 border-[#818cf8] rounded text-xs text-slate-700 dark:text-slate-200 font-sans">
                        <span className="font-bold">{lang === "mm" ? "အထူးထောက်ခံချက်:" : "Academic Note:"}</span> {edu.specialNote}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </section>

            {/* SECTION 4: PROFESSIONAL LICENSES & PERMITS */}
            <section id="certifications" className="scroll-mt-24">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-1.5 h-6 bg-[#818cf8] rounded-full" />
                <h3 className="text-lg font-black tracking-tight uppercase text-neutral-800 dark:text-neutral-100 font-sans">
                  {lang === "mm" ? "၄။ သက်မွေးဝမ်းကျောင်းဆိုင်ရာ အသိအမှတ်ပြုလုပ်ငန်းဝင်ခွင့်များ" : "4. Professional Licenses & Certifications"}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {CERTIFICATIONS.map((cert) => (
                  <div
                    key={cert.id}
                    className={`p-5 rounded border flex flex-col justify-between transition-colors duration-300 ${theme === 'dark' ? 'bg-[#1e293b] border-slate-700' : 'bg-white border-slate-200'}`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-bold text-[#818cf8] uppercase tracking-wider bg-[#818cf8]/10 px-2.5 py-0.5 rounded font-sans">
                          {cert.date}
                        </span>
                        <Award className="w-4 h-4 text-[#818cf8]" />
                      </div>

                      <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 leading-snug font-sans">
                        {lang === "mm" ? cert.titleMM : cert.title}
                      </h4>
                      
                      <p className="text-[11px] text-indigo-500 dark:text-indigo-400 font-semibold mt-1 font-sans">
                        {cert.issuer}
                      </p>

                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-3 font-sans">
                        {cert.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between font-sans">
                      <span className="text-[10px] text-slate-400 font-mono">Verified Credential</span>
                      <span className="text-emerald-500 dark:text-emerald-400 flex items-center space-x-1 text-xs font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span>{lang === "mm" ? "တရားဝင်အတည်ပြုပြီး" : "Active status"}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 5: PROJECT / CURRICULUM GALLERY (SPECIAL PROGRAM CATALOGUE) */}
            <section id="gallery" className="scroll-mt-24">
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-1.5 h-6 bg-[#818cf8] rounded-full" />
                  <h3 className="text-lg font-black tracking-tight uppercase text-neutral-800 dark:text-neutral-100 font-sans">
                    {lang === "mm" ? "၅။ သင်ကြားမှုပြခန်း (Syllabus & Course Projects)" : "5. Course Design & Program Gallery"}
                  </h3>
                </div>

                {/* Subject Selector Filters */}
                <div className="flex flex-wrap gap-1">
                  {["all", "Mathematics", "Physics", "STEM & Robotics"].map((sub) => (
                    <button
                      key={sub}
                      onClick={() => {
                        setSelectedSubjectFilter(sub);
                        setSelectedProject(null); // Close any expanded cards
                      }}
                      className={`px-3 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                        selectedSubjectFilter === sub
                          ? 'bg-[#818cf8] text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-[#818cf8]/10 hover:text-[#818cf8]'
                      }`}
                    >
                      {sub === "all" ? (lang === "mm" ? "အားလုံး" : "All Subject") : sub}
                    </button>
                  ))}
                </div>
              </div>

              {/* Live search bar */}
              <div className="relative mb-6">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder={lang === "mm" ? "သင်ခန်းစာများ သို့မဟုတ် သော့ချက်စာလုံးဖြင့် ရှာရန်... (ဥပမာ Calculus, SAT, Core)" : "Search programs or topics... (e.g. Calculus, IB, SAT)"}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded border focus:outline-none focus:ring-1 focus:ring-[#818cf8] focus:border-[#818cf8] transition-colors ${
                    theme === 'dark' ? 'bg-[#1e293b] border-slate-700 text-slate-100' : 'bg-white border-slate-200'
                  }`}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-2.5 text-xs text-stone-400 hover:text-stone-600 cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Dynamic Course Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredCourses.map((course) => {
                    const isExpanded = selectedProject === course.id;
                    return (
                      <motion.div
                        key={course.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className={`p-6 rounded border flex flex-col justify-between transition-all ${
                          isExpanded 
                            ? 'md:col-span-2 ring-2 ring-[#818cf8]' 
                            : 'hover:shadow-md'
                        } ${theme === 'dark' ? 'bg-[#1e293b] border-slate-700' : 'bg-white border-slate-200'}`}
                      >
                        <div>
                          
                          {/* Subject Header Badge */}
                          <div className="flex items-center justify-between mb-2">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                              course.subject === "Mathematics" 
                                ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/20 dark:text-indigo-300' 
                                : course.subject === "Physics" 
                                ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/20 dark:text-blue-300' 
                                : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-300'
                            }`}>
                              {course.subject}
                            </span>
                            <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 font-semibold">{course.syllabusCode}</span>
                          </div>

                          <h4 className="text-base font-black text-slate-800 dark:text-neutral-50 leading-tight font-sans">
                            {lang === "mm" ? course.myanmarTitle : course.title}
                          </h4>
                          <p className="text-xs text-slate-400 font-medium mt-1 font-sans">Level: {course.level}</p>

                          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-3 leading-relaxed font-sans">
                            {lang === "mm" ? course.myanmarDescription : course.description}
                          </p>

                          {/* Interactive Expansion details */}
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4 text-xs overflow-hidden font-sans"
                              >
                                {/* Key topics covered */}
                                <div>
                                  <h5 className="font-bold text-slate-850 dark:text-neutral-100 flex items-center space-x-1.5">
                                    <span className="w-1.5 h-1.5 rounded bg-[#818cf8]"></span>
                                    <span>{lang === "mm" ? "အဓိကသင်ရိုး အကျဉ်းချုပ်:" : "Core Curricular Focus:"}</span>
                                  </h5>
                                  <div className="flex flex-wrap gap-1.5 mt-2">
                                    {course.keyTopics.map((topic, i) => (
                                      <span key={i} className="bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded text-slate-600 dark:text-slate-300">
                                        {topic}
                                      </span>
                                    ))}
                                  </div>
                                </div>

                                {/* Custom Books recommended */}
                                <div>
                                  <h5 className="font-bold text-slate-800 dark:text-neutral-100 font-sans">
                                    {lang === "mm" ? "အဓိကဖတ်ရှုရမည့် ကျောင်းသုံးပြဌာန်းစာအုပ်:" : "Standard Recommended Texts:"}
                                  </h5>
                                  <p className="italic text-neutral-500 dark:text-neutral-400 mt-1">
                                    {course.recommendedBooks.join(", ")}
                                  </p>
                                </div>

                                {/* Technology & Interactive Tools utilized */}
                                <div>
                                  <h5 className="font-bold text-slate-800 dark:text-neutral-100 font-sans">
                                    {lang === "mm" ? "နည်းပညာအသုံးပြု သင်ကြားမှုနည်းလမ်းစနစ်:" : "Assisted Technology & Media:"}
                                  </h5>
                                  <div className="flex flex-wrap gap-1.5 mt-1.5 font-sans">
                                    {course.toolsUsed.map((tool, i) => (
                                      <span key={i} className="text-indigo-500 dark:text-indigo-400 font-medium bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                                        {tool}
                                      </span>
                                    ))}
                                  </div>
                                </div>

                                {/* Metrics panel */}
                                <div className="p-3 rounded bg-emerald-50 dark:bg-emerald-950/20 border-l-2 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-sans">
                                  <span className="font-bold">{lang === "mm" ? "သင်ကြားမှု အောင်မြင်မှု မှတ်တမ်း:" : "Student Benchmark Success Metric:"}</span><br />
                                  <span className="text-xs">{course.successMetric}</span>
                                </div>

                              </motion.div>
                            )}
                          </AnimatePresence>

                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between font-sans">
                          <button
                            onClick={() => {
                              setSelectedProject(isExpanded ? null : course.id);
                              // Auto enroll suggestion in form interest selection automatically!
                              setFormInterest(course.title);
                            }}
                            className="text-[#818cf8] hover:text-[#6366f1] text-xs font-bold cursor-pointer flex items-center space-x-1"
                          >
                            <span>{isExpanded ? (lang === "mm" ? "အသေးစိတ်ပိတ်ရန်" : "Close Details") : (lang === "mm" ? "အသေးစိတ် ဖတ်ရှုရန်" : "Syllabus Breakdowns")}</span>
                            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                          </button>

                          <a
                            href="#contact"
                            onClick={() => {
                              setFormInterest(course.title);
                              scrollToId("contact");
                            }}
                            className="bg-[#818cf8] hover:bg-[#6366f1] text-white text-[10px] font-extrabold px-3 py-1 rounded shadow-sm hover:scale-105 transition-all text-center flex items-center space-x-1"
                          >
                            <span>{lang === "mm" ? "စုံစမ်းမည်" : "Inquire"}</span>
                            <ArrowRight className="w-2.5 h-2.5" />
                          </a>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>

                {filteredCourses.length === 0 && (
                  <div className="col-span-1 md:col-span-2 text-center py-10 bg-slate-50 dark:bg-slate-800/40 rounded border border-dashed border-slate-200 dark:border-slate-700 font-sans">
                    <p className="text-slate-400 text-xs sm:text-sm">
                      {lang === "mm" ? "ရှာဖွေတွေ့ရှိသည့် သင်ရိုးစာရင်းမရှိပါ။" : "No specialized programs found matching search query."}
                    </p>
                    <button
                      onClick={() => { setSearchQuery(""); setSelectedSubjectFilter("all"); }}
                      className="mt-2 text-xs text-[#818cf8] font-bold underline"
                    >
                      Clear queries
                    </button>
                  </div>
                )}
              </div>
            </section>

            {/* SECTION 6: WORK HISTORY (Timeline model) */}
            <section id="experience" className="scroll-mt-24">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-1.5 h-6 bg-[#818cf8] rounded-full" />
                <h3 className="text-lg font-black tracking-tight uppercase text-neutral-800 dark:text-neutral-100 font-sans">
                  {lang === "mm" ? "၆။ လုပ်ငန်းအတွေ့အကြုံ (Academic Records & History)" : "6. Classroom & Leadership Experience"}
                </h3>
              </div>

              {/* Vertical line timeline layout */}
              <div className="relative border-l border-slate-200 dark:border-slate-800 ml-4 pl-6 space-y-10">
                {EXPERIENCES.map((exp) => (
                  <div key={exp.id} className="relative block">
                    
                    {/* Circle target marker */}
                    <span className="absolute -left-[30px] top-1 w-4 h-4 rounded-full bg-[#818cf8] border-4 border-white dark:border-[#0f172a] shadow-sm animate-pulse" />

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                      <span className="text-xs font-bold text-indigo-500 dark:text-indigo-400 tracking-wider uppercase font-mono">
                        {exp.period}
                      </span>
                      <span className="text-[10px] text-slate-500 bg-slate-100 dark:bg-slate-800 dark:text-slate-400 font-semibold px-2 py-0.5 rounded self-start font-sans">
                        {exp.institution}
                      </span>
                    </div>

                    <h4 className="text-base font-extrabold text-slate-900 dark:text-slate-100 leading-tight font-sans">
                      {lang === "mm" ? exp.roleMM : exp.role}
                    </h4>
                    <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold mt-0.5 font-sans">
                      {lang === "mm" ? exp.institutionMM : exp.institution}
                    </p>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-350 mt-2 font-normal leading-relaxed text-justify font-sans">
                      {exp.description}
                    </p>

                    {/* Work bullet highlights */}
                    <ul className="mt-3 space-y-1.5 text-xs text-slate-500 dark:text-slate-400 font-sans">
                      {exp.highlights.map((high, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-[#818cf8] shrink-0 mt-0.5">✓</span>
                          <span>{high}</span>
                        </li>
                      ))}
                    </ul>

                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 7: INTERACTIVE STEM SANDBOX (Interactive formula explorer representing his philosophy) */}
            <section id="sandbox" className="scroll-mt-24">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-1.5 h-6 bg-[#818cf8] rounded-full" />
                <h3 className="text-lg font-black tracking-tight uppercase text-neutral-800 dark:text-neutral-100 font-sans">
                  {lang === "mm" ? "၇။ သင်္ချာနှင့်ရူပဗေဒ သီအိုရီပုံဖော်ခန်း (STEM Formula Sandbox)" : "7. Educator's Philosophy & STEM Formula Sandbox"}
                </h3>
              </div>

              {/* Description explanation of Sandbox */}
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed font-sans">
                {lang === "mm" 
                  ? "ဆရာမိုးကိုထွန်း၏ ဒဿနဖြစ်သော 'သီအိုရီများကို မျက်စိဖြင့်မြင်သာအောင်ပုံဖော်ခြင်း' ကို လက်တွေ့ သရုပ်ပြရန် ဖော်မြူလာကတ်များကို ရွေးချယ်ပြီး ဆလိုက်ဒါကို ရွှေ့ကာ တန်ဖိုးများကို အပြန်အလှန် တွက်ချက်ကြည့်ပါ။"
                  : "To experience Teacher Moe Ko Tun's philosophy of \"visualizing abstract theories\", click on any formula card below to load our interactive solver and manipulate values in real-time."}
              </p>

              {/* Sandbox Container */}
              <div className={`p-6 sm:p-8 rounded border transition-all duration-300 ${theme === 'dark' ? 'bg-[#1e293b]/90 border-slate-700' : 'bg-white border-slate-200'}`}>
                
                {/* Formulas List selectors */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 font-sans">
                  {FORMULA_CATALOGUE.map((form) => {
                    const isSelected = activeFormulaId === form.id;
                    return (
                      <button
                        key={form.id}
                        onClick={() => {
                          setActiveFormulaId(form.id);
                          // Reset variable default values for specific variables
                          if (form.interactiveVariable === "a") setFormulaValue(3);
                          else if (form.interactiveVariable === "m") setFormulaValue(5);
                          else if (form.interactiveVariable === "rad") setFormulaValue(5);
                          else if (form.interactiveVariable === "m_energy") setFormulaValue(10);
                        }}
                        className={`p-3 rounded border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#818cf8] text-white border-[#818cf8] shadow-inner'
                            : 'bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 hover:text-slate-900 text-slate-600 dark:text-slate-300 border-slate-100 dark:border-slate-800'
                        }`}
                      >
                        <span className="text-[10px] uppercase font-bold tracking-wider opacity-85 block mb-1">
                          {form.category}
                        </span>
                        <h4 className="text-xs font-bold leading-tight line-clamp-2">
                          {form.name.split(" ")[0]} {form.name.split(" ")[1] || ""}
                        </h4>
                        <span className="font-mono text-[10px] mt-2 block opacity-90 truncate">
                          {form.expression}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Active Solver Playground */}
                {(() => {
                  const activeFormObj = FORMULA_CATALOGUE.find((f) => f.id === activeFormulaId);
                  if (!activeFormObj) return null;
                  return (
                    <div className="p-4 sm:p-6 rounded bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 font-sans">
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 mb-4">
                        <div>
                          <span className="text-[10px] font-bold text-[#818cf8] uppercase tracking-widest block font-sans">Interactive Sandbox Solver</span>
                          <h4 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-stone-100 mt-1 font-sans">
                            {activeFormObj.name}
                          </h4>
                        </div>
                        <span className="text-xs sm:text-sm font-black font-mono bg-[#818cf8]/10 text-[#818cf8] px-3 py-1 rounded border border-[#818cf8]/20 self-start sm:self-center mt-2 sm:mt-0">
                          {activeFormObj.expression}
                        </span>
                      </div>

                      {/* Multilingual description context of formula */}
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed text-justify mb-5 font-sans">
                        {lang === "mm" ? activeFormObj.meaningMM : activeFormObj.meaning}
                      </p>

                      {/* Slider controls adjusted based on active formula */}
                      <div className="space-y-4">
                        
                        <div className="flex items-center justify-between text-xs">
                          <label className="font-bold text-slate-700 dark:text-slate-300 font-sans">
                            {lang === "mm" ? "ပြောင်းလဲနိုင်သော တန်ဖိုးတန်ဖိုး:" : "Manipulated Parameter:"}{" "}
                            <span className="text-[#818cf8] font-black font-mono underline ml-1">
                              {activeFormObj.interactiveVariable} = {formulaValue} {activeFormObj.variableUnit}
                            </span>
                          </label>
                        </div>

                        {/* Real-time reactive slider input */}
                        <input
                          type="range"
                          min={activeFormObj.interactiveVariable === "a" ? "1" : "1"}
                          max={activeFormObj.interactiveVariable === "m_energy" ? "100" : "20"}
                          step="1"
                          value={formulaValue}
                          onChange={(e) => setFormulaValue(Number(e.target.value))}
                          className="w-full accent-[#818cf8] cursor-ew-resize bg-slate-200 dark:bg-slate-800 rounded appearance-none h-1 focus:outline-none"
                        />

                        {/* Interactive gauge / visual response */}
                        <div className="bg-white dark:bg-[#1e293b] p-4 rounded border border-slate-100 dark:border-slate-800 text-center shadow-inner">
                          <span className="text-[10px] font-bold tracking-wider text-slate-500 dark:text-slate-400 block uppercase font-sans">
                            {calculatedFormulaResult.label}
                          </span>
                          <span className="text-base sm:text-lg font-black text-emerald-500 dark:text-emerald-400 mt-1 block font-mono">
                            {calculatedFormulaResult.value}
                          </span>
                        </div>

                      </div>

                    </div>
                  );
                })()}

                {/* Academic quote breakdown */}
                <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-indigo-500/[0.02] dark:bg-slate-800/20 rounded border border-slate-200 dark:border-slate-800 font-sans">
                    <h5 className="text-xs font-extrabold text-[#818cf8] flex items-center space-x-1.5 mb-2 font-sans">
                      <Zap className="w-3.5 h-3.5" />
                      <span>{lang === "mm" ? "သီအိုရီဒဿန (The Philosophy)" : "Visual Concept Pillar"}</span>
                    </h5>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-300 italic text-justify leading-relaxed font-sans">
                      "{lang === "mm" ? EDUCATOR_PHILOSOPHY.quoteMM : EDUCATOR_PHILOSOPHY.quoteEN}"
                    </p>
                  </div>

                  {/* Core pedagogy features */}
                  <div className="space-y-3">
                    <h5 className="text-xs font-bold text-slate-850 dark:text-slate-100 font-sans">
                      {lang === "mm" ? "အဓိက သင်ကြားမှုမဏ္ဍိုင်ကြီးများ:" : "Practical Key Methodology Pillars:"}
                    </h5>
                    <div className="space-y-2 text-xs">
                      {EDUCATOR_PHILOSOPHY.pillarsMM.map((pillar, i) => (
                        <div key={i} className="flex space-x-2">
                          <span className="text-[#818cf8] font-bold">✓</span>
                          <div>
                            <p className="font-semibold text-neutral-800 dark:text-slate-100 text-xs">
                              {pillar.title}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* SECTION 8: CONTACT & ENROLLMENT (Fully Functional Form & Copy Shortcuts) */}
            <section id="contact" className="scroll-mt-24">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-1.5 h-6 bg-[#818cf8] rounded-full" />
                <h3 className="text-lg font-black tracking-tight uppercase text-neutral-800 dark:text-neutral-100 font-sans">
                  {lang === "mm" ? "၈။ ဆက်သွယ်ရန်နှင့် စုံစမ်းရန်" : "8. Academic Inquiry & Contact Hub"}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Left Panel: Contact numbers & hours */}
                <div className={`md:col-span-5 p-6 rounded border flex flex-col justify-between transition-colors duration-300 ${
                  theme === 'dark' ? 'bg-[#1e293b] border-slate-700' : 'bg-white border-slate-200'
                }`}>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 dark:text-neutral-100 font-sans">
                        {lang === "mm" ? "ဖုန်းနှင့် အွန်လိုင်းမှတဆင့် ဆက်သွယ်ခြင်း" : "Direct Communications"}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1 font-sans">
                        {lang === "mm" ? "ရုံးချိန်အတွင်း ဆက်သွယ်စုံစမ်းနိုင်ပါသည်" : "Feel free to reach out during educational hours"}
                      </p>
                    </div>

                    <div className="space-y-4 text-xs font-sans">
                      <div className="flex items-start space-x-3">
                        <Phone className="w-4 h-4 text-[#818cf8] shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-slate-800 dark:text-neutral-100 font-sans">{lang === "mm" ? "ဆက်သွယ်ရန်ဖုန်း" : "Call Phone Numbers"}</p>
                          {PERSONAL_INFO.phones.map((phone, i) => (
                            <p key={i} className="font-mono mt-0.5 hover:text-indigo-500 cursor-pointer" onClick={() => handleCopy(phone, "Phone")}>
                              {phone}
                            </p>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Mail className="w-4 h-4 text-[#818cf8] shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-slate-800 dark:text-neutral-100 font-sans">Personal Email</p>
                          <p className="mt-0.5 font-mono text-[#818cf8] hover:text-[#6a75f7] underline-offset-4 hover:underline cursor-pointer" onClick={() => handleCopy(PERSONAL_INFO.emails[0], "Email")}>
                            {PERSONAL_INFO.emails[0]}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <MapPin className="w-4 h-4 text-[#818cf8] shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-slate-800 dark:text-neutral-100 font-sans">Specialist Residence</p>
                          <p className="mt-0.5 leading-relaxed text-slate-500 dark:text-slate-400 font-normal font-sans">
                            {lang === "mm" ? PERSONAL_INFO.addressMM : PERSONAL_INFO.address}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* QR / Online classes visual representation card */}
                  <div className="mt-8 p-4 rounded bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center space-x-3">
                    <div className="w-10 h-10 rounded bg-[#818cf8]/10 text-[#818cf8] flex items-center justify-center font-bold font-mono text-sm">
                      YGN
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800 dark:text-neutral-100 font-sans">Yangon Online Classes</p>
                      <p className="text-[10px] text-slate-400 mt-0.5 font-sans">Zoom, MSTeams & Interactive Jamboard classes</p>
                    </div>
                  </div>

                </div>

                {/* Right Panel: Functional Form layout */}
                <form 
                  onSubmit={handleSubmitInquiry}
                  className={`md:col-span-7 p-6 rounded border space-y-4 transition-colors duration-300 font-sans ${
                    theme === 'dark' ? 'bg-[#1e293b] border-slate-700' : 'bg-white border-slate-200'
                  }`}
                >
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 dark:text-neutral-100 font-sans">
                      {lang === "mm" ? "အတန်းများ စုံစမ်းရန်မေးခွန်းပုံစံ" : "Course Counseling Form"}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 font-sans">
                      {lang === "mm" 
                        ? "ကျောင်းသား သို့မဟုတ် မိဘများမှ အမည်နှင့်လိပ်စာဖြည့်ပြည့်စုံစွာ ဖြည့်သွင်းမေးမြန်းနိုင်ရန် ဖော်ပြထားသော မေးခွန်းလွှာ" 
                        : "Students or guardians can leave messages to request customized syllabi details."}
                    </p>
                  </div>

                  {/* Program of interest */}
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-sans">
                      {lang === "mm" ? "စိတ်ဝင်စားသည့်သင်ရိုး:" : "Course Program of Interest:"}
                    </label>
                    <select
                      value={formInterest}
                      onChange={(e) => setFormInterest(e.target.value)}
                      className={`w-full text-xs font-semibold p-2.5 rounded border mt-1 focus:ring-1 focus:ring-[#818cf8] focus:outline-none transition-all font-sans ${
                        theme === 'dark' ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      {PROJECTS_GALLERY.map((course) => (
                        <option key={course.id} value={course.title}>
                          {course.subject} - {lang === "mm" ? course.myanmarTitle : course.title} ({course.level.split(" ")[0]})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Name field */}
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-sans">
                      {lang === "mm" ? "အမည် ဖြည့်စွက်ရန်:" : "Name / Guardian name:"}
                    </label>
                    <input
                      type="text"
                      className={`w-full p-2 text-xs rounded border mt-1 focus:ring-1 focus:ring-[#818cf8] focus:outline-none transition-all font-sans ${
                        theme === 'dark' ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                      placeholder={lang === "mm" ? "ဥပမာ - မောင်မောင် သို့မဟုတ် ဦးကျော်" : "e.g. Mg Mg / U Kyaw"}
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      required
                    />
                  </div>

                  {/* Contact phone/email */}
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-sans">
                      {lang === "mm" ? "ဆက်သွယ်ရန်ဖုန်း/အီးမေးလ်:" : "Primary Mobile Phone / Email:"}
                    </label>
                    <input
                      type="text"
                      className={`w-full p-2 text-xs rounded border mt-1 focus:ring-1 focus:ring-[#818cf8] focus:outline-none transition-all font-sans ${
                        theme === 'dark' ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                      placeholder="e.g. 09-xxxxxxxx or name@email.com"
                      value={formContact}
                      onChange={(e) => setFormContact(e.target.value)}
                      required
                    />
                  </div>

                  {/* message */}
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-sans">
                      {lang === "mm" ? "မေးမြန်းလိုသည့် အသေးစိတ်စကားချပ် (ရှိပါက):" : "Details of inquiries (Specific requests / School grade):"}
                    </label>
                    <textarea
                      rows={3}
                      className={`w-full p-2 text-xs rounded border mt-1 focus:ring-1 focus:ring-[#818cf8] focus:outline-none transition-all font-sans ${
                        theme === 'dark' ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                      placeholder={lang === "mm" ? "ဒီစာသင်နှစ်မှာ IGCSE Physics အမှတ်မြှင့်တင်ချင်လို့ပါ..." : "Request schedule, private tutoring rates, or lesson booklets detail..."}
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded bg-[#818cf8] text-white hover:bg-[#6366f1] shadow-sm font-extrabold text-xs flex items-center justify-center space-x-2 transition-all hover:scale-[1.01] cursor-pointer font-sans"
                  >
                    <span>{lang === "mm" ? "စုံစမ်းရန်မေးခွန်းလွှာ ပေးပို့မည်" : "Submit Classroom Inquiry"}</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>

                </form>

              </div>
            </section>

          </main>

        </div>
      </div>

      {/* Floating Global Custom Toast Notifications Widget */}
      <AnimatePresence>
        {formToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 p-4 rounded-xl shadow-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-semibold border text-xs flex items-center space-x-2 pointer-events-none"
          >
            <div className="w-2 h-2 rounded-full bg-[#818cf8]" />
            <span>{formToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimal Aesthetic Page Footer */}
      <footer className="py-8 border-t border-stone-200/50 dark:border-slate-800 bg-white/70 dark:bg-slate-900 text-center text-xs text-neutral-500 dark:text-neutral-400 transition-colors duration-300 print:mt-10">
        <div className="max-w-4xl mx-auto px-4">
          <p className="font-semibold text-neutral-700 dark:text-neutral-300">
            {PERSONAL_INFO.nameMM} © {new Date().getFullYear()} • STEM specialist educator
          </p>
          <p className="text-[10px] text-stone-400 mt-1">
            U Moe Ko Tun Portfolio Digitization Project • Purely Crafted with React, Tailwind & Framer Motion.
          </p>
        </div>
      </footer>

    </div>
  );
}
