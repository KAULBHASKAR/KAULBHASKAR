import React, { useState, useEffect, useRef } from 'react';

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
  brandColor = "#00008B",
  autoOpenDelay = 4000,
}) => {
  // CRITICAL FIX: Prevent execution of sub-hooks until user interaction happens
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(true);
  const [showDot, setShowDot] = useState(true);
  const [inputText, setInputText] = useState('');

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const sendButtonRef = useRef<HTMLButtonElement>(null);
  const launcherButtonRef = useRef<HTMLButtonElement>(null);

  // 1. Listen for user interaction to bootstrap the component asynchronously
  useEffect(() => {
    if (hasInteracted) return;

    const activateWidget = () => {
      setHasInteracted(true);
      cleanUpListeners();
    };

    const cleanUpListeners = () => {
      window.removeEventListener('scroll', activateWidget);
      window.removeEventListener('mousemove', activateWidget);
      window.removeEventListener('touchstart', activateWidget);
    };

    window.addEventListener('scroll', activateWidget, { passive: true });
    window.addEventListener('mousemove', activateWidget, { passive: true });
    window.addEventListener('touchstart', activateWidget, { passive: true });

    return cleanUpListeners;
  }, [hasInteracted]);

  // 2. Typing and auto-open timer logic (Runs only after hydration)
  useEffect(() => {
    if (!hasInteracted) return;

    const typingTimeout = setTimeout(() => setIsTyping(false), 2000);
    
    let autoTimeout: NodeJS.Timeout;
    if (autoOpenDelay > 0) {
      autoTimeout = setTimeout(() => {
        setIsOpen(true);
        setShowDot(false);
      }, autoOpenDelay);
    }

    return () => {
      clearTimeout(typingTimeout);
      if (autoTimeout) clearTimeout(autoTimeout);
    };
  }, [hasInteracted, autoOpenDelay]);

  // 3. Accessibility Focus Placement Transitions
  useEffect(() => {
    if (!hasInteracted) return;

    if (isOpen) {
      setTimeout(() => closeButtonRef.current?.focus(), 50);
    } else {
      launcherButtonRef.current?.focus();
    }
  }, [isOpen, hasInteracted]);

  // 4. Accessible Keyboard Focus Trap Logic
  useEffect(() => {
    if (!isOpen || !hasInteracted) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        return;
      }

      if (e.key === 'Tab') {
        const firstElement = closeButtonRef.current;
        const lastElement = sendButtonRef.current;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement?.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement?.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, hasInteracted]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const targetPhone = phoneNumber.trim();
    if (!targetPhone) return;

    const finalMsg = inputText.trim() || message;
    window.open(`https://wa.me{targetPhone}?text=${encodeURIComponent(finalMsg)}`, '_blank', 'noopener,noreferrer');
  };

  if (!hasInteracted) {
    // Return completely blank during initial critical paint paths
    return null;
  }

  const keyframes = `
    @keyframes waFloat { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
    @keyframes pulseDot { 0% { transform: scale(0.9); opacity: 1; } 100% { transform: scale(1.8); opacity: 0; } }
    @keyframes slideIn { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    @keyframes blink { 0%, 100% { opacity: .2; } 20% { opacity: 1; } }
    
    .wa-widget-input::placeholder {
      color: #656565 !important;
      opacity: 1 !important;
    }
    .wa-widget-focus-target:focus-visible {
      outline: 3px solid #ffbf47 !important;
      outline-offset: 2px !important;
    }
  `;

  return (
    <>
      <style>{keyframes}</style>
      <div style={{ position: 'fixed', bottom: '90px', [position]: '30px', zIndex: 99999, fontFamily: 'sans-serif', width: '60px', height: '60px' }}>
        
        <div style={{ 
          position: 'absolute',
          bottom: '75px', 
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
              <div style={{ fontSize: '12px', opacity: 0.9, marginTop: '2px' }}>● {companyStatus}</div>
            </div>
            <button 
              ref={closeButtonRef}
              aria-label="Close chat" 
              type="button" 
              onClick={() => setIsOpen(false)} 
              className="wa-widget-focus-target"
              style={{ position: 'absolute', right: '15px', background: 'none', border: 'none', color: '#fff', fontSize: '16px', cursor: 'pointer', borderRadius: '4px' }}
            >
              ✕
            </button>
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
            <input 
              type="text" 
              value={inputText} 
              onChange={(e) => setInputText(e.target.value)} 
              placeholder="Type a message..." 
              aria-label="Type a message to send via WhatsApp"
              className="wa-widget-input wa-widget-focus-target"
              style={{ flex: 1, padding: '8px 12px', borderRadius: '20px', border: '1px solid #ddd', fontSize: '13px', color: '#333' }} 
            />
            <button 
              ref={sendButtonRef}
              aria-label="Send message" 
              type="submit" 
              className="wa-widget-focus-target"
              style={{ backgroundColor: brandColor, border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              ➔
            </button>
          </form>
        </div>

        <button 
          ref={launcherButtonRef}
          type="button" 
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close WhatsApp chat" : "Open WhatsApp chat"}
          onClick={() => { setIsOpen(!isOpen); setShowDot(false); }} 
          className="wa-widget-focus-target"
          style={{ backgroundColor: brandColor, borderRadius: '50%', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.2)', border: 'none', cursor: 'pointer', animation: 'waFloat 4s ease-in-out infinite', position: 'relative', margin: '0 auto' }}
        >
          {/* Restored cutoff launcher rendering logic */}
          <span style={{ fontSize: '24px', color: '#fff' }}>💬</span>
          {showDot && (
            <span style={{
              position: 'absolute',
              top: '2px',
              right: '2px',
              width: '12px',
              height: '12px',
              backgroundColor: '#25D366',
              borderRadius: '50%',
              border: '2px solid #fff',
              animation: 'pulseDot 1.5s infinite'
            }} />
          )}
        </button>
      </div>
    </>
  );
};
