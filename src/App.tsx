import { useState, useRef } from 'react';
import { Monitor, Code, Database, Layers, GraduationCap, Briefcase, Star, Menu, X, Quote, Calendar, ArrowRight } from 'lucide-react';

// GIFs: eager para ter URLs no mount; uso de loading="lazy" nas <img> evita download até perto do viewport
const gifModules = import.meta.glob<{ default: string }>('../gif/*.gif', { eager: true });
const gifs: Record<string, string> = Object.fromEntries(
  Object.entries(gifModules).map(([path, mod]) => {
    const filename = path.replace(/^.*\/(.+)\.gif$/, '$1');
    return [filename, mod.default];
  })
);

const formacaoAcademica = [  
  { title: 'Sistemas de Informação', details: 'FACNET Anhanguera - Graduação', dates: '2019 - 2022' },  
];

const experiencias = [  
  { title: 'Analista de Suporte & Desenvolvimento - Remoto', details: 'NeuroSaber - Londrina - Remoto', dates: 'Mar de 2025 - atualmente' },
  { title: 'Auxiliar de TI', details: 'Aser Security - Remoto', dates: 'Mar de 2023 - Mar de 2025' },  
  { title: 'Service Desk', details: 'DATAPREV - Remoto', dates: 'Jun de 2021 - Dez de 2022' },
  { title: 'Estagiário de Desenvolvimento Web', details: 'Universidade de Brasília - Remoto', dates: 'Set de 2021 - Dez de 2022' }, 
  { title: 'Estagiário de Desenvolvimento Front-End', details: 'Banco do Brasil - Brasília', dates: 'Nov de 2019 - Mar de 2020' }, 
  { title: 'Estagiário de T.I', details: 'Clínica OrthoLife - Brasília', dates: 'Set de 2019 - Nov de 2019' }
];

