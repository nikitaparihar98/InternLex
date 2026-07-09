import Hero from "../../../components/sections/Hero";
import FeaturedOpportunities from "../../../components/sections/FeaturedOpportunities";
import WhyInternLex from "../../../components/sections/WhyInternLex";
import PublishCTA from "../../../components/sections/PublishCTA";
import Footer from "../../../components/layout/Footer";
import StatsBanner from "../../../components/sections/StatsBanner";

function Home() {
  return (
    <>
      <Hero />
      <StatsBanner />
      <FeaturedOpportunities />
      <WhyInternLex />
      <PublishCTA />
      <Footer />
    </>
  );
}

export default Home;