/*my-website > pages >index.tsx*/ 

import Header from '../components/Header';
import Footer from '../components/Footer';
import Counters from '../components/homeSections/Counters';
import Hero from '../components/homeSections/Hero';
import About from '../components/homeSections/About';
import Services from '../components/homeSections/Services';
import Contact from '../components/homeSections/Contact';
import Why from '../components/homeSections/Why';
import Logos from '../components/homeSections/Logos';

export default function Home() {
  return (
    <>
      <Header />
      <main className="max-w-[1440px] w-full px-4 sm:px-6 md:px-8 mx-auto">
        <section id="hero">
          <Hero />
        </section>

        <section id="about">
          <About />
        </section>

        <Counters />

        <Why />

        <section id="services">
          <Services />
        </section>

        <Logos />

        <section id="contact">
          <Contact />
        </section>
      </main>

      <Footer />
    </>
  );
}
