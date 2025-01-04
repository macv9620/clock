import { useState, useEffect } from 'react';
import './Clock.css'; // We'll define the styles in this file
import dayjs from 'dayjs'; // Import dayjs for date formatting
import 'dayjs/locale/es'; // Import the Spanish locale for dayjs

function Clock() {
    const [time, setTime] = useState(dayjs()); // Store the current time
    const [date, setDate] = useState(dayjs().locale('es').format('D MMMM YYYY')); // Store the formatted date
  
    useEffect(() => {
      const interval = setInterval(() => {
        setTime(dayjs()); // Update the time every second
        setDate(dayjs().locale('es').format('D MMMM YYYY')); // Update the date every second
      }, 1000);
  
      return () => clearInterval(interval); // Cleanup the interval on component unmount
    }, []);
  
    // Format the current time in "hh:mm:ss A" format (12-hour format with AM/PM)
    const formattedTime = time.format('dddd hh:mm:ss A');
  
    return (
      <div className="digital-clock">
        <div className="clock-title">Fecha actual:</div>
        {/* Display the time */}
        <div className="clock-time">
          {formattedTime}
        </div>
  
        {/* Display the formatted date */}
        <div className="clock-date">{date}</div>
      </div>
    );
  }

export default Clock;