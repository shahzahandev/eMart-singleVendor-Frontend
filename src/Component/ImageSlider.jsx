import { useState, useEffect, useCallback, useRef } from "react";
import { IoMdArrowDroprightCircle, IoMdArrowDropleftCircle } from "react-icons/io";

import callsImg from "../assets/banner-mian-m.webp";
import musicImg from "../assets/banner-main-file.png";
import gamerImg from "../assets/air-anc.png";
import travelImg from "../assets/prime-pro-anc.png";
import focusImg from "../assets/prime-navy-pc.png";

 const SLIDES = [
   { id: 1, image: gamerImg, alt: "GAMER" },
   { id: 2, image: musicImg, alt: "MUSIC" },
   { id: 3, image: travelImg, alt: "TRAVEL" },
   { id: 4, image: focusImg, alt: "FOCUS" },
   { id: 5, image: callsImg, alt: "CALLS" },
 ];

export default function ImageSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(null);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % SLIDES.length);
  }, []);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 2000);
    return () => clearInterval(timer);
  }, [paused, next]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta > 50) prev();
    else if (delta < -50) next();
    touchStartX.current = null;
  };

  return (
    <div
      className="relative w-full overflow-hidden select-none bg-slate-200"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative aspect-[3/2.75] sm:aspect-[3/1.75] lg:aspect-[3/1] w-full">
        {SLIDES.map((slide, i) => (
          <img
            key={slide.id}
            src={slide.image}
            alt={slide.alt}
            className={`absolute inset-0 h-full w-full md:object-cover object-fill transition-opacity duration-700 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Prev / Next arrows */}
    
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/25 text-white backdrop-blur hover:bg-white/40 transition-colors"
      >
        <IoMdArrowDropleftCircle />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/25 text-white backdrop-blur hover:bg-white/40 transition-colors"
      >
    
      <IoMdArrowDroprightCircle />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full transition-all ${
              i === index ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
