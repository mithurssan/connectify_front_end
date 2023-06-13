import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import "./style.css"

const localizer = momentLocalizer(moment);

const Rota = () => {
  const events = [
    {
      title: 'Shift 1',
      start: new Date(2023, 5, 13, 9, 0), // June 13, 2023, 09:00 AM
      end: new Date(2023, 5, 13, 17, 0), // June 13, 2023, 05:00 PM
    }
  ];

  return (
    <div className="calendar-container">
      <div className="calendar-wrapper">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
        />
      </div>
    </div>
  );
};

export default Rota;

