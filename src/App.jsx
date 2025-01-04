import { useState } from 'react';
import './App.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { TextField, Button, createTheme, ThemeProvider, Typography } from '@mui/material';
import dayjs from 'dayjs'; // Import dayjs
import 'dayjs/locale/es'; // Import the Spanish locale for dayjs
import 'dayjs/plugin/localeData'; // Import localeData plugin for AM/PM formatting
import 'dayjs/plugin/advancedFormat'; // Import advancedFormat plugin for custom formatting

import Clock from './Clock';
import StaticClock from './StatickClock';
import Confetti from 'react-confetti'; // Import react-confetti

// Set the locale for dayjs to Spanish
dayjs.locale('es'); // This will set dayjs to use Spanish globally

function App() {
  const [selectedDateTime, setSelectedDateTime] = useState(null); // Selected date from picker
  const [hoursDifference, setHoursDifference] = useState(null); // To store the calculated difference in hours
  const [confetti, setConfetti] = useState(false); // State to trigger confetti animation
  // Function to calculate the difference in hours
  const calculateDifference = () => {
    if (selectedDateTime) {
      const diffInHours = dayjs().diff(selectedDateTime, 'hour', true); // Calculate the difference in hours
      setHoursDifference(-diffInHours); // Store the result (negative to show difference as positive)

      // Trigger confetti animation for 5 seconds
      setConfetti(true);
      setTimeout(() => {
        setTimeout(() => setConfetti(false)); // Confetti disappears after the fade-out transition
      }, 4500); // Confetti lasts for 5 seconds
    } else {
      alert('Por favor, selecciona una fecha y hora.');
    }
  };

  const theme = createTheme({
    palette: {
      mode: 'light', // Light theme
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="zh-cn">
        <div style={{ padding: '20px' }}>
          <Clock />
          <DateTimePicker
            label="💘 Mor cuando va a caer 💞"
            value={selectedDateTime}
            onChange={(newValue) => setSelectedDateTime(newValue)}
            renderInput={(params) => <TextField {...params} fullWidth />}
            format="DD/MM/YYYY hh:mm A"
            onOpen={()=> setHoursDifference(null)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={calculateDifference}
            style={{ marginTop: '20px' }}
            disabled={!selectedDateTime} // Disable button if no date is selected
          >
            En cuantas horas cae
          </Button>

          {hoursDifference !== null && (
            <>
              <Typography variant="h6" style={{ marginTop: '20px' }}>
                En {hoursDifference.toFixed(2)} horas será
              </Typography>
              <StaticClock staticDateTime={selectedDateTime.format('dddd DD/MM/YYYY hh:mm:ss A')} />
            </>
          )}
        </div>

        {/* Confetti Animation */}
        {confetti && (
          <div className='confetti-container'>
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            numberOfPieces={300}
            tweenDuration={5000}
          />
          </div>
        )}
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;