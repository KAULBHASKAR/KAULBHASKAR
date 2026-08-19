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
    // FIXED CLS: Changed py-8/10 to explicit heights/paddings that ensure container structural stability
    <footer className="w-full bg-[#5542ff] py-8 text-white min-h-[320px] md:min-h-[120px] flex items-center content-center select-none">
      {/* FIXED CLS: Switched from Flexbox to Grid. This prevents columns from shifting dynamically during JS hydration */}
      <div className="container mx-auto grid grid-cols-1 gap-6 px-6 text-center md:grid-cols-4 md:items-center md:text-left">
        
        {/* Copyright - Secured against multiline text wrapping shifts */}
        <div className="flex items-center justify-center md:justify-start min-h-[24px]">
          <p className="text-sm font-light text-white tracking-normal whitespace-nowrap">
             © KAUL BHASKAR 2026. All rights reserved
          </p>
         </div>

        {/* Navigation Links - Centered inside grid tracks */}
        <nav className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 md:col-span-2" aria-label="Footer Navigation">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              to={link.href} 
              className="text-white text-sm font-medium hover:underline transition-all focus:outline-none focus:ring-2 focus:ring-white rounded-sm min-h-[20px] inline-block"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Social Links & Privacy Wrapper - Locks layout positioning on the right side */}
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-end md:gap-6">
          <div className="flex gap-3">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center text-white hover:scale-110 transition-transform text-xl focus:outline-none focus:ring-2 focus:ring-white rounded-full p-1 bg-white/10"
                aria-label={social.label}
              >
                <span className="w-5 h-5 flex items-center justify-center" aria-hidden="true">
                  {social.icon}
                </span>
              </a>
            ))}
          </div>

          {/* Privacy Policy */}
          <Link
            to="/privacy"
            className="text-sm font-light hover:underline focus:outline-none focus:ring-2 focus:ring-white rounded-sm min-h-[20px]"
          >
            Privacy Policy
          </Link>
        </div>

      </div>
    </footer>
  );
}
