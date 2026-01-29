import { useState } from 'react';
import { Monitor, Code, Database, Layers, GraduationCap, Briefcase, Star, Menu, X, Quote, Calendar } from 'lucide-react';

// GIFs: eager para ter URLs no mount; uso de loading="lazy" nas <img> evita download até perto do viewport
const gifModules = import.meta.glob<{ default: string }>('../gif/*.gif', { eager: true });
const gifs: Record<string, string> = Object.fromEntries(
  Object.entries(gifModules).map(([path, mod]) => {
    const filename = path.replace(/^.*\/(.+)\.gif$/, '$1');
    return [filename, mod.default];
  })
);

const formacaoAcademica = [
  { title: 'Ensino Médio', details: 'Setor Leste - College', dates: '2016 - 2018' },
  { title: 'Sistemas de Informação', details: 'FACNET Anhanguera - Graduação', dates: '2019 - 2022' }
];

const experiencias = [
  { title: 'Estagiário de T.I', details: 'Clínica OrthoLife - Brasília', dates: 'Set de 2019 - Nov de 2019' },
  { title: 'Estagiário de Desenvolvimento Front-End', details: 'Banco do Brasil - Brasília', dates: 'Nov de 2019 - Mar de 2020' },
  { title: 'Service Desk', details: 'DATAPREV - Remoto', dates: 'Jun de 2021 - Dez de 2022' },
  { title: 'Estagiário de Desenvolvimento Web', details: 'Universidade de Brasília - Híbrida', dates: 'Set de 2021 - Dez de 2022' }
];

