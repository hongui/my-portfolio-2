import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Mail, Phone, ArrowLeft, ExternalLink, Activity, Layers, Smartphone, PieChart, LayoutTemplate, Zap, Shield, ChevronRight, Monitor, Database, Settings, GraduationCap, Briefcase, Award, QrCode, CheckCircle2, Cpu, MousePointer2 } from 'lucide-react';

// --- 自定义 Hooks ---
const useScroll = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      const sections = ['about', 'work', 'metrics'];
      const current = sections.find(id => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
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
      {/* 顶部导航 */}
      <nav className="sticky top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold transition-all group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 返回控制台
          </button>
          <div className="text-xs font-black tracking-widest text-slate-300 uppercase">Case Study / 2024</div>
        </div>
      </nav>

      {/* 沉浸式头图 */}
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
            <div className="flex flex-wrap gap-4 lg:justify-end">
               <div className="px-6 py-4 bg-white/60 backdrop-blur rounded-2xl border border-white">
                  <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">角色</p>
                  <p className="font-bold text-slate-800">主导 UI/交互设计</p>
               </div>
               <div className="px-6 py-4 bg-white/60 backdrop-blur rounded-2xl border border-white">
                  <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">重点</p>
                  <p className="font-bold text-slate-800">G端体验重塑</p>
               </div>
            </div>
          </div>
        </div>
      </header>

      {/* 内容主体 */}
      <main className="max-w-6xl mx-auto px-6 mt-24 space-y-40">
         {project.sections.map((section, idx) => (
           <section key={idx} className="relative">
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-4 sticky top-32 h-fit">
                   <div className="text-6xl font-black text-blue-600/10 mb-4">0{idx + 1}</div>
                   <h2 className="text-3xl font-black mb-6 tracking-tight">{section.title}</h2>
                   <p className="text-slate-500 leading-relaxed font-medium mb-8">{section.content}</p>
                   {section.stats && (
                     <div className="grid grid-cols-2 gap-4">
                       {section.stats.map((s, i) => (
                         <div key={i} className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                           <div className="text-2xl font-black text-blue-600">{s.val}</div>
                           <div className="text-[10px] text-slate-400 font-bold uppercase">{s.label}</div>
                         </div>
                       ))}
                     </div>
                   )}
                </div>
                <div className="lg:col-span-8">
                   <div className="bg-white rounded-[2.5rem] p-4 border border-slate-200 shadow-2xl shadow-slate-200/50 overflow-hidden group">
                      <div className="aspect-[16/10] bg-slate-50 rounded-[1.8rem] overflow-hidden relative">
                         <div className="absolute inset-0 flex items-center justify-center text-slate-300 font-bold italic">
                           
                         </div>
                         <img src={section.image} alt={section.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      </div>
                   </div>
                </div>
             </div>
           </section>
         ))}
      </main>

      {/* 底部引导 */}
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
          content: "对应作品集核心章节。通过梳理 20+ 项司法高频业务，我们将原本深藏在三级菜单下的功能提取至首屏。通过“场景化卡片”设计，法治工作者可以一眼看到当前待办及预警信息，整体操作链路缩短 40%。", 
          stats: [{ val: "40%", label: "链路缩短" }, { val: "20+", label: "业务梳理" }],
          image: "https://placehold.co/1200x750/f1f5f9/3b82f6?text=办公流程可视化-PC/iPad适配展示" 
        },
        { 
          title: "适老化与跨端一致性", 
          content: "针对中老年司法干部，设计了“适老化特供模式”。重点优化了字号对比度、图标语义化以及触控热区（从 44px 提升至 60px）。同时保证了多端视觉语言高度统一，降低跨设备学习成本。", 
          stats: [{ val: "60px", label: "触控热区" }, { val: "1.5x", label: "字号放大" }],
          image: "https://placehold.co/1200x750/f1f5f9/3b82f6?text=适老化设计规范" 
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
          content: "采用极简的左右分栏布局，左侧为实时舆情热度线图，右侧为地域分布权重。核心指标通过“数字翻牌器”动效增强仪式感，确保决策者能在 3 秒内捕捉核心痛点。", 
          stats: [{ val: "135+", label: "原子组件" }, { val: "3s", label: "决策响应" }],
          image: "https://placehold.co/1200x750/f3e8ff/a855f7?text=数据分析主视图设计" 
        },
        { 
          title: "舆情线索监控闭环", 
          content: "针对执行层，设计了高密度的监控列表。通过红、橙、黄三级预警色块引导视觉重心。重点优化了“线索-研判-处置-反馈”的完整路径。 ", 
          stats: [{ val: "100%", label: "链路透明化" }, { val: "3级", label: "预警机制" }],
          image: "https://placehold.co/1200x750/f3e8ff/a855f7?text=舆情线索监控界面" 
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
          content: "通过 3D 粒子建模与 AE 动画序列，构建了整套具有司法威严感的动态背景。将原有的静态图表升级为“呼吸式”动态反馈，极大提升了视察时的交互沉浸感。", 
          stats: [{ val: "37.5%", label: "流畅度提升" }, { val: "4K", label: "超清适配" }],
          image: "https://placehold.co/1200x750/ecfdf5/10b981?text=AL动效大屏视觉展示" 
        },
        { 
          title: "WebP 动画性能优化", 
          content: "技术亮点实践：通过将所有大尺寸序列帧转换为 WebP 格式，在画质几乎无损的前提下，将资源体积从原有的 120MB 压缩至 18MB。GPU 负载降低 25%。", 
          stats: [{ val: "85%", label: "体积缩减" }, { val: "-25%", label: "GPU负载" }],
          image: "https://placehold.co/1200x750/ecfdf5/10b981?text=WebP优化性能对比" 
        }
      ]
    }
  ];

  if (currentView === 'detail' && selectedProject) {
    return <ProjectDetail project={selectedProject} onBack={() => setCurrentView('home')} />;
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden animate-in fade-in duration-500">
      
      {/* 增强型导航栏 */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="font-bold text-xl tracking-tighter flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors font-black">R</div>
            <span>Ren Junming.</span>
          </div>
          <div className="hidden md:flex gap-4 text-sm font-bold items-center">
            {[
              { id: 'about', label: '关于我' },
              { id: 'work', label: '项目分类' },
              { id: 'metrics', label: '核心成果' }
            ].map((nav) => (
              <a 
                key={nav.id}
                href={`#${nav.id}`} 
                className={`relative px-4 py-2 transition-all duration-300 rounded-lg group ${activeSection === nav.id ? 'text-blue-600' : 'text-slate-400 hover:text-slate-800'}`}
              >
                <span className="relative z-10">{nav.label}</span>
                <div className={`absolute inset-0 bg-blue-50 rounded-lg transition-all duration-500 ease-out ${activeSection === nav.id ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`} />
              </a>
            ))}
            <a href="#contact" className="ml-4 px-6 py-2.5 bg-slate-900 text-white rounded-full hover:bg-blue-600 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-slate-200">
              联系我
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-48 pb-24 px-6 max-w-7xl mx-auto flex flex-col justify-center min-h-[90vh]">
        <div 
          className="absolute top-[15%] right-[10%] w-[500px] h-[500px] rounded-full pointer-events-none z-0 opacity-50"
          style={{ 
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.05) 100%)',
            filter: 'blur(100px)',
            transform: `translate(${mousePos.x * 30}px, ${mousePos.y * 30}px)`,
            transition: 'transform 0.8s ease-out'
          }}
        />
        <div className="relative z-10">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-bold text-[10px] uppercase tracking-[0.3em] mb-8">
              <Activity className="w-3 h-3 animate-pulse" /> G Side Experience Design
            </div>
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.9] mb-16">
              Hi, 我是任俊明<br />
              专注高效的<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-400 to-indigo-600">政务系统设计</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mb-12 leading-relaxed font-medium">
              深耕法治舆情与司法行政系统，擅长 0-1 构建复杂政务业务。我致力于以组件化思维驱动设计落地，将繁琐的业务转化为极致流畅的数字化体验。
            </p>
            <div className="flex gap-6">
               <a href="#work" className="group flex items-center gap-4 text-lg font-bold transition-all">
                  开始探索作品 <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all"><ArrowRight className="w-5 h-5" /></div>
               </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* About Me */}
      <section id="about" className="py-32 relative scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <FadeIn>
              <h2 className="text-5xl font-black mb-10 tracking-tighter italic">职业价值 / Value</h2>
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
                <h3 className="text-2xl font-black mb-12 flex items-center gap-4">
                  <div className="w-2 h-8 bg-blue-600 rounded-full" />
                  专业技能工具
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  {[
                    { label: "专业设计软件", list: "Figma / MasterGo / Axure" },
                    { label: "AI 提效工具", list: "FigmaMake / Stitch / AI辅助" },
                    { label: "全链路落地", list: "物料印刷 / UI动效 / 开发走查" },
                    { label: "系统化思维", list: "原子组件 / 482+ 资产" }
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

      {/* 项目展示卡片 */}
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
                  className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/40 hover:-translate-y-4 transition-all duration-500 h-full flex flex-col cursor-pointer group" 
                  onClick={() => { setSelectedProject(project); setCurrentView('detail'); }}
                >
                  <div className={`w-16 h-16 rounded-[1.5rem] bg-gradient-to-br ${project.color} to-white flex items-center justify-center mb-10 group-hover:rotate-6 transition-transform shadow-sm`}>
                    <project.icon className="w-8 h-8 text-slate-800" />
                  </div>
                  <div className="text-blue-600 font-black text-[10px] mb-4 tracking-[0.2em] uppercase">{project.tag}</div>
                  <h3 className="text-3xl font-black mb-6 leading-tight">{project.title}</h3>
                  <p className="text-slate-500 mb-10 flex-grow leading-relaxed font-medium line-clamp-3">{project.desc}</p>
                  <div className="flex items-center gap-3 text-slate-900 font-black group-hover:text-blue-600 group-hover:gap-5 transition-all">
                    查看项目详情 <ArrowRight className="w-5 h-5" />
                  </div>
                </ShimmerWrapper>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 数据成果 */}
      <section id="metrics" className="py-32 bg-slate-900 text-white relative scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { val: "135+", label: "业务原子组件", sub: "基于司法行政规范沉淀", icon: PieChart },
              { val: "482", label: "数字化设计资产", sub: "1:1 高还原度上线", icon: Layers },
              { val: "85%", label: "WebP 优化", sub: "大屏加载体积缩减", icon: Zap },
              { val: "37.5%", label: "动效流畅度提升", sub: "技术方案实际落地", icon: Activity }
            ].map((item, idx) => (
              <FadeIn key={idx} delay={idx * 100}>
                <div className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 text-center group hover:bg-white/10 transition-colors">
                  <item.icon className="w-10 h-10 mx-auto mb-8 text-slate-500 group-hover:text-blue-400 group-hover:scale-110 transition-all" />
                  <div className="text-6xl font-black mb-3 tracking-tighter">{item.val}</div>
                  <div className="text-slate-100 font-black mb-2 tracking-tight">{item.label}</div>
                  <div className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{item.sub}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 联系方式 */}
      <footer id="contact" className="py-32 bg-white text-center relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <FadeIn>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-20 italic">Say Hello.</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">
              {/* 二维码占位 */}
              <div className="flex flex-col items-center gap-6">
                <div className="w-56 h-56 p-6 bg-slate-50 rounded-[3rem] border border-slate-100 flex items-center justify-center relative group shadow-inner">
                  <div className="absolute inset-0 bg-blue-600/5 blur-3xl group-hover:bg-blue-600/10 transition-all" />
                  <div className="w-full h-full border-2 border-dashed border-slate-200 rounded-[1.5rem] flex flex-col items-center justify-center text-slate-300">
                    <QrCode className="w-14 h-14 mb-3" />
                    <span className="text-[10px] uppercase tracking-widest font-black">微信: PMR37</span>
                  </div>
                </div>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em]">扫描或搜索 ID 添加微信</p>
              </div>

              {/* 核心信息 */}
              <div className="lg:col-span-2 flex flex-col items-center lg:items-start gap-10">
                <div className="flex flex-col items-center lg:items-start group cursor-pointer">
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-3">联系电话 / Phone</p>
                  <a href="tel:19357500473" className="text-4xl md:text-7xl font-black hover:text-blue-600 transition-all tracking-tighter">193 5750 0473</a>
                </div>
                
                <div className="flex flex-col items-center lg:items-start group cursor-pointer">
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-3">电子邮箱 / Email</p>
                  <a href="mailto:2242471824@qq.com" className="text-2xl md:text-4xl font-black text-slate-300 hover:text-slate-900 transition-all tracking-tight">2242471824@qq.com</a>
                </div>

                <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                   <div className="px-5 py-2.5 bg-slate-50 rounded-full text-[10px] font-black uppercase text-slate-500 flex items-center gap-2 border border-slate-100">
                     <div className="w-1.5 h-1.5 rounded-full bg-blue-600" /> 坐标：杭州市钱塘区
                   </div>
                   <div className="px-5 py-2.5 bg-blue-50 rounded-full text-[10px] font-black uppercase text-blue-600 flex items-center gap-2 border border-blue-100">
                     <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping" /> 状态：求职中 / UI设计师
                   </div>
                </div>
              </div>
            </div>

            <div className="mt-32 pt-10 border-t border-slate-100">
              <p className="text-slate-300 font-black text-xs uppercase tracking-widest">© {new Date().getFullYear()} Ren Junming · Portfolio Digital 4.0</p>
            </div>
          </FadeIn>
        </div>
      </footer>
    </div>
  );
}
