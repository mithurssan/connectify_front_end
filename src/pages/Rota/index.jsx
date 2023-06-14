import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'; 
import "./style.css"

const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar); 

const Rota = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents()
      .then((data) => {
        setEvents(data);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('');
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('');
    }
  };

  const handleEventDrop = async ({ event, start, end }) => {
    const updatedEvent = { ...event, start, end };

    try {
      await updateEvent(updatedEvent);
      const updatedEvents = events.map((ev) =>
        ev.id === updatedEvent.id ? updatedEvent : ev
      );
      setEvents(updatedEvents);
    } catch (error) {
      console.error('Error updating event:', error);
    }
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

