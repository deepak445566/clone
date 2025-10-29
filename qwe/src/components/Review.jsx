import React from "react";

const testimonials = [
  {
    name: "ishu",
    role: "Excel",
    image: "/images/person3.jpg",
    text: "Excel classes were very practical and clear. I learned formulas, charts, and data handling with confidence. Very helpful course.",
  },
  {
    name: "Kajal",
    role: "Basic Computer",
    image: "/images/person1.jpg",
    text: "Basic computer classes were very easy to understand. I learned typing, MS Office, and internet use with confidence. Excellent teaching.",
  },
  {
    name: "Vivek Dubay",
    role: "Basic Computer",
    image: "/images/person2.jpg",
    text: "Basic computer classes were very easy to understand. I learned typing, MS Office, and internet use with confidence. Excellent teaching.",
  },
];

const Star = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 22 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z"
      fill="#FF532E"
    />
  </svg>
);

export default function Review() {
  return (
    <>
<h1 className='relative group big text-4xl lg:text-6xl ml-8 lg:ml-35 mt-30'>REVIEWS
  
</h1>
  
  
    <div className="flex flex-wrap items-center justify-center gap-19 pt-14 mt-15  ">
      {testimonials.map((t, index) => (
        <div
          key={index}
          className="text-sm w-80 border border-gray-200 pb-6 rounded-lg bg-white shadow-[0px_4px_15px_0px] shadow-black/5"
        >
          <div className="flex flex-col items-center px-5 py-4 relative">
            <img
              className="h-24 w-24 absolute -top-14 rounded-full"
              src={t.image}
              alt={`userImage${index + 1}`}
            />
            <div className="pt-8 text-center">
              <h1 className="text-lg font-medium text-gray-800">{t.name}</h1>
              <p className="text-gray-800/80">{t.role}</p>
            </div>
          </div>
          <p className="text-gray-500 px-6 text-center">{t.text}</p>
          <div className="flex justify-center pt-4">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
    </>
  );
}
