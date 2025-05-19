import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Dog } from "../../types";
import { featuredDogs } from "../../data/dogData";

interface FeaturedDogsProps {
  limit?: number;
  showViewAll?: boolean;
}

function FeaturedDogsSection({
  limit = 4,
  showViewAll = true,
}: FeaturedDogsProps) {
  const navigate = useNavigate();
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDogs(featuredDogs.slice(0, limit));
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [limit]);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Featured Dogs</h2>
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
            {dogs.map((dog) => (
              <div
                key={dog.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <img
                  src={dog.img}
                  alt={dog.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-1">{dog.name}</h3>
                  <p className="text-gray-600 mb-2">
                    {dog.breed} • {dog.age} {dog.age === 1 ? "year" : "years"}{" "}
                    old
                  </p>
                  <button
                    onClick={() => navigate(`/dog/${dog.id}`)}
                    className="text-primary-500 hover:text-primary-600 font-medium text-sm"
                  >
                    Meet {dog.name} →
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

export default FeaturedDogsSection;
