import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { RouteMetadata } from './components/RouteMetadata';
import { ThemeProvider } from './theme/ThemeProvider';

// Pages. Home loads with the app (it's where most visits start); every other page loads when it's opened, so the
// first visit doesn't download the whole site.
import { Home } from './pages/Home';
const page = <K extends string>(load: () => Promise<Record<K, React.ComponentType>>, name: K) =>
  React.lazy(() => load().then((m) => ({ default: m[name] })));
const Services = page(() => import('./pages/Services'), 'Services');
const WhyUs = page(() => import('./pages/WhyUs'), 'WhyUs');
const OurWork = page(() => import('./pages/OurWork'), 'OurWork');
const FAQPage = page(() => import('./pages/FAQPage'), 'FAQPage');
const ReviewFunnel = page(() => import('./pages/Review'), 'ReviewFunnel');
const AboutBruce = page(() => import('./pages/AboutBruce'), 'AboutBruce');
const Experience = page(() => import('./pages/Experience'), 'Experience');
const WhyHireBruce = page(() => import('./pages/WhyHireBruce'), 'WhyHireBruce');
const AILeverageAudit = page(() => import('./pages/AILeverageAudit'), 'AILeverageAudit');
const Book = page(() => import('./pages/Book'), 'Book');
const GovernmentCapabilities = page(() => import('./pages/GovernmentCapabilities'), 'GovernmentCapabilities');
const Contact = page(() => import('./pages/Contact'), 'Contact');
const NotFound = page(() => import('./pages/NotFound'), 'NotFound');
const CommandCenter = page(() => import('./pages/CommandCenter'), 'CommandCenter');
const LiveDemo = page(() => import('./pages/LiveDemo'), 'LiveDemo');
const Themes = page(() => import('./pages/Themes'), 'Themes');
const Pricing = page(() => import('./pages/Pricing'), 'Pricing');
const FieldNotes = page(() => import('./pages/FieldNotes'), 'FieldNotes');
const FieldNote = page(() => import('./pages/FieldNote'), 'FieldNote');
const CaseStudies = page(() => import('./pages/CaseStudies'), 'CaseStudies');
const CaseStudy = page(() => import('./pages/CaseStudy'), 'CaseStudy');

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <ThemeProvider>
    <Router>
      <ScrollToTop />
      <RouteMetadata />
      <div className="flex min-h-screen flex-col bg-ground text-ink-2">
        <Header />
        <div className="flex-grow">
          <React.Suspense fallback={<main className="min-h-[70vh]" aria-busy="true" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/command-center" element={<CommandCenter />} />
            <Route path="/live-demo" element={<LiveDemo />} />
            <Route path="/themes" element={<Themes />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/field-notes" element={<FieldNotes />} />
            <Route path="/field-notes/:slug" element={<FieldNote />} />
            <Route path="/services" element={<Services />} />
            <Route path="/why-us" element={<WhyUs />} />
            <Route path="/our-work" element={<OurWork />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/about-bruce" element={<AboutBruce />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/why-hire-bruce" element={<WhyHireBruce />} />
            <Route path="/review" element={<ReviewFunnel />} />
            <Route path="/ai-leverage-audit" element={<AILeverageAudit />} />
            <Route path="/book" element={<Book />} />
            <Route path="/government-capabilities" element={<GovernmentCapabilities />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/case-studies/:slug" element={<CaseStudy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          </React.Suspense>
        </div>
        <Footer />
      </div>
    </Router>
    </ThemeProvider>
  );
}

export default App;
