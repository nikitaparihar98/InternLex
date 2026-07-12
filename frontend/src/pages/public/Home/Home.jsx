import Hero from "../../../components/sections/Hero";
import WhyInternLex from "../../../components/sections/WhyInternLex";
import PublishCTA from "../../../components/sections/PublishCTA";
import Footer from "../../../components/layout/Footer";
import StatsBanner from "../../../components/sections/StatsBanner";

function Home() {
  return (
    <>
      <Hero />
      <StatsBanner />
      <WhyInternLex />
      <PublishCTA />
      <Footer />
    </>
  );
}

export default Home;