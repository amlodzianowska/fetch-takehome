import Hero from "../components/ui/Hero";
import HowItWorks from "../components/ui/HowItWorks";
import FeaturedDogsSection from "../components/dogs/FeaturedDogsSection";

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
