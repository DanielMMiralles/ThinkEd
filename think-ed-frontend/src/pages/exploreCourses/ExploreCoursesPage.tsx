// src/pages/explore-courses/ExploreCoursesPage.tsx
import { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import CourseCard from '../../components/courses/CourseCard';
import { getAllCourses, enrollInCourse, getEnrolledCourses } from '../../api/courses';
import { useAuth } from '../../auth/AuthContext';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';

import type { Course } from '../../types/course';

const ExploreCoursesPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const allCoursesData = await getAllCourses();
        setCourses(allCoursesData);

        if (token) {
          const enrolledCoursesData = await getEnrolledCourses(token);
          // Mapea la respuesta para obtener solo los IDs de los cursos
          const enrolledIds = enrolledCoursesData.map((course: any) => course.courseId);
          setEnrolledCourses(enrolledIds);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleEnroll = async (courseId: string) => {
    try {
      if (token) {
        await enrollInCourse(courseId, token);
        setEnrolledCourses([...enrolledCourses, courseId]);
      }
    } catch (error) {
      alert('Hubo un problema al inscribirte en el curso.');
    }
  };

  const isEnrolled = (courseId: string) => enrolledCourses.includes(courseId);

  return (
    <DashboardLayout>
      <div className="p-4 bg-background min-h-screen">
        <h1 className="text-4xl font-bold text-primary mb-8">Explorar Cursos</h1>
        {isLoading ? (
          <p className="text-text">Cargando catálogo...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="relative">
                <CourseCard 
                  title={course.title}
                  instructor={course.instructorName}
                  // No hay progreso en el catálogo, por lo que pasamos 0
                  progress={0} 
                />
                {isEnrolled(course.id) ? (
                  <button
                    onClick={() => handleEnroll(course.id)}
                    className="mt-2 w-full py-2 rounded-md bg-primary text-white font-semibold hover:bg-opacity-90 transition-colors"
                  >
                    Inscribirse
                  </button>
                ) : (
                  <div className="mt-2 w-full py-2 rounded-md bg-green-500 text-white font-semibold flex items-center justify-center space-x-2">
                    <IoCheckmarkCircleOutline size={20} />
                    <span>Inscrito</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ExploreCoursesPage;