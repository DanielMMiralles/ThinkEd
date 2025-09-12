// src/api/courses.ts
import axios from 'axios';

// La URL base de tu backend para los cursos
const API_URL = 'http://localhost:3000';

/**
 * Obtiene el catálogo completo de cursos.
 * @returns Una promesa que resuelve con la lista de todos los cursos.
 */
export const getAllCourses = async () => {
  try {
    const response = await axios.get(`${API_URL}/courses`);
    console.log(response.data);
    return response.data;

  } catch (error) {
    console.error('Error fetching all courses:', error);
    throw error;
  }
};

// La función para obtener los cursos inscritos del usuario
/**
 * @param token 
 * @returns 
 */
export const getEnrolledCourses = async (token: string) => {
  try {
    // Asume que tu backend tiene una ruta para obtener los cursos inscritos por el usuario
    const response = await axios.get(`${API_URL}/enrollment/my-courses`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data, "Cursos inscritos obtenidos en API");
    return response.data;
  } catch (error) {
    console.error('Error fetching enrolled courses:', error);
    throw error;
  }
};

/**
 * Inscribe al usuario actual en un curso específico.
 * Se asume que el backend gestionará la inscripción.
 * @param courseId - El ID del curso en el que se inscribirá el usuario.
 * @param token - El token de autenticación del usuario.
 * @returns Los datos de la respuesta del backend.
 */
export const enrollInCourse = async (courseId: string, token: string) => {
  try {
    const response = await axios.post(`${API_URL}/enrollment`, { courseId }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },  
    });
    return response.data;
  } catch (error) {
    console.error('Error enrolling in course:', error);
    throw error;
  }
};