import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useState } from "react";
import { MIN_DOG_AGE, MAX_DOG_AGE } from "../../constants";

interface AgeSliderProps {
  minAge: number;
  maxAge: number;
  onAgeChange: (minAge: number, maxAge: number) => void;
}

function AgeSlider({ minAge, maxAge, onAgeChange }: AgeSliderProps) {
  const [range, setRange] = useState("All Ages");

  return (
    <div>
      <h3 className="font-semibold text-gray-700 mb-2">
        Age Range <span className="font-extralight">({range})</span>
      </h3>
      <Slider
        range
        min={MIN_DOG_AGE}
        max={MAX_DOG_AGE}
        defaultValue={[minAge, maxAge]}
        onChangeComplete={(value: number | number[]) => {
          const [min, max] = Array.isArray(value) ? value : [value, value];
          onAgeChange(min, max);
          setRange(
            min === MIN_DOG_AGE && max === MAX_DOG_AGE
              ? "All Ages"
              : max === MAX_DOG_AGE
              ? `${min} - ${MAX_DOG_AGE}+`
              : `${min} - ${max}`
          );
        }}
        className="mb-4 age-slider"
      />
    </div>
  );
}

export default AgeSlider;
