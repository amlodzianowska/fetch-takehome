import { useState, useRef, useCallback } from "react";

interface AgeSliderProps {
  minAge: number;
  maxAge: number;
  onAgeChange: (minAge: number, maxAge: number) => void;
}

function AgeSlider({ minAge, maxAge, onAgeChange }: AgeSliderProps) {
  const [displayMin, setDisplayMin] = useState(minAge);
  const [displayMax, setDisplayMax] = useState(maxAge);
  const timeoutRef = useRef<number | undefined>(undefined);

  const formatAge = (age: number) => (age >= 15 ? "15+" : age.toString());

  const applyChanges = useCallback(() => {
    onAgeChange(displayMin, displayMax);
  }, [displayMin, displayMax, onAgeChange]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    const constrainedValue = Math.min(value, displayMax);
    setDisplayMin(constrainedValue);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(applyChanges, 150);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    const constrainedValue = Math.max(value, displayMin);
    setDisplayMax(constrainedValue);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(applyChanges, 150);
  };

  const handleMouseUp = () => {
    applyChanges();
  };

  // Calculate percentages for the active range
  const minPercent = (displayMin / 15) * 100;
  const maxPercent = (displayMax / 15) * 100;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <h3 className="font-semibold text-gray-700 mb-4">Age Range</h3>

      <div className="relative mb-6">
        {/* Background track */}
        <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-200 rounded-lg transform -translate-y-1/2"></div>

        {/* Active range track */}
        <div
          className="absolute top-1/2 h-2 bg-primary-500 rounded-lg transform -translate-y-1/2"
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
        ></div>

        {/* Min range slider */}
        <input
          type="range"
          min="0"
          max="15"
          value={displayMin}
          onChange={handleMinChange}
          onMouseUp={handleMouseUp}
          onTouchEnd={handleMouseUp}
          className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer pointer-events-none z-10
                     [&::-webkit-slider-thumb]:appearance-none 
                     [&::-webkit-slider-thumb]:h-5 
                     [&::-webkit-slider-thumb]:w-5 
                     [&::-webkit-slider-thumb]:rounded-full 
                     [&::-webkit-slider-thumb]:bg-primary-600 
                     [&::-webkit-slider-thumb]:border-2 
                     [&::-webkit-slider-thumb]:border-white 
                     [&::-webkit-slider-thumb]:shadow-lg 
                     [&::-webkit-slider-thumb]:cursor-pointer 
                     [&::-webkit-slider-thumb]:pointer-events-auto
                     [&::-webkit-slider-thumb]:hover:scale-110
                     [&::-moz-range-thumb]:h-5 
                     [&::-moz-range-thumb]:w-5 
                     [&::-moz-range-thumb]:rounded-full 
                     [&::-moz-range-thumb]:bg-primary-600 
                     [&::-moz-range-thumb]:border-2 
                     [&::-moz-range-thumb]:border-white 
                     [&::-moz-range-thumb]:shadow-lg 
                     [&::-moz-range-thumb]:cursor-pointer 
                     [&::-moz-range-thumb]:border-0"
        />

        <input
          type="range"
          min="0"
          max="15"
          value={displayMax}
          onChange={handleMaxChange}
          onMouseUp={handleMouseUp}
          onTouchEnd={handleMouseUp}
          className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer pointer-events-none z-20
                     [&::-webkit-slider-thumb]:appearance-none 
                     [&::-webkit-slider-thumb]:h-5 
                     [&::-webkit-slider-thumb]:w-5 
                     [&::-webkit-slider-thumb]:rounded-full 
                     [&::-webkit-slider-thumb]:bg-primary-400 
                     [&::-webkit-slider-thumb]:border-2 
                     [&::-webkit-slider-thumb]:border-white 
                     [&::-webkit-slider-thumb]:shadow-lg 
                     [&::-webkit-slider-thumb]:cursor-pointer 
                     [&::-webkit-slider-thumb]:pointer-events-auto
                     [&::-webkit-slider-thumb]:hover:scale-110
                     [&::-moz-range-thumb]:h-5 
                     [&::-moz-range-thumb]:w-5 
                     [&::-moz-range-thumb]:rounded-full 
                     [&::-moz-range-thumb]:bg-primary-400 
                     [&::-moz-range-thumb]:border-2 
                     [&::-moz-range-thumb]:border-white 
                     [&::-moz-range-thumb]:shadow-lg 
                     [&::-moz-range-thumb]:cursor-pointer 
                     [&::-moz-range-thumb]:border-0"
        />
      </div>

      <div className="flex justify-between items-center mb-3">
        <div className="text-sm">
          <span className="font-medium text-primary-600">0</span>
        </div>
        <div className="text-sm">
          <span className="font-medium text-primary-600">15+</span>
        </div>
      </div>
    </div>
  );
}

export default AgeSlider;
