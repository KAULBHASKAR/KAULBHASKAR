import React, { useState } from 'react';
import { MessageSquare, X, Send, User, ChevronDown, AlignLeft } from 'lucide-react'; 

export default function WhatsAppWidget() {
const [isOpen, setIsOpen] = useState(false);
const [fullName, setFullName] = useState('');
const [service, setService] = useState('Sadhana Learning');
const [customMessage, setCustomMessage] = useState(''); 

// Replace with Guru Ji's actual phone number (include country code, no "+" or spaces)
const WHATSAPP_NUMBER = "919934418459"; 

const handleSendMessage = (e: React.FormEvent) => {
e.preventDefault();
if (!fullName.trim()) {
alert("Please enter your name to connect.");
return;
} 

// Fixed: Added backticks for multi-line string interpolation
const structuredText = `Jai Gurudev.
I would like to request a consultation. 

*Name:* 
𝑓𝑢𝑙𝑙𝑁𝑎𝑚𝑒.𝑡𝑟𝑖𝑚()

*𝑃𝑢𝑟𝑝𝑜𝑠𝑒

∶

*
{service}
*Query:* ${customMessage.trim() ? customMessage.trim() : 'Seeking guidance.'}`; 

// Fixed: Added backticks, fixed missing forward slash and missing $ for the variable
const encodedText = encodeURIComponent(structuredText);
const whatsappUrl = https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText};

// Open WhatsApp in a secure new tab
window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

// Reset state & close
setFullName('');
setCustomMessage('');
setIsOpen(false);

}; 

return ( 

);
}
