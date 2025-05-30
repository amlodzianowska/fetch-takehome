import type { ReactNode } from "react";

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  className?: string;
  children: ReactNode;
  backgroundColor?: "gray" | "white";
  actions?: ReactNode;
}

function PageLayout({
  title,
  subtitle,
  className = "",
  children,
  backgroundColor = "gray",
  actions,
}: PageLayoutProps) {
  const bgClass = backgroundColor === "gray" ? "bg-gray-50" : "bg-white";

  return (
    <div className={`min-h-screen ${bgClass} pt-24 pb-16 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{title}</h1>
            {subtitle && <p className="text-gray-600 text-lg">{subtitle}</p>}
          </div>
          {actions && <div className="flex-shrink-0 ml-4">{actions}</div>}
        </div>

        {children}
      </div>
    </div>
  );
}

export default PageLayout;
