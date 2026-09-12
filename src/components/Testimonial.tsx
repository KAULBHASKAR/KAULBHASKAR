import { useState, useEffect, type FC } from "react"; // Removed 'React' here
import SliderComponent from "react-slick";
import type { Settings } from "react-slick";
import { FaStar } from "react-icons/fa";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// @ts-ignore - Critical for Vite Production builds to avoid Error #130
const Slider = (SliderComponent as any).default || SliderComponent;

interface TestimonialData {
  name: string;
  profession: string;
  comment: string;
}

const TestimonialCard: FC<TestimonialData> = ({ name, profession, comment }) => {
  return (
    <div className="bg-white m-4 p-5 min-h-[350px] flex flex-col justify-between overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
      <div>
        <h2 className="text-base font-normal text-black my-4 leading-relaxed italic">"{comment}"</h2>
      </div>
      <div>
        <hr className="border-gray-200" />
        <div className="flex justify-between items-center mt-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">{name}</h3>
            <h4 className="text-sm font-normal text-gray-600">{profession}</h4>
          </div>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className={i === 4 ? "text-amber-500" : "text-orange-300"} size={16} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const testimonialData: TestimonialData[] = [
  { name: "J. Kartikeyan", profession: "Entrepreneur", comment: "I am a huge fan of GURU Ji. I have found the whole team to be incredibly intuitive overall. Would definitely recommend this website if you are looking for a source of learning tantra that bit easier." },
  { name: "N. Ramaswami", profession: "MD, Tech Infra", comment: "This website has been pivotal for helping me on tantra rituals. I would definitely recommend this website if you would like to perform any tantra rituals." },
  { name: "C. Mathew", profession: "Bureaucrat", comment: "I absolutely love the services provided by KAULBHASKAR Guru Ji and his team members. It really helped streamline my workflows. I would definitely recommend." },
  { name: "Maheshwer Kumar", profession: "Lawyer", comment: "I am utterly grateful that KAULBHASKAR Ji imparts the high teaching of tantra, specially of hidden KAUL MARGA. He gives personal attention to each knowledge seeker. My life has been changed since I have been learning from him." },
  { name: "Dr. Rupinder Singh", profession: "Doctor", comment: "I have always wanted to learn authentic SRI VIDYA but unfortunately, it is extremely difficult to find genuine practitioners. Thanks to the Goddess that my desire finally found its fulfillment in KAULBHASKAR GURU Ji." },
  { name: "Anupama S.", profession: "Spiritual Practitioner", comment: `An Authentic Gateway to Deep Spiritual Awakening "Finding genuine guidance in Sri Vidya and Kaula Marga is incredibly rare today. Guru Ji Sri Kaulbhaskar has completely transformed my approach to sadhana. His profound, lineage-backed knowledge of mudras and classical scriptures gave me the practical tools I needed to elevate my meditation practice. He teaches the complex systems of Vedic metaphysics with absolute clarity, humility, and zero commercial motive. If you are looking for an authentic, traditional path to spiritual balance, look no further."` },
  { name: "S. Krishnan", profession: "Corporate Client", comment: `Flawless Metaphysical Foresight for Complex Business Decisions "As a corporate executive, I was looking for structured risk management tools. The strategic consulting provided by Kaulbhaskar Guru Ji is incredibly rigorous. By mathematically combining different astrological systems, he provided multi-layered data verification that pinpointed the exact timing for our major business restructuring. His unique background matching earthly legal frameworks with cosmic orders makes him a standout advisor for modern professionals."` },
  { name: "Vikram Mathur", profession: "Private Consultation Client", comment: `A Versatile Master and Compassionate Mentor "Before reaching out via the Tantra Sadhana Portal, I felt stuck after trying multiple modern alternatives to resolve a lingering personal crisis. Respectable Kaul Bhaskar Ji is truly a master of both the theoretical and practical realms of Tantra and Astrology. His polite, non-judgmental demeanor immediately put me at ease. The specific ritual remedies suggested by his team brought immense stability and clarity back into my life. His versatility is unmatched."` },
  { name: "राजेश के.", profession: "कॉरपोरेट डायरेक्टर", comment: `बगलामुखी अनुष्ठान (संकट निवारण एवं कानूनी विजय)"घोर संकट और कानूनी विवादों में अचूक सुरक्षा कवच""जब मैं एक बेहद जटिल कानूनी विवाद और घोर मानसिक तनाव से जूझ रहा था, तब मुझे गुरु जी के बारे में पता चला। पूर्व में स्वयं एक हाई कोर्ट एडवोकेट होने के कारण, वे सांसारिक नियमों और ब्रह्मांडीय ऊर्जा दोनों को बखूबी समझते हैं। उनके द्वारा अनुशंसित और विधि-विधान से संपन्न 'मां बगलामुखी अनुष्ठान' ने मेरे पक्ष में चमत्कारिक रूप से रास्ते खोल दिए। उनके मार्गदर्शन में की गई साधना ने मेरे शत्रुओं और बाधाओं का शमन कर मुझे पूर्ण विजय और सुरक्षा प्रदान की।"` },
  { name: "------", profession: "आध्यात्मिक साधिका", comment: `"ललिता सहस्रनामावली अनुष्ठान से मिली अलौकिक मानसिक शांति और ऊर्जा""गुरु जी श्री कौलभास्कर जी के मार्गदर्शन में 'ललिता सहस्रनामावली अर्चनम्' कराना मेरे जीवन का सबसे दिव्य अनुभव रहा है। श्री विद्या उपासना और कौल मार्ग की उनकी गहरी, प्रामाणिक समझ अद्वितीय है। इस अनुष्ठान के बाद मुझे अपने भीतर एक असाधारण मानसिक स्पष्टता और आध्यात्मिक ऊर्जा का अहसास हुआ। गुरु जी बिना किसी व्यावसायिक भावना के, शास्त्रों के शुद्ध नियमों के अनुसार साधना संपन्न कराते हैं। सच्चे साधकों के लिए उनका सानिध्य एक वरदान है।"` },
];


const Testimonial: FC = () => {
  const [slidesToShow, setSlidesToShow] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setSlidesToShow(3); 
      } else if (width >= 640) {
        setSlidesToShow(2); 
      } else {
        setSlidesToShow(1); 
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
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 5000,
    cssEase: "ease-in-out",
  };

  return (
    <div className="bg-linear-to-r from-red-500 via-green-400 to-pink-500 py-20 overflow-hidden" id="testimonial">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold text-white mb-10 uppercase tracking-widest">
          Testimonials
        </h2>
        <div className="w-full min-w-0">
          <Slider {...settings} key={slidesToShow}> 
            {testimonialData.map((item, index) => (
              <TestimonialCard
                key={index}
                name={item.name}
                profession={item.profession}
                comment={item.comment}
              />
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
