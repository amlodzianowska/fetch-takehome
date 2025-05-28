import Slider from "rc-slider";
import "rc-slider/assets/index.css";

interface AgeSliderProps {
  minAge: number;
  maxAge: number;
  onAgeChange: (minAge: number, maxAge: number) => void;
}

function AgeSlider({ minAge, maxAge, onAgeChange }: AgeSliderProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-md p-4">
      <h3 className="font-semibold text-gray-700 mb-4">Age Range</h3>
      <Slider
        range
        min={0}
        max={15}
        defaultValue={[minAge, maxAge]}
        onChangeComplete={(value: number | number[]) => {
          const [min, max] = Array.isArray(value) ? value : [value, value];
          onAgeChange(min, max);
        }}
        className="mb-4 color-primary"
        styles={{
          track: {
            backgroundColor: "#ff8800",
            height: 6,
          },
          handle: {
            borderColor: "#ff8800",
            backgroundColor: "white",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            width: 18,
            height: 18,
          },
          rail: {
            backgroundColor: "#E5E7EB",
            height: 6,
          },
        }}
      />
    </div>
  );
}

export default AgeSlider;
