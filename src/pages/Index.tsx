
import { useState, useEffect } from 'react';
import { Github, Linkedin, Twitter, Download, Mail, User, Code, ExternalLink, ChevronDown } from 'lucide-react';

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

const Index = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

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

  const validateForm = (): FormErrors => {
    const errors: FormErrors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
    if (!formData.message.trim()) errors.message = 'Message is required';
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitting(false);
      setFormData({ name: '', email: '', message: '' });
      alert('Message sent successfully!');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const projects = [
    {
      title: "AI-Powered Task Manager",
      description: "Full-stack application with machine learning capabilities for intelligent task prioritization and scheduling.",
      tech: ["React", "Node.js", "Python", "TensorFlow", "MongoDB"],
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=250&fit=crop",
      github: "https://github.com",
      demo: "https://demo.com"
    },
    {
      title: "Real-time Collaboration Platform",
      description: "WebSocket-based platform enabling real-time document editing and team collaboration with advanced features.",
      tech: ["Vue.js", "Socket.io", "Express", "Redis", "PostgreSQL"],
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=250&fit=crop",
      github: "https://github.com",
      demo: "https://demo.com"
    },
    {
      title: "Blockchain Analytics Dashboard",
      description: "Comprehensive dashboard for cryptocurrency and DeFi analytics with real-time data visualization.",
      tech: ["Angular", "D3.js", "FastAPI", "Web3.js", "Docker"],
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=250&fit=crop",
      github: "https://github.com",
      demo: "https://demo.com"
    },
    {
      title: "Cloud Infrastructure Manager",
      description: "DevOps tool for managing multi-cloud infrastructure with automated deployment and monitoring.",
      tech: ["React", "Kubernetes", "Terraform", "AWS", "Go"],
      image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=400&h=250&fit=crop",
      github: "https://github.com",
      demo: "https://demo.com"
    }
  ];

  const skills = [
    "JavaScript/TypeScript", "React/Vue/Angular", "Node.js/Express", 
    "Python/Django", "Database Design", "Cloud Architecture",
    "DevOps/CI/CD", "Machine Learning", "Blockchain Development"
  ];

  return (
    <div className="portfolio-container">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-nav backdrop-blur-md bg-black/20 border-b border-cyan-500/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Portfolio
            </div>
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'projects', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`nav-link ${activeSection === section ? 'active' : ''} capitalize transition-colors hover:text-cyan-400`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="avatar-container mb-8">
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 p-1 animate-pulse-glow">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                <User size={48} className="text-cyan-400" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-fade-in">
            Full-Stack Developer
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-fade-in-delay">
            Crafting digital experiences with cutting-edge technology
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button 
              onClick={() => scrollToSection('projects')}
              className="cyber-button primary"
            >
              View My Work
            </button>
            <button className="cyber-button secondary flex items-center gap-2">
              <Download size={20} />
              Download Resume
            </button>
          </div>
          <div className="animate-bounce">
            <ChevronDown 
              size={32} 
              className="text-cyan-400 cursor-pointer mx-auto"
              onClick={() => scrollToSection('about')}
            />
          </div>
        </div>
        <div className="floating-particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className={`particle particle-${i + 1}`}></div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative">
        <div className="container mx-auto px-6">
          <h2 className="section-title">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold text-cyan-400 mb-6">The Journey</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                With over 5 years of experience in full-stack development, I specialize in creating 
                scalable web applications that bridge the gap between innovative design and robust functionality. 
                My passion lies in leveraging emerging technologies to solve complex problems.
              </p>
              <p className="text-gray-300 leading-relaxed">
                From AI-powered applications to blockchain solutions, I enjoy exploring the frontiers 
                of technology while maintaining focus on user experience and code quality.
              </p>
            </div>
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold text-cyan-400 mb-6">Core Skills</h3>
              <div className="grid grid-cols-2 gap-3">
                {skills.map((skill) => (
                  <div key={skill} className="skill-tag">
                    <Code size={16} className="text-purple-400" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 relative">
        <div className="container mx-auto px-6">
          <h2 className="section-title">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="project-card glass-card overflow-hidden group">
                <div className="project-image-container">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="project-overlay">
                    <div className="flex gap-4">
                      <a href={project.github} className="project-link">
                        <Github size={20} />
                      </a>
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
                    {project.tech.map((tech) => (
                      <span key={tech} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative">
        <div className="container mx-auto px-6">
          <h2 className="section-title">Get In Touch</h2>
          <div className="max-w-2xl mx-auto">
            <div className="glass-card p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`cyber-input ${formErrors.name ? 'error' : ''}`}
                  />
                  {formErrors.name && <span className="error-text">{formErrors.name}</span>}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`cyber-input ${formErrors.email ? 'error' : ''}`}
                  />
                  {formErrors.email && <span className="error-text">{formErrors.email}</span>}
                </div>
                <div className="form-group">
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`cyber-input ${formErrors.message ? 'error' : ''}`}
                  />
                  {formErrors.message && <span className="error-text">{formErrors.message}</span>}
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="cyber-button primary w-full flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <div className="spinner"></div>
                  ) : (
                    <>
                      <Mail size={20} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-6 mt-12">
              <a href="https://github.com" className="social-link">
                <Github size={24} />
              </a>
              <a href="https://linkedin.com" className="social-link">
                <Linkedin size={24} />
              </a>
              <a href="https://twitter.com" className="social-link">
                <Twitter size={24} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-cyan-500/20">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">
            © 2024 Full-Stack Developer Portfolio. Crafted with passion and modern tech.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
