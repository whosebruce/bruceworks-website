import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// Pages
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { WhyUs } from './pages/WhyUs';
import { OurWork } from './pages/OurWork';
import { FAQPage } from './pages/FAQPage';
import { ReviewFunnel } from './pages/Review';
import { AboutBruce } from './pages/AboutBruce';
import { Experience } from './pages/Experience';
import { WhyHireBruce } from './pages/WhyHireBruce';

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
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/why-us" element={<WhyUs />} />
            <Route path="/our-work" element={<OurWork />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/about-bruce" element={<AboutBruce />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/why-hire-bruce" element={<WhyHireBruce />} />
            <Route path="/review" element={<ReviewFunnel />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;