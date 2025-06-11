'use client';

import { useState } from 'react';
import { VscStarFull } from 'react-icons/vsc';

interface StarRatingProps {
  count?: number;
  value?: number;
  onChange?: (value: number) => void;
  size?: number;
}

export const StarRating: React.FC<StarRatingProps> = ({
  count = 5,
  value = 0,
  onChange,
  size = 24,
}) => {
  const [hoverValue, setHoverValue] = useState(0);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!onChange) return;
    const { left, width } = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - left;
    const halfStar = Math.round((x / width) * count * 2) / 2;
    setHoverValue(halfStar);
  };

  const handleClick = () => {
    if (onChange) {
      onChange(hoverValue);
    }
  };

  const handleMouseLeave = () => {
    setHoverValue(0);
  };

  return (
    <div
      className="flex items-center"
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      onMouseLeave={handleMouseLeave}
    >
      {Array.from({ length: count }).map((_, i) => {
        const starValue = i + 1;
        const displayValue = hoverValue > 0 ? hoverValue : value / 2;
        
        return (
          <span key={i} className="relative text-gray-600" style={{ fontSize: `${size}px` }}>
            <VscStarFull />
            <span
              className="absolute top-0 left-0 h-full overflow-hidden text-yellow-400"
              style={{ width: `${Math.max(0, Math.min(1, displayValue - i)) * 100}%` }}
            >
              <VscStarFull />
            </span>
          </span>
        );
      })}
    </div>
  );
}; 