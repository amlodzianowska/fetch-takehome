import { useNavigate } from "react-router-dom";

function Cta() {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-primary-500 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Find Your New Best Friend?
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join thousands of happy pet owners who found their perfect companions
          through our platform.
        </p>
        <button
          onClick={() => navigate("/browse")}
          className="bg-white text-primary-500 hover:bg-gray-100 font-medium px-8 py-3 rounded-lg text-lg transition-all shadow-md hover:shadow-lg"
        >
          Start Browsing
        </button>
      </div>
    </section>
  );
}

export default Cta;
