import { useState, useEffect, type MouseEvent } from 'react';
import { Server, Phone, Mail, MapPin, Terminal, ChevronRight, Play, Zap } from 'lucide-react';
import ykloangAvatar from './assets/yk_loang.jpg';

const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 .5C5.73.5.98 5.24.98 11.52c0 5.02 3.26 9.28 7.78 10.78.57.1.78-.25.78-.55v-1.94c-3.16.69-3.83-1.52-3.83-1.52-.52-1.31-1.26-1.66-1.26-1.66-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.74 2.65 1.24 3.3.95.1-.73.4-1.24.72-1.53-2.52-.29-5.17-1.26-5.17-5.61 0-1.24.44-2.25 1.17-3.04-.12-.29-.51-1.46.11-3.03 0 0 .96-.31 3.13 1.16a10.8 10.8 0 0 1 5.7 0c2.16-1.47 3.12-1.16 3.12-1.16.62 1.57.23 2.74.11 3.03.73.79 1.17 1.8 1.17 3.04 0 4.36-2.65 5.32-5.18 5.6.41.35.77 1.04.77 2.1v3.11c0 .3.21.66.79.55A11.03 11.03 0 0 0 23.02 11.5C23.02 5.24 18.27.5 12 .5Z" />
  </svg>
);

interface ProfileData {
  name: string;
  title: string;
  contact: { phone: string; email: string; location: string; github: string };
  personal_info: { gender: string; dob: string; pob: string; marital_status: string; nationality: string };
  summary: string;
}

interface ExperienceData {
  company: string;
  role: string;
  period: string;
  projects?: Record<string, string[]>;
  responsibilities?: string[];
}

interface EducationData {
  institution: string;
  degree: string;
  period: string;
}

interface SkillsData {
  frameworks_and_languages: string[];
  databases: string[];
  spoken_languages: string[];
}

const cvData = {
  profile: {
    name: "Yen Kimloang",
    title: "Backend Developer",
    contact: {
      phone: "093841348",
      email: "mrrloang78@gmail.com",
      location: "Chroychangva, Phnom Penh",
      github: "kimloang.github.io/ykloang"
    },
    personal_info: {
      gender: "Male",
      dob: "29-09-2**2",
      pob: "Kompong Spue",
      marital_status: "Single",
      nationality: "Cambodian"
    },
    summary: "With over 3 years of Experience in Backend Developer And IT-Assistant, I possess expertise in IT systems, problem-solving, and technical support. My biggest career achievement includes leading a team to execute a significant data migration project, reducing operational costs."
  } as ProfileData,
  experience: [
    {
      company: "ACLEDA Bank Plc.",
      role: "Back End Developer",
      period: "Apr 2025 - Present",
      responsibilities: [
        "Developed APIs based on Business Requirements Documents (BRD) to enhance system functionality.",
        "Optimized code to efficiently handle large concurrent requests, improving database interactions.",
        "Implemented NoSQL caching strategies to manage rate limits and boost overall performance.",
        "Prepared CI/CD pipeline to automate deployment processes, streamlining development workflows."
      ]
    },
    {
      company: "Tonaire Digital",
      role: "BackEnd Developer",
      period: "May 2023 - Apr 2025",
      projects: {
        "Modern Business (Internal Sales Control)": [
          "Design Delivery Tracking Real Time Update From Delivery To Customer",
          "Control On Delivery Tracking and Sales Transactions",
          "Real Time Notification Integrate With Mobile Application Using Web Socket"
        ],
        "Human Resource System": [
          "Design Main dashboard, Staff Attendance, and Stock Inventory (Fixed Asset)",
          "Payroll Encryption and Individual Training (Examination) module",
          "Integrate system with Telegram Bot and Email",
          "Create Procedure and Design Report for Mobile Application"
        ]
      }
    },
    {
      company: "Sorya Center Point",
      role: "IT Assistant",
      period: "2022 - 2023",
      responsibilities: [
        "Create P.O.S System For Manage Playground",
        "Create Stock Inventory For Drink",
        "General Support On internal Company"
      ]
    }
  ] as ExperienceData[],
  skills: {
    frameworks_and_languages: [
      "Java & Spring Boot",
      "C# & .NET Core Web API",
      "Desktop Developer",
      "HTML & CSS"
    ],
    databases: [
      "T-SQL (SQL Server)",
      "Oracle"
    ],
    spoken_languages: [
      "English (Fluent)",
      "Khmer (Fluent)"
    ]
  } as SkillsData,
  education: [
    {
      institution: "NATIONAL UNIVERSITY OF MANAGEMENT",
      degree: "Bachelor of Information Technology",
      period: "2019 - 2023"
    }
  ] as EducationData[]
};

