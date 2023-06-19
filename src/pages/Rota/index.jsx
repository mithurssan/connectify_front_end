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
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [content, setContent] = useState('');
  const [isBusiness, setIsBusiness] = useState(false);
/* c8 ignore start */
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
      const start = moment(event.rota_start_date, 'DD-MM-YYYY').toDate();
    const end = moment(event.rota_end_date, 'DD-MM-YYYY').toDate();
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
      start: moment(event.start).format('DD-MM-YYYY'),
      end: moment(event.end).format('DD-MM-YYYY'),
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

  const handleAddEntry = async () => {
    if (!startDate || !endDate || !content) {
      console.error('Empty fields are not allowed');
      return;
    }
    try {
      const storedEvents = localStorage.getItem('events');
      const formattedEvents = formatEvents(JSON.parse(storedEvents));
      const businessId = formattedEvents[0]?.business_id;

      const newEntry = {
        business_id: businessId,
        rota_start_date: startDate,
        rota_end_date: endDate,
        rota_content: content,
      };

      const response = await fetch('http://127.0.0.1:5000/rotas/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEntry),
      });

      if (response.ok) {
        console.log('New entry added successfully');
        fetchEvents()
          .then((data) => {
            const formattedEvents = formatEvents(data);
            setEvents(formattedEvents);
          })
          .catch((error) => {
            console.error('Error fetching events:', error);
          });

        setStartDate('');
        setEndDate('');
        setContent('');
      } else {
        console.error('Failed to add new entry');
      }
    } catch (error) {
      console.error('Error adding new entry:', error);
    }
  };

  console.log(events);

  const handleDeleteEntry = async (event) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/rotas/delete/${event.id}`,
        {
          method: 'DELETE',
        }
      );

      if (response.ok) {
        console.log('Entry deleted successfully');
        const updatedEvents = events.filter((ev) => ev.id !== event.id);
        setEvents(updatedEvents);
      } else {
        console.error('Failed to delete entry');
      }
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  };

  const eventComponents = events.map((event) => {
    return (
      <div key={event.id} className="event-container">
        <span>{event.title}</span>
        {isBusiness && (
          <button onClick={() => handleDeleteEntry(event)}>Delete</button>
        )}
      </div>
    );
  });
/* c8 ignore end */
  return (
    <div className="calendar-container">
    {isBusiness && (
      <div className="add-entry-container">
        <input
          type="text"
          placeholder="Start Date (DD-MM-YYYY)"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="End Date (DD-MM-YYYY)"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={handleAddEntry}>Add Entry</button>
      </div>
      )}
      <div className="event-list-container">{eventComponents}</div>
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

