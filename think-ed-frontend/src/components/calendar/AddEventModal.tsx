// src/components/calendar/AddEventModal.tsx
import React, { useState, useEffect } from 'react';
import { createCalendarEvent } from '../../api/calendar';
import { useAuth } from '../../auth/AuthContext';

interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEventAdded: (newEvent: any) => void;
  initialDates?: { start: Date; end: Date } | null; // Fechas iniciales opcionales
}

const AddEventModal: React.FC<AddEventModalProps> = ({ isOpen, onClose, onEventAdded, initialDates }) => {
  const [title, setTitle] = useState('');
  const [courseId, setCourseId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const { token } = useAuth();

  useEffect(() => {
    if (initialDates) {
      // Formatea las fechas al formato de entrada 'datetime-local'
      setStartDate(initialDates.start.toISOString().slice(0, 16));
      setEndDate(initialDates.end.toISOString().slice(0, 16));
    }
  }, [initialDates]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    try {
      const eventData = {
        title,
        courseId,
        start_date: startDate,
        end_date: endDate,
      };
      const newEvent = await createCalendarEvent(eventData, token);
      onEventAdded(newEvent);
      onClose();
    } catch (error) {
      alert('Error al crear la clase. Asegúrate de que los datos son correctos.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Programar Nueva Clase</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Título</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          {/* Aquí podrías agregar un selector de cursos */}
          <div className="mb-4">
            <label className="block text-gray-700">ID del Curso</label>
            <input
              type="text"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Fecha y Hora de Inicio</label>
            <input
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Fecha y Hora de Finalización</label>
            <input
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-primary text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors"
            >
              Programar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEventModal;