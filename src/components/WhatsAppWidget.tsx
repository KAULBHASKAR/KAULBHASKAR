import React from 'react';

interface WhatsAppWidgetProps {
  phoneNumber: string;       // E.g., "15551234567"
  message?: string;          // Pre-filled text message
  position?: 'right' | 'left';
}

export const WhatsAppWidget: React.FC<WhatsAppWidgetProps> = (props) => {
  const targetMessage = props.message || "Hello! I have a question about your services.";
  const targetPosition = props.position || 'right';
  
  const handleChatRedirect = () => {
    const encodedMessage = encodeURIComponent(targetMessage);
    const whatsappUrl = `https://wa.me/${props.phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  // Natively inject keyframes for a continuous subtle heartbeat/pulse effect
  const pulseKeyframes = `
    @keyframes whatsappPulse {
      0% {
        box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7);
        transform: scale(1);
      }
      70% {
        box-shadow: 0 0 0 15px rgba(37, 211, 102, 0);
        transform: scale(1.03);
      }
      100% {
        box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
        transform: scale(1);
      }
    }
  `;

  const positionStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: '80px',
    [targetPosition]: '24px',
    zIndex: 9999,
    cursor: 'pointer',
    backgroundColor: '#25D366',
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
    border: 'none',
    transition: 'transform 0.2s ease-in-out',
    // Apply continuous animation loop
    animation: 'whatsappPulse 2s infinite ease-in-out',
  };

  return (
    <>
      {/* Injecting keyframes dynamically inside the render loop */}
      <style>{pulseKeyframes}</style>
      
      <button 
        style={positionStyle} 
        onClick={handleChatRedirect}
        aria-label="Chat on WhatsApp"
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.animationPlayState = 'paused'; // Pauses the pulse during manual hover expansion
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.animationPlayState = 'running'; // Resumes continuous pulse when mouse exits
        }}
      >
        <svg 
          xmlns="http://w3.org" 
          viewBox="0 0 448 512" 
          width="32" 
          height="32" 
          fill="#FFFFFF"
        >
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-105.2 0-106.1 86.3-192.4 192.4-192.4 51.4 0 99.7 20 136 56.3s56.3 84.6 56.3 136c-.1 106.1-86.4 192.4-192.5 192.4zm114.5-156.4c-6.3-3.1-37.3-18.4-43-20.5-5.7-2.1-9.9-3.1-14.1 3.1-4.2 6.2-16.2 20.5-19.9 24.7-3.7 4.2-7.3 4.7-13.6 1.5-6.3-3.1-26.6-9.8-50.8-31.3-18.8-16.8-31.5-37.5-35.2-43.7-3.7-6.2-.4-9.6 2.7-12.7 2.8-2.8 6.3-7.3 9.4-11 3.1-3.7 4.2-6.2 6.3-10.4 2.1-4.2 1-7.8-.5-10.9-1.6-3.1-14.1-34.1-19.3-46.8-5.1-12.4-10.3-10.7-14.1-10.9-3.7-.2-7.9-.2-12.1-.2-4.2 0-11 1.6-16.7 7.8-5.7 6.2-21.9 21.4-21.9 52.2s22.5 60.5 25.6 64.7c3.1 4.2 44.3 67.7 107.3 94.9 15 6.5 26.7 10.4 35.8 13.3 15.1 4.8 28.8 4.1 39.7 2.5 12.1-1.8 37.3-15.2 42.5-30 5.2-14.7 5.2-27.3 3.7-30-1.5-2.6-5.7-4.2-12.1-7.3z"/>
        </svg>
      </button>
    </>
  );
};
