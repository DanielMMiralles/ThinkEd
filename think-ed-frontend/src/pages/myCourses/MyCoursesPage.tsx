// src/pages/mis-cursos/MisCursosPage.tsx
import { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import CourseCard from '../../components/courses/CourseCard';
import { getEnrolledCourses } from '../../api/courses';
import { useAuth } from '../../auth/AuthContext';
import { Link } from 'react-router-dom';

import type { Course } from '../../types/course';

const MyCoursesPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        if (token) {
          const coursesData = await getEnrolledCourses(token);
          // Asume que el backend devuelve un array de objetos con la info del curso
          setCourses(coursesData);
        }
      } catch (error) {
        console.error("Error al obtener los cursos inscritos:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEnrolledCourses();
  }, [token]);

  return (
    <DashboardLayout>
      <div className="p-4 bg-background min-h-screen">
        <h1 className="text-4xl font-bold text-primary mb-8">Mis Cursos</h1>
        <p className="text-lg text-text mb-6">Aquí encontrarás todos los cursos en los que estás inscrito.</p>
        
        {isLoading ? (
          <p className="text-text text-center">Cargando tus cursos...</p>
        ) : courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map(course => (
              <Link to={`/curso/${course.id}`} key={course.id}>
                <CourseCard 
                  title={course.title}
                  instructor={course.instructorName}
                  progress={75} // Esto sería un valor dinámico en un futuro
                />
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-text text-center col-span-full">
            No estás inscrito en ningún curso aún. <br />
            <Link to="/todos-los-cursos" className="text-primary hover:underline">Explora el catálogo para empezar.</Link>
          </p>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MyCoursesPage;