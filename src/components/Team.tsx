import { useState, useEffect, type FC } from "react"; // Removed 'React' to fix Vercel TS6133
import SliderComponent from "react-slick";
import type { Settings } from "react-slick";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// @ts-ignore - Critical for Vite Production builds to avoid Error #130
const Slider = (SliderComponent as any).default || SliderComponent;

interface MentorData {
  src: string;
  title: string;
  description: string;
}

const Mentor: FC = () => {
  // 1. Dynamic slides state (Consistent with Mudra/Services/Testimonials)
  const [slidesToShow, setSlidesToShow] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setSlidesToShow(3); // Desktop
      } else if (width >= 640) {
        setSlidesToShow(2); // Tablet
      } else {
        setSlidesToShow(1); // Mobile
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow, // Use our dynamic state
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
  };

  const images: MentorData[] = [
    { src: "/mentor/Aradhya.webp", title: "VAJRA YOGINI", description: "Vajra Siddha." },
    { src: "/mentor/khunda.webp", title: "G. VYAS", description: "Bala Siddha Upasaka." },
    { src: "/mentor/S.Bakshi.webp", title: "S. BAKSHI", description: "Astro Guru." },
    { src: "/mentor/Siddharth.webp", title: "SIDDHARTH MAHARAJ", description: "Yagyan Expert." },
    { src: "/mentor/Subhas.webp", title: "SUBHAS KAUSHIK", description: "Vastu Expert & Palm Reader." },
    { src: "/mentor/YATAN.webp", title: "YATAN SHARMA", description: "NADI Astrologer." },
    { src: "/mentor/Kiran.webp", title: "KIRAN SHARMA", description: "Palmistry Researcher." },
  ];

  return (
    <div className='text-center my-10'>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="special-font hero-heading bg-linear-to-r from-yellow-500 via-red-600 to-indigo-500 bg-clip-text text-transparent text-lg uppercase tracking-widest">
          our <b>experts</b>
        </h2>
        
        {/* min-w-0 wrapper ensures correct mobile width calculation */}
        <div className="px-4 py-10 bg-black mt-6 w-full min-w-0 overflow-hidden">
          <Slider {...settings} key={slidesToShow}>
            {images.map((item, i) => (
              <div key={i} className="text-white px-2 outline-none">
                <img 
                  src={item.src} 
                  alt={item.title} 
                  className="mx-auto h-72 w-auto object-cover rounded-lg" 
                />
                <h3 className="mt-4 text-lg font-bold uppercase tracking-tighter">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.description}</p>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Mentor;
