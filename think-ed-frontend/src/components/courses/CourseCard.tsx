// src/components/courses/CourseCard.tsx
import React from 'react';
import { FaUserGraduate } from 'react-icons/fa';

interface CourseCardProps {
  title: string;
  instructor: string;
  description: string; 
  progress: number;
}

const CourseCard: React.FC<CourseCardProps> = ({ title, instructor, description, progress }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <img
        src="https://via.placeholder.com/600x400"
        alt={`Imagen del curso de ${title}`}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        <div className="flex items-center text-gray-500 mb-4">
          <FaUserGraduate className="mr-2" />
          <span className="text-sm">{instructor}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <span className="text-xs font-medium text-gray-600 mt-2 block">{progress}% Completado</span>
      </div>
    </div>
  );
};

export default CourseCard;