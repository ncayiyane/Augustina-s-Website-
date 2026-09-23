import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Facebook,
  Heart,
  Instagram,
  Mail,
  Menu,
  MessageCircle,
  Phone,
  Star,
  X,
} from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';
import { useCountUp } from '@/hooks/useCountUp';
import WeddingsGallery from './galleries/WeddingsGallery';
import GraduationsGallery from './galleries/GraduationsGallery';
import CelebrationsGallery from './galleries/CelebrationsGallery';
import MemorialsGallery from './galleries/MemorialsGallery';
import ImigidiGallery from './galleries/ImigidiGallery';
import EventsGallery from './galleries/EventsGallery';
import VideosGallery from './galleries/VideosGallery';

const images = {
  hero: '/pictures/Deco1.jpeg',
  wedding: '/pictures/weddings/Traditional Wedding/Traditional_Wedding_15.jpeg',
  graduation: '/pictures/graduations/Graduation1.jpeg',
  party: '/pictures/celebrations/Celebration11.jpeg',
  memorial: '/pictures/memorials/Funeral1.jpeg',
  field: '/pictures/weddings/White%20Wedding/White_Wedding_2.jpeg',
  imigidi: '/pictures/Imigidi/Umgidi1.jpeg',
  events: '/pictures/Events/Event1.jpeg',
  Videos: '/Videos/Video1.mp4',
};


const packages = [
  { name: 'Special Pictures', price: 'R700', detail: '15 pictures · 5 retouched', note: 'A thoughtful set for a beautiful moment.' },
  { name: '30 Minutes', price: 'R900', detail: '25 pictures · 1 location · no outfit change', note: 'Quick, relaxed and full of personality.' },
  { name: '1 Hour', price: 'R1 200', detail: '35 pictures · 3 retouched', note: 'Our easy favourite for portraits and milestones.' },
  { name: '3 Hours', price: 'R2 500', detail: '60 pictures · 5 retouched · 1 reel', note: 'Space to tell the whole story.' },
  { name: '5 Hours', price: 'R4 500', detail: 'Unlimited pictures · 10 retouched · 1 reel', note: 'For celebrations that deserve the full day.' },
  { name: 'Day Package', price: 'R6 000', detail: '8–9 hours · unlimited pictures · 15 retouched', note: 'Beautiful coverage, delivered via link.' },
  { name: 'Full Day', price: 'R9 000', detail: '8–9 hours · video + photography', note: '1 videographer and 1 photographer included.' },
  { name: 'Premium Full Day', price: 'R13 000', detail: '8–9 hours · canvas + photobook', note: 'The complete Augustine Pictures experience.' },
];

const occasions: Array<{ title: string; image: string; description: string; isVideo?: boolean }> = [
  { title: 'Weddings', image: images.wedding, description: 'The quiet glances, loud laughter and every in-between.' },
  { title: 'Graduations', image: images.graduation, description: 'A proud chapter, captured with the joy it deserves.' },
  { title: 'Imigidi', image: images.imigidi, description: 'Traditional ceremonies, cultural pride and timeless moments.' },
  { title: 'Events', image: images.events, description: 'Corporate gatherings, conferences and special occasions.' },
  { title: 'Celebrations', image: images.party, description: 'Big energy, beautiful people and the moments you miss.' },
  { title: 'Memorials', image: images.memorial, description: 'A gentle, respectful record of a life well remembered.' },
  { title: 'Videos', image: images.Videos, description: 'Moving stories captured in motion and emotion.', isVideo: true },
];

const testimonials = [
  { quote: 'Augustine made us feel so comfortable. When we received our photos, we laughed, cried, and relived the whole day all over again.', name: 'Thando & Kamo', role: 'Wedding couple' },
  { quote: 'Every single detail was thought of. The gallery felt like a film — we didn’t just see the day, we felt it again.', name: 'Lerato M.', role: 'Graduation, University of Pretoria' },
  { quote: 'Dignified, calm and deeply respectful. The memorial images gave our family something to hold onto forever.', name: 'The Dlamini Family', role: 'Memorial service' },
];

