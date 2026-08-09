import React, { useState } from 'react'; 
import type { ChangeEvent, FormEvent } from 'react'; 
import emailjs from '@emailjs/browser'; 
import SEO from '../components/SEO'; 

interface FormData { 
 name: string; 
 phone: string; 
 email: string; 
 message: string; 
 [key: string]: string; 
} 

export default function Contact(): React.JSX.Element { 
 const [formData, setFormData] = useState<FormData>({ 
 name: '', 
 phone: '', 
 email: '', 
 message: '' 
 }); 
 const [status, setStatus] = useState<string>(''); 

 const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { 
 const { name, value } = e.target; 
 setFormData((prev) => ({ ...prev, [name]: value })); 
 }; 

 const handleSubmit = async (e: FormEvent<HTMLFormElement>) => { 
 e.preventDefault(); 
 setStatus('Sending...'); 

 try { 
 const templateParams = { 
 from_name: formData.name, 
 from_email: formData.email, 
 phone_number: formData.phone, 
 message: formData.message, 
 }; 

 const result = await emailjs.send( 
 import.meta.env.VITE_EMAILJS_SERVICE_ID, 
 import.meta.env.VITE_EMAILJS_TEMPLATE_ID, 
 templateParams, 
 import.meta.env.VITE_EMAILJS_PUBLIC_KEY 
 ); 

 if (result.status === 200) { 
 setStatus('Message sent successfully!'); 
 setFormData({ name: '', phone: '', email: '', message: '' }); 
 } 
 } catch (err: unknown) { 
 console.error('EmailJS Error: ', err); 
 setStatus('Failed to send message. Please try again.'); 
 } 
 }; 

 return ( 
 <div className="flex flex-col w-full min-h-screen"> 
 <SEO 
 title="Contact Kaulbhaskar | Tantra & Astrology Guidance" 
 description="Get in touch with Kaulbhaskar Guru Ji for Tantra and Astrology consultations." 
 canonical="https://tantrasadhana.org" 
 breadcrumbs={[ 
 { name: 'Home', url: 'https://tantrasadhana.org' }, 
 { name: 'Services', url: 'https://tantrasadhana.org' }, 
 { name: 'Contact', url: 'https://tantrasadhana.org' }
 ]} 
 /> 

 {/* Contact Form Section */}
 <div className="flex-1 max-w-4xl mx-auto p-6 w-full">
 <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>
 <form onSubmit={handleSubmit} className="space-y-4">
 <div>
 <label className="block text-sm font-medium mb-1">Name</label>
 <input 
 type="text" 
 name="name" 
 value={formData.name} 
 onChange={handleChange} 
 className="w-full p-2 border rounded" 
 required 
 />
 </div>
 <div>
 <label className="block text-sm font-medium mb-1">Phone</label>
 <input 
 type="tel" 
 name="phone" 
 value={formData.phone} 
 onChange={handleChange} 
 className="w-full p-2 border rounded" 
 required 
 />
 </div>
 <div>
 <label className="block text-sm font-medium mb-1">Email</label>
 <input 
 type="email" 
 name="email" 
 value={formData.email} 
 onChange={handleChange} 
 className="w-full p-2 border rounded" 
 required 
 />
 </div>
 <div>
 <label className="block text-sm font-medium mb-1">Message</label>
 <textarea 
 name="message" 
 value={formData.message} 
 onChange={handleChange} 
 className="w-full p-2 border rounded h-32" 
 required 
 />
 </div>
 <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
 Send Message
 </button>
 {status && <p className="text-center mt-2 font-medium">{status}</p>}
 </form>
 </div>

 {/* Google Maps Section */}
 <div className="w-full h-96 mt-8 border-t border-gray-200">
 <iframe
 title="Google Map Location"
 src="https://google.com"
 className="w-full h-full border-0"
 allowFullScreen={true}
 loading="lazy"
 referrerPolicy="no-referrer-when-downgrade"
 ></iframe>
 </div>
 </div> 
 ); 
}
