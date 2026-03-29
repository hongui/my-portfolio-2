import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, ArrowLeft, Activity, LayoutTemplate, Database, Monitor, 
  Briefcase, GraduationCap, Award, QrCode, CheckCircle2, Shield, 
  User, FolderOpen, MessageSquare, Target, Zap, Settings, PieChart, 
  Cpu, Smartphone, UserCircle2
} from 'lucide-react';
import Spline from '@splinetool/react-spline';

// --- 自定义 Hooks ---
const useScroll = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('about');
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const sections = ['about', 'work', 'contact'];
      const current = sections.find(id => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 200 && rect.bottom >= 200;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return { scrollY, activeSection };
};

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const updateMousePosition = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);
  return mousePosition;
};

const FadeIn = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={domRef} className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

const ShimmerWrapper = ({ children, className = "", onClick }) => (
  <div className={`relative group overflow-hidden ${className}`} onClick={onClick}>
    {children}
    <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg] group-hover:left-[100%] transition-all duration-1000 ease-in-out pointer-events-none" />
  </div>
);

// --- 子页面：项目详情页 ---
const ProjectDetail = ({ project, onBack }) => {
  const images = {
    p1: {
      hero: "https://raw.githubusercontent.com/hongui/my-portfolio-2/main/public/images/fzyq%20shouye.png",
      mobile: "https://raw.githubusercontent.com/hongui/my-portfolio-2/main/public/images/duoduan%20app%201%402x.png", 
      pad: "https://raw.githubusercontent.com/hongui/my-portfolio-2/main/public/images/duoduan%20app%202%402x.png",
    },
    p2: { dashboard: "" },
    p3: { ip: "" }
  };

  const isJusticeSystem = project.id === 'p1'; 
  const isDashboard = project.id === 'p2';
  const isVisualScreen = project.id === 'p3';

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 pb-32">
      <nav className="sticky top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold transition-all group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 返回作品集
          </button>
          <div className="text-xs font-black tracking-widest text-slate-300 uppercase">Case Study / {project.tag}</div>
        </div>
      </nav>

      <header className={`pt-24 pb-20 bg-gradient-to-br ${project.color} to-white border-b border-slate-100`}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-blue-600 text-white text-sm md:text-base font-black uppercase tracking-widest mb-8 shadow-lg shadow-blue-200">
              <project.icon className="w-4 h-4" /> {project.tag}
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight mb-8">{project.title}</h1>
            <p className="text-xl text-slate-600 leading-relaxed font-medium">{project.desc}</p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 mt-24 space-y-32">
        {/* 子页面 1：司法行政系统 */}
        {isJusticeSystem && (
          <>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
              <FadeIn>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-xl"><Shield className="w-6 h-6" /></div>
                  <h3 className="text-3xl font-black">视觉规范 / Visual Standards</h3>
                </div>
                <p className="text-lg text-slate-500 leading-[1.8] font-medium">G端设计的核心在于“业务准确性优先”。通过标准化、一致的视觉语言，降低认知负荷。</p>
              </FadeIn>
              <FadeIn delay={200}>
                <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
                  <div className="grid grid-cols-2 gap-4">
                    {["业务准确性优先", "用户年龄偏大", "多角色切换", "数据录入频率高"].map((txt, i) => (
                      <div key={i} className="bg-white p-4 rounded-2xl shadow-sm text-sm font-bold text-slate-700">{txt}</div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </section>
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1 space-y-6">
                <h3 className="text-3xl font-black">首页功能概述</h3>
                <p className="text-slate-500 font-medium">确保 Webapp 用户体验高度一致。</p>
              </div>
              <div className="md:col-span-2 relative bg-slate-900 rounded-[2.5rem] p-4 shadow-2xl overflow-hidden group">
                <div className="aspect-[16/10] w-full bg-slate-800 rounded-[1.75rem] overflow-hidden border border-slate-700/50">
                  <img src={images.p1.hero} alt="首页展示" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
              </div>
            </section>
            <section className="bg-slate-50 rounded-[3.5rem] p-12 md:p-20 flex flex-col md:flex-row items-center gap-16">
              <div className="flex-1 space-y-8">
                <h3 className="text-3xl font-black">多端适配方案</h3>
                <p className="text-slate-500 text-lg leading-relaxed">针对 iPad/App 端进行平板场景优化。</p>
              </div>
              <div className="flex-1 flex justify-center gap-6">
                <div className="w-40 h-80 bg-white rounded-[2rem] border-[6px] border-slate-900 shadow-xl overflow-hidden relative">
                  <img src={images.p1.mobile} alt="App" className="w-full h-full object-cover" />
                </div>
                <div className="w-40 h-80 bg-white rounded-[2rem] border-[6px] border-slate-900 shadow-xl overflow-hidden relative mt-8">
                  <img src={images.p1.pad} alt="iPad" className="w-full h-full object-cover" />
                </div>
              </div>
            </section>
          </>
        )}

        {/* 子页面 2：法治舆情决策驾驶舱 */}
        {isDashboard && (
          <>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
              <FadeIn>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-xl"><Target className="w-6 h-6" /></div>
                  <h3 className="text-3xl font-black">需求拆解 / Demand</h3>
                </div>
                <p className="text-lg text-slate-500 leading-[1.8] font-medium">将碎片化的业务描述提炼为结构化列表。通过首页仪表盘直观展示办结完成情况。</p>
              </FadeIn>
              <FadeIn delay={200}>
                <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 space-y-4">
                  {["关键数据仪表盘化展示", "地域热力图 + 时间维度切换", "异常预警生成闭环"].map((item, i) => (
                    <div key={i} className="flex gap-3 text-slate-700 font-bold"><span className="text-blue-600">●</span> {item}</div>
                  ))}
                </div>
              </FadeIn>
            </section>
            <section>
              <div className="text-center mb-16">
                <h3 className="text-4xl font-black mb-4">组件化设计原则</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { title: "风格统一", icon: Shield, desc: "高度一致的视觉语言。" },
                  { title: "效率提升", icon: Zap, desc: "预定义组件库，缩短迭代周期。" },
                  { title: "可维护性", icon: Settings, desc: "一处修改全局生效。" }
                ].map((item, i) => (
                  <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 hover:shadow-xl transition-all">
                    <item.icon className="w-10 h-10 text-blue-600 mb-6" />
                    <h4 className="font-black text-xl mb-4">{item.title}</h4>
                    <p className="text-slate-500 text-sm font-medium">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* 子页面 3：可视化大屏 */}
        {isVisualScreen && (
          <>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
              <FadeIn>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl"><Activity className="w-6 h-6" /></div>
                  <h3 className="text-3xl font-black">舆情情绪可视化</h3>
                </div>
                <p className="text-lg text-slate-500 leading-[1.8] font-medium">通过舆情焦点、热词分布、主题分布三大核心板块拓展监测范围。</p>
              </FadeIn>
              <FadeIn delay={200}>
                <div className="bg-slate-900 rounded-[2.5rem] p-8 border border-slate-800 shadow-2xl text-white">
                  <div className="grid grid-cols-3 gap-4">
                    {[{l:"正向", v:"772", c:"text-emerald-400"}, {l:"中性", v:"482", c:"text-blue-400"}, {l:"负向", v:"75", c:"text-rose-400"}].map((d, i) => (
                      <div key={i} className="text-center p-4 bg-white/5 rounded-2xl">
                        <div className={`text-2xl font-black ${d.c}`}>{d.v}</div>
                        <div className="text-[10px] text-slate-500 font-bold uppercase mt-1">{d.l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </section>
            <section className="bg-indigo-50 rounded-[3.5rem] p-12 md:p-20 relative overflow-hidden">
               <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <div>
                    <h3 className="text-3xl font-black mb-6">AI 驱动 IP 形象落地</h3>
                    <p className="text-slate-600 text-lg leading-relaxed">利用 WebP 序列帧技术方案，显著降低加载负担。</p>
                  </div>
                  <div className="aspect-square bg-white rounded-full shadow-2xl flex items-center justify-center">
                     <Cpu className="w-12 h-12 text-indigo-200" />
                  </div>
               </div>
            </section>
          </>
        )}
      </main>

      <footer className="max-w-4xl mx-auto px-6 mt-40">
        <div className="bg-blue-600 rounded-[3.5rem] p-12 md:p-20 text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-700" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-10 tracking-tight">探索更多司法行政<br/>数字化转型案例</h2>
            <button onClick={onBack} className="px-10 py-5 bg-white text-blue-600 hover:bg-slate-50 rounded-full font-black text-lg transition-all flex items-center gap-3 mx-auto shadow-xl">
              返回作品集首页 <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

// --- 主应用组件 ---
export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedProject, setSelectedProject] = useState(null);
  const { scrollY, activeSection } = useScroll();
  const mousePos = useMousePosition();

  const projects = [
    { id: 'p1', title: "司法行政系统工作台", tag: "业务系统重构 / 效率优先", color: "from-blue-100", icon: LayoutTemplate, desc: "重塑闭环的高效办公流。" },
    { id: 'p2', title: "法治舆情决策驾驶舱", tag: "数据可视化 / 舆情监控", color: "from-purple-100", icon: Database, desc: "135+ 个原子组件构建全景指挥中心。" },
    { id: 'p3', title: "司法可视化大屏设计", tag: "视觉动效 / 性能落地", color: "from-emerald-100", icon: Monitor, desc: "主导 AI 动效 IP 的全场景落地。" }
  ];

  if (currentView === 'detail' && selectedProject) {
    return <ProjectDetail project={selectedProject} onBack={() => setCurrentView('home')} />;
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans overflow-x-hidden">
      <aside className="fixed left-0 top-0 h-full z-[100] group flex">
        <div className="h-full bg-white/80 backdrop-blur-xl border-r border-slate-100 flex flex-col items-center py-8 w-16 group-hover:w-48 transition-all duration-500 shadow-2xl overflow-hidden">
          <div className="mb-12 flex items-center justify-start w-full px-4">
            <div className="w-8 h-8 min-w-[32px] bg-black text-white rounded-lg flex items-center justify-center font-black text-lg">R</div>
            <span className="ml-4 font-black text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Ren Junming</span>
          </div>
          <div className="flex flex-col gap-4 w-full px-2">
            {[
              { id: 'about', label: '关于我', icon: User },
              { id: 'work', label: '项目分类', icon: FolderOpen },
              { id: 'contact', label: '联系我', icon: MessageSquare }
            ].map((item) => (
              <a key={item.id} href={`#${item.id}`} className={`flex items-center h-12 rounded-xl transition-all ${activeSection === item.id ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-50'}`}>
                <div className="w-12 h-12 min-w-[48px] flex items-center justify-center"><item.icon className="w-5 h-5" /></div>
                <span className="ml-2 font-bold text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all">{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      </aside>

      <main className="pl-16 md:pl-24 transition-all duration-500">
        <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row min-h-[85vh] gap-16 items-center">
          <div className="flex-1 relative z-10">
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-bold text-[10px] uppercase tracking-[0.3em] mb-8">
                <Activity className="w-3 h-3 animate-pulse" /> G Side Experience Design
              </div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-tight mb-12">Hi,<br />我是任俊明<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-400 to-indigo-600">政务系统设计</span></h1>
              <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mb-12 font-medium">深耕法治舆情与司法行政系统，致力于以组件化思维驱动设计落地。</p>
              <div className="flex gap-6"><a href="#work" className="group flex items-center gap-4 text-lg font-bold transition-all">开始探索作品 <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all"><ArrowRight className="w-5 h-5" /></div></a></div>
            </FadeIn>
          </div>
          <div className="flex-1 w-full lg:w-auto relative lg:-mt-8">
            <div className="relative w-full h-[460px] lg:h-[580px] overflow-hidden rounded-[2.75rem] bg-white shadow-xl">
              <Spline scene="https://prod.spline.design/kN0BGRxHdBIuvXNd/scene.splinecode" />
            </div>
          </div>
        </section>

        <section id="about" className="py-32 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-6">
            <FadeIn>
              <h2 className="text-5xl font-black mb-10 tracking-tighter italic text-slate-900 underline decoration-blue-600 decoration-4 underline-offset-8">职业价值 / Value</h2>
              <p className="text-slate-500 text-[21px] leading-relaxed font-medium max-w-4xl text-justify">主导了法治舆情项目落地，通过沉淀 135+ 个原子组件，大幅提升了团队产出效率。</p>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
              {[
                { icon: GraduationCap, title: "杭州职业技术学院", desc: "数字媒体艺术设计" },
                { icon: Briefcase, title: "杭州睿云信息技术", desc: "UI设计师 / 2023 - 2025" },
                { icon: Award, title: "界面设计职业技能证书", desc: "高级 / 国家学分银行" }
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 100}>
                  <div className="flex gap-5 items-start p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-all group h-full">
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform"><item.icon className="w-6 h-6" /></div>
                    <div className="flex-1"><h4 className="font-black text-lg leading-tight mb-1">{item.title}</h4><p className="text-slate-400 font-medium text-[15px]">{item.desc}</p></div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <section id="work" className="py-32 bg-slate-50 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-6">
            <FadeIn className="mb-20 text-center"><h2 className="text-5xl font-black tracking-tighter mb-4">核心项目拆解 / Projects</h2></FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {projects.map((project, index) => (
                <FadeIn key={project.id} delay={index * 150}>
                  <ShimmerWrapper className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl hover:-translate-y-4 transition-all duration-500 h-full flex flex-col cursor-pointer group" onClick={() => { setSelectedProject(project); setCurrentView('detail'); }}>
                    <div className={`w-16 h-16 rounded-[1.5rem] bg-gradient-to-br ${project.color} to-white flex items-center justify-center mb-10`}><project.icon className="w-8 h-8 text-slate-800" /></div>
                    <div className="text-blue-600 font-black text-sm mb-4 uppercase">{project.tag}</div>
                    <h3 className="text-3xl font-black mb-6 leading-tight">{project.title}</h3>
                    <p className="text-slate-500 mb-10 flex-grow line-clamp-3 font-medium">{project.desc}</p>
                    <div className="flex items-center gap-3 text-slate-900 font-black group-hover:text-blue-600 group-hover:gap-5 transition-all">查看详情 <ArrowRight className="w-5 h-5" /></div>
                  </ShimmerWrapper>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <footer id="contact" className="py-32 bg-white text-center scroll-mt-20">
          <div className="max-w-5xl mx-auto px-6">
            <FadeIn>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-20 italic">Say Hello.</h2>
              <div className="flex flex-col items-center gap-10">
                <a href="tel:19357500473" className="text-4xl md:text-7xl font-black hover:text-blue-600 transition-all tracking-tighter">193 5750 0473</a>
                <div className="px-5 py-2.5 bg-blue-50 rounded-full text-[10px] font-black uppercase text-blue-600 border border-blue-100 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping" /> 状态：求职中 / UI设计师</div>
                <div className="mt-20 text-slate-300 font-black text-xs tracking-widest uppercase">© {new Date().getFullYear()} Ren Junming · Digital Portfolio</div>
              </div>
            </FadeIn>
          </div>
        </footer>
      </main>
    </div>
  );
}
