import React, { useState } from 'react';
import { MessageSquare, X, Send, User, ChevronDown, AlignLeft } from 'lucide-react'; 

export default function WhatsAppWidget() {
const [isOpen, setIsOpen] = useState(false);
const [fullName, setFullName] = useState('');
const [service, setService] = useState('Sadhana Learning');
const [customMessage, setCustomMessage] = useState(''); 

const WHATSAPP_NUMBER = "919934418459"; 

const handleSendMessage = (e: React.FormEvent) => {
e.preventDefault();
if (!fullName.trim()) {
alert("Please enter your name to connect.");
return;
} 

const line1 = "Jai Gurudev.\nI would like to request a consultation.\n\n";
const line2 = "*Name:* " + fullName.trim() + "\n";
const line3 = "*Purpose:* " + service + "\n";
const line4 = "*Query:* " + (customMessage.trim() ? customMessage.trim() : "Seeking guidance.");

const structuredText = line1 + line2 + line3 + line4;
const encodedText = encodeURIComponent(structuredText);
const whatsappUrl = "[https://wa.me/](https://wa.me/)" + WHATSAPP_NUMBER + "?text=" + encodedText;

window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

setFullName('');
setCustomMessage('');
setIsOpen(false);

}; 

return ( 

);
}
