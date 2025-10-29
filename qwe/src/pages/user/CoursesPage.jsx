// CoursesPage.js
import React from "react";

import { Link } from "react-router-dom";
import { categoryData } from "../../data/CoursesData";
import CategoryCard from "../../components/CategoryCard";

const CoursesPage = () => {
  return (
    <div className="min-h-screen py-10 px-6 md:px-16 lg:px-24 xl:px-32 bg-gray-50">
      {/* Header with Back Button */}
      <div className="flex justify-between items-center mb-10">
        <Link 
          to="/"
          className="text-violet-600 hover:text-violet-700 font-medium flex items-center gap-2 transition-colors"
        >
          ← Back to Home
        </Link>
        <h1 className="text-4xl font-bold text-gray-900">All Courses</h1>
        <div className="w-20"></div> {/* Spacer for balance */}
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categoryData.map((category) => (
          <CategoryCard key={category.id} {...category} />
        ))}
      </div>

    </div>
  );
};

export default CoursesPage;