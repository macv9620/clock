import { useState, useEffect } from 'react';
import './Clock.css'; // Make sure your CSS is properly defined
import dayjs from 'dayjs'; // Import dayjs for date formatting
import 'dayjs/locale/es'; // Import the Spanish locale for dayjs

// eslint-disable-next-line react/prop-types
function StaticClock({ staticDateTime }) {
  console.log('Received Date:', staticDateTime); // Check the received prop

  // Initialize the state variables for time and date
  const [time, setTime] = useState(dayjs(staticDateTime, 'dddd DD/MM/YYYY hh:mm:ss A'));
  const [date, setDate] = useState(dayjs(staticDateTime, 'dddd DD/MM/YYYY hh:mm:ss A').locale('es').format('D MMMM YYYY'));

  // Use effect to update time and date whenever staticDateTime changes
  useEffect(() => {
    // Update time and date when staticDateTime prop changes
    const newTime = dayjs(staticDateTime, 'dddd DD/MM/YYYY hh:mm:ss A');
    setTime(newTime);
    setDate(newTime.locale('es').format('D MMMM YYYY'));
  }, [staticDateTime]); // Dependency array: trigger effect when staticDateTime changes

  // Format the current time in "hh:mm:ss A" format (12-hour format with AM/PM)
  const formattedTime = time.format('dddd hh:mm:ss A');

  return (
    <div className="digital-clock">
      {/* Display the time */}
      <div className="clock-time">
        {formattedTime}
      </div>

      {/* Display the formatted date */}
      <div className="clock-date">{date}</div>
    </div>
  );
}

export default StaticClock;