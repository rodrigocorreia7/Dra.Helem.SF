import { BookingProvider } from './lib/booking';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Audiences from './components/Audiences';
import About from './components/About';
import Process from './components/Process';
import SocialProof from './components/SocialProof';
import Faq from './components/Faq';
import FinalCta from './components/FinalCta';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import BrandDivider from './components/BrandDivider';

export default function App() {
  return (
    <BookingProvider>
      <div className="min-h-screen bg-ivory overflow-x-hidden">
        <Nav />
        <main>
          <Hero />
          <BrandDivider />
          <Audiences />
          <About />
          <BrandDivider />
          <Process />
          <SocialProof />
          <Faq />
          <FinalCta />
        </main>
        <Footer />
        <BookingModal />
      </div>
    </BookingProvider>
  );
}
