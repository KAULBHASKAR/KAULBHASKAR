import { useEffect, useRef } from "react";

interface AudioPlayerProps {
  isPlaying: boolean;
}

export default function AudioPlayer({ isPlaying }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Optimization: Directly interact with DOM to avoid React render cycles
    if (isPlaying) {
      audioRef.current?.play().catch((err) => {
        // Handle common "Autoplay" browser blocks gracefully
        console.info("Playback prevented by browser until user interaction:", err);
      });
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying]);

  return (
    // Preload="auto" is safe here because this component only loads 
    // after the user clicks the play button in your Navbar.
    <audio 
      ref={audioRef} 
      src="/audio/loop.mp3" 
      loop 
      preload="auto" 
      className="hidden"
    />
  );
}
