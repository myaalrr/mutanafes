import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import Hero from '../components/homeSections/Hero';
import About from '../components/homeSections/About';
import Services from '../components/homeSections/Services';
import Contact from '../components/homeSections/Contact';

import HRLine from '../components/HRLine'; // ✅ استدعاء المكون الجديد

export default function Home() {
  return (
    <>
      <Header />
      <Navbar />

      <main className="max-w-[1440px] w-full px-4 sm:px-6 md:px-8 mx-auto">
        <Hero />

        <About />

        {/* ✅ خط فاصل بعد About */}
        <HRLine margin="50px" thickness="0.5px" color="#D1D1D1" opacity={0.4} width="50%" />

        <Services />

        {/* ✅ خط فاصل بعد Services */}
        <HRLine margin="50px" thickness="0.5px" color="#D1D1D1" opacity={0.4} width="50%" />

        <Contact />
      </main>

      <Footer />
    </>
  );
}






