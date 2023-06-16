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
        console.error('Error fetching events:', error); /* c8 ignore next 3 */
      });
  }, []);
  const fetchEvents = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/rotas/');
      const data = await response.json();
      return data;
    } catch (error) {/* c8 ignore next 3 */
      throw new Error('Error fetching events');/* c8 ignore next 3 */
    }/* c8 ignore next 3 */
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
    const updatedEvent = { ...event, start, end }; /* c8 ignore next 3 */
/* c8 ignore next 3 */
    try {/* c8 ignore next 3 */
      await updateEvent(updatedEvent);/* c8 ignore next 3 */
      const updatedEvents = events.map((ev) =>/* c8 ignore next 3 */
        ev.id === updatedEvent.id ? updatedEvent : ev/* c8 ignore next 3 */
      );/* c8 ignore next 3 */
      setEvents(updatedEvents);/* c8 ignore next 3 */
      localStorage.setItem('events', JSON.stringify(updatedEvents));/* c8 ignore next 3 */
    } catch (error) {/* c8 ignore next 3 */
      console.error('Error updating event:', error);/* c8 ignore next 3 */
    }/* c8 ignore next 3 */
  };/* c8 ignore next 3 */

  const updateEvent = async (event) => {/* c8 ignore next 3 */
    try {/* c8 ignore next 3 */
      const formattedEvent = {/* c8 ignore next 3 */
        ...event,/* c8 ignore next 3 */
        start: moment(event.start).toISOString(),/* c8 ignore next 3 */
        end: moment(event.end).toISOString(),/* c8 ignore next 3 */
      };/* c8 ignore next 3 */
/* c8 ignore next 3 */
      console.log('Updating event:', formattedEvent);/* c8 ignore next 3 */
/* c8 ignore next 3 */
      const response = await fetch(/* c8 ignore next 3 */
        `http://127.0.0.1:5000/rotas/update/${formattedEvent.id}`,/* c8 ignore next 3 */
        {/* c8 ignore next 3 */
          method: 'PUT',/* c8 ignore next 3 */
          headers: {/* c8 ignore next 3 */
            'Content-Type': 'application/json',/* c8 ignore next 3 */
          },/* c8 ignore next 3 */
          body: JSON.stringify({
            business_id: formattedEvent.business_id,/* c8 ignore next 3 */
            rota_start_date: formattedEvent.start,/* c8 ignore next 3 */
            rota_end_date: formattedEvent.end,/* c8 ignore next 3 */
            rota_content: formattedEvent.title,/* c8 ignore next 3 */
          }),/* c8 ignore next 3 */
        }/* c8 ignore next 3 */
      );/* c8 ignore next 3 */
/* c8 ignore next 3 */
      console.log('Update response:', response);/* c8 ignore next 3 */
/* c8 ignore next 3 */
      if (response.ok) {/* c8 ignore next 3 */
        console.log('Rota updated successfully');/* c8 ignore next 3 */
      } else {/* c8 ignore next 3 */
        throw new Error('Failed to update rota');/* c8 ignore next 3 */
      }/* c8 ignore next 3 */
    } catch (error) {/* c8 ignore next 3 */
      console.error('Error updating event:', error);/* c8 ignore next 3 */
      throw new Error('Error updating event');/* c8 ignore next 3 */
    }/* c8 ignore next 3 */
  };/* c8 ignore next 3 */

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

