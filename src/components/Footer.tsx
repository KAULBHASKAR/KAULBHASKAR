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
  { href: "https://facebook.com/KAULBHASKAR", icon: <FaFacebookF />, label: "Follow us on Facebook" },
  { href: "https://twitter.com/KAULMARGA", icon: <FaTwitter />, label: "Follow us on Twitter" },
  { href: "https://youtube.com/@kaulbhaskar/videos", icon: <FaYoutube />, label: "Visit our YouTube channel" },
  { href: "https://linkedin.com/kaul-bhaskar-006a12234/", icon: <FaLinkedin />, label: "Connect with us on LinkedIn" },
  { href: "https://wa.me/919934418459", icon: <FaWhatsapp />, label: "Chat with us on WhatsApp" },
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
    // FIX 1: Provide an explicit minimum height for mobile & desktop to reserve vertical viewport space.
    <footer className="w-full bg-[#5542ff] py-10 text-white flex items-center min-h-[290px] md:min-h-[120px]">
      <div className="container mx-auto flex flex-col items-center justify-between gap-8 px-6 md:flex-row">
        
        {/* Copyright - Locked into a block size to prevent typography layout shift */}
        <p className="text-center text-sm font-light md:text-left h-5 subpixel-antialiased">
          © KAUL BHASKAR 2026. All rights reserved
        </p>

        {/* Navigation Links - Set explicit flex-basis on mobile to prevent snapping when items calculate widths */}
        <nav className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 w-full basis-full md:w-auto md:basis-auto md:flex-nowrap" aria-label="Footer Navigation">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              to={link.href} 
              className="text-white text-sm font-medium hover:underline transition-all focus:outline-none min-h-[20px] inline-flex items-center"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Social Links - FIX 2: Explicit structural width/height bounding around late-loading SVGs */}
        <div className="flex items-center justify-center gap-4 w-full md:w-auto h-7">
          {socialLinks.map((social) => (
            <a
              key={social.href}
              href={social.href}
              aria-label={social.label}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-200 transition-colors text-lg w-7 h-7 flex items-center justify-center"
            >
              {/* Wraps standard SVGs into forced aspect box blocks */}
              <span className="w-5 h-5 flex items-center justify-center" aria-hidden="true">
                {social.icon}
              </span>
            </a>
          ))}
        </div>

      </div>
    </footer>
  );
}
