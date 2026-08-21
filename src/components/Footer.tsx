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
    // FIXED CLS: Changed variable layout flow to a fixed block height structure with rigid dimensions
    <footer className="w-full bg-[#5542ff] h-[320px] md:h-[120px] text-white select-none box-border block clear-both">
      <div className="container mx-auto h-full grid grid-cols-1 px-6 text-center md:grid-cols-4 items-center justify-items-stretch content-center gap-y-4 md:gap-y-0">
        
        {/* Copyright - FIXED CLS: Rigid box height prevents line jumping during custom font swapping */}
        <div className="h-6 flex items-center justify-center md:justify-start overflow-hidden">
          <p className="text-sm font-light text-white tracking-normal whitespace-nowrap leading-6">
            © KAUL BHASKAR 2026. All rights reserved
          </p>
        </div>

        {/* Navigation Links - FIXED CLS: Fixed layout grid track constraints to stop layout wobble */}
        <nav className="h-12 md:h-6 flex flex-wrap justify-center items-center gap-x-4 gap-y-1 md:col-span-2 overflow-hidden" aria-label="Footer Navigation">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              to={link.href} 
              className="text-sm text-white hover:text-purple-200 transition-colors whitespace-nowrap h-6 inline-flex items-center"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Social Links - FIXED CLS: Isolated heights with predefined icon slots */}
        <div className="h-9 flex justify-center items-center gap-4 md:justify-end">
          {socialLinks.map((social) => (
            <a
              key={social.href}
              href={social.href}
              aria-label={social.label}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-9 h-9 min-w-[36px] min-h-[36px] rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
            >
              <span className="w-5 h-5 flex items-center justify-center min-w-[20px] min-h-[20px] [&>svg]:w-5 [&>svg]:h-5 [&>svg]:block">
                {social.icon}
              </span>
            </a>
          ))}
        </div>

      </div>
    </footer>
  );
}
