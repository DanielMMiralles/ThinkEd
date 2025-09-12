import axios from 'axios';

const API_URL = 'http://localhost:3000';

/**
 * Crea un nuevo módulo para un curso específico.
 * @param courseId El ID del curso al que pertenece el módulo.
 * @param createModuleDto Los datos del nuevo módulo (ej. { title, order }).
 * @param token El token de autenticación del instructor.
 * @returns Una promesa que resuelve con el módulo recién creado.
 */
export const createModule = async (courseId: string, createModuleDto: any, token: string) => {
  try {
    const response = await axios.post(`${API_URL}/courses/${courseId}/modules`, createModuleDto, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Módulo creado con éxito:", response.data);
    return response.data;
  } catch (error) {
    console.error('Error al crear el módulo:', error);
    throw error;
  }
};

/**
 * Obtiene todos los módulos de un curso.
 * @param courseId El ID del curso.
 * @param token El token de autenticación del usuario.
 * @returns Una promesa que resuelve con la lista de módulos.
 */
export const getCourseModules = async (courseId: string, token: string) => {
  try {
    const response = await axios.get(`${API_URL}/courses/${courseId}/modules`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Módulos del curso obtenidos:", response.data);
    return response.data;
  } catch (error) { 
    console.error('Error al obtener los módulos del curso:', error);
    throw error;
  }
};

/**
 * Actualiza un módulo específico de un curso.
 * @param courseId El ID del curso.
 * @param moduleId El ID del módulo a actualizar.
 * @param updateModuleDto Los datos a actualizar del módulo.
 * @param token El token de autenticación del instructor.
 * @returns Una promesa que resuelve con el módulo actualizado.
 */
export const updateModule = async (courseId: string, moduleId: string, updateModuleDto: any, token: string) => {
  try {
    const response = await axios.put(`${API_URL}/courses/${courseId}/modules/${moduleId}`, updateModuleDto, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Módulo actualizado con éxito:", response.data);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el módulo:', error);
    throw error;
  }
};

/**
 * Elimina un módulo específico de un curso.
 * @param courseId El ID del curso.
 * @param moduleId El ID del módulo a eliminar.
 * @param token El token de autenticación del instructor.
 * @returns Una promesa que resuelve al finalizar la eliminación.
 */
export const deleteModule = async (courseId: string, moduleId: string, token: string) => {
  try {
    const response = await axios.delete(`${API_URL}/courses/${courseId}/modules/${moduleId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Módulo eliminado con éxito:", response.data);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar el módulo:', error);
    throw error;
  }
};