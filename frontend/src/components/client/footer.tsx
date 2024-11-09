import { Link } from '@tanstack/react-router';

type FooterLink = {
  label: string;
  href: string;
};

type FooterSection = {
  title: string;
  links: FooterLink[];
};

interface FooterProps {
  companyName?: string;
  description?: string;
  currentYear?: number;
}

// Constants
const QUICK_LINKS: FooterSection = {
  title: 'Quick Links',
  links: [
    { label: 'Home', href: '/' },
    { label: 'Features', href: '/features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Contact', href: '/contact' },
  ],
};

const LEGAL_LINKS: FooterSection = {
  title: 'Legal',
  links: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
  ],
};

const SOCIAL_LINKS: FooterSection = {
  title: 'Connect',
  links: [
    { label: 'Twitter', href: 'https://twitter.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'Facebook', href: 'https://facebook.com' },
    { label: 'Instagram', href: 'https://instagram.com' },
  ],
};

// Components
const FooterLinkList: React.FC<{ section: FooterSection }> = ({ section }) => (
  <div>
    <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
    <ul className="space-y-2">
      {section.links.map((link) => (
        <li key={link.label}>
          <Link
            href={link.href}
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const Footer: React.FC<FooterProps> = ({
  companyName = 'FinPlanner',
  description = 'Empowering your financial future with personalized planning tools.',
  currentYear = new Date().getFullYear(),
}) => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">{companyName}</h3>
            <p className="text-sm text-gray-400">{description}</p>
          </div>

          <FooterLinkList section={QUICK_LINKS} />
          <FooterLinkList section={LEGAL_LINKS} />
          <FooterLinkList section={SOCIAL_LINKS} />
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-sm text-gray-400">
            &copy; {currentYear} {companyName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
