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

// Direct inline assembly without dynamic multiline expressions to bypass compiler strictness
const queryText = customMessage.trim() ? customMessage.trim() : "Seeking guidance.";
const structuredText = "Jai Gurudev.\nI would like to request a consultation.\n\n*Name:* " + fullName.trim() + "\n*Purpose:* " + service + "\n*Query:* " + queryText;

const whatsappUrl = "[https://wa.me/](https://wa.me/)" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(structuredText);

window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

setFullName('');
setCustomMessage('');
setIsOpen(false);

}; 

return ( 

);
}
