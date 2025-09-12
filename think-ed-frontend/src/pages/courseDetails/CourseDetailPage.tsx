// src/pages/course-details/CourseDetailsPage.tsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useAuth } from '../../auth/AuthContext';
import { FaPlus } from 'react-icons/fa';

import type { Course } from '../../types/course';
import { getCourseModules } from '../../api/module';

// Definiciones de tipos

const CourseDetailsPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { token, role, userId } = useAuth();

  useEffect(() => {
    const fetchDetails = async () => {
      if (!courseId || !token) {
        console.log("No course ID provided", courseId);
        return;
      }
      try {
        // La API devuelve los módulos y lecciones
        const courseData = await getCourseModules(courseId, token);
        console.log(courseData, "Datos del curso obtenidos");
        setCourse(courseData);
      } catch (error) {
        console.error('Failed to fetch course details:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetails();
  }, [courseId]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="p-6 bg-gray-100 min-h-screen">
          <p>Cargando detalles del curso...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!course) {
    return (
      <DashboardLayout>
        <div className="p-6 bg-gray-100 min-h-screen">
          <p>Curso no encontrado.</p>
        </div>
      </DashboardLayout>
    );
  }

  // Lógica para determinar si el usuario es el instructor del curso
  const isInstructor = role === 'instructor' && course.instructorId === userId;

  return (
    <DashboardLayout>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-4xl font-bold text-primary mb-4">{course.title}</h1>
        <p className="text-lg text-gray-700 mb-2">**Instructor:** {course.instructorName}</p>
        <p className="text-md text-gray-600 mb-4">{course.description}</p>
        
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Contenido del Curso</h2>
            {isInstructor && (
              <button className="bg-secondary text-white py-2 px-4 rounded-lg hover:opacity-90 flex items-center space-x-2">
                <FaPlus /> <span>Añadir Módulo</span>
              </button>
            )}
          </div>

          {course.modules.length > 0 ? (
            <ul className="space-y-4">
              {course.modules.map(module => (
                <li key={module.id} className="bg-gray-100 p-4 rounded-md">
                  <h3 className="text-xl font-bold">Módulo {module.order}: {module.title}</h3>
                  <ul className="ml-6 mt-2 space-y-2">
                    {module.lessons.map(lesson => (
                      <li key={lesson.id} className="text-md text-gray-700">
                        <span className="font-semibold">{lesson.order}.</span> {lesson.title}
                      </li>
                    ))}
                  </ul>
                  {isInstructor && (
                    <div className="mt-4 flex space-x-2">
                      <button className="text-sm text-blue-500 hover:underline">
                        Editar Módulo
                      </button>
                      <button className="text-sm text-red-500 hover:underline">
                        Eliminar Módulo
                      </button>
                      <button className="text-sm text-green-500 hover:underline">
                        Añadir Lección
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>Este curso aún no tiene módulos ni lecciones.</p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CourseDetailsPage;