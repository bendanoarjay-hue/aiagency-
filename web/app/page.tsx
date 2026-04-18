import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Manifesto from '@/components/Manifesto';
import Collections from '@/components/Collections';
import Lookbook from '@/components/Lookbook';
import Journal from '@/components/Journal';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <Marquee
          items={[
            'INIGO',
            'ELEVATED STREETWEAR',
            'FUTURISTIC COUTURE',
            'MANILA — PH',
            'SPRING / SUMMER XXVI',
          ]}
        />
        <Manifesto />
        <Collections />
        <Lookbook />
        <Journal />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
