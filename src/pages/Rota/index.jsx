import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import './style.css';

const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar);

const Rota = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Load mock events on component mount
    const mockEvents = [
      {
        id: 1,
        title: 'Event 1',
        start: moment().startOf('day').toDate(),
        end: moment().endOf('day').toDate(),
      },
      {
        id: 2,
        title: 'Event 2',
        start: moment().add(1, 'day').startOf('day').toDate(),
        end: moment().add(1, 'day').endOf('day').toDate(),
      },
    ];

    setEvents(mockEvents);
  }, []);

  const handleEventDrop = ({ event, start, end }) => {
    // Update the event start and end times in the local state
    const updatedEvents = events.map((ev) =>
      ev.id === event.id ? { ...ev, start, end } : ev
    );
    setEvents(updatedEvents);
  };

  return (
    <div className="calendar-container">
      <div className="calendar-wrapper">
        <DragAndDropCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          onEventDrop={handleEventDrop}
          resizable
          selectable
        />
      </div>
    </div>
  );
};

export default Rota;

