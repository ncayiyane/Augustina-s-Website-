import { useState, useEffect } from 'react';
import { X, ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryProps {
  title: string;
  images: string[];
  onBack: () => void;
}

export default function Gallery({ title, images, onBack }: GalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev' | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

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

  const nextImage = () => {
    setDirection('next');
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setDirection('prev');
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className={`gallery-container ${isLoaded ? 'gallery-loaded' : ''}`}>
      <div className="gallery-header">
        <button className="gallery-back" onClick={onBack}>
          <ArrowLeft size={18} /> Back
        </button>
        <h1 className="gallery-title">{title}</h1>
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
            src={images[currentIndex]} 
            alt={`${title} ${currentIndex + 1}`} 
            className={`gallery-image ${direction ? `slide-${direction}` : ''}`}
            onAnimationEnd={() => setDirection(null)}
          />
          <div className="gallery-image-info">
            <span className="gallery-counter-badge">
              {currentIndex + 1} <span className="counter-divider">/</span> {images.length}
            </span>
          </div>
        </div>
        
        <button 
          onClick={nextImage} 
          className="gallery-nav-btn gallery-nav-right"
          aria-label="Next image"
        >
          <ChevronRight size={36} />
        </button>
      </div>
      
      <div className="gallery-thumbnails">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 'next' : 'prev');
              setCurrentIndex(index);
            }}
            className={`gallery-thumbnail ${index === currentIndex ? 'active' : ''}`}
            aria-label={`View image ${index + 1}`}
          >
            <img src={image} alt={`Thumbnail ${index + 1}`} loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  );
}
