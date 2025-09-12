// src/api/calendar.ts
import axios from 'axios';

const API_URL = 'http://localhost:3000';

/**
 * Obtiene todos los eventos del calendario para el usuario autenticado.
 * @param token - El token de autenticación del usuario.
 * @returns Una promesa que resuelve con la lista de eventos del calendario.
 */
export const getCalendarEvents = async (token: string) => {
  try {
    const response = await axios.get(`${API_URL}/calendar`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Eventos del calendario obtenidos:", response.data);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los eventos del calendario:', error);
    throw error;
  }
};

/**
 * Crea un nuevo evento en el calendario (solo para instructores).
 * @param eventData - Los datos del evento (título, fecha, hora, etc.).
 * @param token - El token de autenticación del instructor.
 * @returns Una promesa que resuelve con el evento creado.
 */
export const createCalendarEvent = async (eventData: any, token: string) => {
  try {
    const response = await axios.post(`${API_URL}/calendar`, eventData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Evento creado con éxito:", response.data);
    return response.data;
  } catch (error) {
    console.error('Error al crear el evento del calendario:', error);
    throw error;
  }
};

/**
 * Actualiza un evento del calendario (solo para el instructor que lo creó).
 * @param eventId - El ID del evento a actualizar.
 * @param eventData - Los datos a actualizar del evento.
 * @param token - El token de autenticación del usuario.
 * @returns Una promesa que resuelve con el evento actualizado.
 */
export const updateCalendarEvent = async (eventId: string, eventData: any, token: string) => {
  try {
    const response = await axios.put(`${API_URL}/calendar/${eventId}`, eventData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Evento actualizado con éxito:", response.data);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el evento del calendario:', error);
    throw error;
  }
};

/**
 * Elimina un evento del calendario (solo para el instructor que lo creó).
 * @param eventId - El ID del evento a eliminar.
 * @param token - El token de autenticación del usuario.
 * @returns Una promesa que resuelve al finalizar la eliminación.
 */
export const deleteCalendarEvent = async (eventId: string, token: string) => {
  try {
    const response = await axios.delete(`${API_URL}/calendar/${eventId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Evento eliminado con éxito:", response.data);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar el evento del calendario:', error);
    throw error;
  }
};