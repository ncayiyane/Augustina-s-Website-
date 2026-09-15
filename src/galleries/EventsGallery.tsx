import { useState, useEffect, useRef } from 'react';
import { X, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

const eventsImages = [
  '/pictures/Events/Event1.jpeg',
  '/pictures/Events/Event2.jpeg',
  '/pictures/Events/Event3.jpeg',
  '/pictures/Events/Event4.jpeg',
  '/pictures/Events/Event6.jpeg',
];

interface EventsGalleryProps {
  onBack: () => void;
}

export default function EventsGallery({ onBack }: EventsGalleryProps) {
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
    setCurrentIndex((prev) => (prev + 1) % eventsImages.length);
  };

  const prevImage = () => {
    setDirection('prev');
    setCurrentIndex((prev) => (prev - 1 + eventsImages.length) % eventsImages.length);
  };

  return (
    <div 
      className={`gallery-container events-gallery ${isLoaded ? 'gallery-loaded' : ''}`}
      onClick={handleInteraction}
      onTouchStart={handleInteraction}
    >
      <div className={`gallery-header ${!headerVisible ? 'hidden' : ''}`}>
        <button className="gallery-back" onClick={onBack}>
          <ArrowLeft size={18} /> Back
        </button>
        <h1 className="gallery-title">Events</h1>
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
            src={eventsImages[currentIndex]} 
            alt={`Event ${currentIndex + 1}`} 
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
