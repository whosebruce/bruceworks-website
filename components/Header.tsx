import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './Button';
import { NavItem } from '../types';

const navItems: NavItem[] = [
  { label: 'Services', href: '/services' },
  { label: 'Why Us', href: '/why-us' },
  { label: 'Our Work', href: '/our-work' },
  { label: 'FAQ', href: '/faq' },
];

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContact = () => {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If we are not on a page with the contact form, navigating to home#contact-form 
      // is a bit complex without a hash router, simpler to just assume form is in footer
      // which is everywhere.
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Utility Bar (Absolute at the very top of the document) */}
      <div className="absolute top-0 left-0 w-full z-50 hidden lg:block bg-gray-100 py-2 border-b border-gray-200">
        <div className="container mx-auto px-6 flex justify-end space-x-6 text-sm text-gray-600">
          <a href="tel:+18668296757" className="hover:text-primary flex items-center gap-1">
            <Phone size={14} /> Call Us: (866) 829-6757
          </a>
          <button onClick={scrollToContact} className="hover:text-primary">Contact</button>
        </div>
      </div>

      {/* Main Header (Fixed, changes top position whether scrolled or not) */}
      <header 
        className={`fixed left-0 w-full z-40 transition-all duration-300 ${
          isScrolled 
            ? 'top-0 bg-primary shadow-md py-3' 
            : isMobileMenuOpen
              ? 'top-0 bg-white shadow-md py-3'
              : 'top-0 lg:top-[37px] bg-white lg:bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center gap-2">
                <div className={`w-10 h-10 rounded flex items-center justify-center font-bold text-xl ${
                  isScrolled ? 'bg-white text-primary' : 'bg-primary text-white'
                }`}>
                  B
                </div>
                <span className={`text-2xl font-black tracking-tighter ${
                  isScrolled ? 'text-white' : isMobileMenuOpen ? 'text-gray-900' : 'text-gray-900 lg:text-white'
                }`}>
                  BRUCE<span className={isScrolled ? 'text-white opacity-90' : 'text-primary'}>WORKS</span>
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link 
                  key={item.label} 
                  to={item.href} 
                  className={`font-medium hover:opacity-80 transition-opacity ${
                    isScrolled ? 'text-white' : 'text-gray-900 lg:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Button 
                variant={isScrolled ? 'white' : 'primary'} 
                className={isScrolled ? 'text-primary hover:bg-gray-100' : ''}
                onClick={scrollToContact}
              >
                Get Free Quote
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 rounded-md ${isScrolled ? 'text-white' : 'text-gray-900'}`}
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
              <Link 
                key={item.label} 
                to={item.href} 
                className="text-lg font-medium text-gray-800 hover:text-primary py-2 border-b border-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4">
              <Button fullWidth onClick={() => {
                setIsMobileMenuOpen(false);
                scrollToContact();
              }}>
                Get Free Quote
              </Button>
            </div>
            <div className="pt-2 text-center text-gray-500 text-sm">
              <p>Call us: (866) 829-6757</p>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};