function App() {
  const [activeTab, setActiveTab] = useState('all');
  const [activeSection, setActiveSection] = useState('inicio');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timelineTab, setTimelineTab] = useState<'formacao' | 'experiencias'>('experiencias');

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const services = [
    {
      icon: Monitor,
      title: 'Speed & Optimization',
      description: 'Improving load times, SEO and overall user experience through code and asset optimization.',
      color: 'from-yellow-400 to-orange-400'
    },
    {
      icon: Code,
      title: 'Full-Stack Solutions',
      description: 'End-to-end development from frontend UI to backend infrastructure and deployment.',
      color: 'from-green-400 to-emerald-400'
    },
    {
      icon: Database,
      title: 'Backend Development',
      description: 'Developing secure and scalable server-side logic, APIs, and database integration.',
      color: 'from-pink-400 to-rose-400'
    },
    {
      icon: Layers,
      title: 'Frontend Development',
      description: 'Building responsive, user-friendly web interfaces using modern frameworks like React or Vue.',
      color: 'from-cyan-400 to-blue-400'
    }
  ];

  const frontendSkills = [
    { name: 'React', level: 95 },
    { name: 'JavaScript', level: 90 },
    { name: 'TypeScript', level: 85 },
    { name: 'HTML / CSS', level: 92 }
  ];

  const backendSkills = [
    { name: 'Node.js', level: 88 },
    { name: 'PostgreSQL', level: 82 },
    { name: 'REST APIs', level: 90 },
    { name: 'Supabase', level: 85 }
  ];

  const resume = [
    {
      icon: GraduationCap,
      title: 'Sistemas de Informação',
      description: 'FACNET Anhanguera - Graduação'
    },
    {
      icon: Briefcase,
      title: 'Frontend Developer – [Company Name]',
      description: 'Worked as a frontend developer building dynamic web interfaces using React and CSS frameworks. Collaborated closely with designers to turn mockups into pixel-perfect user experiences.'
    },
    {
      icon: Briefcase,
      title: 'Backend Development Bootcamp',
      description: 'After gaining experience in frontend, enrolled in a backend-focused program covering Node.js, Express, MongoDB, and API design. Built several full-featured server-side applications and worked with databases, authentication, and RESTful services.'
    },
    {
      icon: Briefcase,
      title: 'Became a Full-Stack Developer',
      description: 'After months of frontend and back-end experience, made the leap from frontend to full-stack development. This transition allowed for deeper technical involvement and broader problem-solving.'
    },
    {
      icon: Briefcase,
      title: 'Estagiário de T.I',
      description: 'Clinica OrthoLife - Brasília'
    }
  ];

  const projects = [
    {
      title: 'E-Commerce-React',
      category: 'website',
      image: gifs['ecomerce-gif'] ?? ''
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
      name: 'Lucas Rodrigues',
      role: 'Coordenador NOC',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
      rating: 5,
      text: 'Trabalhei anos com este cara, ele sabe se virar quer onde esteja, ele sempre dá um jeito de resolver qualquer âmbito diante a seu favor.'
    },
    {
      name: 'Erick Adriano',
      role: 'Analista de Redes',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
      rating: 4,
      text: 'Trabalhei pouco tempo com este rapaz, mas o pouco que eu sei dele, em qualquer maré que ele entra, ele consegue sair dela. Tenho uma boa impressão, realizou serviços com toda a qualidade possível e atenção e suporte 24 horas por dia.'
    },
    {
      name: 'Maria Silva',
      role: 'Product Manager',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
      rating: 5,
      text: 'Excelente profissional, sempre entrega projetos no prazo e com qualidade excepcional. Sua capacidade de resolver problemas complexos é impressionante.'
    },
    {
      name: 'João Santos',
      role: 'Tech Lead',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
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

      <section id="home" className="min-h-screen flex items-center justify-center pt-24 sm:pt-20 px-4 sm:px-6">
        <div className="max-w-7xl w-full grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          <div className="space-y-6 sm:space-y-8 order-2 md:order-1">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                Thiago Mateus | <span className="block sm:inline">Full Stack Dev</span>
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

      <section id="sobre" className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-16 sm:py-20">
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
                  Com <strong className="text-white">Bacharel em Sistemas de Informação</strong>, e planos para se iniciar a <strong className="text-white">Pós-Graduação em Desenvolvimento Front-End</strong>. Desenvolvi projetos pessoais e acadêmicos que me deram autodeterminação e resolução de diversos erros, envolvendo equipes com recurso a metodologias ágeis.
                </p>
                <p>
                  Adquiri conhecimento sobre <strong className="text-white">React.js</strong>, <strong className="text-white">Vue.js</strong>, entre outros frameworks e bancos de dados. Aprimorando diariamente minhas habilidades em minha área de interesse, eu constantemente me esforço para me desenvolver em meu campo de trabalho, melhorando minhas habilidades.
                </p>
                <p>
                  Estou à procura de oportunidades para avançar na minha carreira, seja trabalhando em grandes equipes e/ou com diversos projetos.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {['React.js', 'Vue.js', 'TypeScript', 'Node.js', 'PostgreSQL'].map((skill) => (
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

      <section id="resumo" className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-16 sm:py-20">
        <div className="max-w-5xl w-full">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 sm:mb-10 text-center">Resumo</h2>

          {/* Abas: Formação acadêmica | Experiências (destaque visual) */}
          <div className="flex justify-center gap-2 sm:gap-4 mb-10 sm:mb-12">
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

            {[0, 1, 2, 3].map((i) => (
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

      <section id="portfolio" className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-16 sm:py-20">
        <div className="max-w-6xl w-full">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 sm:mb-8 text-center">My portfolio</h2>

          <div className="flex items-center justify-center gap-2 sm:gap-4 lg:gap-6 mb-8 sm:mb-12 overflow-x-auto pb-2">
            {['all', 'website', 'app', 'article', 'weblog'].map((tab) => (
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
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 sm:p-6">
                  <h3 className="text-white font-bold text-base sm:text-lg">{project.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="serviços" className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-16 sm:py-20">
        <div className="max-w-6xl w-full">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-10 sm:mb-16 text-center">Serviços</h2>

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

      <section id="depoimentos" className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-16 sm:py-20">
        <div className="max-w-6xl w-full">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Depoimentos</h2>
            <p className="text-gray-400 text-sm sm:text-base">Meus colegas de serviços</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 p-6 sm:p-8 rounded-2xl sm:rounded-3xl hover:border-gray-600 transition-all duration-300"
              >
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

      <section id="contatos" className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-16 sm:py-20">
        <div className="max-w-4xl w-full">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-10 sm:mb-16 text-center">Contact me</h2>

          <div className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap">
            <a
              href="https://github.com"
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
              href="tel:+556199228-3666"
              className="flex items-center justify-center hover:scale-110 transition-all"
            >
              <i className="fab fa-whatsapp contact-icon text-gray-300" />
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 border-t border-gray-800 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center text-gray-500">
          <p className="text-sm sm:text-base">2026 Portfolio. Desenvolvido com React e Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
