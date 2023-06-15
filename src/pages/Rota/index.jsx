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
    fetchEvents()
      .then((data) => {
        console.log('Fetched events:', data); 
        const formattedEvents = formatEvents(data);
        console.log('Formatted events:', formattedEvents); 
        setEvents(formattedEvents);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });
  }, []);
  const fetchEvents = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/rotas/');
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Error fetching events');
    }
  };

  const formatEvents = (data) => {
    return data.map((event) => {
      const start = moment(event.rota_start_date, 'YYYY-MM-DDTHH:mm:ss.SSSZ').toDate();
      const end = moment(event.rota_end_date, 'YYYY-MM-DDTHH:mm:ss.SSSZ').toDate();

      return {
        id: event.rota_id,
        business_id: event.business_id,
        title: event.rota_content,
        start: start,
        end: end,
      };
    });
  };

  const handleEventDrop = async ({ event, start, end }) => {
    const updatedEvent = { ...event, start, end };

    try {
      await updateEvent(updatedEvent);
      const updatedEvents = events.map((ev) =>
        ev.id === updatedEvent.id ? updatedEvent : ev
      );
      setEvents(updatedEvents);
      localStorage.setItem('events', JSON.stringify(updatedEvents));
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const updateEvent = async (event) => {
    try {
      const formattedEvent = {
        ...event,
        start: moment(event.start).toISOString(),
        end: moment(event.end).toISOString(),
      };

      console.log('Updating event:', formattedEvent);

      const response = await fetch(
        `http://127.0.0.1:5000/rotas/update/${formattedEvent.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            business_id: formattedEvent.business_id,
            rota_start_date: formattedEvent.start,
            rota_end_date: formattedEvent.end,
            rota_content: formattedEvent.title,
          }),
        }
      );

      console.log('Update response:', response);

      if (response.ok) {
        console.log('Rota updated successfully');
      } else {
        throw new Error('Failed to update rota');
      }
    } catch (error) {
      console.error('Error updating event:', error);
      throw new Error('Error updating event');
    }
  };

  console.log(events);

  return (
    <div className="calendar-container">
      <div className="calendar-wrapper">
        <DragAndDropCalendar
          localizer={localizer}
          events={events}
          startAccessor={(event) => event.start}
          endAccessor={(event) => event.end}
          onEventDrop={handleEventDrop}
          resizable
          selectable
        />
      </div>
    </div>
  );
};

export default Rota;

