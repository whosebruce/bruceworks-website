import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-2 mb-6">
               <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white font-bold">
                  B
                </div>
                <span className="text-xl font-black tracking-tighter">
                  BRUCE<span className="text-primary">WORKS</span>
                </span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Your trusted partner for all home repairs and maintenance. Reliable, professional, and dedicated to quality craftsmanship.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-primary transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-white hover:text-primary transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-white hover:text-primary transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-white hover:text-primary transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-lg font-bold mb-6">Services</h3>
            <ul className="space-y-3 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">General Repairs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Carpentry</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Plumbing Fixes</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Electrical Minor</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Painting & Drywall</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Assembly</a></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-lg font-bold mb-6">Company</h3>
            <ul className="space-y-3 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Our Team</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Testimonials</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-lg font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start gap-3">
                <MapPin className="text-primary flex-shrink-0 mt-1" size={18} />
                <span>123 Fixit Avenue,<br />Repair City, ST 90210</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-primary flex-shrink-0" size={18} />
                <a href="tel:+15550199888" className="hover:text-white">(555) 019-9888</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-primary flex-shrink-0" size={18} />
                <a href="mailto:info@bruceworks.com" className="hover:text-white">info@bruceworks.com</a>
              </li>
            </ul>
          </div>

        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Bruce Works. All rights reserved.</p>
          <div className="mt-4 md:mt-0 space-x-6">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};