"use client"; // needed for interactivity

import { useEffect, useRef, useState } from "react";

interface CarouselProps {
  images: string[];
}

export default function Carousel({ images }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Scroll to the current slide
  useEffect(() => {
    if (carouselRef.current) {
      const scrollLeft = carouselRef.current.clientWidth * currentIndex;
      carouselRef.current.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, [currentIndex]);

  return (
    <div className="relative w-full overflow-hidden">
      <div
        ref={carouselRef}
        className="flex w-full snap-x snap-mandatory scroll-smooth overflow-x-auto"
      >
        {images.map((src, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 snap-start"
          >
            <img
              src={src}
              alt={`Slide ${idx + 1}`}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}