function App() {
  const [activeTab, setActiveTab] = useState('all');
  const [activeSection, setActiveSection] = useState('inicio');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timelineTab, setTimelineTab] = useState<'formacao' | 'experiencias'>('experiencias');
  const [hoveredProjectIndex, setHoveredProjectIndex] = useState<number | null>(null);
  const [previewReady, setPreviewReady] = useState<Record<number, boolean>>({});
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const loaderImgRefs = useRef<(HTMLImageElement | null)[]>([]);

  const drawFirstFrame = (index: number) => {
    const img = loaderImgRefs.current[index];
    const canvas = canvasRefs.current[index];
    if (!img || !canvas || !img.complete) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0);
    setPreviewReady((prev) => ({ ...prev, [index]: true }));
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const services = [
    {
      icon: Monitor,
      title: 'Velocidade e Otimização',
      description: 'Melhorando a velocidade de carregamento, SEO e experiência do usuário através de otimização de código e ativos.',
      color: 'from-yellow-400 to-orange-400'
    },
    {
      icon: Code,
      title: 'Soluções Full-Stack',
      description: 'Desenvolvimento end-to-end do frontend UI ao backend e deployment.',
      color: 'from-green-400 to-emerald-400'
    },
    {
      icon: Database,
      title: 'Desenvolvimento Backend',
      description: 'Desenvolvendo lógica segura e escalável do lado do servidor, APIs e integração de banco de dados.',
      color: 'from-pink-400 to-rose-400'
    },
    {
      icon: Layers,
      title: 'Desenvolvimento Frontend',
      description: 'Criando interfaces web responsivas e amigáveis usando frameworks modernos como React ou Vue.',
      color: 'from-cyan-400 to-blue-400'
    }
  ];

  const frontendSkills = [
    { name: 'React', level: 75 },
    { name: 'JavaScript', level: 50 },
    { name: 'TypeScript', level: 65 },
    { name: 'HTML / CSS', level: 92 },
    { name: 'Git', level: 60 },
    { name: 'Postman', level: 70 },
    { name: 'Webhooks', level: 80 },
    { name: 'GitBook', level: 89 },
    { name: 'Bolt.new', level: 99 }
  ];

  const backendSkills = [
    { name: 'Node.js', level: 66 },
    { name: 'PostgreSQL', level: 52 },
    { name: 'REST APIs', level: 55 },
    { name: 'Supabase', level: 85 },
    { name: 'Python', level: 68 },
    { name: 'N8N', level: 60 },
    { name: 'Streamlit', level: 69 },    
    { name: 'Cursor AI', level: 99 },
    { name: 'Dribbble', level: 99 }
  ];


  const projects = [
    {
      title: 'E-Commerce-React',
      category: 'website',
      image: gifs['ecomerce-gif'] ?? '',
      description: 'Projeto de e-commerce com React.js e API Fake Store.',
      github: 'https://github.com/thiagomms/ecommerce-react',
      demo: 'https://ecommerce-thiagomms-demo.netlify.app/'
    },
    {
      title: 'FullStack CRUD',
      category: 'website',
      image: gifs['fullstack-crud-gif2'] ?? ''
    },
    {
      title: 'Controle Financeiro',
      category: 'website',
      image: gifs['controle-financeiro-gif3'] ?? ''
    },
    {
      title: 'Vue - burguer',
      category: 'website',
      image: gifs['vue-burguer']
    },
    {
      title: 'Blog Platform',
      category: 'website',
      image: gifs['gif5']
    },
    {
      title: 'Blog Platform',
      category: 'website',
      image: gifs['gif6']
    },
    {
      title: 'Blog Platform',
      category: 'website',
      image: gifs['vue-burguer']
    },
    {
      title: 'Social Media Dashboard',
      category: 'app',
      image: gifs['gif7']
    }
  ];

  const filteredProjects = activeTab === 'all'
    ? projects
    : projects.filter(p => p.category === activeTab);

  const testimonials = [
    {
      name: 'Thiago Reis',
      role: 'Líder - Supervisor de trabalho',
      image: '/depoiments/thiago%20reis.jpg',
      linkedin: 'https://www.linkedin.com/in/thiagoafrika',
      rating: 5,
      text: 'O Thiago Mateus foi um dos profissionais mais completos com quem já tive a oportunidade de trabalhar. Sempre buscou soluções inovadoras para otimizar as demandas e SLAs do dia a dia, demonstrando proatividade e pensamento estratégico. Tive o enorme prazer de liderá-lo e pude perceber o quanto ele é o tipo de profissional que toda equipe de TI precisa: comprometido, prestativo, gentil e altamente comunicativo. Foi realmente uma honra trabalhar com ele.'
    },
    {
      name: 'Lucas Rodrigues',
      role: 'Coordenador NOC - Supervisor de trabalho',
      image: '/depoiments/lucas.jfif',
      linkedin: 'https://www.linkedin.com/in/lucas-rodrigues-lins',
      rating: 5,
      text: 'Um excelente profissional, possuí alto desempenho e uma alta gama de aprendizagem, um trabalhador bem versátil e que se encaixa em qualquer ambiente de trabalho, possuí um excelente domínio na área de MySQL, React, PHP, Angular e VUE.js. Posso afirmar que possuí uma ótima compreensão em inglês e um bom domínio nas atividades em que são passadas diariamente e entrega as atividades finalizadas bem antes do prazo estipulado.Trabalhei anos com este cara, ele sabe se virar quer onde esteja, ele sempre dá um jeito de resolver qualquer âmbito diante a seu favor.'
    },
    {
      name: 'Erick Adriano',
      role: 'Analista de Redes',
      image: '/depoiments/erick.jfif',
      rating: 4,
      text: 'Trabalhei pouco tempo com este rapaz, mas o pouco que eu sei dele, em qualquer maré que ele entra, ele consegue sair dela. Tenho uma boa impressão, realizou serviços com toda a qualidade possível e atenção e suporte 24 horas por dia.'
    },
    {
      name: 'JP Du',
      role: 'Colega de trabalho',
      image: '/depoiments/jp%20du.jfif',
      rating: 5,
      text: 'Excelente profissional, sempre entrega projetos no prazo e com qualidade excepcional. Sua capacidade de resolver problemas complexos é impressionante.'
    },
    {
      name: 'Du',
      role: 'Colega de trabalho',
      image: '/depoiments/du.jfif',
      rating: 5,
      text: 'Um desenvolvedor full-stack completo. Domina tanto frontend quanto backend com maestria. Recomendo fortemente para qualquer projeto desafiador.'
    }    
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <nav className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-md z-50 border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl sm:text-2xl font-bold text-white">Thiago Mateus</h1>

            <div className="hidden md:flex items-center gap-4 lg:gap-6">
              {['Home', 'Sobre', 'Resumo', 'Portfolio', 'Serviços', 'Depoimentos', 'Contatos'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section.toLowerCase())}
                  className={`transition-colors text-sm lg:text-base ${
                    activeSection === section.toLowerCase()
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-900 border-t border-gray-700/50">
            <div className="px-4 py-4 space-y-3">
              {['Home', 'Sobre', 'Resumo', 'Portfolio', 'Serviços', 'Depoimentos', 'Contatos'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section.toLowerCase())}
                  className={`block w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeSection === section.toLowerCase()
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <section id="home" className="min-h-[85vh] flex items-center justify-center pt-24 sm:pt-20 pb-12 sm:pb-16 px-4 sm:px-6">
        <div className="max-w-7xl w-full grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          <div className="space-y-6 sm:space-y-8 order-2 md:order-1">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                Thiago Mateus | <span className="block sm:inline">Dev Full Stack</span>
              </h2>
              <div className="space-y-2 text-sm sm:text-base text-gray-300">                               
                <p><span className="text-gray-500">●</span> <span className="font-medium">Cidade:</span> Brasília, Brasil</p>
                <p><span className="text-gray-500">●</span> <span className="font-medium">Freelancer:</span> Disponivel </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <button
                onClick={() => scrollToSection('contatos')}
                className="px-6 sm:px-8 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors text-sm sm:text-base"
              >
                Contatos
              </button>
              <button
                onClick={() => scrollToSection('portfolio')}
                className="px-6 sm:px-8 py-3 border border-gray-600 hover:border-gray-500 text-white rounded-lg font-medium transition-colors text-sm sm:text-base"
              >
                Trabalhos
              </button>
            </div>
          </div>

          <div className="flex justify-center order-1 md:order-2">
            <div className="relative">
              <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] bg-blue-500 overflow-hidden border-4 border-blue-600">
                <img
                  src="/perfil.png"
                  alt="Profile"
                  className="w-full h-full object-cover opacity-90"
                  decoding="async"
                  fetchPriority="high"
                />
              </div>
              <div className="absolute top-6 sm:top-10 -right-6 sm:-right-10 w-16 h-16 sm:w-20 sm:h-20 bg-gray-700 border-4 border-gray-600 rounded-full flex items-center justify-center">
                <Code className="w-7 h-7 sm:w-10 sm:h-10 text-red-400" />
              </div>
              <div className="absolute bottom-16 sm:bottom-20 -left-6 sm:-left-10 w-16 h-16 sm:w-20 sm:h-20 bg-gray-700 border-4 border-gray-600 rounded-full flex items-center justify-center">
                <Database className="w-7 h-7 sm:w-10 sm:h-10 text-cyan-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="sobre" className="flex items-center justify-center px-4 sm:px-6 py-10 sm:py-14">
        <div className="max-w-6xl w-full">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-10 items-start">
            {/* Card esquerda: Sobre / Minha Carreira + placeholder 3D + texto */}
            <div className="bg-gray-800 border border-gray-700/50 p-6 sm:p-8 rounded-2xl sm:rounded-3xl">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1">Sobre</h2>
              <p className="text-gray-400 text-sm sm:text-base mb-6">Minha Carreira</p>
              <div className="mb-6 rounded-xl overflow-hidden bg-gray-900/80 border border-gray-700/50 aspect-video min-h-[180px]">
                <img
                  src={gifs['about'] ?? ''}
                  alt="Sobre mim - código e visualização 3D"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div> 
            </div>

            {/* Coluna direita: texto + tags de skills */}
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Sobre mim</h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  Formado em <strong className="text-white">Sistemas de Informação</strong>, tenho experiência prática com desenvolvimento Front-End, suporte técnico, automações e integração de APIs. Atuo em sistemas em <strong className="text-white">React + Supabase</strong>, automações com <strong className="text-white">Python</strong> (pandas, Streamlit) e N8N, além da criação de dashboards e documentações técnicas via GitBook.
                </p>
                <p>
                  Domínio em Git, Postman, Webhooks, bancos de dados (MySQL, Firebase, Supabase) e depuração de código em Node.js, React e TypeScript. Trabalho bem em equipe, aplicando metodologias ágeis e buscando melhoria contínua.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {['React.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Python', 'N8N', 'Streamlit', 'GitBook'].map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 rounded-full border border-gray-600 bg-gray-800/80 text-white text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="flex items-center justify-center px-4 sm:px-6 py-10 sm:py-14">
        <div className="max-w-6xl w-full">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 sm:mb-8 text-center">Skills Developer</h2>
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 p-6 sm:p-8 rounded-2xl sm:rounded-3xl">
            <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Monitor className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" />
                  <h3 className="text-lg sm:text-xl font-bold text-white">Skill Dev1</h3>
                </div>
                <div className="space-y-5 sm:space-y-6">
                  {backendSkills.map((skill, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm sm:text-base text-gray-300">{skill.name}</span>
                        <span className="text-sm sm:text-base text-white font-bold">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-gray-500 to-gray-400 transition-all duration-1000"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Code className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
                  <h3 className="text-lg sm:text-xl font-bold text-white">Skill Dev2</h3>
                </div>
                <div className="space-y-5 sm:space-y-6">
                  {frontendSkills.map((skill, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm sm:text-base text-gray-300">{skill.name}</span>
                        <span className="text-sm sm:text-base text-white font-bold">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-gray-500 to-gray-400 transition-all duration-1000"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="resumo" className="flex items-center justify-center px-4 sm:px-6 py-10 sm:py-14">
        <div className="max-w-5xl w-full">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 sm:mb-8 text-center">Resumo</h2>

          {/* Abas: Formação acadêmica | Experiências (destaque visual) */}
          <div className="flex justify-center gap-2 sm:gap-4 mb-6 sm:mb-8">
            <button
              onClick={() => setTimelineTab('formacao')}
              className={`flex items-center gap-2 px-4 sm:px-6 py-3 rounded-lg transition-colors text-sm sm:text-base ${
                timelineTab === 'formacao'
                  ? 'text-sky-400 bg-sky-400/10 border border-sky-400/30'
                  : 'text-gray-500 hover:text-gray-300 border border-gray-700'
              }`}
            >
              <GraduationCap className="w-5 h-5" />
              Formação acadêmica
            </button>
            <button
              onClick={() => setTimelineTab('experiencias')}
              className={`flex items-center gap-2 px-4 sm:px-6 py-3 rounded-lg transition-colors text-sm sm:text-base ${
                timelineTab === 'experiencias'
                  ? 'text-sky-400 bg-sky-400/10 border border-sky-400/30'
                  : 'text-gray-500 hover:text-gray-300 border border-gray-700'
              }`}
            >
              <Briefcase className="w-5 h-5" />
              Experiências
            </button>
          </div>

          {/* Timeline: linha central + coluna esquerda (formação) + coluna direita (experiências) */}
          <div className="relative grid grid-cols-[1fr_auto_1fr] gap-x-0 gap-y-6 sm:gap-y-8 max-w-4xl mx-auto">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-sky-400/80 -translate-x-1/2 pointer-events-none" />

            {Array.from({ length: Math.max(formacaoAcademica.length, experiencias.length) }, (_, i) => i).map((i) => (
              <div key={i} className="contents">
                {/* Linha esquerda: card formação (só nas 2 primeiras linhas) */}
                <div className="flex justify-end pr-4 sm:pr-6 min-h-[80px]">
                  {i < formacaoAcademica.length ? (
                    <div className="w-full max-w-sm bg-gray-800/90 border border-gray-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-5">
                      <h3 className="text-white font-bold text-base sm:text-lg mb-1">{formacaoAcademica[i].title}</h3>
                      <p className="text-gray-400 text-sm mb-2">{formacaoAcademica[i].details}</p>
                      <div className="flex items-center gap-2 text-gray-500 text-xs sm:text-sm">
                        <Calendar className="w-4 h-4 text-sky-400 flex-shrink-0" />
                        {formacaoAcademica[i].dates}
                      </div>
                    </div>
                  ) : null}
                </div>
                {/* Centro: bolinha na linha */}
                <div className="flex flex-col items-center relative z-10">
                  <div className="w-4 h-4 rounded-full bg-sky-400 border-4 border-gray-900 flex-shrink-0 mt-6 sm:mt-7" />
                </div>
                {/* Linha direita: card experiência */}
                <div className="flex justify-start pl-4 sm:pl-6 min-h-[80px]">
                  {experiencias[i] ? (
                    <div className="w-full max-w-sm bg-gray-800/90 border border-gray-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-5">
                      <h3 className="text-white font-bold text-base sm:text-lg mb-1">{experiencias[i].title}</h3>
                      <p className="text-gray-400 text-sm mb-2">{experiencias[i].details}</p>
                      <div className="flex items-center gap-2 text-gray-500 text-xs sm:text-sm">
                        <Calendar className="w-4 h-4 text-sky-400 flex-shrink-0" />
                        {experiencias[i].dates}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="flex items-center justify-center px-4 sm:px-6 py-10 sm:py-14">
        <div className="max-w-6xl w-full">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 sm:mb-8 text-center">My portfolio</h2>

          <div className="flex items-center justify-center gap-2 sm:gap-4 lg:gap-6 mb-6 sm:mb-8 overflow-x-auto pb-2">
            {['all', 'website', 'app', '', ''].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`capitalize px-3 sm:px-6 py-2 rounded-lg transition-colors whitespace-nowrap text-sm sm:text-base ${
                  activeTab === tab
                    ? 'text-white font-medium bg-gray-800'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                {tab === 'all' ? 'All' : tab}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredProjects.map((project, index) => (
              <div
                key={index}
                className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gray-800 border border-gray-700 hover:border-gray-600 transition-all duration-300"
                onMouseEnter={() => setHoveredProjectIndex(index)}
                onMouseLeave={() => setHoveredProjectIndex(null)}
              >
                <div className="aspect-[4/3] overflow-hidden relative bg-gray-700/80">
                  {/* Imagem oculta só para extrair o primeiro frame */}
                  <img
                    ref={(el) => { loaderImgRefs.current[index] = el ?? null; }}
                    src={project.image}
                    alt=""
                    className="hidden"
                    onLoad={() => drawFirstFrame(index)}
                  />
                  {/* Canvas sempre no DOM para o ref existir quando a img carregar; preview estático (primeiro frame) - não anima */}
                  <canvas
                    ref={(el) => { canvasRefs.current[index] = el ?? null; }}
                    className={`absolute inset-0 w-full h-full object-cover ${previewReady[index] && hoveredProjectIndex !== index ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                    style={{ objectFit: 'cover' }}
                  />
                  {/* Placeholder até o primeiro frame carregar */}
                  {!previewReady[index] && hoveredProjectIndex !== index && (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm sm:text-base text-center px-4">
                      Carregando preview…
                    </div>
                  )}
                  {/* GIF só no hover - anima ao passar o mouse */}
                  {hoveredProjectIndex === index && (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      decoding="async"
                    />
                  )}
                  {/* Overlay só na área da imagem, para não esconder título/descrição/botões abaixo */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 sm:p-6 pointer-events-none">
                    <h3 className="text-white font-bold text-base sm:text-lg">{project.title}</h3>
                  </div>
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="text-white font-bold text-base sm:text-lg mb-1">{project.title}</h3>
                  {'description' in project && project.description && (
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">{project.description}</p>
                  )}
                  {('github' in project && project.github) || ('demo' in project && project.demo) ? (
                    <div className="flex flex-wrap gap-2">
                      {'github' in project && project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 text-sm font-medium transition-colors"
                        >
                          GitHub
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      )}
                      {'demo' in project && project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 text-sm font-medium transition-colors"
                        >
                          Demo
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="serviços" className="flex items-center justify-center px-4 sm:px-6 py-10 sm:py-14">
        <div className="max-w-6xl w-full">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 sm:mb-8 text-center">Serviços</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 p-5 sm:p-6 rounded-2xl sm:rounded-3xl hover:border-gray-600 transition-all duration-300 group"
                >
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${service.color} rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3">{service.title}</h3>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="depoimentos" className="flex items-center justify-center px-4 sm:px-6 py-10 sm:py-14">
        <div className="max-w-6xl w-full">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Depoimentos</h2>
            <p className="text-gray-400 text-sm sm:text-base">Meus colegas de serviços</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 p-6 sm:p-8 rounded-2xl sm:rounded-3xl hover:border-gray-600 transition-all duration-300"
              >
                {testimonial.linkedin && (
                  <a
                    href={testimonial.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                  >
                    <i className="fab fa-linkedin text-base" />
                    Ver perfil
                  </a>
                )}
                <div className="flex items-start gap-4 mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-gray-600"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="flex-grow">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-white">{testimonial.name}</h3>
                        <p className="text-sm text-gray-400">{testimonial.role}</p>
                      </div>
                      <div className="flex gap-1 ml-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 sm:w-5 sm:h-5 ${
                              i < testimonial.rating
                                ? 'fill-green-400 text-green-400'
                                : 'fill-gray-600 text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <Quote className="absolute -top-2 -left-2 w-8 h-8 text-gray-700 opacity-50" />
                  <p className="text-gray-300 leading-relaxed text-sm sm:text-base pl-6">
                    {testimonial.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contatos" className="flex items-center justify-center px-4 sm:px-6 py-10 sm:py-14">
        <div className="max-w-4xl w-full">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 sm:mb-8 text-center">Contatos</h2>

          <div className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap">
            <a
              href="https://github.com/thiagomms"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center hover:scale-110 transition-all"
            >
              <i className="fab fa-github contact-icon text-gray-300" />
            </a>
            <a
              href="https://www.linkedin.com/in/thiagomms/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center hover:scale-110 transition-all"
            >
              <i className="fab fa-linkedin contact-icon text-gray-300" />
            </a>
            <a
              href="mailto:thiago.mateus0707@gmail.com"
              className="flex items-center justify-center hover:scale-110 transition-all"
            >
              <i className="fas fa-envelope contact-icon text-gray-300" />
            </a>
            <a
              href="#"
              className="flex items-center justify-center hover:scale-110 transition-all"
            >
              <i className="fas fa-paper-plane contact-icon text-gray-300" />
            </a>
            <a
              href="https://api.whatsapp.com/send?phone=5561992283666&text=Ol%C3%A1%20Thiago%2C"
              className="flex items-center justify-center hover:scale-110 transition-all"
            >
              <i className="fab fa-whatsapp contact-icon text-gray-300" />
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 border-t border-gray-800 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center text-gray-500">
          <p className="text-sm sm:text-base">2K26 Portfolio.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
