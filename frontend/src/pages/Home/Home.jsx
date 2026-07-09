import Hero from "../../../components/sections/Hero";
import Stats from "../../../components/sections/Stats";
import FeaturedOpportunities from "../../../components/sections/FeaturedOpportunities";
import FeaturedArticles from "../../../components/sections/FeaturedArticles";
import FeaturedBlogs from "../../../components/sections/FeaturedBlogs";
import FeaturedCaseCommentaries from "../../../components/sections/FeaturedCaseCommentaries";
import Footer from "../../../components/layout/Footer";

function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <FeaturedOpportunities />
      <FeaturedArticles />
      <FeaturedBlogs />
      <FeaturedCaseCommentaries />
      <Footer />
    </>
  );
}

export default Home;