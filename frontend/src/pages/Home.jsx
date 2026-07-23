import Hero from '../components/sections/Hero.jsx';
import Services from '../components/sections/Services.jsx';
import Stats from '../components/sections/Stats.jsx';
import FeaturedArtists from '../components/sections/FeaturedArtists.jsx';
import UpcomingEvents from '../components/sections/UpcomingEvents.jsx';
import CTAQuote from '../components/sections/CTAQuote.jsx';
import FloatingButtons from '../components/layout/FloatingButtons.jsx';

export default function Home() {
  return (
    <>

      <FloatingButtons />
      <Hero />
      <Services />
      <Stats />
      <FeaturedArtists />
      <UpcomingEvents />
      <CTAQuote />
    </>
  );
}
