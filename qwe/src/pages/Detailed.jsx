import React from "react";
import { useParams, Link } from "react-router-dom";
import { categoryData } from "../data/CoursesData.js";

const Detailed = () => {
  const { id } = useParams();
  const course = categoryData.find((c) => c.id === id);

  if (!course) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-3xl font-bold">Course Not Found</h1>
        <Link to="/" className="mt-4 inline-block text-blue-600 hover:underline">
          Go Back Home
        </Link>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-10">
      <div className="flex flex-col lg:flex-row gap-10 items-start">
        {/* Left Side - Image */}
        <div className="lg:w-1/2 w-full">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-60 lg:h-100 object-cover rounded-xl "
          />
        </div>

        {/* Right Side - Details */}
        <div className="lg:w-1/2 w-full flex flex-col">
          {/* Title */}
          <h1 className="text-5xl font-bold bebas-neue-regular text-gray-800 mb-6">
            {course.title}
          </h1>

          {/* Tags */}
          <div className="flex flex-wrap gap-3 mb-6">
            {course.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-4 py-2 border-2 border-black rounded-full text-sm font-medium bg-gray-50"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            {course.description}
          </p>

          {/* PDF Download */}
          <a
            href={course.pdf}
            download
            className="bg-violet-600 text-white px-6 py-3 rounded-full hover:bg-violet-700 transition w-max"
          >
            📄 Download PDF
          </a>
        </div>
      </div>
    </div>
  );
};

export default Detailed;
