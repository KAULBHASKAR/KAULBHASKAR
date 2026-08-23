import React, { useState } from 'react';
import { MessageSquare, X, Send, User, ChevronDown, AlignLeft } from 'lucide-react';

export default function WhatsAppWidget() {
const [isOpen, setIsOpen] = useState(false);
const [fullName, setFullName] = useState('');
const [service, setService] = useState('Sadhana Learning');
const [customMessage, setCustomMessage] = useState('');

// Replace with Guru Ji's actual phone number (include country code, no "+" or spaces)
const WHATSAPP_NUMBER = "919934418459"; 

const handleSendMessage = (e) => {
e.preventDefault();
if (!fullName.trim()) {
alert("Please enter your name to connect.");
return;
}

// Format a structured, respectful message for spiritual consulting
const structuredText = 
Jai Gurudev. 
I would like to request a consultation.

*Name:* ${fullName.trim()}
*Purpose:* ${service}
*Query:* ${customMessage.trim() ? customMessage.trim() : 'Seeking guidance.'};

// Encode text to safe URL format
const encodedText = encodeURIComponent(structuredText);
const whatsappUrl = https://wa.me{WHATSAPP_NUMBER}?text=${encodedText};

// Open WhatsApp in a secure new tab
window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

// Reset state & close
setFullName('');
setCustomMessage('');
setIsOpen(false);
};

return (
<div className="fixed bottom-6 right-6 z-50 font-sans">
{/* Dynamic Pre-chat Consultation Form */}
{isOpen && (
<div className="absolute bottom-16 right-0 w-80 bg-stone-900 border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">

{/* Header Section */}
<div className="bg-gradient-to-r from-amber-700 to-amber-900 p-4 text-stone-100 flex justify-between items-center">
<div>
<h4 className="font-serif font-semibold text-base tracking-wide">Kaulbhaskar Guidance</h4>
<p className="text-xs text-stone-200/80">Fill in details to message Guru Ji</p>
</div>
<button 
onClick={() => setIsOpen(false)}
className="text-stone-100/80 hover:text-stone-100 transition p-1"
>
<X size={18} />
</button>
</div>

{/* Form Content */}
<form onSubmit={handleSendMessage} className="p-4 bg-stone-950 space-y-4">

{/* Input: Full Name */}
<div className="space-y-1">
<label className="text-xs font-medium text-amber-500/80 block">Your Full Name *</label>
<div className="relative">
<span className="absolute inset-y-0 left-0 pl-3 flex items-center text-stone-500">
<User size={14} />
</span>
<input
type="text"
required
placeholder="e.g., Rajesh Kumar"
value={fullName}
onChange={(e) => setFullName(e.target.value)}
className="w-full bg-stone-900 text-stone-100 border border-stone-800 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition"
/>
</div>
</div>

{/* Dropdown: Purpose/Service Selection */}
<div className="space-y-1">
<label className="text-xs font-medium text-amber-500/80 block">Purpose of Contact</label>
<div className="relative">
<select
value={service}
onChange={(e) => setService(e.target.value)}
className="w-full bg-stone-900 text-stone-100 border border-stone-800 rounded-lg px-3 py-2 text-sm appearance-none focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition cursor-pointer"
<option value="Sadhana Learning">Sadhana Learning (Sri Vidya/Kaul)</option>
<option value="Horoscope Reading">Horoscope Reading / Jyotish</option>
<option value="Ritual Request">Ritual Request (Puja/Anushthan)</option>
<option value="General Spiritual Query">General Spiritual Query</option>
</select>
<span className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-500 pointer-events-none">
<ChevronDown size={14} />
</span>
</div>
</div>

{/* Input: Brief Message */}
<div className="space-y-1">
<label className="text-xs font-medium text-amber-500/80 block">Brief Details (Optional)</label>
<div className="relative">
<span className="absolute top-2.5 left-0 pl-3 flex text-stone-500">
<AlignLeft size={14} />
</span>
<textarea
rows={2}
placeholder="Describe your issue or birth details..."
value={customMessage}
onChange={(e) => setCustomMessage(e.target.value)}
className="w-full bg-stone-900 text-stone-100 border border-stone-800 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition resize-none"
/>
</div>
</div>

{/* Submit Action Button */}
<button
type="submit"
className="w-full bg-amber-600 hover:bg-amber-500 text-stone-100 py-2.5 px-4 rounded-lg font-medium text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-amber-900/20"
>
<Send size={14} />
Open WhatsApp Chat
</button>
</form>
</div>
)}

{/* Main Floating Access Bubble */}
<button
onClick={() => setIsOpen(!isOpen)}
className="bg-[#25D366] hover:bg-[#20ba5a] text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-transform duration-300 hover:scale-110 focus:outline-none relative"
aria-label="Contact via WhatsApp"
>
<MessageSquare size={26} className="fill-current" />

{/* Continuous soft pulsing notification badge */}
<span className="absolute -top-1 -right-1 flex h-3 w-3">
<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
<span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
</span>
</button>
</div>
);
}
