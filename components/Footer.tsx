import React from 'react';
import { Facebook, Instagram, MapPin, Phone, Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const serviceLinks = [
  { label: 'AI Leverage Audit', targetId: 'ai-audit' },
  { label: 'Command Center Foundation', targetId: 'command-center-foundation' },
  { label: 'Single Workflow Buildout', targetId: 'workflow-buildout' },
  { label: 'Local AI / Hardware Add-on', targetId: 'local-ai-setup' },
  { label: 'Commercial Pilot Pricing', targetId: 'pricing' },
];

export const Footer: React.FC = () => {
  const navigate = useNavigate();

  const goToService = (targetId: string) => {
    navigate('/services/');
    setTimeout(() => document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  };

  const scrollToContact = () => {
    const contact = document.getElementById('contact-form');
    if (contact) {
      contact.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    navigate('/');
    setTimeout(() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  return (
    <footer className="bg-secondary text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
               <img src="/logo.png" alt="Bruce Works Logo" className="h-10 w-auto" />
                <span className="font-display text-2xl font-black leading-none tracking-tight">
                  BRUCE<span className="text-primary">WORKS</span>
                </span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Bruce Works helps owner-led service businesses organize knowledge, modernize workflows, and implement practical AI-assisted systems inside tools they control.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/bruceworksai/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Bruce Works on Instagram"
                className="text-gray-300 hover:text-primary transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.facebook.com/bruceworksai"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Bruce Works on Facebook"
                className="text-gray-300 hover:text-primary transition-colors"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-condensed text-lg font-semibold uppercase tracking-[0.08em] text-gray-100 mb-6">Services</h3>
            <ul className="space-y-3 text-gray-300">
              {serviceLinks.map((item) => (
                <li key={item.targetId}>
                  <button
                    type="button"
                    onClick={() => goToService(item.targetId)}
                    className="hover:text-white transition-colors text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li>
                <Link to="/ai-leverage-audit/" className="hover:text-white transition-colors">
                  AI Leverage Audit
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-condensed text-lg font-semibold uppercase tracking-[0.08em] text-gray-100 mb-6">Company</h3>
            <ul className="space-y-3 text-gray-300">
              <li><Link to="/about-bruce/" className="hover:text-white transition-colors">About Bruce</Link></li>
              <li><Link to="/experience/" className="hover:text-white transition-colors">Experience & Background</Link></li>
              <li><Link to="/why-hire-bruce/" className="hover:text-white transition-colors">Why Bruce Works?</Link></li>
              <li><Link to="/government-capabilities/" className="hover:text-white transition-colors">Government Capabilities</Link></li>
              <li><Link to="/faq/" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/contact/" className="hover:text-white transition-colors">Contact</Link></li>
              <li><a href="/privacy-policy/" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><button onClick={scrollToContact} className="hover:text-white transition-colors text-primary font-semibold">Request an AI Leverage Audit</button></li>
            </ul>
          </div>

          <div>
            <h3 className="font-condensed text-lg font-semibold uppercase tracking-[0.08em] text-gray-100 mb-6">Contact</h3>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start gap-3">
                <MapPin className="text-primary flex-shrink-0 mt-1" size={18} />
                <span>San Diego-based<br />California service · Remote nationwide</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-primary flex-shrink-0" size={18} />
                <span><small className="block font-condensed uppercase tracking-[0.08em] text-gray-400">Toll-Free Intake</small><a href="tel:+18668296757" className="hover:text-white">(866) 829-6757</a></span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-primary flex-shrink-0" size={18} />
                <span><small className="block font-condensed uppercase tracking-[0.08em] text-gray-400">Bruce Direct</small><a href="tel:+16195379720" className="hover:text-white">619-537-9720</a></span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-primary flex-shrink-0" size={18} />
                <a href="mailto:info@bruceworks.net" className="hover:text-white">info@bruceworks.net</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Bruce Works. All rights reserved.</p>
          <div className="mt-4 md:mt-0 space-x-6">
            <Link to="/services/" className="hover:text-white">Services</Link>
            <Link to="/government-capabilities/" className="hover:text-white">Government</Link>
            <Link to="/faq/" className="hover:text-white">FAQ</Link>
            <a href="/privacy-policy/" className="hover:text-white">Privacy Policy</a>
            <button onClick={scrollToContact} className="hover:text-white">Request an AI Leverage Audit</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
