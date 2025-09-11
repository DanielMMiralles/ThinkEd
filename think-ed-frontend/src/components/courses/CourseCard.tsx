// src/components/courses/CourseCard.tsx
import React from 'react';
import { IoBookOutline } from 'react-icons/io5';

interface CourseCardProps {
  title: string;
  instructor: string;
  progress: number;
}

const CourseCard: React.FC<CourseCardProps> = ({ title, instructor, progress }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-secondary">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
          <IoBookOutline size={30} className="text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-text">{title}</h3>
          <p className="text-sm text-gray-500">Instructor: {instructor}</p>
        </div>
      </div>
      
      {/* Barra de progreso */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
        <div 
          className="bg-primary h-2.5 rounded-full" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-sm text-text mt-2">{progress}% completado</p>
    </div>
  );
};

export default CourseCard;