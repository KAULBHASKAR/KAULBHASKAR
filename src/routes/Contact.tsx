import React, { useState, useRef } from "react";
import type { ChangeEvent, FormEvent } from "react"; 
import { Helmet } from "react-helmet-async"; // ✅ Added import to prevent missing identifier crashes
import emailjs from "@emailjs/browser";
import ReCAPTCHA from "react-google-recaptcha";
import phoneImage from "/img/phone-image.jpeg";
import contactImage from "/img/contact.webp";
import SEO from "../components/SEO";

interface FormData {
  name: string;
  phone: string;
  email: string;
  message: string;
  [key: string]: string; 
}

export default function Contact(): React.JSX.Element {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [formData, setFormData] = useState<FormData>({ 
    name: "", 
    phone: "", 
    email: "", 
    message: "" 
  });
  
  const [status, setStatus] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Sending...");

    const token = recaptchaRef.current?.getValue();
    
    if (!token) {
      setStatus("Please complete the reCAPTCHA.");
      return;
    }

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone_number: formData.phone,
        message: formData.message,
        "g-recaptcha-response": token,
      };

      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      if (result.status === 200) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", phone: "", email: "", message: "" });
        recaptchaRef.current?.reset();
      }
    } catch (err: unknown) {
      console.error("EmailJS Error:", err);
      setStatus("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* ✅ Aligned domain mappings to target your live production endpoint paths */}
      <SEO
        title="Contact Kaulbhaskar | Tantra & Astrology Guidance"
        description="Get in touch with Kaulbhaskar Guru Ji for specialized Tantra and Astrology consultations in Patna, Bihar."
        canonical="https://kaulbhaskar.com"
        breadcrumbs={[
          { name: "Home", url: "https://kaulbhaskar.com" },
          { name: "Services", url: "https://kaulbhaskar.com/services" },
          { name: "Contact", url: "https://kaulbhaskar.com" },
        ]}
      />

      {/* ✅ Helmet container payload injected inline directly to bypass compiler unused variable warnings */}
      <Helmet>
        {/* Open Graph / Facebook Metadata */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kaulbhaskar.com" />
        <meta property="og:title" content="Contact Kaulbhaskar | Tantra & Astrology Guidance" />
        <meta property="og:description" content="Get in touch with Kaulbhaskar Guru Ji for specialized Tantra and Astrology consultations in Patna, Bihar." />
        <meta property="og:image" content="https://kaulbhaskar.com/img/phone-image.jpeg" />

        {/* Twitter Metadata */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://kaulbhaskar.com" />
        <meta name="twitter:title" content="Contact Kaulbhaskar | Tantra & Astrology Guidance" />
        <meta name="twitter:description" content="Get in touch with Kaulbhaskar Guru Ji for specialized Tantra and Astrology consultations in Patna, Bihar." />

        {/* JSON-LD ContactPage Schema Markups */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact KAUL TANTRA SADHANA",
            "description": "Official communication endpoint to query planetary consultations and ritual schedules from Kaulbhaskar Guru Ji.",
            "url": "https://kaulbhaskar.com",
            "mainEntity": {
              "@type": "LocalBusiness",
              "name": "KAUL TANTRA SADHANA",
              "telephone": "+91-9934418459",
              "email": "kaultantra@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "C-40 Birla Colony, Phulwarisharif",
                "addressLocality": "Patna",
                "addressRegion": "Bihar",
                "postalCode": "801505",
                "addressCountry": "IN"
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                  "opens": "10:00",
                  "closes": "20:00"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": "Sunday",
                  "opens": "10:00",
                  "closes": "16:00"
                }
              ]
            }
          })}
        </script>
      </Helmet>

      {/* Hero, Location, and Map sections */}
      <div className="relative w-full h-dvh flex items-center justify-center">
        <img src={phoneImage} alt="telephone" className="absolute inset-0 w-full h-full object-cover" />
        <h1 className="absolute top-24 text-4xl text-black font-bold z-10 pageHeader">Contact Us</h1>
        <div className="absolute bottom-10 z-10 flex flex-col lg:flex-row gap-10 lg:gap-20 text-center bg-gray-300 p-6 backdrop-blur-md rounded-xl">
          <div>
            <h2 className="text-xl font-bold text-black">Open Hours</h2>
            <p className="font-semibold text-red-700">Mon-Sat: 10.00 AM - 08.00 PM</p>
            <p className="font-semibold text-red-700">Sun: 10.00 AM - 04.00 PM</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-black">Location</h2>
            <p className="font-semibold text-red-700">Patna, Bihar (IN)</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-black">Contact</h2>
            <p className="font-semibold text-red-700">Email: kaultantra@gmail.com</p>
            <p className="font-semibold text-red-700">Tel: +91-9934418459</p>
          </div>
        </div>
      </div>

      <div className="py-16 text-center">
        <h2 className="text-2xl lg:text-4xl font-bold mb-10">Our Location on Map</h2>
        <div className="w-full h-125">
          <iframe
            title="Google Maps Location"
            width="100%"
            height="100%"
            src="https://maps.google.com/maps?width=100%25&amp;height=500&amp;hl=en&amp;q=C-40%20Birla%20Colony,%20Phulwarisharif+(TANTRA%20SADHANA)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          ></iframe>
        </div>
      </div>

      <div className="flex flex-col md:flex-row w-full bg-gray-100 p-10 lg:p-20 gap-16">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-6">We'd love to hear from you!</h2>
          <p className="text-xl mb-8">Please use the contact form regarding any questions, comments, or feedback.</p>
          <img src={contactImage} alt="contact" className="w-full h-auto rounded-2xl shadow-xl" />
        </div>

        <div className="md:w-1/2 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-10 text-center md:text-left">Contact Form</h2>
          <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-lg">
            <div>
              <label className="block mb-2 font-medium">Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full rounded-lg border p-3 outline-none focus:border-purple-500" />
            </div>
            <div>
              <label className="block mb-2 font-medium">Phone</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full rounded-lg border p-3 outline-none focus:border-purple-500" />
            </div>
            <div>
              <label className="block mb-2 font-medium">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full rounded-lg border p-3 outline-none focus:border-purple-500" />
            </div>
            <div>
              <label className="block mb-2 font-medium">Message</label>
              <textarea name="message" rows={4} value={formData.message} onChange={handleChange} required className="w-full rounded-lg border p-3 outline-none focus:border-purple-500 resize-none" />
            </div>

            {/* The reCAPTCHA Widget */}
            <div style={{ margin: "10px 0" }}>
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY || "YOUR_SITE_KEY_FALLBACK"}
              />
            </div>

            <button
              type="submit"
              className="w-full md:w-auto px-10 py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-black transition-colors"
            >
              Submit
            </button>
            {status && <p className="mt-4 font-bold text-purple-700">{status}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
