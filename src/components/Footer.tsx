import { Link } from "react-router";
import { 
  FaFacebookF, 
  FaTwitter, 
  FaYoutube, 
  FaLinkedin, 
  FaWhatsapp,
  FaTelegram
} from "react-icons/fa6";

const socialLinks = [
  { href: "https://facebook.com/KAULBHASKAR", icon: <FaFacebookF />, label: "Follow us on Facebook" },
  { href: "https://twitter.com/KAULMARGA", icon: <FaTwitter />, label: "Follow us on Twitter" },
  { href: "https://youtube.com/@kaulbhaskar/videos", icon: <FaYoutube />, label: "Visit our YouTube channel" },
  { href: "https://linkedin.com/kaul-bhaskar-006a12234/", icon: <FaLinkedin />, label: "Connect with us on LinkedIn" },
  { href: "https://wa.me/919934418459", icon: <FaWhatsapp />, label: "Chat with us on WhatsApp" },
  { href: "https://t.me/kaulbhaskar", icon: <FaTelegram />, label: "Connect with us on Telegram" },
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
    // FIX 1: Removed content centering behavior on mobile; isolated layout calculations entirely using contain-intrinsic-size
    <footer 
      className="w-full bg-[#5542ff] py-10 text-white min-h-[290px] md:min-h-[120px] flex items-start md:items-center"
      style={{
        contentVisibility: "auto",
        containIntrinsicSize: "auto 290px"
      }}
    >
      <div className="container mx-auto flex flex-col items-center justify-between gap-8 px-6 md:flex-row w-full">
        
        {/* Copyright - Fixed structure space block allocation */}
        <div className="h-5 flex items-center justify-center md:justify-start">
          <p className="text-center text-sm font-light md:text-left subpixel-antialiased whitespace-nowrap">
            © KAUL BHASKAR 2026. All rights reserved
          </p>
        </div>

        {/* Navigation Links - FIX 2: Fixed dimensions and spacing layout constraints prevent item shift on wrap */}
        <nav className="flex flex-wrap justify-center items-center gap-x-6 gap-y-4 w-full max-w-sm md:max-w-none md:w-auto" aria-label="Footer Navigation">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              to={link.href} 
              className="text-white text-sm font-medium hover:underline transition-all focus:outline-none min-w-[60px] text-center"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Social Links - FIX 3: Isolated layout sizing containers prevent dynamic canvas resizing while icons render */}
        <div className="flex items-center justify-center gap-4 w-full md:w-auto h-7">
          {socialLinks.map((social) => (
            <a
              key={social.href}
              href={social.href}
              aria-label={social.label}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-200 transition-colors w-7 h-7 flex items-center justify-center"
            >
              <span className="w-5 h-5 flex items-center justify-center block" aria-hidden="true">
                {social.icon}
              </span>
            </a>
          ))}
        </div>

      </div>
    </footer>
  );
}
