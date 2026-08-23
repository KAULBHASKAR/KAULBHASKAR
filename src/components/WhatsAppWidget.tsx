import React, { useState } from 'react';
import { MessageSquare, X, Send, User, ChevronDown, AlignLeft } from 'lucide-react'; 

export default function WhatsAppWidget() {
const [isOpen, setIsOpen] = useState(false);
const [fullName, setFullName] = useState('');
const [service, setService] = useState('Sadhana Learning');
const [customMessage, setCustomMessage] = useState(''); 

const handleSendMessage = (e: React.FormEvent) => {
e.preventDefault();
if (!fullName.trim()) {
alert("Please enter your name to connect.");
return;
} 

const detailText = customMessage.trim() ? customMessage.trim() : "Seeking guidance.";
const rawText = "Jai Gurudev.\nI would like to request a consultation.\n\n*Name:* " + fullName.trim() + "\n*Purpose:* " + service + "\n*Query:* " + detailText;

window.open("[https://wa.me/919934418459?text=](https://wa.me/919934418459?text=)" + encodeURIComponent(rawText), '_blank', 'noopener,noreferrer');

setFullName('');
setCustomMessage('');
setIsOpen(false);

}; 

return ( 

);
}
