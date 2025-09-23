import React from "react";
import { FaUsers, FaLaptopCode } from "react-icons/fa";
import { IoRocketSharp } from "react-icons/io5";

const About = () => {
  return (
    <div className="mt-[80px] px-4 py-8 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">About ProductVerse</h1>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* About Image */}
        <img
          src="https://img.freepik.com/free-vector/about-us-concept-illustration_114360-639.jpg"
          alt="About Us"
          className="rounded-lg shadow-lg"
        />

        {/* Description */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-blue-600 flex items-center gap-2">
            <IoRocketSharp /> Our Mission
          </h2>
          <p className="text-gray-700 leading-relaxed">
            At <strong>ProductVerse</strong>, we aim to provide a seamless and enjoyable product discovery experience. Whether you're looking for the latest gadgets, stylish accessories, or something special for your loved ones, we have it all.
          </p>
        </div>
      </div>

      {/* Team Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-blue-600 flex items-center gap-2 mb-4">
          <FaUsers /> Meet the Developer
        </h2>
        <p className="text-gray-700">
          This application is built by <strong>Amit Kumar Patel</strong>, a passionate web developer focused on crafting intuitive user interfaces using React, Redux, and Tailwind CSS. Amit loves building useful applications that solve real-world problems and help people interact with technology more effectively.
        </p>
      </div>

      {/* Tech Stack Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-blue-600 flex items-center gap-2 mb-4">
          <FaLaptopCode /> Tech Stack
        </h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>⚛️ React for frontend UI</li>
          <li>🗃️ Redux for state management</li>
          <li>🌐 React Router for navigation</li>
          <li>🎨 Tailwind CSS for modern responsive design</li>
          <li>🔥 Lazy Loading and Infinite Scroll for performance</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
