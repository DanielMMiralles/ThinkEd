// src/pages/calendar/CalendarPage.tsx
import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { getCalendarEvents } from '../../api/calendar';
import { useAuth } from '../../auth/AuthContext';
import CourseCalendar from '../../components/calendar/Calendar';
import AddEventModal from '../../components/calendar/AddEventModal';
import EditEventModal from '../../components/calendar/EditEventModal';
import DeleteEventModal from '../../components/calendar/DeleteEventModal';
import { FaPlus } from 'react-icons/fa';
import type { CalendarEvent } from '../../types/calendar';

const CalendarPage: React.FC = () => {
  const { token, role } = useAuth();
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const fetchEvents = async () => {
    if (!token) {
      setIsLoading(false);
      return;
    }
    try {
      const eventsData = await getCalendarEvents(token);
      const formattedEvents = eventsData.map((event: any) => ({
        ...event,
        start: new Date(event.start_date),
        end: new Date(event.end_date),
      }));
      setEvents(formattedEvents);
    } catch (error) {
      console.error('Error fetching calendar events:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [token]);

  const handleEventAdded = () => {
    setIsAddModalOpen(false);
    fetchEvents();
  };

  const handleEventUpdated = () => {
    setIsEditModalOpen(false);
    setSelectedEvent(null);
    fetchEvents();
  };

  const handleEventDeleted = () => {
    setIsDeleteModalOpen(false);
    setSelectedEvent(null);
    fetchEvents();
  };

  // Function to handle clicking on an existing event
  const handleSelectEvent = (event: CalendarEvent) => {
    if (role === 'instructor') {
      setSelectedEvent(event);
      setIsEditModalOpen(true);
    }
  };

  // Function to handle clicking a time slot (for creating new events)
  const handleSelectSlot = (slotInfo: any) => {
    if (role === 'instructor') {
      // Pre-fill the start and end dates in the add modal
      setSelectedEvent({ ...slotInfo, id: '', courseId: '' }); 
      setIsAddModalOpen(true);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-4 bg-background min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-primary">Clases en Vivo</h1>
          {role === 'instructor' && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-primary text-white py-2 px-4 rounded-lg flex items-center space-x-2 hover:bg-opacity-90 transition-colors"
            >
              <FaPlus />
              <span>Nueva Clase</span>
            </button>
          )}
        </div>
        
        {isLoading ? (
          <p>Cargando calendario...</p>
        ) : (
          <CourseCalendar 
            events={events} 
            onSelectEvent={handleSelectEvent}
            onSelectSlot={handleSelectSlot}
            selectable={role === 'instructor'} // Only instructors can select empty slots
          />
        )}
      </div>

      <AddEventModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onEventAdded={handleEventAdded}
        // Pass the pre-selected dates from the slot click
        initialDates={selectedEvent ? { start: selectedEvent.start, end: selectedEvent.end } : null}
      />
      
      {selectedEvent && (
        <>
          <EditEventModal 
            isOpen={isEditModalOpen} 
            onClose={() => setIsEditModalOpen(false)} 
            onEventUpdated={handleEventUpdated} 
            event={selectedEvent}
          />
          <DeleteEventModal 
            isOpen={isDeleteModalOpen} 
            onClose={() => setIsDeleteModalOpen(false)} 
            onEventDeleted={handleEventDeleted} 
            event={selectedEvent}
          />
        </>
      )}
    </DashboardLayout>
  );
};

export default CalendarPage;