function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }: { children: React.ReactNode; className?: string; delay?: number; as?: React.ElementType }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <Tag
      ref={ref}
      className={`${className} reveal ${visible ? 'reveal-in' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

function StatCounter({ value, suffix = '', label }: { value: number; suffix?: string; label: string }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const count = useCountUp(value, 1800, visible);
  return (
    <div ref={ref} className="stat-item">
      <strong>{count}{suffix}</strong>
      <span>{label}</span>
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [heroParallax, setHeroParallax] = useState(0);
  const [currentGallery, setCurrentGallery] = useState<'weddings' | 'graduations' | 'celebrations' | 'memorials' | 'imigidi' | 'events' | 'videos' | null>(null);
  const [savedScrollPosition, setSavedScrollPosition] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      setHeroParallax(window.scrollY * 0.4);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const nextTestimonial = () => setActiveTestimonial((p) => (p + 1) % testimonials.length);
  const prevTestimonial = () => setActiveTestimonial((p) => (p - 1 + testimonials.length) % testimonials.length);

  const openGallery = (category: 'weddings' | 'graduations' | 'celebrations' | 'memorials' | 'imigidi' | 'events' | 'videos') => {
    setSavedScrollPosition(window.scrollY);
    setCurrentGallery(category);
  };

  const closeGallery = () => {
    setCurrentGallery(null);
    setTimeout(() => {
      window.scrollTo({ top: savedScrollPosition, behavior: 'instant' });
    }, 100);
  };

  return (
    <div className="site-shell">
      {currentGallery === 'weddings' ? (
        <WeddingsGallery onBack={closeGallery} />
      ) : currentGallery === 'graduations' ? (
        <GraduationsGallery onBack={closeGallery} />
      ) : currentGallery === 'celebrations' ? (
        <CelebrationsGallery onBack={closeGallery} />
      ) : currentGallery === 'memorials' ? (
        <MemorialsGallery onBack={closeGallery} />
      ) : currentGallery === 'imigidi' ? (
        <ImigidiGallery onBack={closeGallery} />
      ) : currentGallery === 'events' ? (
        <EventsGallery onBack={closeGallery} />
      ) : currentGallery === 'videos' ? (
        <VideosGallery onBack={closeGallery} />
      ) : (
        <>
          <header className={`topbar ${scrolled ? 'scrolled' : ''}`}>
        <button className="brand" onClick={() => scrollTo('home')} aria-label="Augustine Pictures home">
          <span className="brand-mark">A</span>
          <span><strong>Augustine</strong><em>Pictures</em></span>
        </button>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
          <button onClick={() => scrollTo('work')}>Our work</button>
          <button onClick={() => scrollTo('packages')}>Packages</button>
          <button onClick={() => scrollTo('about')}>About us</button>
          <button className="nav-book" onClick={() => scrollTo('contact')}>Get in touch <ArrowRight size={15} /></button>
        </nav>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-image" style={{ backgroundImage: `url(${images.hero})`, transform: `translateY(${heroParallax}px) scale(1.1)` }} />
          <div className="hero-overlay" />
          <div className="hero-copy">
            <p className="eyebrow light reveal-hero" style={{ '--delay': '0ms' } as React.CSSProperties}>For the moments that matter</p>
            <h1 className="reveal-hero" style={{ '--delay': '120ms' } as React.CSSProperties}>Stories worth<br /><i>remembering.</i></h1>
            <p className="hero-text reveal-hero" style={{ '--delay': '260ms' } as React.CSSProperties}>We turn your real, remarkable moments into photographs you’ll feel for years to come.</p>
            <div className="hero-actions reveal-hero" style={{ '--delay': '400ms' } as React.CSSProperties}>
              <button className="button gold" onClick={() => scrollTo('contact')}>Book your shoot <ArrowRight size={17} /></button>
              <button className="text-button" onClick={() => scrollTo('work')}>Explore our work <ArrowRight size={17} /></button>
            </div>
          </div>
          <div className="hero-note reveal-hero" style={{ '--delay': '560ms' } as React.CSSProperties}><span>01</span><div><strong>Augustine Pictures</strong><small>Photo · Video · Memories</small></div></div>
          <div className="scroll-hint"><span /> Scroll to explore</div>
        </section>

        <section className="intro section-pad" id="about">
          <Reveal className="intro-stamp"><span>EST.</span><strong>2018</strong><small>South Africa</small></Reveal>
          <div className="intro-copy">
            <Reveal><p className="eyebrow"><span /> The Augustine approach</p></Reveal>
            <Reveal delay={80}><h2>Not just a picture.<br /><i>A piece of your story.</i></h2></Reveal>
            <Reveal delay={160}><p>From the first proud tear to the last dance of the night, Augustine Pictures is here to preserve what words cannot. We photograph life with warmth, intention and a little bit of magic.</p></Reveal>
            <Reveal delay={240}><button className="underlined" onClick={() => scrollTo('contact')}>Let’s create something meaningful <ArrowRight size={16} /></button></Reveal>
          </div>
          <div className="intro-stats">
            <StatCounter value={6} suffix="+" label="years capturing your memories" />
            <StatCounter value={200} suffix="+" label="stories told with heart" />
          </div>
        </section>

        <section className="work section-pad" id="work">
          <div className="section-heading">
            <Reveal><div><p className="eyebrow"><span /> What we capture</p><h2>Life, <i>beautifully</i><br />documented.</h2></div></Reveal>
            <Reveal delay={120}><p className="heading-aside">Every occasion has its own rhythm. We meet it where it is, and capture the feeling—not just the frame.</p></Reveal>
          </div>
          <div className="occasion-grid">
            {occasions.map((occasion, index) => (
              <Reveal
                key={occasion.title}
                className={`occasion-card card-${index + 1}`}
                delay={index * 120}
              >
                {occasion.isVideo ? (
                  <video src={occasion.image} muted loop autoPlay playsInline className="occasion-video" />
                ) : (
                  <img src={occasion.image} alt={occasion.title} />
                )}
                <div className="card-shade" />
                <div className="card-copy">
                  <span>0{index + 1}</span>
                  <h3>{occasion.title}</h3>
                  <p>{occasion.description}</p>
                  <button
                    className="card-arrow-btn"
                    onClick={() => {
                      const categoryMap: Record<string, 'weddings' | 'graduations' | 'celebrations' | 'memorials' | 'imigidi' | 'events' | 'videos'> = {
                        'Weddings': 'weddings',
                        'Graduations': 'graduations',
                        'Celebrations': 'celebrations',
                        'Memorials': 'memorials',
                        'Imigidi': 'imigidi',
                        'Events': 'events',
                        'Videos': 'videos',
                      };
                      openGallery(categoryMap[occasion.title]);
                    }}
                    aria-label={`View ${occasion.title} gallery`}
                  >
                    <ArrowRight size={20} />
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="quote-band">
          <Reveal className="quote-inner">
            <div className="quote-mark">“</div>
            <blockquote>Photography is how we hold<br /><i>time still.</i></blockquote>
            <div className="quote-line" />
          </Reveal>
        </section>

        <section className="packages section-pad" id="packages">
          <div className="section-heading">
            <Reveal><div><p className="eyebrow"><span /> Packages & pricing</p><h2>Choose the way<br />you want to <i>remember.</i></h2></div></Reveal>
            <Reveal delay={120}><p className="heading-aside">Whether it’s thirty minutes or the whole day, we make beautiful photography feel simple.</p></Reveal>
          </div>
          <div className="package-grid">
            {packages.map((pack, index) => (
              <Reveal
                key={pack.name}
                className={`package-card ${index === 5 ? 'featured' : ''}`}
                delay={(index % 4) * 90}
              >
                {index === 5 && <span className="popular">Most booked</span>}
                <span className="package-number">0{index + 1}</span>
                <h3>{pack.name}</h3>
                <strong>{pack.price}</strong>
                <p>{pack.detail}</p>
                <small>{pack.note}</small>
                <button onClick={() => scrollTo('contact')}>Enquire about this package <ArrowRight size={15} /></button>
              </Reveal>
            ))}
          </div>
          <Reveal><p className="package-footnote">All packages include a private online gallery. A booking is confirmed once your date and details have been discussed with our team.</p></Reveal>
        </section>

        <section className="testimonial section-pad">
          <Reveal className="testimonial-image-wrap">
            <div className="testimonial-image" style={{ backgroundImage: `url(${images.field})` }} />
            <div className="testimonial-image-overlay"><Camera size={28} /></div>
          </Reveal>
          <div className="testimonial-content">
            <Reveal><p className="eyebrow"><span /> Kind words</p></Reveal>
            <Reveal delay={80}><div className="stars">{[1, 2, 3, 4, 5].map((star) => <Star key={star} size={16} fill="currentColor" />)}</div></Reveal>
            <div className="testimonial-slider">
              {testimonials.map((t, index) => (
                <blockquote
                  key={index}
                  className={`testimonial-slide ${index === activeTestimonial ? 'active' : ''}`}
                >
                  {t.quote}
                  <p className="testimonial-name">— {t.name}, <i>{t.role}</i></p>
                </blockquote>
              ))}
            </div>
            <div className="testimonial-nav">
              <span>0{activeTestimonial + 1} / 0{testimonials.length}</span>
              <div>
                <button onClick={prevTestimonial} aria-label="Previous testimonial"><ArrowLeft size={16} /></button>
                <button onClick={nextTestimonial} aria-label="Next testimonial"><ArrowRight size={16} /></button>
              </div>
            </div>
          </div>
        </section>

        <section className="contact section-pad" id="contact">
          <Reveal><div><p className="eyebrow light"><span /> Let’s make something last</p><h2>Your next chapter<br />starts <i>here.</i></h2></div></Reveal>
          <Reveal delay={120}><div className="contact-details">
            <p>Tell us what you’re celebrating, and we’ll take care of the rest.</p>
            <button className="button gold" onClick={() => window.location.href = 'mailto:hello@augustinepictures.co.za'}>Start a conversation <ArrowRight size={17} /></button>
            <div className="direct">
              <a href="tel:0631709924"><Phone size={16} /> 063 927 9987</a>
              <a href="https://wa.me/27812802554"><MessageCircle size={16} /> WhatsApp us</a>
            </div>
          </div></Reveal>
        </section>
      </main>

      <footer className="footer">
        <div className="brand footer-brand"><span className="brand-mark">A</span><span><strong>Augustine</strong><em>Pictures</em></span></div>
        <p>Photo · Video · Memories</p>
        <div className="footer-social">
          <a href="https://www.instagram.com/augustinepictures/?hl=en" aria-label="Instagram"><Instagram size={18} /></a>
          <a href="https://www.facebook.com/anearstupdates" aria-label="Facebook"><Facebook size={18} /></a>
          <a href="https://wa.me/27812802554" aria-label="WhatsApp"><MessageCircle size={18} /></a>
          <span>© 2026 Augustine Pictures</span>
        </div>
      </footer>
        </>
      )}
    </div>
  );
}

export default App;
