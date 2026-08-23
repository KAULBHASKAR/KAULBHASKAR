import React, { useState } from 'react';
import { MessageSquare, X, Send, User, ChevronDown, AlignLeft } from 'lucide-react'; 

export default function WhatsAppWidget() {
const [isOpen, setIsOpen] = useState(false);
const [fullName, setFullName] = useState('');
const [service, setService] = useState('General Query');
const [customMessage, setCustomMessage] = useState(''); 

// Replace with your actual target phone number (include country code, no "+" or spaces)
const WHATSAPP_NUMBER = "919934418459"; 

const handleSendMessage = (e: React.FormEvent) => {
e.preventDefault();
if (!fullName.trim()) {
alert("Please enter your name to connect.");
return;
} 

// Build the structured text line by line to prevent any compiler formatting breaks
const messageLines = [
"Hello!",
"I would like to request a consultation/query.",
"",
"*Name:* " + fullName.trim(),
"*Purpose:* " + service,
"*Details:* " + (customMessage.trim() ? customMessage.trim() : "Seeking guidance.")
];

const joinedText = messageLines.join("\n");
const targetUrl = "[https://wa.me/](https://wa.me/)" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(joinedText);

// Open WhatsApp securely in a new browser tab
window.open(targetUrl, '_blank', 'noopener,noreferrer');

// Reset layout form state and close modal
setFullName('');
setCustomMessage('');
setIsOpen(false);

}; 

return ( 

);
}
