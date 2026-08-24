import React, { useState, useEffect } from 'react';

interface WhatsAppWidgetProps {
  phoneNumber: string;
  message?: string;
  position?: 'right' | 'left';
  companyName?: string;
  companyStatus?: string;
  welcomeMessage?: string;
  brandColor?: string;
  autoOpenDelay?: number;
}

export const WhatsAppWidget: React.FC<WhatsAppWidgetProps> = ({
  phoneNumber,
  message = "Hello! I have a question about your services.",
  position = 'right',
  companyName = "Team Support",
  companyStatus = "Online",
  welcomeMessage = "Hi there! 👋 How can we help you today?",
  brandColor = "#0824F7",
  autoOpenDelay = 4000,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(true);
  const [showDot, setShowDot] = useState(true);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    const typingTimeout = setTimeout(() => setIsTyping(false), 2000);
    if (autoOpenDelay > 0) {
      const autoTimeout = setTimeout(() => {
        setIsOpen(true);
        setShowDot(false);
      }, autoOpenDelay);
      return () => {
        clearTimeout(typingTimeout);
        clearTimeout(autoTimeout);
      };
    }
    return () => clearTimeout(typingTimeout);
  }, [autoOpenDelay]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Explicit read check to completely satisfy strict TypeScript compiler checks
    const targetPhone = phoneNumber.trim();
    if (!targetPhone) return;

    const finalMsg = inputText.trim() || message;
    window.open(`https://wa.me{targetPhone}?text=${encodeURIComponent(finalMsg)}`, '_blank', 'noopener,noreferrer');
  };

  const keyframes = `
    @keyframes waFloat { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
    @keyframes pulseDot { 0% { transform: scale(0.9); opacity: 1; } 100% { transform: scale(1.8); opacity: 0; } }
    @keyframes slideIn { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    @keyframes blink { 0%, 100% { opacity: .2; } 20% { opacity: 1; } }
  `;

  return (
    <>
      <style>{keyframes}</style>
      <div style={{ position: 'fixed', bottom: '30px', [position]: '30px', zIndex: 99999, fontFamily: 'sans-serif', width: '60px', height: '60px' }}>
        
        <div style={{ 
          position: 'absolute',
          bottom: '120px', 
          [position]: '0',
          width: '320px', 
          backgroundColor: '#fff', 
          borderRadius: '12px', 
          boxShadow: '0 8px 30px rgba(0,0,0,0.15)', 
          overflow: 'hidden', 
          display: isOpen ? 'flex' : 'none', 
          flexDirection: 'column', 
          animation: 'slideIn 0.3s ease-out' 
        }}>
          <div style={{ backgroundColor: brandColor, padding: '15px', color: '#fff', display: 'flex', alignItems: 'center', position: 'relative' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '15px' }}>{companyName}</h3>
              <div style={{ fontSize: '11px', opacity: 0.9, marginTop: '2px' }}>● {companyStatus}</div>
            </div>
            <button type="button" onClick={() => setIsOpen(false)} style={{ position: 'absolute', right: '15px', background: 'none', border: 'none', color: '#fff', fontSize: '16px', cursor: 'pointer' }}>✕</button>
          </div>

          <div style={{ flex: 1, padding: '15px', backgroundColor: '#e5ddd5', maxHeight: '200px', overflowY: 'auto', minHeight: '120px' }}>
            {isTyping ? (
              <div style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '0 8px 8px 8px', width: '40px', textAlign: 'center' }}>
                <span style={{ animation: 'blink 1.4s infinite alternate' }}>...</span>
              </div>
            ) : (
              <div style={{ backgroundColor: '#fff', padding: '10px 12px', borderRadius: '0 8px 8px 8px', maxWidth: '85%', boxShadow: '0 1px 1px rgba(0,0,0,0.1)' }}>
                <p style={{ margin: 0, fontSize: '13px', color: '#333' }}>{welcomeMessage}</p>
              </div>
            )}
          </div>

          <form onSubmit={handleSendMessage} style={{ padding: '10px', backgroundColor: '#f0f0f0', display: 'flex', gap: '6px' }}>
            <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Type a message..." style={{ flex: 1, padding: '8px 12px', borderRadius: '20px', border: '1px solid #ddd', fontSize: '13px', outline: 'none' }} />
            <button type="submit" style={{ backgroundColor: brandColor, border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>➔</button>
          </form>
        </div>

        <button 
          type="button" 
          onClick={() => { setIsOpen(!isOpen); setShowDot(false); }} 
          style={{ backgroundColor: brandColor, borderRadius: '50%', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.2)', border: 'none', cursor: 'pointer', animation: 'waFloat 4s ease-in-out infinite', position: 'relative', margin: '0 auto' }}
        >
          {isOpen ? (
            <span style={{ color: '#fff', fontSize: '20px' }}>✕</span>
          ) : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff"><path d="M12.004 2C6.51 2 2.014 6.5 2.014 12c0 2.14.675 4.14 1.833 5.79L2.03 22l4.376-1.125a9.927 9.927 0 0 0 5.598 1.125c5.494 0 9.99-4.5 9.99-10S17.498 2 12.004 2z"/></svg>
          )}
          {showDot && !isOpen && (
            <span style={{ position: 'absolute', top: '2px', right: '2px', width: '12px', height: '12px', backgroundColor: '#ff3b30', borderRadius: '50%', border: '2px solid #fff' }}>
              <span style={{ position: 'absolute', top: '-2px', left: '-2px', width: '12px', height: '12px', backgroundColor: '#ff3b30', borderRadius: '50%', animation: 'pulseDot 1.8s infinite ease-out', zIndex: -1 }} />
            </span>
          )}
        </button>

      </div>
    </>
  );
};
