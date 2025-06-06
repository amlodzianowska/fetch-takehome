import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Dog } from "../../types";
import { featuredDogs } from "../../data/dogData";
import DogCard from "./DogCard";
import Spinner from "../ui/Spinner";

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
    setDogs(featuredDogs.slice(0, limit));
    setLoading(false);
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
          <Spinner />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dogs.map((dog) => (
              <DogCard key={dog.id} dog={dog} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default FeaturedDogsSection;
