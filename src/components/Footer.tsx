// src/components/Footer.tsx
import { Link } from "react-router";
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
    <footer className="w-full bg-[#5542ff] py-10 text-white flex items-center">
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
              className="text-white text-sm font-medium hover:underline transition-all focus:outline-none"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Social Links */}
        <div className="flex items-center gap-4">
          {socialLinks.map((social) => (
            <a
              key={social.href}
              href={social.href}
              aria-label={social.label}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-200 transition-colors text-lg"
            >
              {social.icon}
            </a>
          ))}
        </div>

      </div>
    </footer>
  );
}
