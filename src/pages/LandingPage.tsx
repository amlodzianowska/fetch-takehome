import Footer from "../components/layout/Footer";
import Hero from "../components/sections/Hero";
import HowItWorks from "../components/sections/HowItWorks";
import FeaturedPetsSection from "../components/sections/FeaturedPetsSection";
import Cta from "../components/sections/Cta";

function LandingPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Hero />
      <HowItWorks />
      <FeaturedPetsSection />
      <Cta />
      <Footer />
    </div>
  );
}

export default LandingPage;
