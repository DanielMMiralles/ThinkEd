// src/api/auth.ts
import axios from 'axios';

// La URL base de tu backend
const API_URL = 'http://localhost:3000/auth';

/**
 * Función para registrar un nuevo usuario.
 * @param userData - Un objeto con el email, nombre, y contraseña del usuario.
 * @returns Los datos de la respuesta del backend.
 */
export const register = async (userData: any) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};

/**
 * Función para iniciar sesión.
 * @param loginData - Un objeto con el email y la contraseña del usuario.
 * @returns El token de acceso y los datos de la respuesta del backend.
 */
export const login = async (loginData: any) => {
  try {
    const response = await axios.post(`${API_URL}/login`, loginData);
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};