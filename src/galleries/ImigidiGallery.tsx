import { useState, useEffect, useRef } from 'react';
import { X, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

const imigidiImages = [
  '/pictures/Imigidi/Umgidi1.jpeg',
  '/pictures/Imigidi/Umgidi.jpeg',
  '/pictures/Imigidi/Umgidi2.jpeg',
  '/pictures/Imigidi/Umgidi3.jpeg',
  '/pictures/Imigidi/Umgidi4.jpeg',
  '/pictures/Imigidi/Umgidi5.jpeg',
  '/pictures/Imigidi/Umgidi6.jpeg',
  '/pictures/Imigidi/Umgidi7.jpeg',
  '/pictures/Imigidi/Umgidi8.jpeg',
  '/pictures/Imigidi/Umgidi9.jpeg',
  '/pictures/Imigidi/Umgidi10.jpeg',
  '/pictures/Imigidi/Umgidi11.jpeg',
  '/pictures/Imigidi/Umgidi12.jpeg',
  '/pictures/Imigidi/Umgidi13.jpeg',
  '/pictures/Imigidi/Umgidi14.jpeg',
  '/pictures/Imigidi/Umgidi15.jpeg',
  '/pictures/Imigidi/Umgidi16.jpeg',
  '/pictures/Imigidi/Umgidi17.jpeg',
  '/pictures/Imigidi/Umgidi18.jpeg',
  '/pictures/Imigidi/Umgidi19.jpeg',
  '/pictures/Imigidi/Umgidi20.jpeg',
  '/pictures/Imigidi/Umgidi21.jpeg',
  '/pictures/Imigidi/Umgidi22.jpeg',
  '/pictures/Imigidi/Umgidi23.jpeg',
  '/pictures/Imigidi/Umgidi24.jpeg',
  '/pictures/Imigidi/Umgidi25.jpeg',
  '/pictures/Imigidi/Umgidi26.jpeg',
  '/pictures/Imigidi/Umgidi27.jpeg',
  '/pictures/Imigidi/Umgidi28.jpeg',
  '/pictures/Imigidi/Umgidi29.jpeg',
];

interface ImigidiGalleryProps {
  onBack: () => void;
}

export default function ImigidiGallery({ onBack }: ImigidiGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev' | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const hideTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    setIsLoaded(true);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'Escape') onBack();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showHeader = () => {
    setHeaderVisible(true);
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    hideTimeoutRef.current = window.setTimeout(() => {
      setHeaderVisible(false);
    }, 3000);
  };

  const handleInteraction = () => {
    showHeader();
  };

  useEffect(() => {
    showHeader();
    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  const nextImage = () => {
    setDirection('next');
    setCurrentIndex((prev) => (prev + 1) % imigidiImages.length);
  };

  const prevImage = () => {
    setDirection('prev');
    setCurrentIndex((prev) => (prev - 1 + imigidiImages.length) % imigidiImages.length);
  };

  return (
    <div 
      className={`gallery-container imigidi-gallery ${isLoaded ? 'gallery-loaded' : ''}`}
      onClick={handleInteraction}
      onTouchStart={handleInteraction}
    >
      <div className={`gallery-header ${!headerVisible ? 'hidden' : ''}`}>
        <button className="gallery-back" onClick={onBack} aria-label="Back">
          <ArrowLeft size={18} />
        </button>
        <h1 className="gallery-title">Imigidi</h1>
        <button className="gallery-close" onClick={onBack} aria-label="Close gallery">
          <X size={22} />
        </button>
      </div>
      
      <div className="gallery-main">
        <button 
          onClick={prevImage} 
          className="gallery-nav-btn gallery-nav-left"
          aria-label="Previous image"
        >
          <ChevronLeft size={36} />
        </button>
        
        <div className="gallery-image-wrapper">
          <img 
            key={currentIndex}
            src={imigidiImages[currentIndex]} 
            alt={`Imigidi ${currentIndex + 1}`} 
            className={`gallery-image ${direction ? `slide-${direction}` : ''}`}
            onAnimationEnd={() => setDirection(null)}
          />
        </div>
        
        <button 
          onClick={nextImage} 
          className="gallery-nav-btn gallery-nav-right"
          aria-label="Next image"
        >
          <ChevronRight size={36} />
        </button>
      </div>
    </div>
  );
}
