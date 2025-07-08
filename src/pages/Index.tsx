import { useState, useEffect } from 'react';
import { Github, Linkedin, Twitter, Download, Mail, User, Code, ExternalLink, ChevronDown, Database, GitBranch, Server, FlaskConical, FileCode2, Figma, PenTool, LayoutDashboard, MousePointerClick, Globe, Zap } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useDragScroll } from '../hooks/useDragScroll';
interface FormData {
  name: string;
  email: string;
  message: string;
}
interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}
const skillIcons: Record<string, JSX.Element> = {
  'React.js': <Code className="text-cyan-400" size={16} />,
  'HTML5': <FileCode2 className="text-orange-500" size={16} />,
  'CSS3': <FileCode2 className="text-blue-500" size={16} />,
  'JavaScript': <Zap className="text-yellow-400" size={16} />,
  'Bootstrap': <LayoutDashboard className="text-purple-500" size={16} />,
  'Java': <Server className="text-red-700" size={16} />,
  'Spring Boot': <Server className="text-green-600" size={16} />,
  'Flask': <FlaskConical className="text-gray-500" size={16} />,
  'Django': <Server className="text-green-800" size={16} />,
  'Node.js': <Server className="text-green-400" size={16} />,
  'REST APIs': <Globe className="text-blue-400" size={16} />,
  'MySQL': <Database className="text-blue-700" size={16} />,
  'MongoDB': <Database className="text-green-700" size={16} />,
  'Git': <GitBranch className="text-orange-600" size={16} />,
  'GitHub': <Github className="text-gray-800" size={16} />,
  'WordPress': <FileCode2 className="text-blue-500" size={16} />,
  'Postman': <MousePointerClick className="text-orange-400" size={16} />,
  'Canva': <PenTool className="text-blue-400" size={16} />,
  'Figma': <Figma className="text-pink-500" size={16} />,
};
const Index = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const experienceScrollRef = useDragScroll();
  const projectsScrollRef = useDragScroll();
  const [result, setResult] = useState("");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 80,
    });
  }, []);
  const validateForm = (): FormErrors => {
    const errors: FormErrors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
    if (!formData.message.trim()) errors.message = 'Message is required';
    return errors;
  };
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);
    if (Object.keys(errors).length !== 0) return;

    setIsSubmitting(true);
    setResult("Sending....");
    const formDataObj = new FormData();
    formDataObj.append("name", formData.name);
    formDataObj.append("email", formData.email);
    formDataObj.append("message", formData.message);
    formDataObj.append("access_key", "e0023980-29fd-403e-af67-8cb7dcc442ee");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formDataObj
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      setFormData({ name: '', email: '', message: '' });
    } else {
      setResult(data.message);
    }
    setIsSubmitting(false);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  const scrollToSection = sectionId => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth'
    });
    setIsMobileMenuOpen(false);
  };
  const projects = [
    {
      title: "Quiz Management System – Hire IQ",
      description: "Built real‑time Admin Dashboard for HR‑led quiz creation, role‑based access control, and live monitoring. Used WebSockets and REST APIs to manage quizzes, automate result evaluation, and generate PDF/CSV reports. Created modular backend with CRUD operations and system‑wide alerts to optimize user performance tracking.",
      tech: ["React.js", "Spring Boot", "SQL"],
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=250&fit=crop",
      demo: "#"
    },
    {
      title: "Authentication Module – Hire IQ",
      description: "Developed secure JWT‑based login system with role‑based access and session management. Implemented Spring Boot REST APIs for user/order modules with validation and error handling. Designed normalized MySQL schema and improved query performance by 30%.",
      tech: ["React.js", "Spring Boot", "MySQL", "JWT"],
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=250&fit=crop",
      demo: "#"
    }
  ];
  const skills = [
    "React.js", "HTML5", "CSS3", "JavaScript", "Bootstrap",
    "Java", "Spring Boot", "Flask", "Django", "Node.js", "REST APIs",
    "MySQL", "MongoDB",
    "Git", "GitHub", "WordPress", "Postman", "Canva", "Figma"
  ];
  const experienceCards = [
    {
      title: "Core Organizer, Mahotsav 2026 ",
      org: "Vignan's Foundation for Science, Technology & Research",
      date: "May 2025 – Present",
      bullets: [
        "Led a 5‑member team to design 50+ posters and web creatives for Mahotsav 2026, boosting engagement by 30%.",
        "Developed responsive web apps using React.js and Spring Boot, reducing load time by 20%.",
        "Enhanced UI/UX features in collaboration with event coordinators, increasing satisfaction by 15%."
      ]
    },
    {
      title: "Deputy Secretary, Student Activity Council",
      org: "Vignan's Foundation for Science, Technology & Research",
      date: "June 2024 – May 2025",
      bullets: [
        "Led a 5‑member team to design 50+ posters and web creatives for Mahotsav 2026, boosting engagement by 30%.",
        "Developed responsive web apps using React.js and Spring Boot, reducing load time by 20%.",
        "Enhanced UI/UX features in collaboration with event coordinators, increasing satisfaction by 15%."
      ]
    },
    
    {
      title: "Web Design Coordinator, Mahotsav 2025",
      org: "Vignan's Foundation for Science, Technology & Research",
      date: "Oct 2024 – Feb 2025",
      bullets: [
        "Designed 20+ banners using Figma, increasing event sign-ups by 25%.",
        "Integrated and tested front‑end features across Mahotsav microsites for mobile responsiveness."
      ]
    }
  ];
  return (
    <div className="portfolio-container">
      {/* Navigation */}
      <header>
        <nav className="fixed top-0 left-0 right-0 z-50 glass-nav backdrop-blur-md bg-black/20 border-b border-cyan-500/20">
          <div className="container mx-auto px-6 py-4">
            <div className="flex justify-between items-center w-full">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Siva Sai Ruthvik Goli</h1>
              
              {/* Desktop Navigation */}
              <div className="hidden md:flex space-x-8">
                {['home', 'about', 'projects', 'contact'].map(section => (
                  <button key={section} onClick={() => scrollToSection(section)} className={`nav-link ${activeSection === section ? 'active' : ''} capitalize transition-colors hover:text-cyan-400`}>
                    {section}
                  </button>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden mobile-menu-button text-white hover:text-cyan-400 transition-colors relative"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`}></span>
                <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`}></span>
              </button>
            </div>

            {/* Mobile Navigation Menu */}
            {isMobileMenuOpen && (
              <div className="md:hidden mt-4 pb-4 border-t border-cyan-500/20">
                <div className="flex flex-col space-y-4 pt-4">
                  {['home', 'about', 'projects', 'contact'].map(section => (
                    <button
                      key={section}
                      onClick={() => scrollToSection(section)}
                      className={`nav-link ${activeSection === section ? 'active' : ''} capitalize transition-colors hover:text-cyan-400 text-left py-2 px-4 rounded-lg hover:bg-cyan-500/10`}
                    >
                      {section}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section id="home" className="hero-section min-h-screen flex items-center justify-center relative overflow-hidden" data-aos="fade-up">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20"></div>
          <div className="container mx-auto px-6 text-center relative z-10">
            <div className="avatar-container mb-8">
              <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 p-1 animate-pulse-glow flex items-center justify-center overflow-hidden">
                <img
                  src="/placeholder.svg"
                  alt="Siva Sai Ruthvik Goli - Full Stack Developer"
                  className="w-44 h-44 rounded-full object-cover"
                />
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-fade-in md:text-7xl" data-aos="fade-up">Siva Sai Ruthvik Goli</h1>
            <h2 className="text-xl md:text-2xl text-gray-300 mb-2 animate-fade-in-delay" data-aos="fade-up" data-aos-delay="100">Full Stack Developer</h2>
            <p className="text-lg text-gray-400 mb-2 animate-fade-in-delay" data-aos="fade-up" data-aos-delay="200">Guntur, Andhra Pradesh, India</p>
            <p className="text-base text-gray-400 mb-8 animate-fade-in-delay" data-aos="fade-up" data-aos-delay="300">Aspiring Full Stack Developer with strong proficiency in React.js, Spring Boot, and SQL. Proven ability to design secure, scalable web applications and develop REST APIs. Experienced in UI/UX design, real‑time systems, and agile development environments. Seeking a paid internship to apply and expand technical skills in a fast‑paced, collaborative setting.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button onClick={() => scrollToSection('projects')} className="cyber-button primary">
                View My Work
              </button>
              <button onClick={() => scrollToSection('contact')} className="cyber-button secondary flex items-center gap-2">
                <Mail size={20} />
                Contact
              </button>
            </div>
            <div className="animate-bounce">
              <ChevronDown size={32} className="text-cyan-400 cursor-pointer mx-auto" onClick={() => scrollToSection('about')} />
            </div>
          </div>
          <div className="floating-particles">
            {[...Array(20)].map((_, i) => <div key={i} className={`particle particle-${i + 1}`}></div>)}
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 relative" data-aos="fade-up">
          <div className="container mx-auto px-6">
            <h2 className="section-title" data-aos="fade-right">About Siva Sai Ruthvik Goli</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <article className="glass-card p-8">
                <h3 className="text-2xl font-bold text-cyan-400 mb-6" data-aos="fade-left">Professional Summary</h3>
                <p className="text-gray-300 leading-relaxed mb-6" data-aos="fade-up">
                  Aspiring Full Stack Developer with strong proficiency in React.js, Spring Boot, and SQL. Proven ability to design secure, scalable web applications and develop REST APIs. Experienced in UI/UX design, real‑time systems, and agile development environments. Seeking a paid internship to apply and expand technical skills in a fast‑paced, collaborative setting.
                </p>
                <h3 className="text-2xl font-bold text-cyan-400 mb-6 mt-8" data-aos="fade-left">Education</h3>
                <ul className="text-gray-300 leading-relaxed list-disc ml-6">
                  <li data-aos="fade-up" data-aos-delay="100"><strong>B.Tech, Computer Science & Engineering</strong><br/>Vignan's University, Guntur, Andhra Pradesh<br/>2023 – 2027</li>
                  <li className="mt-2" data-aos="fade-up" data-aos-delay="200"><strong>Pre‑University Course (MPC)</strong><br/>RGUKT – IIIT Srikakulam, Andhra Pradesh<br/>2021 – 2023</li>
                  <li className="mt-2" data-aos="fade-up" data-aos-delay="300"><strong>Secondary School Certificate</strong><br/>Santhinikethan School, Ananthasagaram<br/>2020 – 2021</li>
                </ul>
              </article>
              <aside className="glass-card p-8">
                <h3 className="text-2xl font-bold text-cyan-400 mb-6" data-aos="fade-right">Core Skills</h3>
                <div className="grid grid-cols-2 gap-3">
                  {skills.map((skill, i) => (
                    <div key={skill} className="skill-tag" data-aos="zoom-in" data-aos-delay={i * 50}>
                      {skillIcons[skill] || <Zap className="text-purple-400" size={16} />}
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-20 relative" data-aos="fade-up">
          <div className="container mx-auto px-6">
            <h2 className="section-title" data-aos="fade-right">Professional Experience</h2>
            <div ref={experienceScrollRef} className="flex overflow-x-auto space-x-6 scrollbar-hide py-4">
              {experienceCards.map((exp, idx) => (
                <article
                  key={idx}
                  className={`glass-card p-8 flex-shrink-0 ${experienceCards.length <= 2 ? 'flex-1 min-w-0' : 'min-w-[320px] max-w-xs'}`}
                >
                  <h3 className="text-xl font-bold text-cyan-400 mb-2">{exp.title}</h3>
                  <p className="text-gray-400 mb-1">{exp.org}</p>
                  <p className="text-gray-400 mb-1">{exp.date}</p>
                  <ul className="list-disc ml-6 text-gray-300">
                    {exp.bullets.map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 relative" data-aos="fade-up">
          <div className="container mx-auto px-6">
            <h2 className="section-title" data-aos="fade-right">Featured Projects </h2>
            <div ref={projectsScrollRef} className="flex overflow-x-auto space-x-6 scrollbar-hide py-4">
              {projects.map((project, index) => (
                <article
                  key={index}
                  className={`project-card glass-card overflow-hidden group flex-shrink-0 ${projects.length <= 2 ? 'flex-1 min-w-0' : 'min-w-[320px] max-w-xs'}`}
                >
                  <div className="project-image-container">
                    <img src={project.image} alt={`${project.title} - Project by Siva Sai Ruthvik Goli`} className="w-full h-48 object-cover transition-transform group-hover:scale-110" />
                    <div className="project-overlay">
                      <div className="flex gap-4">
                        <a href={project.demo} className="project-link">
                          <ExternalLink size={20} />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                    <p className="text-gray-300 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map(tech => <span key={tech} className="tech-tag">{tech}</span>)}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 relative" data-aos="fade-up">
          <div className="container mx-auto px-6">
            <h2 className="section-title" data-aos="fade-right">Contact Me</h2>
            <div className="max-w-2xl mx-auto">
              <div className="glass-card p-8">
                <form onSubmit={onSubmit} className="space-y-6" data-aos="fade-up">
                  <div className="form-group">
                    <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleInputChange} className={`cyber-input ${formErrors.name ? 'error' : ''}`} />
                    {formErrors.name && <span className="error-text">{formErrors.name}</span>}
                  </div>
                  <div className="form-group">
                    <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleInputChange} className={`cyber-input ${formErrors.email ? 'error' : ''}`} />
                    {formErrors.email && <span className="error-text">{formErrors.email}</span>}
                  </div>
                  <div className="form-group">
                    <textarea name="message" placeholder="Your Message" rows={5} value={formData.message} onChange={handleInputChange} className={`cyber-input ${formErrors.message ? 'error' : ''}`} />
                    {formErrors.message && <span className="error-text">{formErrors.message}</span>}
                  </div>
                  <button type="submit" disabled={isSubmitting} className="cyber-button primary w-full flex items-center justify-center gap-2">
                    {isSubmitting ? <div className="spinner"></div> : <>
                        <Mail size={20} />
                        Send Message
                      </>}
                  </button>
                  {result && (
                    <div className="text-center mt-4 text-cyan-400">{result}</div>
                  )}
                </form>
              </div>

              {/* Social Links */}
              <div className="flex justify-center gap-6 mt-12" data-aos="fade-up" data-aos-delay="200">
                <a href="https://github.com/sivasairuthvik" className="social-link" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile of Siva Sai Ruthvik Goli">
                  <Github size={24} />
                </a>
                <a href="https://www.linkedin.com/in/siva-sai-ruthvik-goli/" className="social-link" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile of Siva Sai Ruthvik Goli">
                  <Linkedin size={24} />
                </a>
              </div>

              <div className="text-center mt-8 text-gray-400" data-aos="fade-up" data-aos-delay="300">
                <p>Email: <a href="mailto:231FA04F89@vignan.ac.in" className="text-cyan-400 underline">231FA04F89@vignan.ac.in</a></p>
                <p>Phone: <a href="tel:+916304064551" className="text-cyan-400 underline">+91 63040 64551</a></p>
                <p>Location: Guntur, Andhra Pradesh, India</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-cyan-500/20 text-center bg-transparent">
        <div className="container mx-auto px-6">
          <div className="flex justify-center gap-8 mb-4">
            <a href="https://www.linkedin.com/in/siva-sai-ruthvik-goli/" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors" aria-label="LinkedIn Profile of Siva Sai Ruthvik Goli">
              <Linkedin size={28} />
            </a>
            <a href="https://github.com/sivasairuthvik" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors" aria-label="GitHub Profile of Siva Sai Ruthvik Goli">
              <Github size={28} />
            </a>
            <a href="https://www.instagram.com/ruthvikofficial" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors" aria-label="Instagram Profile of Siva Sai Ruthvik Goli">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.5" y2="6.5"></line>
              </svg>
            </a>
          </div>
          <p className="text-gray-400"> Copyright © 2025 <a href="https://www.linkedin.com/in/siva-sai-ruthvik-goli/" className="text-cyan-400 underline hover:text-cyan-300" target="_blank" rel="noopener noreferrer">Siva Sai Ruthvik Goli</a>. All rights reserved</p>
        </div>
      </footer>
    </div>
  );
};
export default Index;