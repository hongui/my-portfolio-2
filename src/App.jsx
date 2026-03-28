import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Mail, Phone, ArrowLeft, ExternalLink, Activity, Layers, Smartphone, PieChart, LayoutTemplate, Zap, Shield, ChevronRight, Monitor, Database, Settings, GraduationCap, Briefcase, Award, QrCode, CheckCircle2, Cpu, MousePointer2, User, FolderOpen, MessageSquare } from 'lucide-react';
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
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <nav className="sticky top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold transition-all group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 返回控制台
          </button>
          <div className="text-xs font-black tracking-widest text-slate-300 uppercase">Case Study / 2024</div>
        </div>
      </nav>

      <header className={`pt-24 pb-20 bg-gradient-to-br ${project.color} to-white border-b border-slate-100`}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest mb-6 shadow-lg shadow-blue-200">
                <project.icon className="w-3 h-3" /> {project.tag}
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-none">{project.title}</h1>
              <p className="text-xl text-slate-600 leading-relaxed font-medium">{project.desc}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 mt-24 space-y-40">
         {project.sections.map((section, idx) => (
           <section key={idx} className="relative">
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-4 sticky top-32 h-fit">
                   <div className="text-6xl font-black text-blue-600/10 mb-4">0{idx + 1}</div>
                   <h2 className="text-3xl font-black mb-6 tracking-tight">{section.title}</h2>
                   <p className="text-slate-500 leading-relaxed font-medium mb-8">{section.content}</p>
                </div>
                <div className="lg:col-span-8">
                   <div className="bg-white rounded-[2.5rem] p-4 border border-slate-200 shadow-2xl shadow-slate-200/50 overflow-hidden group">
                      <div className="aspect-[16/10] bg-slate-50 rounded-[1.8rem] overflow-hidden relative">
                         <img src={section.image} alt={section.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      </div>
                   </div>
                </div>
             </div>
           </section>
         ))}
      </main>

      <footer className="max-w-4xl mx-auto px-6 mt-40 text-center">
        <div className="p-12 bg-slate-900 rounded-[3rem] text-white">
          <h3 className="text-3xl font-black mb-6">想了解更多设计细节？</h3>
          <p className="text-slate-400 mb-8">关于该项目的组件库规范、交互原型以及开发还原度文档可私下交流。</p>
          <button onClick={onBack} className="px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-full font-bold transition-all flex items-center gap-2 mx-auto">
             返回作品集首页 <ArrowRight className="w-4 h-4" />
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
  const { scrollY, activeSection } = useScroll();
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
      desc: "针对司法行政底层业务，通过模块化组件与适老化适配，将原本碎片化的任务重塑为闭环的高效办公流。",
      sections: [
        { 
          title: "办公流程可视化设计", 
          content: "通过梳理 20+ 项司法高频业务，我们将原本深藏在三级菜单下的功能提取至首屏。通过“场景化卡片”设计，整体操作链路缩短 40%。", 
          image: "https://placehold.co/1200x750/f1f5f9/3b82f6?text=Justice+Workbench" 
        }
      ]
    },
    {
      id: 'p2',
      title: "法治舆情决策驾驶舱",
      tag: "数据可视化 / 舆情监控",
      color: "from-purple-100",
      icon: Database,
      desc: "服务于决策层的全景指挥中心。采用分模块设计，通过 135+ 个原子组件构建出实时、精准的数字化驾驶席。",
      sections: [
        { 
          title: "决策层分析视图", 
          content: "采用极简的左右分栏布局，核心指标通过“数字翻牌器”动效增强仪式感，确保决策者能在 3 秒内捕捉核心痛点。", 
          image: "https://placehold.co/1200x750/f3e8ff/a855f7?text=Data+Dashboard" 
        }
      ]
    },
    {
      id: 'p3',
      title: "司法可视化大屏设计",
      tag: "视觉动效 / 性能落地",
      color: "from-emerald-100",
      icon: Monitor,
      desc: "探索政务展示的科技美学极限。主导 AL 动效 IP 的全场景落地，并在极端硬件环境下实现极致流畅体验。",
      sections: [
        { 
          title: "AL 动效 IP 视觉体系", 
          content: "通过 3D 粒子建模与 AE 动画序列，构建了整套具有司法威严感的动态背景。", 
          image: "https://placehold.co/1200x750/ecfdf5/10b981?text=Smart+Justice+Screen" 
        }
      ]
    }
  ];

  if (currentView === 'detail' && selectedProject) {
    return <ProjectDetail project={selectedProject} onBack={() => setCurrentView('home')} />;
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden animate-in fade-in duration-500">
      
      {/* 交互式侧边栏 */}
      <aside className="fixed left-0 top-0 h-full z-[100] group flex">
        <div className="h-full bg-white/80 backdrop-blur-xl border-r border-slate-100 flex flex-col items-center py-8 w-16 group-hover:w-48 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] shadow-2xl shadow-slate-200/50 overflow-hidden">
          
          {/* 首位 R 图标 */}
          <div className="mb-12 flex items-center justify-start w-full px-4">
            <div className="w-8 h-8 min-w-[32px] bg-black text-white rounded-lg flex items-center justify-center font-black text-lg">R</div>
            <span className="ml-4 font-black tracking-tighter text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Ren Junming</span>
          </div>

          {/* 导航列表 */}
          <div className="flex flex-col gap-4 w-full px-2">
            {navItems.map((item) => (
              <a 
                key={item.id}
                href={`#${item.id}`}
                className={`flex items-center h-12 rounded-xl transition-all duration-300 relative overflow-hidden group/item ${activeSection === item.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900'}`}
              >
                <div className="w-12 h-12 min-w-[48px] flex items-center justify-center">
                  <item.icon className="w-5 h-5" />
                </div>
                <span className={`ml-2 font-bold text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-500 ${activeSection === item.id ? 'translate-x-0' : '-translate-x-4 group-hover:translate-x-0'}`}>
                  {item.label}
                </span>
                {activeSection === item.id && (
                  <div className="absolute right-0 w-1 h-4 bg-white rounded-l-full" />
                )}
              </a>
            ))}
          </div>

          <div className="mt-auto opacity-0 group-hover:opacity-100 transition-opacity pb-4">
            <p className="text-[8px] text-slate-300 font-black uppercase tracking-widest text-center">v4.0</p>
          </div>
        </div>
      </aside>

      {/* 内容区域主体 - 增加左侧内边距 */}
      <main className="pl-16 md:pl-24 transition-all duration-500">
        
{/* Hero Section - 右侧无边框模型 + 文字可叠加 */}
<section className="relative pt-48 pb-24 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row justify-center min-h-[90vh] gap-16 lg:gap-20 items-start lg:items-center">
  
{/* 左侧文字内容 - 回滚版 + 加大行间距 */}
<div className="flex-1 relative z-10">
  <div
    className="absolute top-[15%] right-[10%] w-[500px] h-[500px] rounded-full pointer-events-none z-0 opacity-50"
    style={{
      background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.05) 100%)',
      filter: 'blur(100px)',
      transform: `translate(${mousePos.x * 30}px, ${mousePos.y * 30}px)`,
      transition: 'transform 0.8s ease-out'
    }}
  />
 
  <FadeIn>
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-bold text-[10px] uppercase tracking-[0.3em] mb-10">
      <Activity className="w-3 h-3 animate-pulse" /> G Side Experience Design
    </div>
   
    {/* 四行标题 - 加大行间距 */}
    <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[1.05] mb-14">
      Hi,<br />
      我是任俊明<br />
      专注高效的<br />
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-400 to-indigo-600">政务系统设计</span>
    </h1>
   
    {/* 简介段落 - 加大行间距 */}
    <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mb-12 leading-[1.65] font-medium">
      深耕法治舆情与司法行政系统，擅长 0-1 构建复杂政务业务。我致力于以组件化思维驱动设计落地，将繁琐的业务转化为极致流畅的数字化体验。
    </p>

    <div className="flex gap-6">
      <a href="#work" className="group flex items-center gap-4 text-lg font-bold transition-all">
        开始探索作品 <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all"><ArrowRight className="w-5 h-5" /></div>
      </a>
    </div>
  </FadeIn>
