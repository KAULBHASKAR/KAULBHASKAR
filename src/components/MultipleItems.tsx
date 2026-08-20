import { useState, useEffect, type FC } from "react"; // Removed 'React' to fix Vercel TS6133
import SliderComponent from "react-slick";
import type { Settings } from "react-slick";
import { HiStar } from "react-icons/hi";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// @ts-ignore - Critical for Vite Production builds to avoid Error #130
const Slider = (SliderComponent as any).default || SliderComponent;

interface ServicePost {
  heading: string;
  heading2: string;
  name: string;
  imgSrc: string;
  price: number;
  rating: number;
}

const postData: ServicePost[] = [
  { 
    heading: "Know your Destiny", 
    heading2: "By ASTROLOGY", 
    name: "Horoscope/Palm-Reading/Prasna", 
    imgSrc: "/services/horoscope.png", 
    price: 5000, 
    rating: 4.2, 
  }, 
  {
    heading: 'MAHA VIPRITA PRATYANGIRA',
    heading2: 'A famous Prayoga',
    name: "Defensive and curative in abhicharas",
    imgSrc: '/services/Pratyangira.png',
    price: 70000, 
    rating: 4.8,
  }, 
  {
    heading: 'SHULINI DURGA PRAYOGA',
    heading2: 'As in SHARDA TILAKA',
    name: "Protection from evil planets",
    imgSrc: '/services/shulini.webp',
    price: 40000, 
    rating: 4.4,
  }, 
  {
    heading: 'BATUKA BHAIRAV PRAYOGA',
    heading2: 'A famous Prayoga',
    name: "Deliverance from all hurdle",
    imgSrc: '/services/bhairav.webp',
    price: 50000, 
    rating: 4.8,
  }, 
  { 
    heading: "Maha Mrityunjaya", 
    heading2: "A very popular Prayoga", 
    name: "For Longevity and Good Health", 
    imgSrc: "/services/mahamrityunjaya.png", 
    price: 90000, 
    rating: 4.7, 
  },
  { 
    heading: "Baglamukhi", 
    heading2: "Famous Prayoga to abolish enemies!", 
    name: "To win Elections, Litigations", 
    imgSrc: "/services/baglamukhi.png", 
    price: 120000, 
    rating: 4.6, 
  }, 
  {
    heading: 'SHAT-CHANDI',
    heading2: 'By pure tantric method',
    name: "One of the Jack-of-all Prayoga",
    imgSrc: '/services/Shatchandi.webp',
    price: 250000,
    rating: 4.8,
  },
  {
    heading: 'MAHAVIDYA PRAYOGA',
    heading2: 'As in MUNDMALA TANTRA',
    name: "For protection against evil eyes",
    imgSrc: '/services/mahavidya.png',
    price: 40000,
    rating: 4.5,
  },
  {
    heading: 'LALITA SAHSTRANAMAVALI ARCHANAM',
    heading2: '',
    name: "For blessing of divine mother",
    imgSrc: '/services/lalita_archanam.png',
    price: 50000,
    rating: 4.8,
  },
];

const MultipleItems: FC = () => {
  // 1. Dynamic slides state (Same as Mudra component)
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
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow, // Use our dynamic state
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 5000,
    cssEase: "linear",
  };

  return (
    <div className="w-screen h-auto overflow-hidden">
      {/* Hero Section */}
      <div className="relative flex w-full h-screen">
        <video
          loop
          muted
          autoPlay
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/SERVICE.mp4" type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-10 flex flex-col items-center justify-center w-full px-6 text-white text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Services</h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Strategic Tantra advice and tailored solutions
          </h2>
          <p className="text-lg md:text-xl font-medium max-w-4xl leading-relaxed">
            Through blog posts, videos and other resources, we provide an
            accessible platform for individuals to learn about Tantra and its
            various practices as well as for performing Tantric Rituals.
          </p>
        </div>
      </div>

      {/* Carousel Section */}
      <div className="w-full bg-linear-to-r from-pink-500 via-purple-500 to-indigo-500 py-16 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-12 text-center md:text-left">
            Popular Services
          </h2>

          <div className="w-full min-w-0">
            <Slider {...settings} key={slidesToShow}>
              {postData.map((item, i) => (
                <div key={i} className="outline-none">
                  <div className="bg-white mx-3 p-4 shadow-xl rounded-2xl transition-all duration-300 hover:shadow-2xl mb-10">
                    <div className="relative overflow-hidden rounded-xl group">
                      <img
                        src={item.imgSrc}
                        alt={item.name}
                        className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute right-4 -bottom-2 bg-blue-900 rounded-full p-4 shadow-lg">
                        <h3 className="text-white uppercase text-center text-[10px] font-bold leading-tight">
                          best <br /> wanted
                        </h3>
                      </div>
                    </div>

                    <div className="pt-8">
                      <h4 className="text-xl font-bold text-gray-900 line-clamp-1">{item.heading}</h4>
                      <h4 className="text-sm font-semibold text-gray-600 mt-1">{item.heading2}</h4>
                      <h3 className="text-base font-normal text-gray-500 mt-4 min-h-12">{item.name}</h3>

                      <div className="flex flex-col md:flex-row justify-between items-center py-6 gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-red-600 text-xl font-bold">{item.rating}</span>
                          <div className="flex">
                            {[...Array(5)].map((_, idx) => (
                              <HiStar key={idx} className="h-4 w-4 text-yellow-500" />
                            ))}
                          </div>
                        </div>
                        <div className="text-2xl font-black text-gray-900">
                          ₹{item.price.toLocaleString()}/=
                        </div>
                      </div>
                      <hr className="border-gray-100" />
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultipleItems;
