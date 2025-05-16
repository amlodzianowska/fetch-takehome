import Hero from "../components/sections/Hero";
import HowItWorks from "../components/sections/HowItWorks";
import FeaturedPetsSection from "../components/sections/FeaturedPetsSection";

function LandingPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Hero />
      <HowItWorks />
      <FeaturedPetsSection />
    </div>
  );
}

export default LandingPage;
