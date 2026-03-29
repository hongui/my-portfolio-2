import React, { useState, useEffect, useRef, Suspense } from 'react';
import { ArrowRight, Mail, Phone, ArrowLeft, ExternalLink, Activity, Layers, Smartphone, PieChart, LayoutTemplate, Zap, Shield, ChevronRight, Monitor, Database, Settings, GraduationCap, Briefcase, Award, QrCode, CheckCircle2, Cpu, MousePointer2, User, FolderOpen, MessageSquare, Target, Lightbulb } from 'lucide-react';

// 采用动态加载以避免编译阶段的解析错误
const Spline = React.lazy(() => import('@splinetool/react-spline').catch(() => ({
  default: () => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 text-slate-300">
      <Cpu className="w-16 h-16 mb-4 opacity-20 animate-pulse" />
      <p className="font-bold tracking-widest text-xs">3D SCENE LOADING...</p>
    </div>
  )
})));

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
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- 通用组件：扫光效果容器 ---
const ShimmerWrapper = ({ children, className = "", onClick }) => (
  <div className={`relative group overflow-hidden ${className}`} onClick={onClick}>
    {children}
    <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg] group-hover:left-[100%] transition-all duration-1000 ease-in-out pointer-events-none" />
  </div>
);

// --- 子页面：项目详情页 ---
const ProjectDetail = ({ project, onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 pb-32">
      {/* 顶部导航 */}
      <nav className="sticky top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold transition-all group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 返回作品集
          </button>
          <div className="text-xs font-black tracking-widest text-slate-300 uppercase">Case Study / Justice System</div>
        </div>
      </nav>

      {/* 详情页头部 */}
      <header className={`pt-24 pb-20 bg-gradient-to-br ${project.color} to-white border-b border-slate-100`}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest mb-6 shadow-lg shadow-blue-200">
              <project.icon className="w-3 h-3" /> {project.tag}
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight mb-8">
              {project.title}
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed font-medium">
              深耕司法行政数字化，通过全场景适配与组件化重构，构建高效、闭环的政务办公新生态。
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 mt-24 space-y-32">
        {/* 背景与痛点 */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <FadeIn>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-black">项目背景</h3>
            </div>
            <p className="text-lg text-slate-500 leading-[1.8] font-medium">
              传统司法办公系统长期面临“入口深、数据散、操作慢”的痛点。本项目旨在打破碎片化的业务条线，为执法人员提供“一屏通办、全程闭环”的数字化工作站。
            </p>
          </FadeIn>
          <FadeIn delay={200}>
            <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
              <h4 className="font-black text-slate-400 text-sm uppercase tracking-widest mb-6">核心挑战 / CHALLENGES</h4>
              <ul className="space-y-4">
                {[
                  "业务功能埋藏过深",
                  "移动端与PC端数据同步不及时",
                  "系统界面老旧，不符合适老化规范",
                  "缺乏统一的组件化资产"
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-slate-700 font-bold">
                    <span className="text-blue-600">✕</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </section>

        {/* 核心业务架构图占位 */}
        <FadeIn>
          <div className="relative bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm group">
            <div className="aspect-[16/9] w-full bg-slate-50 flex flex-col items-center justify-center group-hover:bg-slate-100 transition-colors">
              <LayoutTemplate className="w-16 h-16 text-slate-200 mb-4" />
              <p className="font-bold tracking-widest text-slate-300 text-sm">[ 核心业务架构全景图展示位 ]</p>
            </div>
          </div>
        </FadeIn>

        {/* 四端适配 */}
        <section>
          <div className="text-center mb-16">
            <h3 className="text-4xl font-black mb-4">全场景多端适配</h3>
            <p className="text-slate-400 font-bold">实现管理端、办理端、APP、iPad 四端数据互通</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "管理端", color: "bg-blue-50", icon: Monitor, desc: "决策大脑：数据总览" },
              { label: "办理端", color: "bg-emerald-50", icon: CheckCircle2, desc: "业务实操：流程审批" },
              { label: "APP端", color: "bg-purple-50", icon: Smartphone, desc: "移动执法：现场取证" },
              { label: "iPad端", color: "bg-amber-50", icon: Layers, desc: "会议演示：适老化设计" },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all h-full">
                <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center mb-6`}>
                  <item.icon className="w-6 h-6 text-slate-800" />
                </div>
                <h4 className="font-black text-xl mb-3">{item.label}</h4>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 界面细节展示占位 */}
        <section className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
           <div className="lg:col-span-2 space-y-8">
              <h3 className="text-3xl font-black mb-6">核心设计策略</h3>
              {[
                { t: "01 / 组件化思维", d: "沉淀 50+ 原子组件，缩短 40% 研发周期。" },
                { t: "02 / 场景化导航", d: "“卡片式”首屏设计，降低认知负担。" },
                { t: "03 / 适老化交互", d: "调整对比度与字号，提升操作性。" }
              ].map((s, i) => (
                <div key={i}>
                  <h4 className="font-black text-blue-600 mb-2">{s.t}</h4>
                  <p className="text-slate-500 font-medium">{s.d}</p>
                </div>
              ))}
           </div>
           <div className="lg:col-span-3">
              <div className="aspect-[4/3] bg-slate-900 rounded-[3rem] flex items-center justify-center border border-slate-800">
                 <div className="text-center text-slate-600">
                    <Monitor className="w-12 h-12 mx-auto mb-4 opacity-30" />
                    <p className="font-bold tracking-widest text-xs">[ 高保真界面细节展示位 ]</p>
                 </div>
              </div>
           </div>
        </section>
      </main>

      <footer className="max-w-4xl mx-auto px-6 mt-40">
        <div className="bg-blue-600 rounded-[3.5rem] p-12 text-center text-white">
          <h2 className="text-3xl font-black mb-10">探索更多数字化案例</h2>
          <button onClick={onBack} className="px-10 py-5 bg-white text-blue-600 rounded-full font-black text-lg shadow-xl inline-flex items-center gap-3">
            返回作品集首页 <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </footer>
    </div>
  );
};

// --- 主应用组件 ---
export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedProject, setSelectedProject] = useState(null);
  const { activeSection } = useScroll();
  const mousePos = useMousePosition();

  const navItems = [
    { id: 'about', label: '关于我', icon: User },
    { id: 'work', label: '项目分类', icon: FolderOpen },
    { id: 'contact', label: '联系我', icon: MessageSquare }
  ];

  const projects = [
    {
      id: 'p1',
      title: "司法行政系统工作台",
      tag: "业务系统重构 / 效率优先",
      color: "from-blue-100",
      icon: LayoutTemplate,
      desc: "针对司法行政底层业务，通过模块化组件与适老化适配，重塑为闭环的高效办公流。",
    },
    {
      id: 'p2',
      title: "法治舆情决策驾驶舱",
      tag: "数据可视化 / 舆情监控",
      color: "from-purple-100",
      icon: Database,
      desc: "采用分模块设计，通过 135+ 个原子组件构建出实时、精准的数字化驾驶席。",
    },
    {
      id: 'p3',
      title: "司法可视化大屏设计",
      tag: "视觉动效 / 性能落地",
      color: "from-emerald-100",
      icon: Monitor,
      desc: "主导 AL 动效 IP 的全场景落地，在极端硬件环境下实现极致流畅体验。",
    }
  ];

  if (currentView === 'detail' && selectedProject) {
    return <ProjectDetail project={selectedProject} onBack={() => setCurrentView('home')} />;
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 overflow-x-hidden">
      
      {/* 侧边导航 */}
      <aside className="fixed left-0 top-0 h-full z-[100] group flex">
        <div className="h-full bg-white/80 backdrop-blur-xl border-r border-slate-100 flex flex-col items-center py-8 w-16 group-hover:w-48 transition-all duration-500 shadow-2xl overflow-hidden">
          <div className="mb-12 flex items-center justify-start w-full px-4">
            <div className="w-8 h-8 min-w-[32px] bg-black text-white rounded-lg flex items-center justify-center font-black">R</div>
            <span className="ml-4 font-black text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity">Ren Junming</span>
          </div>
          <div className="flex flex-col gap-4 w-full px-2">
            {navItems.map((item) => (
              <a 
                key={item.id}
                href={`#${item.id}`}
                className={`flex items-center h-12 rounded-xl transition-all ${activeSection === item.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-slate-400 hover:bg-slate-50'}`}
              >
                <div className="w-12 h-12 min-w-[48px] flex items-center justify-center">
                  <item.icon className="w-5 h-5" />
                </div>
                <span className={`ml-2 font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity ${activeSection === item.id ? 'block' : 'hidden group-hover:block'}`}>
                  {item.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </aside>

      <main className="pl-16 md:pl-24">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row justify-center min-h-[85vh] gap-16 items-center">
          <div className="flex-1 relative z-10">
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-bold text-[10px] uppercase tracking-[0.3em] mb-8">
                <Activity className="w-3 h-3 animate-pulse" /> G Side Experience Design
              </div>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[1.05] mb-12">
                Hi,<br />我是任俊明<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-400 to-indigo-600">政务系统设计</span>
              </h1>
              <p className="text-xl text-slate-400 max-w-3xl mb-12 leading-[1.65] font-medium">
                深耕法治舆情与司法行政系统，致力于以组件化思维驱动设计落地。
              </p>
              <a href="#work" className="group flex items-center gap-4 text-lg font-bold">
                开始探索作品 <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all"><ArrowRight className="w-5 h-5" /></div>
              </a>
            </FadeIn>
          </div>

          {/* Spline 容器 - 动态安全加载 */}
          <div className="flex-1 w-full relative">
            <div className="relative w-full h-[460px] lg:h-[580px] overflow-hidden rounded-[2.75rem] bg-slate-50 border border-slate-100 shadow-inner">
              <Suspense fallback={
                <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50">
                  <Cpu className="w-12 h-12 text-slate-200 animate-pulse" />
                </div>
              }>
                <Spline scene="https://prod.spline.design/clonercopy-a4f6645607b328135832a875a6435661/scene.splinecode" />
              </Suspense>
              <div className="absolute bottom-6 right-6 px-4 py-2 bg-white/50 backdrop-blur-md rounded-full border border-white/20 text-[10px] font-black uppercase text-slate-400">Interactive 3D Scene</div>
            </div>
          </div>
        </section>

        {/* 关于我 */}
        <section id="about" className="py-32 max-w-7xl mx-auto px-6 scroll-mt-20">
            <FadeIn>
              <h2 className="text-5xl font-black mb-10 tracking-tighter italic text-slate-900 underline decoration-blue-600 decoration-4 underline-offset-8">职业价值 / Value</h2>
              <p className="text-slate-500 text-[21px] leading-[1.78] font-medium max-w-[920px] mb-20">
                主导了法治舆情项目从 0-1 的全链路落地。通过沉淀 135+ 个原子组件，大幅提升了团队产出效率。
              </p>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: Briefcase, title: "杭州睿云", desc: "UI设计师" },
                { icon: GraduationCap, title: "杭职院", desc: "数字媒体艺术设计" },
                { icon: Award, title: "技能证书", desc: "界面设计高级" }
              ].map((item, i) => (
                <div key={i} className="flex gap-5 items-start p-8 rounded-3xl bg-slate-50 border border-slate-100 h-full hover:border-blue-200 transition-colors">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex-shrink-0 flex items-center justify-center text-blue-600">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-black text-lg mb-1">{item.title}</h4>
                    <p className="text-slate-400 font-medium text-[15px]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
        </section>

        {/* 项目展示 */}
        <section id="work" className="py-32 bg-slate-50 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-6">
            <FadeIn className="mb-20 text-center">
              <h2 className="text-5xl font-black tracking-tighter mb-4">项目作品 / Projects</h2>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {projects.map((project, index) => (
                <FadeIn key={project.id} delay={index * 150}>
                  <ShimmerWrapper 
                    className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl hover:-translate-y-4 transition-all h-full flex flex-col cursor-pointer" 
                    onClick={() => { setSelectedProject(project); setCurrentView('detail'); }}
                  >
                    <div className={`w-16 h-16 rounded-[1.5rem] bg-gradient-to-br ${project.color} to-white flex items-center justify-center mb-10`}>
                      <project.icon className="w-8 h-8 text-slate-800" />
                    </div>
                    <div className="text-blue-600 font-black text-[10px] mb-4 tracking-[0.2em] uppercase">{project.tag}</div>
                    <h3 className="text-3xl font-black mb-6 leading-tight">{project.title}</h3>
                    <p className="text-slate-500 mb-10 flex-grow font-medium line-clamp-3">{project.desc}</p>
                    <div className="flex items-center gap-3 text-slate-900 font-black group-hover:text-blue-600 transition-all">
                      查看详情 <ArrowRight className="w-5 h-5" />
                    </div>
                  </ShimmerWrapper>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* 页脚 */}
        <footer id="contact" className="py-32 bg-white text-center scroll-mt-20">
          <FadeIn>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-20 italic">Say Hello.</h2>
            <div className="flex flex-col items-center gap-10">
               <div className="w-48 h-48 bg-slate-50 rounded-[3rem] flex flex-col items-center justify-center border border-slate-100">
                  <QrCode className="w-12 h-12 text-slate-200 mb-4" />
                  <span className="text-[10px] font-black text-slate-400">微信: PMR37</span>
               </div>
               <a href="tel:19357500473" className="text-4xl md:text-7xl font-black hover:text-blue-600 transition-colors">193 5750 0473</a>
               <div className="text-slate-300 font-black text-xs uppercase tracking-widest mt-20">
                  © {new Date().getFullYear()} Ren Junming · Portfolio 4.0
               </div>
            </div>
          </FadeIn>
        </footer>
      </main>
    </div>
  );
}
