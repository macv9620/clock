import { useState } from 'react';
import './Clock.css'; // Make sure your CSS is properly defined
import dayjs from 'dayjs'; // Import dayjs for date formatting
import 'dayjs/locale/es'; // Import the Spanish locale for dayjs

// eslint-disable-next-line react/prop-types
function StaticClock({ staticDateTime }) {
  console.log('Received Date:', staticDateTime); // Check the received prop

  // Initialize the time with the passed staticDateTime and date in Spanish locale
  const [time] = useState(dayjs(staticDateTime, 'dddd DD/MM/YYYY hh:mm:ss A')); 
  const [date] = useState(dayjs(staticDateTime, 'dddd DD/MM/YYYY hh:mm:ss A').locale('es').format('D MMMM YYYY')); 

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