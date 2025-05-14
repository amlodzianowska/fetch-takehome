import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();
  const heroImagePath = "/src/assets/images/dog-hero.png";
  return (
    <div
      className="relative h-screen bg-cover bg-center flex items-center"
      style={{ backgroundImage: `url(${heroImagePath})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center md:text-left text-white">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Find Your Forever <span className="text-primary-500">Furry</span>{" "}
            Companion
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Connect with adoptable pets in your area and give them the loving
            home they deserve.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button
              onClick={() => navigate("/browse")}
              className="bg-primary-500 hover:bg-primary-600 text-white font-medium px-8 py-3 rounded-lg text-lg transition-all shadow-lg hover:shadow-xl"
            >
              Browse Pets
            </button>
            <button
              onClick={() => navigate("/login")}
              className="bg-transparent border-2 border-white hover:bg-white hover:text-primary-800 text-white font-medium px-8 py-3 rounded-lg text-lg transition-all"
            >
              Sign Up / Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
