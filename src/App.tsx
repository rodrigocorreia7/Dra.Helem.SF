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

export default function App() {
  return (
    <BookingProvider>
      <div className="min-h-screen bg-[#faf8f5] text-[#192420] overflow-x-clip selection:bg-[#c26d47] selection:text-white">
        <Nav />
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
          <FinalCta />
        </main>
        <Footer />
        <BookingModal />
        <FloatingWhatsApp />
      </div>
    </BookingProvider>
  );
}
