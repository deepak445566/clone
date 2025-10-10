import React from "react";
import CategoryCard from "./CategoryCard";
import { categoryData } from "../data/CoursesData"; // import from data file

const Courses = () => {
  return (
    <div className="flex flex-col py-10 px-6 md:px-16 lg:px-24 xl:px-32">
      <h1
        className="relative group mb-10 lg:mb-15 bebas-neue-regular lg:text-6xl text-3xl"
        id="courses"
      >
        COURSES
        <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-violet-500 transition-all group-hover:w-40"></span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {categoryData.map((category) => (
          <CategoryCard key={category.id} {...category} />
        ))}
      </div>
    </div>
  );
};

export default Courses;
