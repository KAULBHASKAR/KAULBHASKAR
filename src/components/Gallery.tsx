import { useRef, useState } from "react";
import type { ReactNode, MouseEvent, FC } from "react";

interface BentoTiltProps {
  children: ReactNode;
  className?: string;
}

const BentoTilt: FC<BentoTiltProps> = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState<string>("");
  const itemRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!itemRef.current) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    const rotateX = (clientY / innerHeight) * 20;
    const rotateY = (clientX / innerWidth) * -20;
    setTransformStyle(`rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
  };

  const handleMouseLeave = () => setTransformStyle("");

  return (
    <div
      className={className}
      ref={itemRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        transition: "transform 0.3s ease-out",
      }}
    >
      {children}
    </div>
  );
};

interface BentoCardProps {
  src: string;
  title?: ReactNode;
  description?: string;
}

const BentoCard: FC<BentoCardProps> = ({ src, title, description }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const isYouTube = src.includes("youtube.com") || src.includes("youtu.be");
  const isImage = /\.(jpeg|jpg|png|gif|webp)$/i.test(src);

  const getYouTubeEmbedUrl = (url: string): string => {
    let cleanUrl = url;
    if (url.includes("watch?v=")) {
      cleanUrl = url.replace("watch?v=", "embed/");
    } else if (url.includes("youtu.be")) {
      const videoId = url.split("youtu.be/")[1];
      cleanUrl = `https://www.youtube.com/embed/${videoId}`;
    }
    return `${cleanUrl}?autoplay=1`;
  };

  // Modified: load thumbnails from public/img folder
  const getYouTubeThumbnail = (url: string): string => {
    let videoId = "";
    if (url.includes("watch?v=")) {
      videoId = url.split("watch?v=")[1].split("&")[0];
    } else if (url.includes("youtu.be")) {
      videoId = url.split("youtu.be/")[1];
    }
    // Ensure you have /public/img/{videoId}.jpg or .webp files
    return `/img/${videoId}.webp`;
  };

  return (
    <div className="relative w-full">
      {isYouTube ? (
        isPlaying ? (
          <iframe
            src={getYouTubeEmbedUrl(src)}
            title={typeof title === "string" ? title : "YouTube video"}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-auto aspect-video"
          />
        ) : (
          <img
            src={getYouTubeThumbnail(src)}
            alt={typeof title === "string" ? title : "YouTube thumbnail"}
            className="w-full h-auto object-contain bg-black"
          />
        )
      ) : isImage ? (
        <img
          src={src}
          alt={typeof title === "string" ? title : "Gallery image"}
          className="w-full h-auto object-contain bg-black"
        />
      ) : (
        <video
          src={src}
          loop
          autoPlay
          playsInline
          muted
          className="w-full h-auto object-contain bg-black"
        />
      )}

      <div className="relative z-10 flex flex-col justify-between p-5 text-red-500">
        <div className="bento-title special-font">
          {title}
          {description && (
            <p className="mt-3 max-w-64 wrap-break-word text-xs md:text-base text-yellow-400">
              {description}
            </p>
          )}
        </div>

        {isYouTube && (
          <button
            onClick={() => setIsPlaying((prev) => !prev)}
            className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-md text-sm transition-colors hover:bg-black/90"
          >
            {isPlaying ? "⏸ Pause" : "▶ Play"}
          </button>
        )}
      </div>
    </div>
  );
};

const Gallery: FC = () => {
  const mediaItems = [
    "https://youtu.be/KJn2Leu8yVo",
    "https://youtu.be/WhknjROROXM",
    "https://youtu.be/ht_cYcnxlSQ",
    "https://youtu.be/XJPMQzTKq0g",
    "/img/Vindhyachal1.webp",
    "/img/Vindhyachal2.webp",
    "/img/Vindhyachal3.webp",
    "/img/img-2.webp",
  ];

  return (
    <section className="bg-black">
      <div className="container mx-auto px-3 md:px-10">
        <div className="px-5 py-32">
          <p className="special-font hero-heading bg-linear-to-r from-red-500 via-green-400 to-pink-500 bg-clip-text text-transparent text-lg">
            g<b>a</b>ll<b>er</b>y
          </p>
        </div>

        <div className="grid h-auto grid-cols-1 md:grid-cols-2 gap-5">
          {mediaItems.map((src, i) => (
            <BentoTilt
              key={i}
              className="border-hsl relative mb-7 w-full overflow-hidden rounded-md"
            >
              <BentoCard src={src} />
            </BentoTilt>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
