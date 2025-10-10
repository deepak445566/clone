// CategoryCard.js
import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({ id, title, tags, iconUrl, iconBgColor }) => {
  return (
    <Link
      to={`/detail/${id}`}
      className="max-w-sm bg-white rounded-xl border-2 border-black p-6 flex justify-between items-center hover:shadow-lg hover:scale-105 transition-transform"
    >
      {/* Left Section */}
      <div className="flex flex-col space-y-4">
        <h2 className="text-2xl font-bold magnet bebas-neue-regular">{title}</h2>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-4 py-2 border-2 border-black rounded-full text-black hover:bg-gray-100"
            >
              {tag}
            </span>
          ))}
        </div>
        <span className="flex items-center text-gray-800 font-medium mt-2">
          Explore Category <span className="ml-2">→</span>
        </span>
      </div>

      {/* Right Section */}
      <div
        className={`rounded-full p-4 flex items-center justify-center ${iconBgColor}`}
      >
        <img src={iconUrl} alt={`${title} icon`} className="w-12 h-12" />
      </div>
    </Link>
  );
};

export default CategoryCard;
