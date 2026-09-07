import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { BookingProvider } from './lib/booking';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Audiences from './components/Audiences';
import Differential from './components/Differential';
import About from './components/About';
import Process from './components/Process';
import SocialProof from './components/SocialProof';
import Faq from './components/Faq';
import FinalCta from './components/FinalCta';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import BrandDivider from './components/BrandDivider';
import BlogSection from './components/blog/BlogSection';
import BlogIndex from './pages/BlogIndex';
import BlogPost from './pages/BlogPost';

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.replace('#', ''));
      if (el) {
        // offset for sticky nav
        const top = el.getBoundingClientRect().top + window.scrollY - 86;
        window.scrollTo({ top, behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, hash]);
  return null;
}

function Home() {
  return (
    <main>
      <Hero />
      <BrandDivider />
      <Audiences />
      <BrandDivider />
      <Differential />
      <About />
      <BrandDivider />
      <Process />
      <SocialProof />
      <Faq />
      <BlogSection />
      <FinalCta />
    </main>
  );
}

function NotFound() {
  return (
    <div className="px-5 sm:px-8 py-20 text-center">
      <h1 className="font-display text-2xl font-bold text-forest">Página não encontrada</h1>
      <p className="mt-2 text-sm text-forest/60">O endereço que você acessou não existe.</p>
      <a href="/" className="mt-6 inline-flex rounded-full bg-forest px-6 py-3 text-sm font-bold text-ivory">Voltar ao início</a>
    </div>
  );
}

export default function App() {
  return (
    <BookingProvider>
      <BrowserRouter>
        <ScrollManager />
        <div className="min-h-screen bg-[#faf8f5] text-[#192420] overflow-x-clip selection:bg-[#c26d47] selection:text-white">
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
          <BookingModal />
          <FloatingWhatsApp />
        </div>
      </BrowserRouter>
    </BookingProvider>
  );
}
