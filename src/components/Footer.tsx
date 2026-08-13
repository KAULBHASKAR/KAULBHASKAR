// src/components/Footer.tsx
import { Link } from "react-router";
// Optimization: Import specific icons to enable better tree-shaking
import { 
  FaFacebookF, 
  FaTwitter, 
  FaYoutube, 
  FaLinkedin, 
  FaWhatsapp 
} from "react-icons/fa6";

const socialLinks = [
  { href: "https://facebook.com", icon: <FaFacebookF />, label: "Follow us on Facebook" },
  { href: "https://twitter.com", icon: <FaTwitter />, label: "Follow us on Twitter" },
  { href: "https://youtube.com", icon: <FaYoutube />, label: "Visit our YouTube channel" },
  { href: "https://linkedin.com", icon: <FaLinkedin />, label: "Connect with us on LinkedIn" },
  { href: "https://wa.me", icon: <FaWhatsapp />, label: "Chat with us on WhatsApp" },
];

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about-us", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    // FIX 2: Set minimum height (mobile vs desktop) to prevent layout collapse during load
    <footer className="w-full bg-[#5542ff] py-8 md:py-10 text-white flex items-center">
      <div className="container mx-auto flex flex-col items-center justify-between gap-8 px-6 md:flex-row">
        
        {/* Copyright */}
        <p className="text-center text-sm font-light md:text-left">
          © KAUL BHASKAR 2026. All rights reserved
        </p>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:flex-1 md:justify-center md:flex-nowrap" aria-label="Footer Navigation">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              to={link.href} 
              className="text-white text-sm font-medium hover:underline transition-all focus:outline-none focus:ring-2 focus:ring-white rounded-sm"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Social Links */}
        <div className="flex gap-4 md:flex-1 md:justify-end">
          {socialLinks.map((social, index) => (
            // FIX 1: Fixed dimensions (w-8 h-8) on wrapper to reserve space for icons
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center text-white hover:scale-110 transition-transform text-xl focus:outline-none focus:ring-2 focus:ring-white rounded-full p-1"
              aria-label={social.label}
            >
              {/* Internal fixed-size span ensures SVG doesn't cause a jump on load */}
              <span className="w-5 h-5 flex items-center justify-center" aria-hidden="true">
                {social.icon}
              </span>
            </a>
          ))}
        </div>

        {/* Privacy Policy */}
        <Link
          to="/privacy"
          className="text-center text-sm font-light hover:underline md:text-right md:ml-4 focus:outline-none focus:ring-2 focus:ring-white rounded-sm"
        >
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
}
