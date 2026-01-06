import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from './Button';
import { NavItem } from '../types';

const navItems: NavItem[] = [
  { label: 'Services', href: '#services' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Our Work', href: '#portfolio' },
  { label: 'FAQ', href: '#faq' },
];

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Utility Bar - Hidden on mobile, matches reference's top bar */}
      <div className="hidden lg:block bg-gray-100 py-2 border-b border-gray-200">
        <div className="container mx-auto px-6 flex justify-end space-x-6 text-sm text-gray-600">
          <a href="tel:+1555019988" className="hover:text-primary flex items-center gap-1">
            <Phone size={14} /> Call Us: (555) 019-9888
          </a>
          <a href="#contact" className="hover:text-primary">Contact</a>
          <a href="#careers" className="hover:text-primary">We're Hiring</a>
        </div>
      </div>

      {/* Main Header */}
      <header 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled || isMobileMenuOpen ? 'bg-white shadow-md py-3' : 'bg-white lg:bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <a href="#" className="flex items-center gap-2">
                <div className="w-10 h-10 bg-primary rounded flex items-center justify-center text-white font-bold text-xl">
                  B
                </div>
                <span className={`text-2xl font-black tracking-tighter ${isScrolled || isMobileMenuOpen ? 'text-gray-900' : 'text-gray-900 lg:text-white'}`}>
                  BRUCE<span className="text-primary">WORKS</span>
                </span>
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <a 
                  key={item.label} 
                  href={item.href} 
                  className={`font-medium hover:text-primary transition-colors ${
                    isScrolled ? 'text-gray-700' : 'text-white'
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <Button variant={isScrolled ? 'primary' : 'white'} onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}>
                Get Free Quote
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 rounded-md ${isScrolled || isMobileMenuOpen ? 'text-gray-900' : 'text-gray-900'}`}
              >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div 
          className={`lg:hidden bg-white absolute top-full left-0 w-full shadow-lg transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? 'max-h-screen opacity-100 border-t' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-6 py-4 flex flex-col space-y-4">
            {navItems.map((item) => (
              <a 
                key={item.label} 
                href={item.href} 
                className="text-lg font-medium text-gray-800 hover:text-primary py-2 border-b border-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4">
              <Button fullWidth onClick={() => {
                setIsMobileMenuOpen(false);
                document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                Get Free Quote
              </Button>
            </div>
            <div className="pt-2 text-center text-gray-500 text-sm">
              <p>Call us: (555) 019-9888</p>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};