const syntaxHighlight = (jsonObj: any) => {
  let json = JSON.stringify(jsonObj, undefined, 2);
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
    let cls = 'text-emerald-400';
    if (/^"/.test(match)) {
      if (/:$/.test(match)) {
        cls = 'text-sky-400';
      }
    } else if (/true|false/.test(match)) {
      cls = 'text-pink-400';
    } else if (/null/.test(match)) {
      cls = 'text-slate-500';
    } else {
      cls = 'text-yellow-400';
    }
    return '<span class="' + cls + '">' + match + '</span>';
  });
};

const MethodBadge = ({ method }: { method: string }) => {
  const isPost = method === 'POST';
  const colorClass = isPost
    ? 'bg-blue-500/10 text-blue-400 border-blue-500/20 shadow-md shadow-blue-500/50'
    : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-md shadow-emerald-500/30';

  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${colorClass} opacity-90`}>
      {method}
    </span>
  );
};

const CodeBlock = ({ data, title = "Response Example", isRgb = false }: { data: any, title?: string, isRgb?: boolean }) => {
  const highlighted = syntaxHighlight(data);

  const innerContent = (
    <div className="rounded-xl overflow-hidden bg-[#0d1117] border border-slate-800 shadow-2xl relative z-10 h-full">
      <div className="bg-[#161b22] px-4 py-2 border-b border-slate-800 flex justify-between items-center text-xs text-slate-400 font-mono">
        <span>{title}</span>
        <span className="text-emerald-400 flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div> 200 OK
        </span>
      </div>
      <pre className="p-4 overflow-x-auto text-sm font-mono leading-relaxed"
           dangerouslySetInnerHTML={{ __html: highlighted }} />
    </div>
  );

  if (isRgb) {
    return (
      <div className="relative group p-[2px] rounded-xl h-full">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-xl opacity-75 blur-sm animate-pulse group-hover:opacity-100 transition duration-500"></div>
        {innerContent}
      </div>
    );
  }

  return innerContent;
};

// One real, derived stat set — nothing invented. Companies + years come
// straight out of cvData; the "systems shipped" count is the number of
// named projects actually listed under experience.
const yearsExperience = (() => {
  const start = cvData.experience.reduce((earliest, job) => {
    const y = parseInt(job.period.match(/\d{4}/)?.[0] ?? '9999', 10);
    return Math.min(earliest, y);
  }, 9999);
  return new Date().getFullYear() - start;
})();
const systemsShipped = cvData.experience.reduce(
  (n, job) => n + (job.projects ? Object.keys(job.projects).length : 0), 0
);
const statPills = [
  { label: 'Years experience', value: `${yearsExperience}+` },
  { label: 'Companies', value: `${cvData.experience.length}` },
  { label: 'Systems shipped', value: `${systemsShipped}` },
];

const AVATAR_FALLBACK =
  'https://ui-avatars.com/api/?name=Yen+Kimloang&background=10141a&color=34d399&bold=true&size=256';

// Cycles through role taglines with a typing/deleting terminal effect.
function useTypewriter(words: string[], typeMs = 55, pauseMs = 1400) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    let delay = deleting ? typeMs / 1.6 : typeMs;

    if (!deleting && text === current) {
      delay = pauseMs;
    }

    const t = setTimeout(() => {
      if (!deleting && text === current) {
        setDeleting(true);
        return;
      }
      if (deleting && text === '') {
        setDeleting(false);
        setWordIndex(i => i + 1);
        return;
      }
      setText(current.slice(0, deleting ? text.length - 1 : text.length + 1));
    }, delay);

    return () => clearTimeout(t);
  }, [text, deleting, wordIndex, words, typeMs, pauseMs]);

  return text;
}

// Thematic "live console" footer — fake but clearly stylistic request/latency
// counters that jitter, matching the mock-API conceit of the rest of the page.
function ConsoleTicker() {
  const [reqs, setReqs] = useState(1284);
  const [latency, setLatency] = useState(42);

  useEffect(() => {
    const t = setInterval(() => {
      setReqs(r => r + Math.floor(Math.random() * 3));
      setLatency(28 + Math.floor(Math.random() * 20));
    }, 1800);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="border-t border-slate-800/60 bg-[#0a0c10]">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 xl:px-16 py-5 flex flex-wrap items-center gap-x-8 gap-y-2 text-xs font-mono text-slate-600">
        <span className="text-slate-500">// this page, watching itself</span>
        <span>requests served: <span className="text-emerald-400">{reqs.toLocaleString()}</span></span>
        <span>p50 latency: <span className="text-sky-400">{latency}ms</span></span>
        <span>build: <span className="text-slate-400">v1.0.0</span></span>
      </div>
    </div>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState('profile');
  const [isSimulatingPost, setIsSimulatingPost] = useState(false);
  const [showSkillResponse, setShowSkillResponse] = useState(false);
  const [booted, setBooted] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState(ykloangAvatar);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const roleText = useTypewriter([
    'Backend Developer Reference',
    'Java & Spring Boot',
    'API Performance Tuning',
    'Oracle · Redis · Kafka',
  ]);

  const handleAvatarMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -14, y: px * 14 });
  };
  const resetAvatarTilt = () => setTilt({ x: 0, y: 0 });

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { rootMargin: '-20% 0px -80% 0px' });

    ['profile', 'experience', 'skills', 'education'].forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Single orchestrated page-load moment: the page "boots" like a health
  // check hitting the API before the profile resolves. Runs once.
  useEffect(() => {
    const t = setTimeout(() => setBooted(true), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0c10] text-slate-300 font-sans flex flex-col md:flex-row selection:bg-sky-500/30 relative">
      <div className="ambient-orb w-[420px] h-[420px] bg-sky-500/10 top-[-100px] left-[10%]" />
      <div className="ambient-orb w-[380px] h-[380px] bg-emerald-500/10 top-[40%] right-[5%]" style={{ animationDelay: '-7s' }} />
      <div className="ambient-orb w-[320px] h-[320px] bg-purple-500/10 bottom-[-80px] left-[30%]" style={{ animationDelay: '-14s' }} />

      <nav className="w-full md:w-64 lg:w-72 bg-[#10141a] border-r border-slate-800/60 md:h-screen sticky top-0 flex flex-col shadow-xl z-20">
        <div className="p-6 border-b border-slate-800/60 flex items-center gap-3">
          <div className="bg-gradient-to-br from-sky-400 to-emerald-400 p-2 rounded-lg">
            <Server className="w-5 h-5 text-black" />
          </div>
          <div>
            <h1 className="font-bold text-slate-100 text-sm tracking-wide">Yen_Kimloang_API.yml</h1>
            <p className="text-xs text-slate-500 mt-0.5">v1.0.0</p>
          </div>
        </div>
        <div className="p-4 flex-1 overflow-y-auto space-y-1">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-3 mt-4">Endpoints</div>
          {[
            { id: 'profile', path: '/v1/profile', label: 'Developer Profile', method: 'GET' },
            { id: 'experience', path: '/v1/experience', label: 'Work Experience', method: 'GET' },
            { id: 'skills', path: '/v1/skills/evaluate', label: 'Technical Skills', method: 'POST' },
            { id: 'education', path: '/v1/education', label: 'Education Data', method: 'GET' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group ${
                activeSection === item.id
                  ? 'bg-slate-800/50 text-slate-100 shadow-lg shadow-sky-400/20 border border-slate-700/50'
                  : 'text-slate-400 hover:bg-slate-800/30 hover:text-slate-200 border border-transparent'
              }`}
            >
              <MethodBadge method={item.method} />
              <span className="truncate font-mono">{item.path}</span>
              {activeSection === item.id && <ChevronRight className="w-4 h-4 ml-auto text-sky-400 drop-shadow-md" />}
            </button>
          ))}
        </div>
      </nav>

      <main className="flex-1 overflow-y-auto pb-32 relative z-10">
        <div className="max-w-6xl mx-auto p-8 lg:p-12 xl:p-16 border-b border-slate-800/60 bg-gradient-to-b from-[#141922] to-transparent relative overflow-hidden">

          <div className="absolute inset-0 opacity-30 z-0" style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdHRlcm4gaWQ9InNtYWxsR3JpZCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNMTAgMEwwIDBMMCAxMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSJ1cmwoI3NtYWxsR3JpZCkiLz48cGF0aCBkPSJNNDAgMEwwIDBMMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')" }}></div>

          {/* Boot sequence — the one deliberate motion moment on the page */}
          <div className={`font-mono text-xs text-slate-500 mb-6 relative z-10 transition-opacity duration-500 ${booted ? 'opacity-0 h-0 overflow-hidden mb-0' : 'opacity-100'}`}>
            <span className="text-emerald-400">$</span> curl api.kimloang.dev/v1/profile
            <span className="inline-block w-1.5 h-3 bg-emerald-400 ml-1 align-middle animate-pulse" />
          </div>

          <div className={`flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10 transition-all duration-700 ${booted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
            <div
              className="relative group shrink-0"
              style={{ perspective: '600px' }}
              onMouseMove={handleAvatarMove}
              onMouseLeave={resetAvatarTilt}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-sky-500 via-purple-500 to-emerald-500 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-500"></div>
              <img
                src={avatarSrc}
                onError={() => setAvatarSrc(AVATAR_FALLBACK)}
                alt="Yen Kimloang"
                style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`, transition: 'transform 150ms ease-out' }}
                className="relative w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-[#0a0c10] shadow-2xl shadow-emerald-500/30 z-10"
              />
              <span className="absolute bottom-1 right-1 z-20 w-5 h-5 rounded-full bg-emerald-400 border-4 border-[#0a0c10]" title="Available" />
            </div>
            <div className="text-center md:text-left pt-2 flex-1">
              <h1 className="font-display text-4xl lg:text-5xl font-bold text-white tracking-tight mb-2">Yen Kimloang</h1>
              <p className="text-xl text-emerald-400 font-medium mb-5 flex items-center justify-center md:justify-start gap-2 font-mono min-h-[1.75rem]">
                <Terminal className="w-5 h-5 shrink-0" /> {roleText}<span className="cursor-blink text-emerald-400">▌</span>
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-slate-400 mb-6">
                <span className="flex items-center gap-1.5 bg-slate-800/50 px-3 py-1.5 rounded-full"><Phone className="w-4 h-4" /> 093841348</span>
                <span className="flex items-center gap-1.5 bg-slate-800/50 px-3 py-1.5 rounded-full"><Mail className="w-4 h-4" /> mrrloang78@gmail.com</span>
                <span className="flex items-center gap-1.5 bg-slate-800/50 px-3 py-1.5 rounded-full"><MapPin className="w-4 h-4" /> Phnom Penh</span>
                <span className="flex items-center gap-1.5 bg-slate-800/50 px-3 py-1.5 rounded-full"><GithubIcon className="w-4 h-4" /> kimloang.github.io/ykloang</span>
              </div>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 mb-6">
                {statPills.map(s => (
                  <div key={s.label} className="text-center md:text-left">
                    <div className="font-display text-2xl font-semibold text-white">{s.value}</div>
                    <div className="text-xs text-slate-500">{s.label}</div>
                  </div>
                ))}
              </div>

              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm font-medium hover:bg-emerald-500/20 transition-colors"
              >
                Download résumé (PDF)
              </a>
            </div>
          </div>
        </div>

        {/* Status bar */}
        <div className="max-w-6xl mx-auto px-6 lg:px-12 xl:px-16 -mt-px">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-slate-500 border-t border-slate-800/60 py-3">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> All systems operational
            </span>
            <span>region: phnom-penh-1</span>
            <span>uptime: {yearsExperience}+ yrs</span>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 lg:px-12 xl:px-16 mt-12 space-y-24">

          <section id="profile" className="scroll-mt-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-100 mb-2">Get Developer Profile</h2>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    Returns core personal information, contact details, and a professional summary of qualifications and achievements.
                  </p>
                </div>
                <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-3 inline-flex items-center gap-3 font-mono text-sm">
                  <MethodBadge method="GET" />
                  <span className="text-slate-200">api.kimloang.dev/v1/profile</span>
                </div>
                <div className="bg-sky-500/10 border border-sky-500/20 text-sky-300/90 text-xs p-4 rounded-lg">
                </div>
              </div>
              <div className="relative">
                <CodeBlock data={cvData.profile} />
              </div>
            </div>
          </section>

          <hr className="border-slate-800/60" />

          <section id="experience" className="scroll-mt-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-100 mb-2">Get Work Experience</h2>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    Returns a chronological list of professional roles, responsibilities, and project deliverables.
                  </p>
                </div>
                <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-3 inline-flex items-center gap-3 font-mono text-sm">
                  <MethodBadge method="GET" />
                  <span className="text-slate-200">api.kimloang.dev/v1/experience</span>
                </div>
              </div>
              <div className="relative">
                <CodeBlock data={cvData.experience} title="Response Example (array)" />
              </div>
            </div>
          </section>

          <hr className="border-slate-800/60" />

          <section id="skills" className="scroll-mt-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-100 mb-2 flex items-center gap-2">
                    Evaluate Skills
                    <Zap className="w-5 h-5 text-yellow-400 animate-pulse drop-shadow-lg" />
                  </h2>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    Submit a requirement payload to evaluate system competencies. Returns a matching matrix of backend frameworks and databases matching your stack.
                  </p>
                </div>

                <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-3 inline-flex items-center gap-3 font-mono text-sm shadow-lg shadow-blue-500/10">
                  <MethodBadge method="POST" />
                  <span className="text-slate-200">api.kimloang.dev/v1/skills/evaluate</span>
                </div>

                <div className="bg-[#161b22] border border-slate-800 rounded-xl overflow-hidden mt-6 shadow-xl relative group">
                  <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none"></div>
                  <div className="bg-[#1d232b] px-4 py-2 border-b border-slate-800 text-xs text-slate-400 font-mono flex justify-between items-center relative z-10">
                    <span>Request Body</span>
                    <span className="text-blue-400 font-semibold px-2 py-0.5 bg-blue-500/10 rounded">application/json</span>
                  </div>
                  <pre className="p-4 text-sm font-mono text-slate-300 relative z-10 leading-relaxed overflow-x-auto">
