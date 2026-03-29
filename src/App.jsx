import { 
  ArrowRight, 
  Activity, 
  LayoutTemplate, 
  Database, 
  Monitor, 
  Briefcase, 
  GraduationCap, 
  Award, 
  QrCode, 
  CheckCircle2, 
  Lightbulb, 
  Target, 
  Shield, 
  User, 
  FolderOpen, 
  MessageSquare,
  ArrowLeft   // ← 这里就是缺失的图标
} from 'lucide-react';
import { ArrowRight, Activity, LayoutTemplate, Database, Monitor, Briefcase, GraduationCap, Award, QrCode, CheckCircle2, Lightbulb, Target, Shield, User, FolderOpen, MessageSquare } from 'lucide-react';
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

  const isJusticeSystem = project.id === 'p1';
  const isDashboard = project.id === 'p2';
  const isVisualScreen = project.id === 'p3';

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 pb-32">
      
      {/* 顶部导航 */}
      <nav className="sticky top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold transition-all group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 返回作品集
          </button>
          <div className="text-xs font-black tracking-widest text-slate-300 uppercase">Case Study / {project.tag}</div>
        </div>
      </nav>

      {/* 头部 */}
      <header className={`pt-24 pb-20 bg-gradient-to-br ${project.color} to-white border-b border-slate-100`}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-blue-600 text-white text-sm md:text-base font-black uppercase tracking-widest mb-8 shadow-lg shadow-blue-200">
              <project.icon className="w-4 h-4" /> {project.tag}
            </div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight mb-8">
              {project.title}
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed font-medium">
              {project.desc}
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 mt-24 space-y-32">

        {isJusticeSystem && (
          <>
            {/* 项目背景 */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-xl"><Shield className="w-6 h-6" /></div>
                  <h3 className="text-3xl font-black">项目背景</h3>
                </div>
                <p className="text-lg text-slate-500 leading-[1.8]">
                  传统司法办公系统长期面临“入口深、数据散、操作慢”的痛点。本项目旨在打破碎片化业务条线，为执法人员提供“一屏通办、全程闭环”的数字化工作站。
                </p>
              </div>
              <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
                <h4 className="font-black text-slate-400 text-sm uppercase tracking-widest mb-6">核心挑战</h4>
                <ul className="space-y-4 text-slate-700">
                  <li className="flex gap-3"><span className="text-blue-600">●</span> 高频业务埋藏深，查找时间长</li>
                  <li className="flex gap-3"><span className="text-blue-600">●</span> 多端体验割裂，数据不同步</li>
                  <li className="flex gap-3"><span className="text-blue-600">●</span> 界面老旧，不符合适老化规范</li>
                </ul>
              </div>
            </section>

            {/* 项目统构成 - 四端 */}
            <section>
              <div className="text-center mb-12">
                <h3 className="text-4xl font-black mb-4">全场景多端适配</h3>
                <p className="text-slate-400">实现管理端、办理端、APP端、iPad端四端数据互通与体验统一</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: "管理端", emoji: "💻", color: "bg-blue-50", text: "数据总览、权限配置、统计分析" },
                  { label: "办理端", emoji: "✍️", color: "bg-emerald-50", text: "业务办理、流程审批、任务执行" },
                  { label: "APP端", emoji: "📲", color: "bg-purple-50", text: "移动执法、实时推送、现场办公" },
                  { label: "iPad端", emoji: "📟", color: "bg-amber-50", text: "会议演示、适老化设计、数据大屏" },
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group h-full">
                    <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform`}>
                      {item.emoji}
                    </div>
                    <h4 className="font-black text-xl mb-3">{item.label}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 首页功能概述图片 */}
            <section className="mt-16">
              <div className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4">首页功能概述</div>
              <div className="aspect-[16/10] w-full overflow-hidden rounded-[1.75rem] shadow-2xl border border-slate-100">
                <img 
                  src="https://raw.githubusercontent.com/hongui/my-portfolio-2/refs/heads/main/public/images/fzyq%20shouye.png" 
                  alt="首页功能概述" 
                  className="w-full h-full object-cover"
                />
              </div>
            </section>
          </>
        )}

        {/* 其他项目详情页可继续扩展 */}

      </main>

      {/* 底部 */}
      <footer className="max-w-4xl mx-auto px-6 mt-40 text-center">
        <button onClick={onBack} className="px-10 py-5 bg-blue-600 hover:bg-blue-500 rounded-full font-bold text-white transition-all flex items-center gap-3 mx-auto">
          返回作品集首页 <ArrowRight className="w-5 h-5" />
        </button>
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
      desc: "针对司法行政底层业务，通过模块化组件与适老化适配，将原本碎片化的任务重塑为闭环的高效办公流。"
    },
    {
      id: 'p2',
      title: "法治舆情决策驾驶舱",
      tag: "数据可视化 / 舆情监控",
      color: "from-purple-100",
      icon: Database,
      desc: "服务于决策层的全景指挥中心。采用分模块设计，通过 135+ 个原子组件构建出实时、精准的数字化驾驶席。"
    },
    {
      id: 'p3',
      title: "司法可视化大屏设计",
      tag: "视觉动效 / 性能落地",
      color: "from-emerald-100",
      icon: Monitor,
      desc: "探索政务展示的科技美学极限。主导 AL 动效 IP 的全场景落地，并在极端硬件环境下实现极致流畅体验。"
    }
  ];

  const handleSplineLoad = () => {
    const loadingEl = document.getElementById('spline-loading');
    if (loadingEl) {
      loadingEl.style.opacity = '0';
      setTimeout(() => {
        if (loadingEl) loadingEl.style.display = 'none';
      }, 800);
    }
  };

  if (currentView === 'detail' && selectedProject) {
    return <ProjectDetail project={selectedProject} onBack={() => setCurrentView('home')} />;
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden animate-in fade-in duration-500">
      
      {/* 侧边栏 */}
      <aside className="fixed left-0 top-0 h-full z-[100] group flex">
        <div className="h-full bg-white/80 backdrop-blur-xl border-r border-slate-100 flex flex-col items-center py-8 w-16 group-hover:w-48 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] shadow-2xl shadow-slate-200/50 overflow-hidden">
          <div className="mb-12 flex items-center justify-start w-full px-4">
            <div className="w-8 h-8 min-w-[32px] bg-black text-white rounded-lg flex items-center justify-center font-black text-lg">R</div>
            <span className="ml-4 font-black tracking-tighter text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Ren Junming</span>
          </div>

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
              </a>
            ))}
          </div>
        </div>
      </aside>

      <main className="pl-16 md:pl-24 transition-all duration-500">

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row justify-center min-h-[85vh] gap-16 lg:gap-20 items-start lg:items-center">
          
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-bold text-[10px] uppercase tracking-[0.3em] mb-8">
                <Activity className="w-3 h-3 animate-pulse" /> G Side Experience Design
              </div>
              
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[1.05] mb-12">
                Hi,<br />
                我是任俊明<br />
                专注高效的<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-400 to-indigo-600">政务系统设计</span>
              </h1>
              
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

          {/* 右侧 Spline */}
          <div className="flex-1 w-full lg:w-auto relative lg:-mt-8">
            <div className="relative w-full h-[460px] lg:h-[580px] overflow-hidden rounded-[2.75rem] bg-white">
              <Spline 
                scene="https://prod.spline.design/kN0BGRxHdBIuvXNd/scene.splinecode" 
                className="absolute inset-0 w-full h-full scale-[0.82]"
                onLoad={handleSplineLoad}
              />
              <div id="spline-loading" 
                   className="absolute inset-0 flex items-center justify-center bg-white/90 z-10 transition-opacity duration-700">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-5 h-5 border-2 border-slate-300 border-t-blue-600 rounded-full animate-spin"></div>
                  <div className="text-slate-400 text-sm font-medium">加载 3D 场景中...</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-32 relative scroll-mt-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-24">
              <FadeIn>
                <h2 className="text-5xl font-black mb-10 tracking-tighter italic text-slate-900 underline decoration-blue-600 decoration-4 underline-offset-8">
                  职业价值 / Value
                </h2>
                <div className="max-w-[920px]">
                  <p className="text-slate-500 text-[21px] leading-[1.78] font-medium text-justify">
                    毕业于杭州职业技术学院。在杭州睿云期间，主导了法治舆情项目从 0-1 的全链路落地。我不仅交付界面，更交付<strong>设计系统</strong>。通过沉淀 135+ 个原子组件，大幅提升了团队 40% 的产出效率。
                  </p>
                </div>
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
              {[
                { icon: GraduationCap, title: "杭州职业技术学院", desc: "数字媒体艺术设计 / 全日制专科" },
                { icon: Briefcase, title: "杭州睿云信息技术有限公司", desc: "UI设计师 / 2023 - 2025" },
                { icon: Award, title: "界面设计职业技能证书(高级)", desc: "国家学分银行权威认定" }
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 100}>
                  <div className="flex gap-5 items-start p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-all group h-full">
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex-shrink-0 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform mt-1">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-black text-lg leading-tight mb-1">{item.title}</h4>
                      <p className="text-slate-400 font-medium text-[15px]">{item.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={200}>
              <div className="bg-slate-900 text-white p-12 md:p-16 rounded-[3.5rem] relative overflow-hidden group shadow-2xl max-w-5xl mx-auto mt-24">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[120px] group-hover:bg-blue-600/20 transition-all duration-700" />
                
                <div className="flex items-center gap-4 mb-12">
                  <div className="w-3 h-8 bg-blue-600 rounded-full" />
                  <h3 className="text-3xl font-black tracking-tight">专业技能工具</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                  <div><p className="text-blue-400 text-xs font-black uppercase tracking-[0.08em] mb-3">专业设计软件</p><p className="text-2xl font-semibold">Figma / MasterGo / Axure</p></div>
                  <div><p className="text-blue-400 text-xs font-black uppercase tracking-[0.08em] mb-3">AI 提效工具</p><p className="text-2xl font-semibold">FigmaMake / Stitch</p></div>
                  <div><p className="text-blue-400 text-xs font-black uppercase tracking-[0.08em] mb-3">全链路落地</p><p className="text-2xl font-semibold">物料印刷 / UI动效</p></div>
                  <div><p className="text-blue-400 text-xs font-black uppercase tracking-[0.08em] mb-3">系统化思维</p><p className="text-2xl font-semibold">原子组件 / 设计资产</p></div>
                </div>
              </div>
            </FadeIn>
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
                    <div className="text-blue-600 font-black text-sm md:text-base mb-4 tracking-[0.05em] uppercase">
                      {project.tag}
                    </div>
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

        {/* Contact Footer */}
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
