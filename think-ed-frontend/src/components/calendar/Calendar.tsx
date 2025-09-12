// src/components/calendar/Calendar.tsx
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import type { CalendarEvent } from '../../types/calendar';

const localizer = momentLocalizer(moment);


interface CalendarProps {
  events: CalendarEvent[];
  onSelectEvent?: (event: CalendarEvent) => void;
  onSelectSlot?: (slotInfo: any) => void;
  selectable?: boolean;
}

const CourseCalendar: React.FC<CalendarProps> = ({ events, onSelectEvent, onSelectSlot, selectable = true }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-secondary">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        onSelectEvent={onSelectEvent}
        selectable={selectable}
        onSelectSlot={onSelectSlot}
        defaultView="week" // You can set a default view like 'week' or 'month'
        views={['month', 'week', 'day']} // Enable multiple views
      />
    </div>
  );
};

export default CourseCalendar;