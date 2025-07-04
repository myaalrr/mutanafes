import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import Hero from '../components/homeSections/Hero';
import About from '../components/homeSections/About';
import Services from '../components/homeSections/Services';
import Contact from '../components/homeSections/Contact';

export default function Home() {
  return (
    <>
      <Header />
      <Navbar />

      <main className="max-w-[1440px]">
        <Hero />

        <About />

        <hr
          style={{
            border: 'none',
            borderTop: '2px solid #D1D1D1',
            width: '50%',
            margin: '100px auto',
          }}
        />

        <Services />

        <hr
          style={{
            border: 'none',
            borderTop: '2px solid #D1D1D1',
            width: '50%',
            margin: '40px auto',
          }}
        />

        <Contact />
      </main>

      <Footer />
    </>
  );
}





