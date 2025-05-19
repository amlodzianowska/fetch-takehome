import Hero from "../components/sections/Hero";
import HowItWorks from "../components/sections/HowItWorks";
import FeaturedDogsSection from "../components/sections/FeaturedDogsSection";

function LandingPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Hero />
      <HowItWorks />
      <FeaturedDogsSection />
    </div>
  );
}

export default LandingPage;
