// src/components/calendar/EditEventModal.tsx
import React, { useState, useEffect } from 'react';
import { updateCalendarEvent } from '../../api/calendar';
import { useAuth } from '../../auth/AuthContext';

interface EditEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEventUpdated: () => void;
  event: { id: string; title: string; start: Date; end: Date };
}

const EditEventModal: React.FC<EditEventModalProps> = ({ isOpen, onClose, onEventUpdated, event }) => {
  const [title, setTitle] = useState(event.title);
  const [startDate, setStartDate] = useState(event.start.toISOString().slice(0, 16));
  const [endDate, setEndDate] = useState(event.end.toISOString().slice(0, 16));
  const { token } = useAuth();

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setStartDate(event.start.toISOString().slice(0, 16));
      setEndDate(event.end.toISOString().slice(0, 16));
    }
  }, [event]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    try {
      const eventData = {
        title,
        start_date: startDate,
        end_date: endDate,
      };
      await updateCalendarEvent(event.id, eventData, token);
      onEventUpdated();
    } catch (error) {
      alert('Error updating class.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Editar Clase</h2>
        <form onSubmit={handleSubmit}>
          {/* Form fields for title, start date, end date */}
          <div className="mb-4">
            <label className="block text-gray-700">Título</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 p-2 w-full border rounded-md" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Fecha y Hora de Inicio</label>
            <input type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="mt-1 p-2 w-full border rounded-md" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Fecha y Hora de Finalización</label>
            <input type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="mt-1 p-2 w-full border rounded-md" required />
          </div>
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md">Cancelar</button>
            <button type="submit" className="bg-primary text-white py-2 px-4 rounded-md">Guardar Cambios</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEventModal;