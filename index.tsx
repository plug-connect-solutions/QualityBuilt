import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Hammer, 
  Home, 
  Ruler, 
  Shovel, 
  ShieldCheck, 
  Phone, 
  MessageCircle, 
  Mail, 
  MapPin, 
  ChevronRight, 
  CheckCircle2, 
  Menu, 
  X,
  Star,
  Clock,
  HardHat,
  ArrowLeft,
  FileText,
  Lock
} from 'lucide-react';

// --- Types ---
type View = 'home' | 'gallery' | 'services' | 'terms' | 'privacy';

// --- Components ---

const Navbar = ({ setView, currentView }: { setView: (v: View) => void, currentView: View }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services', view: 'services' as View },
    { name: 'About Us', href: '#about', view: 'home' as View },
    { name: 'Projects', href: '#projects', view: 'gallery' as View },
    { name: 'Contact', href: '#contact', view: 'home' as View },
  ];

  const handleNavClick = (view: View, href: string) => {
    setIsOpen(false);
    setView(view);
    window.scrollTo(0, 0);
    
    if (view === 'home' && href !== '') {
      // Small delay to ensure view switches before scrolling if it was on home already
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled || currentView !== 'home' ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <button onClick={() => { setView('home'); window.scrollTo(0, 0); }} className="flex items-center group">
            <HardHat className={`h-8 w-8 transition-colors ${scrolled || currentView !== 'home' ? 'text-orange-600' : 'text-white'}`} />
            <span className={`ml-2 text-xl font-bold tracking-tight transition-colors ${scrolled || currentView !== 'home' ? 'text-gray-900' : 'text-white'}`}>
              QUALITYBUILT
            </span>
          </button>
          
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <button 
                key={link.name} 
                onClick={() => handleNavClick(link.view, link.href)}
                className={`text-sm font-medium transition-colors hover:text-orange-500 ${scrolled || currentView !== 'home' ? 'text-gray-700' : 'text-white'}`}
              >
                {link.name}
              </button>
            ))}
            <a 
              href="https://wa.me/27767351232" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-orange-600 text-white px-5 py-2 rounded-md text-sm font-semibold hover:bg-orange-700 transition-all flex items-center gap-2"
            >
              <MessageCircle size={18} /> WhatsApp
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className={scrolled || currentView !== 'home' ? 'text-gray-900' : 'text-white'}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 absolute w-full left-0 animate-in slide-in-from-top duration-300 shadow-xl">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.view, link.href)}
                className="block w-full text-left px-3 py-4 text-base font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-md"
              >
                {link.name}
              </button>
            ))}
            <div className="pt-4 pb-2 px-3">
              <a 
                href="https://wa.me/27767351232"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-orange-600 text-white px-4 py-3 rounded-md text-center font-bold flex items-center justify-center gap-2"
              >
                <MessageCircle size={20} /> Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = ({ onGetQuote }: { onGetQuote: () => void }) => {
  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070" 
          alt="Active construction site" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gray-900/65"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-600/20 text-orange-400 border border-orange-500/30 text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            Professional Building Services
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
            Building Your <span className="text-orange-500">Dreams</span> Into Reality
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed font-light">
            Expert residential construction and home improvement in your local community. Honest pricing, quality workmanship, and reliable timelines.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={onGetQuote}
              className="bg-orange-600 text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-orange-700 transition-all text-center shadow-lg shadow-orange-600/20"
            >
              Get a Free Quote
            </button>
            <a href="tel:0767351232" className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-white/20 transition-all text-center flex items-center justify-center gap-2">
              <Phone size={20} /> Call Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl border-8 border-gray-50">
              <img 
                src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070" 
                alt="Construction professional with blueprints" 
                className="w-full h-full object-cover aspect-[4/3]"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-orange-600 p-8 rounded-xl shadow-xl hidden md:block">
              <p className="text-4xl font-bold text-white mb-1">15+</p>
              <p className="text-orange-100 font-medium">Years Excellence</p>
            </div>
          </div>
          
          <div>
            <h2 className="text-sm font-bold text-orange-600 uppercase tracking-widest mb-3">Who We Are</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              A Legacy of Quality and Trust in Every Brick
            </h3>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              We are a dedicated local building team specializing in residential projects. Our mission is to provide high-quality construction services that improve our community and create safe, beautiful homes for our neighbors.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[
                "Licensed & Insured",
                "Local Community Focus",
                "Owner-Managed Projects",
                "Sustainable Practices",
                "Transparent Quoting",
                "Post-Project Support"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="text-orange-600 flex-shrink-0" size={18} />
                  <span className="text-gray-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
            <p className="italic text-gray-600 border-l-4 border-orange-500 pl-4 py-3 bg-gray-50 rounded-r-lg">
              "We don't just build structures; we build trust through transparent communication and uncompromising standards."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const ServicesSection = () => {
  const services = [
    {
      title: "New Home Construction",
      desc: "Complete turn-key solutions for residential builds, ensuring structural integrity and modern finishes.",
      icon: <Home className="w-8 h-8" />
    },
    {
      title: "House Extensions",
      desc: "Seamless room additions and vertical extensions that blend perfectly with your existing home.",
      icon: <Ruler className="w-8 h-8" />
    },
    {
      title: "Interior Renovation",
      desc: "Modernizing kitchens, bathrooms, and living spaces with high-end tiling and finishes.",
      icon: <Hammer className="w-8 h-8" />
    },
    {
      title: "Roofing Solutions",
      desc: "Expert roofing installation and repair using durable materials suited for local weather conditions.",
      icon: <ShieldCheck className="w-8 h-8" />
    },
    {
      title: "Exterior Maintenance",
      desc: "Quality boundary walls, professional paving, and landscaping support for better curb appeal.",
      icon: <Shovel className="w-8 h-8" />
    },
    {
      title: "Structural Repairs",
      desc: "Fixing foundation cracks, damp proofing, and ensuring your home stays safe for decades.",
      icon: <CheckCircle2 className="w-8 h-8" />
    }
  ];

  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-orange-600 uppercase tracking-widest mb-3">Our Services</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Comprehensive Building Solutions</h3>
          <p className="text-gray-600 text-lg">
            Whether it's a small repair or a full-scale build, we bring the same level of precision and care to every task.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div key={idx} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-16 h-16 bg-orange-50 rounded-lg flex items-center justify-center text-orange-600 mb-6 group-hover:bg-orange-600 group-hover:text-white transition-colors duration-300">
                {service.icon}
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h4>
              <p className="text-gray-600 leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = ({ onShowGallery }: { onShowGallery: () => void }) => {
  const projects = [
    { title: "Modern Estate Home", location: "Midrand Area", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070" },
    { title: "Residential Extension", location: "Soweto Zone 4", img: "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=2070" },
    { title: "Interior Remodel", location: "Tembisa Ext", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069" },
    { title: "Boundary & Paving", location: "Vosloorus", img: "data:image/jpeg;base64,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" },
  ];

  return (
    <section id="projects" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-sm font-bold text-orange-600 uppercase tracking-widest mb-3">Our Work</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900">Delivering Quality Across the Region</h3>
          </div>
          <button 
            onClick={onShowGallery}
            className="text-orange-600 font-bold flex items-center gap-2 hover:translate-x-1 transition-transform bg-orange-50 px-6 py-3 rounded-full hover:bg-orange-100"
          >
            View Full Gallery <ChevronRight size={20} />
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((p, idx) => (
            <div key={idx} className="group relative overflow-hidden rounded-xl h-80 shadow-lg cursor-pointer">
              <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
              <div className="absolute bottom-0 p-6 w-full">
                <p className="text-orange-400 text-xs font-bold uppercase tracking-wider mb-1">{p.location}</p>
                <h4 className="text-xl font-bold text-white group-hover:text-orange-200 transition-colors">{p.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <section id="contact" className="py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="bg-white p-12 rounded-3xl shadow-xl border border-gray-100">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Request Sent!</h3>
            <p className="text-gray-600 text-lg mb-8">
              Thank you for contacting QualityBuilt. We have received your project details and will call you back within 24 hours to discuss the next steps.
            </p>
            <button 
              onClick={() => setSubmitted(false)}
              className="bg-orange-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-700 transition-colors"
            >
              Send Another Message
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          <div className="lg:col-span-2">
            <h2 className="text-sm font-bold text-orange-600 uppercase tracking-widest mb-3">Contact Us</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Let's Discuss Your Project</h3>
            <p className="text-gray-600 text-lg mb-10 leading-relaxed">
              We provide free, no-obligation quotes for all local building work. Call us directly or fill out the form for a quick response.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                  <Phone size={22} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase">Call or SMS</p>
                  <a href="tel:0767351232" className="text-lg font-bold text-gray-900 hover:text-orange-600">076 735 1232</a>
                </div>
              </div>
              
              <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <MessageCircle size={22} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase">WhatsApp</p>
                  <a href="https://wa.me/27767351232" target="_blank" rel="noopener noreferrer" className="text-lg font-bold text-gray-900 hover:text-green-600">Chat Now</a>
                </div>
              </div>
              
              <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                  <Mail size={22} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase">Email Address</p>
                  <p className="text-lg font-bold text-gray-900">info@qualitybuilt.co.za</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-gray-100">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
                  <input required type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all" placeholder="Enter full name" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                  <input required type="tel" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all" placeholder="076 735 1232" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Required Service</label>
                <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all">
                  <option>Full House Build</option>
                  <option>Room Extension</option>
                  <option>Renovations & Repairs</option>
                  <option>Roofing / Ceilings</option>
                  <option>Paving & Walls</option>
                  <option>Other / General Inquiry</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Brief Project Details</label>
                <textarea required rows={4} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all" placeholder="Describe what you need..."></textarea>
              </div>
              <button 
                disabled={loading}
                className="w-full bg-gray-900 text-white py-4 rounded-lg font-bold text-lg hover:bg-black transition-colors shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? 'Sending...' : 'Submit Request'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const GalleryPage = ({ onBack }: { onBack: () => void }) => {
  const allProjects = [
    { title: "Modern Villa Build", category: "New Build", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070" },
    { title: "Master Bedroom Extension", category: "Extension", img: "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=2070" },
    { title: "Contemporary Kitchen", category: "Renovation", img: "data:image/jpeg;base64,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" },
    { title: "Boundary Wall Construction", category: "Outdoor", img: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUTEhIWFRUXFxYXGBUXGBgWFxcYGBgXFhcYGBgYHSggGBolGxgVITEhJSorLi4uGiE1ODMtNygtLisBCgoKDg0OGhAQGy0mHyUvLS0tLS4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLi0tLS0tLS0tLf/AABEIALcBEwMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAFAAECAwQGB//EAEUQAAECBAMFBQUFBQcEAwEAAAECEQADITEEEkEFIlFhcQYygZGxE0KhwfAUIzNS0QdicrLhFSQ0gqLS8VNjksJDc4MW/8QAGQEAAwEBAQAAAAAAAAAAAAAAAAECAwQF/8QAKBEAAgICAgEDBAIDAAAAAAAAAAECEQMhEjFBEyJRBDJhgZHBBRQj/9oADAMBAAIRAxEAPwDDiMGtWCmTSFKE+SShAYiQlAz4UZReiU51VZTe6CYCdscAQgTQwTOyrqbneWkKBowTNapbc8Y9GxuETLwy0gMEyVJHRKCB1oIFS9nGbgsKLkS5KiOLStPgI63G9GFnmypKZaVbu+pUsAEKJAICvZlR7iWO85csNHAjLlGSplKAzEOoAAPRQyiwqGNGpyaOjmbP7pWnIr2xN3BBkLDkjQsw5JGkc5taahSlqSSGUCdbUSSR71iW1PIRzzVGsWQ+0MspIYFNnH5WcVZxRzyh9pyTMlJzJqkMlTh94JUAW1Pwc8Xhps5zlIOexfilwGbiGpxfi51YZQZ1AsGJAJfLmBUwd2DgPTvFrOOdtos5eRObpevKggxLWohaUuSa1Jdq8C7HMzj8x5wFnyylagaFz6vYciC0X4XEkZSBVNiL0alGJDsW6xbViNOKlABhX3kkb1OGYUcE10cxnwwsx1rRyC4Zm1vGyYQorG4HavRJZiKaM7mpHCK9m4CbPmIlykKmTFmiUgvmoSQRYAMeAhIA1hpeaWkhYqQN64DOUsAzFSknNpkNA5jJIw6paswqkAgoGYE1ZuYJtc18YM43sTtPDSc83CbgdRVnQtUujsRLWSU62PNg8C0TgrKSpXdBKX4Gqi99BRu7xhS0ykSmYwpVukOaKzMxGXcSxNDzYFjwrEJctwr2oVmLGoLMPy5rgtoWDDQQ6lIGVKi4TYOWulQCSQBcOeINBUGMiMW8w5RSrMWvUlWhFSYkYy8aoBOQZQGylgaJHdNWNCHLVrQO0ak4oiYoZkDLmUFkhrqfKxYEjxDDSkW/ZEqlggDMopBSRUVaihZ83y1EYUbOyuZiiEhinxUKFJ1vY6VirS7EHeynaFMtZWJQUoNRR7pB3VZj46U6R6XsbtGmfLSpTIWpRQEn3lAPu8QzGrej+ETZeUuFBqEsaNQBib+LR1vZ3agkqSsoLJdQAVuBLVKgfeDmmjCukaQnwf4M5Kz1uZMJizDSwTGJC1LQlQGUkAs7s4eNGz5ZTcvHo17bRzXugp7MCK504NA3a+15cgPMUcxDhCWKjeraChrHGY7tfMUCEBEt3q+ZfIVo9G53pHJPPjg6b38I2UJS6DMlDzDmFzrSOqkIAAHlHlWL25PlzGWtmdLnLmJTqCKAXqeF4vR2oxCkhYnLSGPu5nyuXZswv4gC+rzf5KM69rQsX0jhe0z1XEYNExLKDxiwmETKdIfxjh5f7QJ6QAtCBlUy1XJGYCgBobh6vHS/2yJhOVSVNRgXIqxfxBjXBk9T2p/onJFR9zQbStrxmxW1UJprygcrGuCDSMc7DGhALEajzjrhgV+4wnmde0sxuOzd2B6nN41ScItQUUpJCQ5icvAzFAqCSQPPyjsi4w0jllzntmDLEgI1LwSwHKFAcw0UtGikn0Rxa7IARKJBMICCwRFoUWNChDCnalZTg8SprSJx8fZqaJ4SSlEqWkqAKUIF2NEgO3hGP9o8yf8AZFIRKWozXlqyoUoBKxlKnRui+vF9I4hchcwLWpSnTUDRw+UHiCKa2jwJZeL0j11CzZ2oxyJmaVJ3gwJ0IOYGlKkJJtbwjiZ6AMyRlJIFzwStqKFjSoqH0gpiJwTQMHTlCiXJBVu3NBow8jSM+IQjOVFW8pwU1LEg0Y3FCLxyTm5OzVRpUZUlRQpKTTvEksrKKJZzSz0Hyi+SHSlyxUkBzdNCpLVq5ZT0q9Ihh1IKVpRWiyFMaAZSE3DXUSW9YbC4ZRBegyl3CiyUpUr3Q6SkZagPQc4mhgDHIImKq/Nmow8mtwjNLEG8WkFPtQACqY9iCAzlJpxPpAybIYsN4cQL+Uapkk1TSUBy+XQ0oasOVLR65+wQykjEzFBPtfu0PRwhir4m/wDAOEeUYPCqmfdgFy7JAzKdOgap8Hj1X9nfYvE4ZRxmKX9mkJQVLlqAKpkts9WP3eU8RmqoMHhID0va+2kpSY8E2slCMbORLQMpVmCfy5k51C9AxUGpQtSPaNtGSoqTJyoWEpUhS3UglSQoZkvmaosxHOPFdp7DxUvFlM1KjMmrP3qAVyluASEqASGAuKEUoGrU17aoS7M0xCVl6JJAJCiwJ3vdFTYl+EU4/C0JT3UkvVh+UKoS1Go5qNXD3Lxkv2aCmW2QZVqLK9okqIzFyLb/AEU3GmWfOVLaUrK6ALDKd9KSXVYHi1dLxCTRViwGJaWQQAyaTACd3ulL2GobV9GiOHxRSskFWVnOm8a0qzk8tbRrwCgQVBGTKQVbu6VJFi9nJSG05xbKxYDkpVQqZgp1KDW6sdWHIxMvOh2BZ2z1qaZLObMaV3icxHn46wVkYVYQ6wEggtLJA7jAkPZ1BnHAxPCTQXJCswJ3bBxRuXQnSNOG9mqrkZgmjOm+otU7r6eBiXLVDSR2fYzb8tOHCJ6yClSqkKVulW65AaxbhQ6vHR7Q7T4XDrShSsxVfIygkVFa3dqc/PyXDqUFKBYBRAUS2Y6ZS1UkFgGL3jQVpLnKlW6WCilRNnFKgU4Nw4i5fVTjHiiPSjdke0W3VTsQrMXJJSlTVSnMSlKXoAMwqSBc9Rk3CzEzEqUQAkKKl99ygEnd0LOKPZzSxHKlcxIKEylKStWZmdgaMbixoQaDgxFoYzQgLKsiimWdHQSUuCoNmygNmDZvCJxq9sp60josFhZanUvKrK7pQlJVXKyUnVRqKaHTKYxzMZ7CaUIKsykgV3yS1EqJoSVOHrRqVivCSEGYoTSU7ilZjROYZEoAZjunebgQYswMsKTMmrSozUhCWSlT5VMVFLg5yEhxa76xWPC3Sb8ClNKzOtYKkpdIIDtwDnLm5sVAOW3hSgbSjGKSsKQopAfLaoGqQC5o5P8AWLsVKROme1CcrAKMsMN5IpnUHc11ZgTwgTqSpNFMAA4KQ3NtNKC8OUaen+xJ2tnXYLtisSpo+7UoqQUKACspclQYgggAJAf8zx2HZrtgnEPLngCYpZShKUqDpy5syncABiNLDrHkCQEJUQomvdQljlDAaB6XPPg0buzuN9rOQhUxMlKlAFSlKzAAZsxTQVAZieriBZcnK7sOEUqSPecLh0ywyQwNWvfrF+aKZcwFIIVmpcMX50pEhNEdd3tmdUXKRmoYAbY2Ll3pYcajWDQnwy8RSNMeSUHaInCM1TOOnYcpLERAJg/jMN7SzPGE7PWCxHjpHowzprfZxSwtPQPyw0E/7P8A3hCh+vH5F6Mvg6N+BI6GMuKwcuYFBctCwoMp0hyDoVCsc1//ADC0f4fFzUDgSSnyBA+EIf2nKsqVPHNgf/T5x4XJHqUQx/YDCrLoEyWaMUrzpDDKKL3rAChFoB43sDPS3s5suYO6c2eSsp4DvAuLknWnCOhHaXES/wAfBLA/Mg5vUAfGNGG7Y4ZXeUqWeC0n4lLp+MLjEds8yx2w8RLzGfhFpay0I9okgAhiZZUgOAkOfEUrFYkplkSkCrKC3c7tCAXGU2GVjdyxaPYcNj5MysuYhX8CgT/pMQ2hsyTPGWdKRMDg7yUqLhwC93AJq+ph8daC/k8CxmUkqqoE0b3X3lGnHpcGMmKksQp6Zra7tK0p/XrHr2I7G4RT7k3DOQTvAoN2qcyQa2KxexgRtj9n0zNmlGSuh/EEyWTqmiSpBrcnjyrHFoLRD9iExSMVPcVMihdrTEO5INN4UYx6zthUxZkyklIzTErVf8OUUzCx1JV7MM1QToCI84/ZlsDESMasTpbS1SZgcCWU5guSUhRlMCWzsDwtHouzsElWImzRJQAjLKlrASKpze2KQA6d5WQl65OVVbKA22CsYlbH8tyVe4ONfjFGPmZkJQpCVZloDGxAOdTuDTKg01tq8Q21iVe3mLCUrQyFJKKlScqXZrqDEs1eNIZRStUoJqDmmAp7tAACW036Di3CDkyKPFcChp0xSZYySlrUAohLsvKlIDhzV2BdkluIw/ZFkkosXIBd2LKcuHNwQS94347ATwDkw+Ye1WvOh1rJUW7oV3WFDl1MQw5SKhWUhLEO4SpIGgsXSb2c21qtlIwzFqCWslRSUsxHG12FaE66xXLxBTMc1GoHO7agFyX5wfTjlJSPeX3Woq7v3ai4r4aQNQWLFlFROZQYEKr+YcT3h86LsbS8BKTtFAcMLAslx1IazmxNx4xXhwCnMlYVQgAsN5wQ7WLkU04wKkSnohKiACHAfMXKqnoD8DpGpOz1BAdSg7Dumie8rWoFC/IxEoxWkCssw2ILiXRxmBI1YHMHFDQqHNq2L7Bh3US4SjLlBCSCfeKgS4NT0oLRhlp9im6czZhm3Q5PeD3oW4ecaRtJLKU5USycrnzLEp1PiYmV+AN4wylAKEwpQlKhkPvGqiQt+BuasCNYyoSkKRKKSUKMtaJgFc5G6hwSCl6PxqaiIYPEzJktYKSxcMSWAU5DHVmDm/xglImezyBMnPKfMWYKBBYHKQCpiHpcps7GLx5HF1ImUU+jPgtmGbO3rEgIDEpG4xFCEhWRNU1uLvBfYeESpa5k0OlKWlKz5c2YUOUUCsq0Vc3pYxk2rtj2BQqVLSpQVMoCzJISJgOW5UauajN0fOnaQQmTMSl1HMESyoKKFBID5lVASCo1Betw8dP/ADVNdmacna8BDauFVhZIlJUypgBcJKS4ckFTWY1L7prcsQmEmS1IWpc4hac33ZSAMm9XMosSV5KJqbco1Y44goZaphKRv5iVLmEgqYJL+zBZy/QBkknnlGY4Q2ZKlnNMKc2chnaj5QzgdbOQIck3+CuLSN2OxSHHsUl8uVkqqDfPY7qi5ahqKiB8tc6VmWpABS/eASpyySADU3ALWpxrplJRIVKInTEqClFYQRRiMoSaPmBL0pwNoM4jbKZ8xS5soF0nIsDIUkPXMDviwqLBtCQVCnyeyblekdontvKkS5MqUjOAhKHJy7wZ2Ad3AJvc8jB7Z3aaXNke2Kglhvh3Yi7C5HCkeNq2gtJAVV6BIDm7a146GnnG+Sl0gJS+WhsBd7aFyfGMVnlF7RpwvR6Wrtnh9CpuOWnTrDy+2UgpCipncMzmnEJeh0jztWFUxAaumkWDZ9A5B5AMxt6RS+qmvCH6J6TsftJKnPlcEHuqYE6uACaVgkvGFVLR5jh5RRlUCQQGcXaxq7uXMbsFtpcpWZtGIGo/iLkafCkdOP6qFe5bMpYJ+GdpNxpSSClVODfrCjj/AO2v1qxNa1reFG3+zjI9GZ6CcvFuo/WJDkt/H5RYxe8RUl7gHqI843I7/Xy+UUT5CV9+WlfNSR83iwS/3W6Ej0iQQ2qvgfV4AAeI7OYWZ/8AEx4pP+6nwig7EWgfcYuakDRW+n/aPKOgU/F+qf0itSeIT4FvgQ0OwAkuftGX/wBOcNTQH4FPpDDbS0d/CTZXNAzJ/wDFQSnxFecGkp1Y9SAr0iT/AL3nmT+kHJoKBmH7RyD3nJANMh0BLMXY0NAT1jptgAfZghEwKUU3Ks2+qqzQli+YsDTSBSsMlYVmCVFjXdJD0ob68YK7A2MmXMUtKQxSACe8Kq5WrC5NsqkYNtSR7dQA0S2nugUbpGDDge2VXupQlh+ZRKjVndstH15iC23E/fK6J/lECJ8heYlC1DeTmQMgJBQl8qikl7G+jUoy8iZ59svaU2TNCsoUkF8rBT1BDuRTwd2L0js8Tj9n4pKfaezKnTuzUsUuQCApQZ2Jqk+kcVKjrdhMZGSZLCkKz5VZQpiO8D+U6g8Hs0dEm62ZqrK8b+zrDK35EyZKJsyvaIPUKOZVKd4RzWN7DYyWCElE9IqBmUg0eyVFklglNFGjx2svY0nKFSwuSVAKeVMUk1FyASmJZMUjuYhEwcJyGb/NLv4xncWUeNYmRPw9Z0uZKBOUpKWejkJPvIYAUPiWjTLxgKXJykWSXylVCKEuQ6X0vqTHri9pTQGnYRSkmhVKUmYD1SWPrALaGxtlYk1AkL5ZsOoHiAQEE+BhOCfRVnmE6T7UhalvWwFxxT9eMVTmSUlDMQcpNampcFrU8Y7zG/s1mJdeGxINBlExw3+dAOamjCAm0+ymKTmC8MaMELQAoWIdXs3p/EB+o00K7Aux8RMQSlScwVWpKQCk8izO308E1YmYgqAQMtFZ9SA2YAmmZs3wET2dhljLLQv90ZgUu/Alw5L7tf1MJ2QlRQVTmA90ISHSWrmzEKe+avPRuTJnxwty/s1jilJaOTx8x2mV7oUUs7u4dxQvHTYbZS1ykqlyZ00SQkqKEkywpOczJRUlJZImCXRrOaiNuI2BhpmXKrKtGXJVKyMy3CMhO86iwr71I9R7C7PxOGwXslJSFJKym6TMKiVlRSQ6SSSKxWD6jHm1G9fgJ45Q2zxyeiaEvh1IUlahuMcxGZIMxxvEqNcxJASXpeBysOt3zAoct7QAraWalKmJKaAChDHQuYJYqXPlTyqZLVKWVqXlIcM+Y5dFJApQswu0QxO0pyUgIAQM2YAh1KzMqqr5+lGIy2joU/BnVnODByRlVMUTnfKLAVLEqB6acH1ALSShISEqFuRV05Va1KHjAvHSZkxedSFKDMRYgEsC6gz1vXwihUxDbwBFiXI1cMBfj+sZtcg6DGPGch2SQQUlIckMQoOa624+cE8ClKAzHhW5+XXhHO4CcCk0ZmILNS1DbwEGMDMKkkHnvMGoSxPhRrV8o41ouMthNc36t9f1iEuaxch+HG//ADGaVOqwt7xN6ePFharw01CgtTsKny4Do48oaVGll6Z7kAMWfqxiMzFVqTWnPx4f8RSEEh3oSWprWg5N1+cUqVU8ePE9IYjd7KUbhPiD8qQojKQWG63IkD/2EKAD2aFDQnjQwIpFYmqGSYYmAZGGIh2hyIBFYQOAiQlw8SiWUh0SX/rXrB/ZyGB8PnAaQIN4Cx8PnAuxgLbg++PRPoIySRUniR8AlPyjZtz8Y9E+kZZd4YmeUyY77sgf7un+JccDKtHVbExSvs4loBcqUCoUOhyoemcpch6RvPoyXYdVhSkj2a2TUlJqkvUNwIPwOrCJy1FSQSkg6g3BsRX1F7xPZ+E9mgAmvi3NgagG7aEmNBbjGJpRkKeHr84aZKCqKAUOCgCPI3jSawxTAFAlOx5SS6EqlH/tLVLf/KCx8ovQmeg7k4Kod2cgE/8AlLy+ZBjcEtDpTfpDtiMSsQVfjYUL/elqSv4KyqHQPGKfgsFMLCYEKuETksXDGgmBKjUDU6QXUDEZksKDKSCOBYjyMZTw48m5RX9/yXHJKPTOfw/ZL2OITOQhBeZLUpSVMaLCs2VTANyJJbi0ekYjEsl0m9iVEDiSQKsA5L6COQlYCWn8MGX/APWVIH/ikhJ8RHQ7AwyjVSytIZnCXBdx3QKOAfAQY8Ucf23+3YOTl2ecdtcDNWlMyTLXM9mJoKGdVVJdRCalVDQXjgftWcqQpwS2dJASQXdwCN00s1o9kxUh5t1pLEhaFFOpcEDdVoWU8UY/ZvtU5ZsuViAP+oMkwaEpmIBY9Ep6xo4pkNs8lwsiYtQlICpilOlCQFTC9QzClRXKLB/D0Ht72Qw6MLh1owSZCkb80oAWsy0JBmImZTvKIrmqxDOHjXsvYEnD4iXPSmfLyKcoIExCqEFlS3KRV3VHUdo5KMRImG6FJ9kNSykq9ozPd0hh+WCMePYzwPESMsz2aVEMmWS9GUpIJD0oHTexFOZTA4UoTlpcMRYNmJt1BvppWDE/sviELWtAE5SiSrIcxSVF3VLLLTU8C3OO6Ts0ytkBClZyoCeUZAE0AmZDqahKc3QM1IW26KVJWeYJmjOyf3SNDWo0fxjLPnheV7iz01ANX0JDOI63BdmEz8NicSc4CFAS1JKDLVlLLWT3yQz7rNRnsA83YizLE9KWQVKl0UkvMS7/AHYqkP8AE0oQIjj5L5eDAoMQAU2qp7NSgoxLW5xVOm5A1i5cgJv+65pr8GN3UvDKBXmSQoPusRlLlLFx1BID16xdi8swEMTltlZVBwTq3H1i9CBR2ooE9T+b5Q0F5ezZTfiLS9W7rPWwcaw8L9CtntBh4RhRRFDQssO0SMAURaGMShoBkQIkIUOkRIGiSIM4Gx8PnAeVBnACh8PnAhgLbQ++V0T6CMkoVEbts/jK6J9BGOXcQeRHk8m0d52QlJ+zhTByVAniAokeTnzjg5Ud92QH92H8S/WNsnRnHsMkQimJQwMZJmhBSWhNAjE9oz9qEhUgS02Ewk7z90gOQxNH9NDIhgQyRIJ9IdocGh+tRAFEQIbLDTsUiUlS5hVlSHOUZj5OIjhcQmYhK0vlUAQ7AseIBIB5PAFFiBHQbFTunqPnAJAjoNj909RAByeL7+ViSags7MTUk6aeJi2WCQafX6Rasbx+tTEkQySqVI418h6AQZ2kycMlhwpzZXzgagVgtj/wEfxD0VAVQBXJSbgFrHUcwdDBCRI/u8wlSiwYOXZyCWN6kC/ARklSyAMxzGjlmc6lhQQSw4P2ZbsDuu1ncOz6PBYkYMFhXkTpZKSjKtTZQHUoEF8rAgudAX1iiVgh9mlJKBklTUkJSSCqpU5NCFePUwTwSPu538B+cQRL+4//AEB/0wDB20ezsmetaZkskqn5iWq65JyAKSQpgtyxLOToaeXIwBM8SklJoVsCSpkgkggbwU3IX1vHuHs/vSf+7L/kMeJbGmezxkzFzEEKU+VIs8x1rvYUYEnzhey1yGrapFuO7PozqzSlvSqDuGgqnM5bxhQOxm0cSpaiFJAJJAzMw6C3T1vCgcsdk+nP4PY4QEKFAMeGhGHibAaGaHhQWA0TTDARIQAXyRBnAWPhAiVBfA2PhAhgTbX4p6J9BGRAqI2bZ/FPRPpGREHkR5NLEegdkh/dk9V/zGOARHoHZIf3ZHVf8xjaf2kR7DEJoUOIxLMG0dmS54AmJdnYgsRxYxrQmn6xMwwEUFDQ4ESEMIVgNlBinBYNEpORAISCSA5LOSWD6OTGkCEIYCSIPbI7p8IBpg5six8IAOemd4+HqYkkQ6xvH61MTSmh8IAGQIKbQH3CP4h6KgehNYKYsfco6j0VAAJlo9YIyk/cL8PURgmYuWgOVp6Agk9AIol7azIUlAAzPVTuDoWFDWM55YR7ZcYSfQUwiGRM/gMYJu0kCWUJOZTg/u0oQ4gXNnL1mGtGcgEWIItGB1mgSGHCh8hHNL6q/tNo4UuwnjMapZdSrs4FnFLamKcoV3iCOkZUuKivN9dbRUZyybJPmflGFt9mqSRZNxEpJIKS44S1EeaUEfGFFiFKaqUvyUpoaGAahAw4hR6JwjRJojE4AItCAhGJCABQ4ENEkwAXyoL4GxgRKEGMD3TAhgTbP4p/y/yiMqNI2bY/FPQegjIgQeRHkqY9A7Jf4ZPVf8xjgAKnrHf9kv8ADJ/iX/MY1n0THsMRICGEPGRQxiJiUM0NgMmJtf61EMkRNoQEWhJETESSIoCKUwb2TY+ECEpgvsqx8PnAAE94+Hzi1LAF6DnAvbO1RIIGVyoPwAYm8c5Nx65pcrfkbDlyjny51B0uzSMLOombXS5EtJURq4A+MZZ20Z60ZFqGV3AyB9aAvbr5wHRmplYWpxPz4xrTKUONbkEN4c/rrySzTl5N4wivBUqe1SmlQ7Aj/TDoxrgMl/iPCjiGnYcmyqcNPFnhkSKbx+X1/wARmkWaJcwm58nZ9Q55NDqxBHLS9PWM6wkBwC2neI+BZopXiEtRTHglPq7xSQWXTMWp218R8YgnErDinmYplTF+8CerK+JoNKcYuKXGYE0LNRvhFCLQs8fT9IUV5ONOR/4hQFHTkw0Iw8eicAwEShhCJgAQEPCEPAA0STDRJMAGiUILYLumBUqCuCND4QIYH2x+Keg9IyoFRGra/wCKeifQRmRB5EeSC56mO/7I/wCGH8S/WOB1PU+sd92P/wAMP41/KNZfaSuwzChxDxkURIhNEiIcCGAwESAh2ijGY1EpLqPBgKqNdAKmE2lsaRe0SSIHHayCHTXla+lbQJXtJSicygx91Kjz1FqcLvyjGeeMTSOJvsPzsehFKk6Aej2flygF9uxAXmKgDYFJIAHofq0UnEFQZKQOYB9fLnFC5iqsAOYFbtc61jkyZpTN1CKDO2NnhPswVKUooC1EuanlVqg/DhGIYVI0qeL+XxizbeNmzZoUhJSj2YTzJBUSRpY6wNmYhQI3iXA0FfiRCyU5Pj0EXS2EJhCaEBP8NT5NSGOLDEDz9Prn0gYrErsVLYcA3SutG4+UVrmhnan/ADwFa9Ymh8vg2lXFYHg3ol+PnDCYgWUtR4bxbnaMCMXlcopwp/RnitU46tx3uJ+uMVQrNyp5VZJ6l7eNotANCSnSzkF/6CBBmV72um95OfqsWSZzbzAczTnDSFYYE02L5dPpzFRxgSzNzBdyesZVLfUVcUr6MT/SG9qQLhrfo48oC3Zq+2L/AC/zQozicRRx5D/cPSFDoDsoeGh2j0DhHJhmh2hoAJQ7wwEOIAEIdIhRJMAy+SILYKxgVLgpgjQ+ENdjYK2t+KeifQRlTeNe1R94eg9IyJFoRJ5Nqep9Y7zsaP7t/nV8o4PU9T6x3nY5Y+zf51eiY0l0JB0CHIiifjEI7ygOWvl4GB2I2uT3UsOJsOL1pcRzyyxj2bRxthWbMADksOPWMG0NrJltlGZ9fdH6+EB5xUtnOc1pQBnPE6xVOwRSXUpgSGegtag4fKMZZ2+jWOH5JTdrziSUrcFrIOUU4mosddfGKlzHOZXf1NVONRWouNTFU6cl+84F7kAFvzcmH/MRTiQTQBiBWgHmC0ZOTfZquK6Lpij7iS9XIUHFQBUEgeIipWHzVBNGJCh3eQJSwrRvKLZuXvaFqUA10OnO3CKJ+JcEJH6jmGN/GIaTCVeSc6cUi6focwG/rFaMUp2JehO6BzoDZvT1Skk7xJajNusLsL0fiYz5m/MBxoRV2Ltdnto8HFGbZfNWsiiiQeLPUBug+HnFn9nqpmd6UG8eXpeK0IJNKtUFiHbgaGw5i8Rnz1C27pRweprWjXe8CQUOtD2znqFDiG+vKKlpL76uBq4HS/Xyh8PMUxUSx8Tzqw+F4uklybq40HOvG4h0IrmYcAClyWIVTwL1rR+cREtzlo/DkXB5aceMbcTMdLgFizOHUDzIp58oyokEl3CaaqLEuGDAmvkPKGhlSZKL18QRbQVr56c4YLf3XTZxV9QLhtddLRoQCAAWAsyKnyqNPp4QlSyQQCNC5c2cDh9c4YddFc6WpfdZ9WLgNd3rbwh8uY1LEak1tz8x0hYqTZSBQamvokNfziIw5JbWhuBxOjZvS0AWa5U1gBu/E/EGsKK04AtVQ4am1LgQoCjtxDwhCj0GcQoeGh4QCEPChQAO8SERAiYgKLpcFcFYwJSpo3YHFJ3g9aH1hWkFMxbV/EPQekY1UjRtXEJ9oahmTXwjncVtRS6SqByCoh/IaeLRE8kYlRg2eXK2hnnGVKBWrMq1gxqSbADjHZbOmTZMoynYvmcMbtqCTw0i3C4NCSpgnMouspQFLmdTr05RsMkAboCKv3cpL8kuE/RjDJn5aNoY1ExyTNFV5auHI1LhwSOY8tI2TVcAKFqlvlWj6PFU1AFcuZQ/KSbUalaU0itKXAdLEFwym43rTk0c5pyNv2pADg3vmc0bT+oiEuWk+8QdSGNeT/TDnGdShlDywS5BZzyIS4pQa8IpQujAsatejgs4OvwqYYWWYlnIFGZ3F+Boa6nzrGTESSWqstW1Hd6gWv1jQvDEEv0dxyqSacvCITphsABa5o44noYZNlMtC1XWG6pcEuDSLEOxCmArvUcClnGrelYmuaHAUlApXUcKUoKW6wwISXCWpR3UKvezeDXEAh8PLLneYWrR6hwWqKE9YjMkjMpRNa0ADimhIPAw2ZRAuHswbi4qS3lwiwJBN+j28TZ30EAIomIH5iSwb3unjb9YjND7jE1IGYMoXvV9T9PG+VhwCyVJc3NzyvXXT9IZWHc5UlSrh2auhaGFGNEpi9TVy4avh0Gg1rFomhgACqr03mtRyG+Ub0rUAUhIuQXAfTUEn4PEZYKifuyogub2qbkQIoG/bMqi8qjv3qkWFRa/KNP2lOX8tCw0poXPw4QRxGRCQVhhUgUYks1MjfHTwjFOxCVMEhKbVah5U8bNDFv5MHtXLu4oXqwPDlQRWtQJ3RV62r/XrpGnIBbKsi5DpUA/AsSHB8oiuWt6Cx1AodODjp5UhiK0ywbE6FiRwY1blaL0yCRUW17p8NCP6RJSKBTglqAFyLDjWpNBw5xIyltu7wNqMfN7+HrAVxQvZp1FfD9bQoqWtQJDf6iPhCgHR3MKFCjuOMUOIUKABPCJh4UADZ4oxWPShnJrakPCjOcmo2jSEU2BZu0lKIzryJI3UpBJUOJVppSMsvHB37rM6k0JIBF72P1qoUcLbfZ0PWkRWFVdSgbgllV6ceb+OsVT5KUq3kO4dg2ZQB95Roah25Dg0KFCRIkMSp0hkglTFTi96hzQ1Hw1pmzRvKUGCSlnqQ5DMAGFD/WHhQyvBGTOSKlJKqtoc2r1YhyDU1o9omhQUxAGthQGgLve5BppS7w0KAkuxEp7Frjg78k0LVvwh5UkCyuPFtWp4w8KGVSI5FAA5ulA5D0+q2iJlKWCqhLdGBsx16c4UKGFIktBCqliWZgKmgFev1SGmSkmqUgqU4FTcBjU206PChQ6E0PNW5ykjyI8dWDPYRQqYWoWGlmYU4dNIeFEksaWmtHfi4FyRoC1CfPSJy0JTrWnE5hoT4cxe0KFANEsi1FJcNajg8RXw9InLlr7ySoFgBUE66m4LcrwoUUijNOmTClpjKdrgMCRTqa8vCKcTh1SwxapbqTYNb6pChRQvA8qYpRZIBoRYAkuwcj4/QiOHdQIY8gTqxU5uLfTwoUIS2a/sa6kKDl+81CHbu3/AFrDypxSwUWBLcWrper8aQoUBXQ6ZilAH2hS+mUFvEmFChQhn//Z" },
    { title: "Open Plan Living Space", category: "Renovation", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070" },
    { title: "Foundation & Slab Work", category: "New Build", img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070" },
    { title: "Roofing & Trusses", category: "Roofing", img: "https://images.unsplash.com/photo-1632759145351-1d592919f522?q=80&w=2070" },
    { title: "Designer Bathroom", category: "Renovation", img: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=2070" },
  ];

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-orange-600 transition-colors mb-8 font-semibold"
        >
          <ArrowLeft size={20} /> Back to Home
        </button>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Project Gallery</h1>
        <p className="text-gray-600 text-lg mb-12 max-w-2xl">
          Browse our extensive portfolio of completed works across residential homes in the region.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allProjects.map((project, idx) => (
            <div key={idx} className="bg-gray-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group">
              <div className="h-64 overflow-hidden">
                <img src={project.img} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <span className="text-orange-600 text-xs font-bold uppercase tracking-widest">{project.category}</span>
                <h3 className="text-xl font-bold text-gray-900 mt-2">{project.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ServicesPage = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-orange-600 transition-colors mb-8 font-semibold"
        >
          <ArrowLeft size={20} /> Back to Home
        </button>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-12 text-center">Comprehensive Building & Construction</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070" className="rounded-2xl shadow-xl" alt="Construction detail" />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Residential New Builds</h2>
            <p className="text-gray-600 text-lg">We manage the entire lifecycle of your new home project. From initial site clearance and foundation laying to the final coat of paint and electrical fit-outs.</p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 font-medium text-gray-800"><CheckCircle2 className="text-orange-600" /> Professional Site Surveys</li>
              <li className="flex items-center gap-3 font-medium text-gray-800"><CheckCircle2 className="text-orange-600" /> High-Quality Foundation Work</li>
              <li className="flex items-center gap-3 font-medium text-gray-800"><CheckCircle2 className="text-orange-600" /> Full Plumbing & Electrical Services</li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="lg:order-2">
            <img src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069" className="rounded-2xl shadow-xl" alt="Renovation detail" />
          </div>
          <div className="space-y-6 lg:order-1">
            <h2 className="text-3xl font-bold text-gray-900">Extensions & Remodeling</h2>
            <p className="text-gray-600 text-lg">Grow your space without moving home. We specialize in adding rooms, second-story extensions, and modernizing outdated floor plans.</p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 font-medium text-gray-800"><CheckCircle2 className="text-orange-600" /> Seamless Architectural Matching</li>
              <li className="flex items-center gap-3 font-medium text-gray-800"><CheckCircle2 className="text-orange-600" /> Kitchen & Bathroom Overhauls</li>
              <li className="flex items-center gap-3 font-medium text-gray-800"><CheckCircle2 className="text-orange-600" /> Structural Wall Removals</li>
            </ul>
          </div>
        </div>

        <ServicesSection />
      </div>
    </div>
  );
};

const LegalPage = ({ title, type, onBack }: { title: string, type: 'terms' | 'privacy', onBack: () => void }) => {
  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-orange-600 transition-colors mb-8 font-semibold"
        >
          <ArrowLeft size={20} /> Back to Home
        </button>
        <div className="bg-gray-50 p-8 md:p-16 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4 mb-8">
            {type === 'terms' ? <FileText className="text-orange-600" size={40} /> : <Lock className="text-orange-600" size={40} />}
            <h1 className="text-4xl font-extrabold text-gray-900">{title}</h1>
          </div>
          
          <div className="prose prose-orange max-w-none text-gray-600 space-y-6 leading-relaxed">
            <p className="text-sm font-bold uppercase text-gray-400 mb-12">Last Updated: October 2023</p>
            
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">1. Overview</h2>
              <p>Welcome to QualityBuilt Construction. By accessing our services, you agree to comply with and be bound by the following terms. We are a local contractor committed to providing quality residential building services in South Africa.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">2. Service Terms</h2>
              <p>All construction projects are subject to a formal written quote. Work will only commence upon receipt of a signed contract and the agreed-upon initial deposit. We strive to maintain accurate timelines, but construction schedules may be impacted by weather or material availability.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">{type === 'terms' ? '3. Payments & Deposits' : '3. Data Collection'}</h2>
              <p>{type === 'terms' 
                ? 'Payments must be made according to the schedule outlined in your specific project contract. Failure to meet payment milestones may result in temporary suspension of on-site work.' 
                : 'We only collect necessary personal information required to provide accurate quotes and manage your construction projects. This includes names, contact details, and site addresses. We do not share your data with third parties for marketing purposes.'
              }</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">4. Guarantees</h2>
              <p>We provide a standard structural guarantee on all new builds as per NHBRC guidelines. Maintenance and repair work is guaranteed for a period of 12 months from the date of completion, covering defects in workmanship.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">5. Contact</h2>
              <p>For any queries regarding our {type === 'terms' ? 'Terms of Service' : 'Privacy Policy'}, please contact us at info@qualitybuilt.co.za or via phone at 076 735 1232.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

const Footer = ({ onNav }: { onNav: (v: View) => void }) => {
  return (
    <footer className="bg-gray-950 text-gray-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <HardHat className="h-8 w-8 text-orange-500" />
              <span className="ml-2 text-xl font-bold tracking-tight text-white uppercase">
                QUALITYBUILT
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Your local construction partner. We pride ourselves on reliability, transparency, and high-quality results for every client.
            </p>
            <div className="flex gap-4">
              <a href="https://wa.me/27767351232" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center hover:bg-orange-600 hover:text-white transition-all">
                <MessageCircle size={18} />
              </a>
              <a href="tel:0767351232" className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center hover:bg-orange-600 hover:text-white transition-all">
                <Phone size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h5 className="text-white font-bold mb-6">Quick Links</h5>
            <ul className="space-y-4 text-sm">
              <li><button onClick={() => { onNav('home'); window.scrollTo(0, 0); }} className="hover:text-orange-500 transition-colors">Home Page</button></li>
              <li><button onClick={() => { onNav('gallery'); window.scrollTo(0, 0); }} className="hover:text-orange-500 transition-colors">Our Portfolio</button></li>
              <li><button onClick={() => { onNav('home'); setTimeout(() => document.getElementById('about')?.scrollIntoView({behavior: 'smooth'}), 100); }} className="hover:text-orange-500 transition-colors">About Our Team</button></li>
              <li><button onClick={() => { onNav('services'); window.scrollTo(0, 0); }} className="hover:text-orange-500 transition-colors">What We Do</button></li>
            </ul>
          </div>
          
          <div>
            <h5 className="text-white font-bold mb-6">Legal</h5>
            <ul className="space-y-4 text-sm">
              <li><button onClick={() => { onNav('privacy'); window.scrollTo(0, 0); }} className="hover:text-orange-500 transition-colors">Privacy Policy</button></li>
              <li><button onClick={() => { onNav('terms'); window.scrollTo(0, 0); }} className="hover:text-orange-500 transition-colors">Terms of Work</button></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-bold mb-6">Service Hours</h5>
            <ul className="space-y-4 text-sm">
              <li className="flex justify-between"><span>Mon - Fri:</span> <span>07:00 - 17:00</span></li>
              <li className="flex justify-between"><span>Saturday:</span> <span>08:00 - 13:00</span></li>
              <li className="flex justify-between font-bold text-orange-500"><span>Sun / Public:</span> <span>Closed</span></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs uppercase tracking-widest font-semibold">
          <p>&copy; {new Date().getFullYear()} QualityBuilt Construction. All rights reserved.</p>
          <div className="flex gap-8">
            <button onClick={() => { onNav('privacy'); window.scrollTo(0, 0); }} className="hover:text-white transition-colors">Privacy Policy</button>
            <button onClick={() => { onNav('terms'); window.scrollTo(0, 0); }} className="hover:text-white transition-colors">Terms of Work</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

const App = () => {
  const [view, setView] = useState<View>('home');

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const renderView = () => {
    switch(view) {
      case 'gallery':
        return <GalleryPage onBack={() => { setView('home'); window.scrollTo(0, 0); }} />;
      case 'services':
        return <ServicesPage onBack={() => { setView('home'); window.scrollTo(0, 0); }} />;
      case 'terms':
        return <LegalPage title="Terms of Work" type="terms" onBack={() => { setView('home'); window.scrollTo(0, 0); }} />;
      case 'privacy':
        return <LegalPage title="Privacy Policy" type="privacy" onBack={() => { setView('home'); window.scrollTo(0, 0); }} />;
      default:
        return (
          <>
            <Hero onGetQuote={scrollToContact} />
            <About />
            <ServicesSection />
            <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="grid grid-cols-12 h-full">
                  {[...Array(12)].map((_, i) => <div key={i} className="border-r border-white/50 h-full"></div>)}
                </div>
              </div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <div>
                    <h2 className="text-sm font-bold text-orange-500 uppercase tracking-widest mb-3">Why Choose Us</h2>
                    <h3 className="text-3xl md:text-4xl font-bold mb-8">Professional Excellence, Local Commitment</h3>
                    <div className="space-y-6">
                      <div className="flex gap-5">
                        <div className="w-12 h-12 bg-orange-600/20 rounded-xl flex items-center justify-center text-orange-500 flex-shrink-0">
                          <ShieldCheck size={28} />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold mb-1">Guaranteed Workmanship</h4>
                          <p className="text-gray-400">We stand by every brick we lay and every pipe we fit. Quality is our standard.</p>
                        </div>
                      </div>
                      <div className="flex gap-5">
                        <div className="w-12 h-12 bg-orange-600/20 rounded-xl flex items-center justify-center text-orange-500 flex-shrink-0">
                          <Clock size={28} />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold mb-1">Reliable Timelines</h4>
                          <p className="text-gray-400">We understand the stress of construction. We finish on time, every time.</p>
                        </div>
                      </div>
                      <div className="flex gap-5">
                        <div className="w-12 h-12 bg-orange-600/20 rounded-xl flex items-center justify-center text-orange-500 flex-shrink-0">
                          <Star size={28} />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold mb-1">Top-Rated Service</h4>
                          <p className="text-gray-400">Ask your neighbors - our reputation for clean, polite, and professional service precedes us.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-orange-600/20 rounded-2xl blur-2xl group-hover:bg-orange-600/30 transition-all duration-500"></div>
                    <img 
                      src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069" 
                      alt="Precision measuring on site" 
                      className="relative rounded-2xl shadow-2xl"
                    />
                  </div>
                </div>
              </div>
            </section>
            <Projects onShowGallery={() => { setView('gallery'); window.scrollTo(0, 0); }} />
            <Contact />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar setView={setView} currentView={view} />
      
      {renderView()}
      
      <Footer onNav={setView} />
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}