// Courses.js
import React from "react";
import CategoryCard from "./CategoryCard";
import { categoryData } from "../data/CoursesData";
import { Link } from "react-router-dom";

const Courses = () => {
  // Show only first 3-4 courses on home page
  const displayedCourses = categoryData.slice(0, 6);

  return (
    <div className="flex flex-col py-10 px-6 md:px-16 lg:px-24 xl:px-32">
      <h1
        className="relative group mb-10 lg:mb-15 big lg:text-5xl text-3xl"
        id="courses"
      >
        COURSES
        <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-violet-500 transition-all group-hover:w-40"></span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {displayedCourses.map((category) => (
          <CategoryCard key={category.id} {...category} />
        ))}
      </div>

      {/* View More Courses Link at Bottom Right */}
      <div className="flex justify-end mt-8">
        <Link 
          to="/courses"
          className="text-violet-600 hover:text-violet-700 font-medium text-lg transition-colors duration-300 border-b-2 border-transparent hover:border-violet-600"
        >
          View More Courses →
        </Link>
      </div>
    </div>
  );
};

export default Courses;