</div>

  {/* 右侧无边框 Spline 窗口 - 模型直接显示 */}
  <div className="flex-1 w-full lg:w-auto relative lg:-mt-8">
    <div className="relative w-full h-[460px] lg:h-[580px] overflow-hidden rounded-[2.75rem]">
      <Spline 
        scene="https://prod.spline.design/xxocG5UX04nYJYmm/scene.splinecode" 
        className="absolute inset-0 w-full h-full scale-[1.08]"
        onLoad={() => {
          const loadingEl = document.getElementById('spline-loading');
          if (loadingEl) {
            loadingEl.style.opacity = '0';
            setTimeout(() => {
              if (loadingEl) loadingEl.style.display = 'none';
            }, 800);
          }
        }}
      />
      
      {/* 加载提示 */}
      <div id="spline-loading" 
           className="absolute inset-0 flex items-center justify-center bg-slate-50/80 z-10 transition-opacity duration-700">
        <div className="flex flex-col items-center gap-3">
          <div className="w-5 h-5 border-2 border-slate-300 border-t-blue-600 rounded-full animate-spin"></div>
          <div className="text-slate-400 text-sm font-medium">加载 3D 场景中...</div>
        </div>
      </div>
    </div>
  </div>
</section>
        
        {/* About Me */}
        <section id="about" className="py-32 relative scroll-mt-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
              <FadeIn>
                <h2 className="text-5xl font-black mb-10 tracking-tighter italic text-slate-900 underline decoration-blue-600 decoration-4 underline-offset-8">职业价值 / Value</h2>
                <p className="text-slate-500 text-xl mb-12 leading-relaxed font-medium">
                  毕业于杭州职业技术学院。在杭州睿云期间，主导了法治舆情项目从 0-1 的全链路落地。我不仅交付界面，更交付**设计系统**。通过沉淀 135+ 个原子组件，大幅提升了团队 40% 的产出效率。
                </p>
                <div className="space-y-4">
                  {[
                    { icon: Briefcase, title: "杭州睿云信息技术有限公司", desc: "UI设计师 / 2023 - 2025" },
                    { icon: GraduationCap, title: "杭州职业技术学院", desc: "数字媒体艺术设计 / 全日制专科" },
                    { icon: Award, title: "界面设计职业技能证书(高级)", desc: "国家学分银行权威认定" }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 items-start p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-colors group">
                      <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                        <item.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-black text-lg">{item.title}</h4>
                        <p className="text-slate-400 font-bold text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </FadeIn>
              <FadeIn delay={300}>
                <div className="bg-slate-900 text-white p-12 rounded-[3.5rem] relative overflow-hidden group shadow-2xl">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/20 blur-[100px] group-hover:bg-blue-600/30 transition-all" />
                  <h3 className="text-2xl font-black mb-12 flex items-center gap-4">专业技能工具</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    {[
                      { label: "专业设计软件", list: "Figma / MasterGo / Axure" },
                      { label: "AI 提效工具", list: "FigmaMake / Stitch" },
                      { label: "全链路落地", list: "物料印刷 / UI动效" },
                      { label: "系统化思维", list: "原子组件 / 设计资产" }
                    ].map((skill, i) => (
                      <div key={i} className="group/item">
                        <p className="text-blue-500 text-[10px] font-black uppercase tracking-widest mb-3">{skill.label}</p>
                        <p className="text-xl font-black group-hover/item:translate-x-1 transition-transform">{skill.list}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Work Section */}
        <section id="work" className="py-32 bg-slate-50 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-6">
            <FadeIn className="mb-20 text-center">
              <h2 className="text-5xl font-black tracking-tighter mb-4">核心项目拆解 / Projects</h2>
              <p className="text-slate-400 text-lg font-bold italic">基于《司法行政系统》项目深度复盘</p>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {projects.map((project, index) => (
                <FadeIn key={project.id} delay={index * 150}>
                  <ShimmerWrapper 
                    className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl hover:-translate-y-4 transition-all duration-500 h-full flex flex-col cursor-pointer group" 
                    onClick={() => { setSelectedProject(project); setCurrentView('detail'); }}
                  >
                    <div className={`w-16 h-16 rounded-[1.5rem] bg-gradient-to-br ${project.color} to-white flex items-center justify-center mb-10`}>
                      <project.icon className="w-8 h-8 text-slate-800" />
                    </div>
                    <div className="text-blue-600 font-black text-[10px] mb-4 tracking-[0.2em] uppercase">{project.tag}</div>
                    <h3 className="text-3xl font-black mb-6 leading-tight">{project.title}</h3>
                    <p className="text-slate-500 mb-10 flex-grow line-clamp-3 font-medium">{project.desc}</p>
                    <div className="flex items-center gap-3 text-slate-900 font-black group-hover:text-blue-600 group-hover:gap-5 transition-all">
                      查看项目详情 <ArrowRight className="w-5 h-5" />
                    </div>
                  </ShimmerWrapper>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <footer id="contact" className="py-32 bg-white text-center relative overflow-hidden scroll-mt-20">
          <div className="max-w-5xl mx-auto px-6 relative z-10">
            <FadeIn>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-20 italic">Say Hello.</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">
                <div className="flex flex-col items-center gap-6">
                  <div className="w-56 h-56 p-6 bg-slate-50 rounded-[3rem] border border-slate-100 flex items-center justify-center relative group shadow-inner">
                    <QrCode className="w-14 h-14 text-slate-300" />
                    <div className="absolute bottom-6 text-[10px] font-black uppercase tracking-widest text-slate-400">微信: PMR37</div>
                  </div>
                </div>
                <div className="lg:col-span-2 flex flex-col items-center lg:items-start gap-10">
                  <div className="flex flex-col items-center lg:items-start group cursor-pointer">
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-3">联系电话</p>
                    <a href="tel:19357500473" className="text-4xl md:text-7xl font-black hover:text-blue-600 transition-all tracking-tighter">193 5750 0473</a>
                  </div>
                  <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                     <div className="px-5 py-2.5 bg-blue-50 rounded-full text-[10px] font-black uppercase text-blue-600 flex items-center gap-2 border border-blue-100">
                       <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping" /> 状态：求职中 / UI设计师
                     </div>
                  </div>
                </div>
              </div>
              <div className="mt-32 pt-10 border-t border-slate-100 text-slate-300 font-black text-xs uppercase tracking-widest">
                © {new Date().getFullYear()} Ren Junming · Portfolio Digital 4.0
              </div>
            </FadeIn>
          </div>
        </footer>
      </main>
    </div>
  );
}
