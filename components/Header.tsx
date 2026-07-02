import React from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import { NavItem } from '../types';

const navItems: NavItem[] = [
  { label: 'Services', href: '/services' },
  { label: 'How It Works', href: '/' },
  { label: 'Pricing', href: '/services' },
  { label: 'FAQ', href: '/faq' },
];

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
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
      window.location.href = `${window.location.origin}${window.location.pathname}#/`;
      setTimeout(() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' }), 250);
    }
  };

  const handleNavClick = (item: NavItem) => {
    setIsMobileMenuOpen(false);
    if (item.label === 'How It Works') {
      setTimeout(() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
    if (item.label === 'Pricing') {
      setTimeout(() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }
  };

  return (
    <>
      <div className="absolute top-0 left-0 w-full z-50 hidden lg:block bg-gray-100 py-2 border-b border-gray-200">
        <div className="container mx-auto px-6 flex justify-end space-x-6 text-sm text-gray-600">
          <a href="tel:+18668296757" className="hover:text-primary flex items-center gap-1">
            <Phone size={14} /> Call: (866) 829-6757
          </a>
          <button onClick={scrollToContact} className="hover:text-primary">Book an AI Audit</button>
        </div>
      </div>

      <header
        className={`fixed left-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? 'top-0 bg-secondary lg:bg-primary shadow-md py-3'
            : isMobileMenuOpen
              ? 'top-0 bg-secondary shadow-md py-3'
              : 'top-0 lg:top-[37px] bg-secondary lg:bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center gap-3">
                <div className="relative flex items-center h-12 w-12">
                  <img
                    src="/logo.png"
                    alt="Bruce Works Logo"
                    className={`absolute inset-0 h-12 w-auto transition-opacity duration-300 ${isScrolled ? 'opacity-100 lg:opacity-0' : 'opacity-100'}`}
                  />
                  <img
                    src="/logo-scrolled.png"
                    alt="Bruce Works Logo Scrolled"
                    className={`absolute inset-0 h-12 w-auto transition-opacity duration-300 ${isScrolled ? 'opacity-0 lg:opacity-100' : 'opacity-0'}`}
                  />
                </div>
                <span className={`text-2xl font-black tracking-tighter ${
                  isScrolled ? 'text-white lg:text-white' : isMobileMenuOpen ? 'text-white' : 'text-white'
                }`}>
                  BRUCE<span className={isScrolled || isMobileMenuOpen ? 'text-primary lg:text-secondary' : 'text-primary'}>WORKS</span>
                </span>
              </Link>
            </div>

            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => handleNavClick(item)}
                  className={`font-medium hover:opacity-80 transition-opacity ${
                    isScrolled ? 'text-gray-900' : 'text-gray-900 lg:text-white'
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
                Book an AI Audit
              </Button>
            </nav>

            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-white"
                aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        <div
          id="mobile-menu"
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
                onClick={() => handleNavClick(item)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4">
              <Button fullWidth onClick={() => {
                setIsMobileMenuOpen(false);
                scrollToContact();
              }}>
                Book an AI Audit
              </Button>
            </div>
            <div className="pt-2 text-center text-gray-500 text-sm">
              <p>Call: (866) 829-6757</p>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
