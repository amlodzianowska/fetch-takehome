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
    </div>
  );
}

export default LandingPage;