<span className="text-sky-400">"role_requirements"</span>: {'{\n'}
  <span className="text-sky-400">"position"</span>: <span className="text-emerald-400">"Senior Backend"</span>,
  <span className="text-sky-400">"tech_stack"</span>: [<span className="text-emerald-400">"Spring Boot"</span>, <span className="text-emerald-400">".NET"</span>],
  <span className="text-sky-400">"db_focus"</span>: <span className="text-emerald-400">"High Volume Relational"</span>
{'}'}
                  </pre>
                  <div className="p-3 bg-[#1d232b] border-t border-slate-800 flex justify-end relative z-10">
                    <button
                      onClick={() => {
                        setShowSkillResponse(false);
                        setIsSimulatingPost(true);
                        setTimeout(() => {
                          setIsSimulatingPost(false);
                          setShowSkillResponse(true);
                        }, 1400);
                      }}
                      disabled={isSimulatingPost}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white text-xs font-bold rounded overflow-hidden relative shadow-lg shadow-blue-600/40 hover:shadow-xl hover:shadow-blue-600/70 transition-all duration-300 active:scale-95 group/btn"
                    >
                      {isSimulatingPost ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        <Play className="w-4 h-4 fill-current group-hover/btn:scale-110 transition-transform" />
                      )}
                      {isSimulatingPost ? 'EVALUATING MATRIX...' : 'SEND REQUEST'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="relative pt-6 lg:pt-0 h-full flex flex-col justify-end">
                <div className={`transition-all duration-700 w-full h-full ${!showSkillResponse && !isSimulatingPost ? 'opacity-80' : 'opacity-100'}`}>
                  {isSimulatingPost ? (
                    <div className="h-full min-h-[300px] rounded-xl border border-slate-800 bg-[#0d1117] flex flex-col items-center justify-center gap-4 shadow-2xl relative overflow-hidden">
                      <div className="absolute inset-0 opacity-50 z-0" style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdHRlcm4gaWQ9InNtYWxsR3JpZCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNMTAgMEwwIDBMMCAxMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDIpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSJ1cmwoI3NtYWxsR3JpZCkiLz48cGF0aCBkPSJNNDAgMEwwIDBMMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDQpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')" }}></div>
                      <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin drop-shadow-xl relative z-10"></div>
                      <span className="text-blue-400 font-mono text-sm animate-pulse relative z-10 font-semibold tracking-wider">COMPUTING MATCH...</span>
                    </div>
                  ) : showSkillResponse ? (
                    <CodeBlock data={cvData.skills} isRgb={true} />
                  ) : (
                    <div className="h-full min-h-[300px] rounded-xl border-2 border-slate-800 border-dashed bg-[#0d1117]/30 flex flex-col items-center justify-center text-center p-6 hover:bg-[#0d1117]/60 transition-colors">
                      <Terminal className="w-8 h-8 text-slate-600 mb-3" />
                      <span className="text-slate-500 font-mono text-sm block">Awaiting payload.</span>
                      <span className="text-slate-600 font-mono text-xs mt-1">Press "SEND REQUEST" to evaluate.</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          <hr className="border-slate-800/60" />

          <section id="education" className="scroll-mt-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-100 mb-2">Get Education Data</h2>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    Retrieves academic qualifications and graduation details.
                  </p>
                </div>
                <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-3 inline-flex items-center gap-3 font-mono text-sm">
                  <MethodBadge method="GET" />
                  <span className="text-slate-200">api.kimloang.dev/v1/education</span>
                </div>
              </div>
              <div className="relative">
                <CodeBlock data={cvData.education} />
              </div>
            </div>
          </section>

        </div>

        <ConsoleTicker />
      </main>
    </div>
  );
}
