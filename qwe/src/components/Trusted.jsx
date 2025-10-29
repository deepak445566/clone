import React from "react";
import AnimatedButton  from "./v1/AnimatedButton";
// Reusable Card Component
const TrustedCard = ({ number, label, bgColor, imgUrl }) => {
  return (
    <div
      className="lg:h-[265px] lg:w-[265px] md:w-[230px] md:h-[200px] h-[158px] w-[158px] 
      md:rounded-[16px] rounded-[4px] flex flex-col items-center lg:justify-start justify-center 
      overflow-hidden group"
      style={{ backgroundColor: bgColor }}
    >
      {/* Top Section */}
      <div className="duration-300 flex flex-col items-center justify-center">
        <div
          className="lg:text-[40px] md:text-[38px] text-2xl flex flex-row items-center justify-center font-[700]"
          style={{ lineHeight: "55px" }}
        >
          <div className="flex flex-row mt-10 lg:mt-18">
            <div className="ml-[2px]">{number}</div>
          </div>
        </div>
        <div className="md:text-lg text-[#3D3D3D] text-sm font-[500]">
          {label}
        </div>
      </div>

      {/* Bottom Image Section */}
      <div
        className="mt-[3px] transform translate-y-full group-hover:translate-y-0 
        opacity-50 group-hover:opacity-100 w-full h-[110px] bg-center bg-contain 
        bg-no-repeat transition-all duration-300"
        style={{ backgroundImage: `url("${imgUrl}")` }}
      />
    </div>
  );
};

// Parent Component
const Trusted = () => {
  const cardsData = [
    {
      number: "100+",
      label: "Happy Students",
      bgColor: "rgb(255, 243, 227)",
      imgUrl:
        "https://static.pw.live/5b09189f7285894d9130ccd0/fa94a64a-7f6c-49c7-99be-dbf5b4cf440f.webp",
    },
    {
      number: "20+",
      label: "Courses Running",
      bgColor: "rgb(227, 243, 255)",
      imgUrl:
        "https://static.pw.live/5b09189f7285894d9130ccd0/4f6749a2-e834-4c08-81ff-c42330f9bf87.webp",
    },
    {
      number: "10+",
      label: "Expert Mentors",
      bgColor: "rgb(243, 255, 227)",
      imgUrl:
        "https://static.pw.live/5b09189f7285894d9130ccd0/fa94a64a-7f6c-49c7-99be-dbf5b4cf440f.webp",
    },
    {
      number: "20+",
      label: "Moke Tests",
      bgColor: "rgb(255, 227, 243)",
      imgUrl:
        "https://static.pw.live/5b09189f7285894d9130ccd0/4f6749a2-e834-4c08-81ff-c42330f9bf87.webp",
    },
  ];

  return (
    <>
<h1 className='relative group bebas-neue-regular text-2xl lg:text-6xl text-center lg:mt-20 '>A Platform Trusted by Students
    
</h1>
  
    <div className="flex flex-wrap gap-4 mt-10   justify-center">




      {cardsData.map((card, index) => (
        <TrustedCard key={index} {...card} />
      ))}
    </div>
    
    </>
  );
};

export default Trusted;
