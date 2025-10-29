// CategoryCard.js
import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({ id, title, tags, iconUrl, iconBgColor }) => {
  return (
    <Link
      to={`/detail/${id}`}
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-violet-200 hover:-translate-y-2"
    >
      {/* Background Gradient Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Content Container */}
      <div className="relative p-6 flex flex-col h-full">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-4">
          {/* Icon */}
          <div className={`rounded-2xl p-3 ${iconBgColor} shadow-md group-hover:scale-110 transition-transform duration-300`}>
            <img 
              src={iconUrl} 
              alt={`${title} icon`} 
              className="w-8 h-8 object-contain"
            />
          </div>
          
          {/* Arrow Indicator */}
          <div className="text-gray-300 group-hover:text-violet-500 transform group-hover:translate-x-1 transition-all duration-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-violet-700 transition-colors duration-300">
          {title}
        </h2>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4 py-1">
          {tags.slice(0, 4).map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 alan bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-violet-100 hover:text-violet-700 transition-all duration-200 border border-transparent hover:border-violet-200"
            >
              {tag}
            </span>
          ))}
          {tags.length > 4 && (
            <span className="px-3 py-1 bg-gray-50 text-gray-500 rounded-full text-sm font-medium">
              +{tags.length - 4} more
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 group-hover:border-violet-100 transition-colors duration-300">
          <span className="text-violet-600 font-semibold text-sm flex items-center group-hover:gap-2 transition-all duration-300">
            Explore Course
            <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
          <div className="text-xs text-gray-400 group-hover:text-violet-400 transition-colors duration-300">
            Click to view details
          </div>
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-violet-500 to-purple-500 group-hover:w-full transition-all duration-500"></div>
    </Link>
  );
};

export default CategoryCard;