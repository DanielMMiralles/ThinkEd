// src/components/calendar/DeleteEventModal.tsx
import React from 'react';
import { deleteCalendarEvent } from '../../api/calendar';
import { useAuth } from '../../auth/AuthContext';

interface DeleteEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEventDeleted: () => void;
  event: { id: string; title: string };
}

const DeleteEventModal: React.FC<DeleteEventModalProps> = ({ isOpen, onClose, onEventDeleted, event }) => {
  const { token } = useAuth();

  const handleDelete = async () => {
    if (!token) return;
    try {
      await deleteCalendarEvent(event.id, token);
      onEventDeleted();
    } catch (error) {
      alert('Error deleting class.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Eliminar Clase</h2>
        <p className="mb-6">¿Estás seguro de que deseas eliminar la clase "{event.title}"?</p>
        <div className="flex justify-end space-x-4">
          <button type="button" onClick={onClose} className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md">Cancelar</button>
          <button type="button" onClick={handleDelete} className="bg-red-500 text-white py-2 px-4 rounded-md">Eliminar</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteEventModal;