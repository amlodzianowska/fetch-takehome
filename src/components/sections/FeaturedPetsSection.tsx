import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Pet } from "../../types";
import { featuredPets } from "../../data/petData";

interface FeaturedPetsProps {
  limit?: number;
  showViewAll?: boolean;
}

function FeaturedPetsSection({
  limit = 4,
  showViewAll = true,
}: FeaturedPetsProps) {
  const navigate = useNavigate();
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPets(featuredPets.slice(0, limit));
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [limit]);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Featured Pets</h2>
          {showViewAll && (
            <button
              onClick={() => navigate("/browse")}
              className="text-primary-500 hover:text-primary-600 font-medium"
            >
              View All →
            </button>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pets.map((pet) => (
              <div
                key={pet.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <img
                  src={pet.imageUrl}
                  alt={pet.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-1">{pet.name}</h3>
                  <p className="text-gray-600 mb-2">
                    {pet.breed} • {pet.age} {pet.age === 1 ? "year" : "years"}{" "}
                    old
                  </p>
                  <button
                    onClick={() => navigate(`/pet/${pet.id}`)}
                    className="text-primary-500 hover:text-primary-600 font-medium text-sm"
                  >
                    Meet {pet.name} →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default FeaturedPetsSection;
