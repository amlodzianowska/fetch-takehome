interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

function Card({ children, className = "", hover = true }: CardProps) {
  const hoverClass = hover ? "hover:shadow-lg" : "";
  return (
    <div
      className={`bg-white rounded-lg overflow-hidden shadow-md transition-shadow ${hoverClass} ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;
