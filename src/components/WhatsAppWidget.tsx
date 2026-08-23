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

// Completely sterile line arrays. No complex expressions on line 20-40.
const messageLines = [
"Jai Gurudev.",
"I would like to request a consultation.",
"",
"*Name:* " + fullName.trim(),
"*Purpose:* " + service,
"*Query:* " + (customMessage.trim() ? customMessage.trim() : "Seeking guidance.")
];

const joinedText = messageLines.join("\n");
const targetUrl = "[https://wa.me/919934418459?text=](https://wa.me/919934418459?text=)" + encodeURIComponent(joinedText);

window.open(targetUrl, '_blank', 'noopener,noreferrer');

setFullName('');
setCustomMessage('');
setIsOpen(false);

}; 

return ( 

);
}
