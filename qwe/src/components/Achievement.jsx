import React, { useState } from "react";

const Achievement = () => {
  const [stopScroll, setStopScroll] = useState(false);

  const cardData = [
    {
     
      image:
        "images/cert1.jpg",
    },
    {

      image:
        "images/cert4.jpg",
    },
    {
    
      image:
        "images/cert3.jpg",
    },
    {
     
      image:
        "images/cert5.jpg",
    },
  ];

  return (
    <>
<h1 className='relative group big text-3xl lg:text-6xl ml-8 lg:ml-20 mt-10 text-center' id="achievement">OUR ACHIEVEMENT
     
</h1>
  
  
      {/* Animation CSS */}
      <style>{`
        .marquee-inner {
          animation: marqueeScroll linear infinite;
        }
        @keyframes marqueeScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <div
        className="overflow-hidden w-full relative max-w-6xl mx-auto mt-10"
        onMouseEnter={() => setStopScroll(true)}
        onMouseLeave={() => setStopScroll(false)}
      >
        {/* Left Fade Effect */}
        <div className="absolute left-0 top-0 h-full w-20 md:w-32 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent " />

        {/* Marquee */}
        <div
          className="marquee-inner flex w-fit"
          style={{
            animationPlayState: stopScroll ? "paused" : "running",
            animationDuration: `${cardData.length * 2500}ms`,
          }}
        >
          {/* Duplicate cards for infinite loop */}
          {[...cardData, ...cardData].map((card, index) => (
            <div
              key={index}
              className="w-56 mx-4 h-[20rem] relative group hover:scale-95 transition-all duration-300"
            >
              <img
                src={card.image}
               
                className="w-full h-full object-cover rounded-lg shadow-md "
              />
              {/* Overlay */}
             
            </div>
          ))}
        </div>

        {/* Right Fade Effect */}
        <div className="absolute right-0 top-0 h-full w-20 md:w-32 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
      </div>
    </>
  );
};

export default Achievement;
