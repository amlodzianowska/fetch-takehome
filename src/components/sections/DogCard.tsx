import type { Dog } from "../../types";
import Card from "../ui/Card";

interface DogCardProps {
  dog: Dog;
}

function DogCard({ dog }: DogCardProps) {
  return (
    <Card>
      <img src={dog.img} alt={dog.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-1">{dog.name}</h3>
        <p className="text-gray-600 mb-2">
          {dog.breed} • {dog.age} {dog.age === 1 ? "year" : "years"} old
        </p>
        <p className="text-gray-500 text-sm mb-2">Location: {dog.zip_code}</p>
      </div>
    </Card>
  );
}

export default DogCard;
