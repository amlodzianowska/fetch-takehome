import type { ReactNode } from "react";
import NewsletterForm from "./NewsletterForm";

interface FooterLinkProps {
  href: string;
  children: ReactNode;
}

function FooterLink({ href, children }: FooterLinkProps) {
  return (
    <li>
      <a
        href={href}
        className="text-gray-300 hover:text-white transition-colors"
      >
        {children}
      </a>
    </li>
  );
}

interface LinkGroup {
  title: string;
  links: Array<{ href: string; label: string }>;
}

function Footer() {
  const linkGroups: LinkGroup[] = [
    {
      title: "Quick Links",
      links: [
        { href: "#", label: "About Us" },
        { href: "#", label: "Browse Pets" },
        { href: "#", label: "Adoption Process" },
        { href: "#", label: "Success Stories" },
      ],
    },
    {
      title: "Resources",
      links: [
        { href: "#", label: "Pet Care Tips" },
        { href: "#", label: "FAQ" },
        { href: "#", label: "Contact Us" },
        { href: "#", label: "Donate" },
      ],
    },
  ];

  const handleSubscribe = (email: string) => {
    console.log(`Footer received subscription for: ${email}`);
  };

  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img src="/favicon.ico" alt="PetStop Logo" className="w-8 h-8" />
              <h3 className="text-xl font-bold">PetStop</h3>
            </div>
            <p className="text-gray-300">
              Connecting loving homes with pets in need since 2025.
            </p>
          </div>

          {linkGroups.map((group) => (
            <div key={group.title}>
              <h4 className="font-semibold mb-4">{group.title}</h4>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <FooterLink key={link.label} href={link.href}>
                    {link.label}
                  </FooterLink>
                ))}
              </ul>
            </div>
          ))}

          <NewsletterForm onSubscribe={handleSubscribe} />
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© {new Date().getFullYear()} PetStop. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white mx-2">
                Privacy Policy
              </a>
              <span className="text-gray-600">|</span>
              <a href="#" className="text-gray-400 hover:text-white mx-2">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
