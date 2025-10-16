import React, { useState, useEffect } from 'react';

const ImageSlider = () => {
  // --- STATE ---
  // Store the index of the current active slide
  const [currentIndex, setCurrentIndex] = useState(0);

  // --- DATA ---
  // Arrays of images for mobile and desktop
  const mobileSlides = [
    { url: '/images/banner8.jpg' },
    { url: 'images/banner9.jpg' },
    { url: 'images/banner7.jpg' },
  ];

  const laptopSlides = [
    { url: 'images/banner1.jpg' },
    { url: 'images/banner2.jpg' },
    { url: 'images/banner3.jpg' },
  ];
  
  // Combine for easy access, assuming laptop slides are primary for navigation logic
  const slides = laptopSlides;

  // --- HANDLERS ---
  // Go to the previous slide
  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  // Go to the next slide
  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  // Go to a specific slide by its index
  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };
  
  // --- AUTO-SLIDE EFFECT (for mobile) ---
  useEffect(() => {
    // Set an interval to advance the slide every 3 seconds
    const autoSlideInterval = setInterval(() => {
      // We use the functional form of setState to get the latest state
      setCurrentIndex((prevIndex) => 
        prevIndex === mobileSlides.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change slide every 3 seconds

    // Clear the interval when the component unmounts to prevent memory leaks
    return () => clearInterval(autoSlideInterval);
  }, [mobileSlides.length]); // Dependency array ensures effect runs only once

  // --- RENDER ---
  return (
    <div className="relative w-full overflow-hidden h-[30vh] lg:h-[50vh] rounded-lg">
      
      {/* Mobile Slides */}
      <div 
        className="flex transition-transform duration-700 ease-in-out lg:hidden"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {mobileSlides.map((slide, index) => (
          <div key={`mobile-${index}`} className="w-full flex-shrink-0">
            <img src={slide.url} className="w-full h-[25vh] object-cover" alt={`Mobile Slide ${index + 1}`} />
          </div>
        ))}
      </div>

      {/* Laptop Slides */}
      <div 
        className="hidden transition-transform duration-700 ease-in-out lg:flex"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {laptopSlides.map((slide, index) => (
          <div key={`laptop-${index}`} className="w-full flex-shrink-0">
            <img src={slide.url} className="w-full h-[50vh] object-cover" alt={`Laptop Slide ${index + 1}`} />
          </div>
        ))}
      </div>

      {/* Navigation buttons (only laptop) */}
      <button 
        onClick={prevSlide}
        className="magnet absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 p-2 rounded-full "
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button 
        onClick={nextSlide}
        className="magnet absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 p-2 rounded-full"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot indicators (only laptop) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2  lg:flex space-x-2">
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`cursor-pointer h-2 w-2 rounded-full transition-all duration-300 ${
              currentIndex === slideIndex ? 'bg-white w-4' : 'bg-white/50'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;