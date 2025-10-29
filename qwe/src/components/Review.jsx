import React from "react";

const testimonials = [
  {
    name: "Ishu",
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
    <section className="py-16 bg-white">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl lg:text-6xl  text-gray-800 mb-4 big">
          STUDENTS REVIEWS
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto alan">
          Hear what our students have to say about their learning experience at Despa Classes
        </p>
        
        {/* YouTube Link */}
        <div className="flex flex-col items-center gap-4 py-1">
          <a
            href="https://youtube.com/shorts/Ze3FGek_F0Y?si=YBni4NaW5nx_5ftQ"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
            </svg>
            Watch All Student Reviews on YouTube
          </a>
         
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="flex flex-wrap items-center justify-center gap-8 px-4 max-w-7xl mx-auto ">
        {testimonials.map((t, index) => (
          <div
            key={index}
            className="text-sm w-80 border border-gray-200 pb-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
          >
            <div className="flex flex-col items-center px-5 py-4 relative mt-10">
              <div className="absolute -top-17">
                <div className="relative">
                  <img
                    className="h-24 w-24 rounded-full border-4 border-white shadow-lg"
                    src={t.image}
                    alt={`${t.name}'s profile`}
                  />
                  <div className="absolute -bottom-2 -right-2 bg-indigo-500 rounded-full p-1 shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="pt-10 text-center">
                <h1 className="text-xl font-bold text-gray-800 big">{t.name}</h1>
                <p className="text-indigo-600 font-medium alan">{t.role}</p>
              </div>
            </div>
            <p className="text-gray-600 px-6 text-center leading-relaxed">{t.text}</p>
            <div className="flex justify-center pt-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

  
    </section>
  );
}