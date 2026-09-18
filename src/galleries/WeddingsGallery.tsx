import { useState, useEffect, useRef } from 'react';
import { X, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

const traditionalWeddingsImages = [
  '/pictures/weddings/Traditional%20Wedding/Traditional_Wedding_7.jpeg',
  '/pictures/weddings/Traditional%20Wedding/Traditional_Wedding_1.jpeg',
  '/pictures/weddings/Traditional%20Wedding/Traditional_Wedding_2.jpeg',
  '/pictures/weddings/Traditional%20Wedding/Traditional_Wedding_3.jpeg',
  '/pictures/weddings/Traditional%20Wedding/Traditional_Wedding_4.jpeg',
  '/pictures/weddings/Traditional%20Wedding/Traditional_Wedding_5.jpeg',
  '/pictures/weddings/Traditional%20Wedding/Traditional_Wedding_6.jpeg',
  '/pictures/weddings/Traditional%20Wedding/Traditional_Wedding_8.jpeg',
  '/pictures/weddings/Traditional%20Wedding/Traditional_Wedding_9.jpeg',
  '/pictures/weddings/Traditional%20Wedding/Traditional_Wedding_10.jpeg',
  '/pictures/weddings/Traditional%20Wedding/Traditional_Wedding_11.jpeg',
  '/pictures/weddings/Traditional%20Wedding/Traditional_Wedding_12.jpeg',
  '/pictures/weddings/Traditional%20Wedding/Traditional_Wedding_13.jpeg',
  '/pictures/weddings/Traditional%20Wedding/Traditional_Wedding_14.jpeg',
  '/pictures/weddings/Traditional%20Wedding/Traditional_Wedding_15.jpeg',
  '/pictures/weddings/Traditional%20Wedding/Traditional_Wedding_16.jpeg',
  '/pictures/weddings/Traditional%20Wedding/Traditional_Wedding_17.jpeg',
  '/pictures/weddings/Traditional%20Wedding/Traditional_Wedding_18.jpeg',
  '/pictures/weddings/Traditional%20Wedding/Traditional_Wedding_19.jpeg',
  '/pictures/weddings/Traditional%20Wedding/Traditional_Wedding_20.jpeg',
  '/pictures/weddings/Traditional%20Wedding/Traditional_Wedding_21.jpeg',
  '/pictures/weddings/Traditional%20Wedding/Traditional_Wedding_22.jpeg',

];

const whiteWeddingsImages = [
  '/pictures/weddings/White%20Wedding/White_Wedding_13.jpeg',
  '/pictures/weddings/White%20Wedding/White_Wedding_1.jpeg',
  '/pictures/weddings/White%20Wedding/White_Wedding_2.jpeg',
  '/pictures/weddings/White%20Wedding/White_Wedding_3.jpeg',
  '/pictures/weddings/White%20Wedding/White_Wedding_4.jpeg',
  '/pictures/weddings/White%20Wedding/White_Wedding_5.jpeg',
  '/pictures/weddings/White%20Wedding/White_Wedding_6.jpeg',
  '/pictures/weddings/White%20Wedding/White_Wedding_7.jpeg',
  '/pictures/weddings/White%20Wedding/White_Wedding_8.jpeg',
  '/pictures/weddings/White%20Wedding/White_Wedding_9.jpeg',
  '/pictures/weddings/White%20Wedding/White_Wedding_10.jpeg',
  '/pictures/weddings/White%20Wedding/White_Wedding_11.jpeg',
  '/pictures/weddings/White%20Wedding/White_Wedding_12.jpeg',
  '/pictures/weddings/White%20Wedding/White_Wedding_14.jpeg',
];

interface WeddingsGalleryProps {
  onBack: () => void;
}

export default function WeddingsGallery({ onBack }: WeddingsGalleryProps) {
  const [weddingType, setWeddingType] = useState<'traditional' | 'white' | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev' | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const hideTimeoutRef = useRef<number | null>(null);
  const touchStartX = useRef<number>(0);

  const currentImages = weddingType === 'traditional' ? traditionalWeddingsImages : whiteWeddingsImages;

  useEffect(() => {
    setIsLoaded(true);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'Escape') {
        if (weddingType) {
          setWeddingType(null);
        } else {
          onBack();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [weddingType]);

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

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextImage();
      } else {
        prevImage();
      }
    }
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
    setCurrentIndex((prev) => (prev + 1) % currentImages.length);
  };

  const prevImage = () => {
    setDirection('prev');
    setCurrentIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length);
  };

  if (!weddingType) {
    return (
      <div className={`gallery-container weddings-gallery ${isLoaded ? 'gallery-loaded' : ''}`}>
        <div className={`gallery-header ${!headerVisible ? 'hidden' : ''}`}>
          <button className="gallery-back" onClick={onBack} aria-label="Back">
            <ArrowLeft size={18} />
          </button>
          <h1 className="gallery-title">Weddings</h1>
          <button className="gallery-close" onClick={onBack} aria-label="Close gallery">
            <X size={22} />
          </button>
        </div>
        
        <div className="gallery-main wedding-type-selection">
          <button 
            className="wedding-type-card"
            onClick={() => setWeddingType('traditional')}
            onClickCapture={handleInteraction}
          >
            <img src={traditionalWeddingsImages[0]} alt="Traditional Wedding" />
            <div className="wedding-type-overlay">
              <h2>Traditional Wedding</h2>
              <p>Cultural ceremonies & traditional attire</p>
            </div>
          </button>
          
          <button 
            className="wedding-type-card"
            onClick={() => setWeddingType('white')}
            onClickCapture={handleInteraction}
          >
            <img src={whiteWeddingsImages[0]} alt="White Wedding" />
            <div className="wedding-type-overlay">
              <h2>White Wedding</h2>
              <p>Modern ceremonies & elegant celebrations</p>
            </div>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`gallery-container weddings-gallery ${isLoaded ? 'gallery-loaded' : ''}`}
      onClick={handleInteraction}
      onTouchStart={handleInteraction}
    >
      <div className={`gallery-header ${!headerVisible ? 'hidden' : ''}`}>
        <button className="gallery-back" onClick={() => setWeddingType(null)} aria-label="Back">
          <ArrowLeft size={18} />
        </button>
        <h1 className="gallery-title">{weddingType === 'traditional' ? 'Traditional Wedding' : 'White Wedding'}</h1>
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

        <div
          className="gallery-image-wrapper"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <img
            key={currentIndex}
            src={currentImages[currentIndex]}
            alt={`${weddingType === 'traditional' ? 'Traditional' : 'White'} Wedding ${currentIndex + 1}`}
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
