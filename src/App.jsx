import { useState, useEffect } from 'react';
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
  const [showWelcome, setShowWelcome] = useState(true); // State to control welcome screen visibility

  // Function to calculate the difference in hours
  const calculateDifference = () => {
    if (selectedDateTime) {
      const diffInHours = dayjs().diff(selectedDateTime, 'hour', true); // Calculate the difference in hours
      setHoursDifference(-diffInHours); // Store the result (negative to show difference as positive)

      // Trigger confetti animation for 5 seconds
      setConfetti(true);
      setTimeout(() => {
        setConfetti(false); // Confetti disappears after the fade-out transition
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

  // Set up the welcome screen to disappear after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false); // Hide the welcome screen after 5 seconds
    }, 5000);

    // Clear the timer if the component is unmounted
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="zh-cn">
        {/* Show Welcome Screen */}
        {showWelcome && (
          <div className={`welcome-screen ${showWelcome ? 'fade-out' : ''}`}>
            <div>¡Bienvenida!</div>
            <img src='https://feriadelavivienda.co/wp-content/uploads/2020/10/logo-bancolombia-2.png' width={'200px'}/>
          </div>
        )}

        <div style={{ padding: '20px' }}>
          <Clock />
          <DateTimePicker
            label="🕓 Datos de apertura"
            value={selectedDateTime}
            onChange={(newValue) => setSelectedDateTime(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                sx={{
                  '.MuiInputBase-input': {
                    textAlign: 'center', // Center placeholder text
                  },
                  '.MuiInputLabel-root': {
                    textAlign: 'center', // Center label text (optional)
                  },
                }}
              />
            )}
            format="DD/MM/YYYY hh:mm A"
            onOpen={() => setHoursDifference(null)}
            sx={{ width: '187px' }} // Set a custom width here
          />
          <Button
            variant="contained"
            color="primary"
            onClick={calculateDifference}
            style={{ marginTop: '20px' }}
            disabled={!selectedDateTime} // Disable button if no date is selected
          >
            Horas a programar
          </Button>

          {hoursDifference !== null && (
            <>
              <Typography
                fontFamily={'Courier New'}
                fontWeight={700}
                variant="h6"
                style={{ marginTop: '20px', marginBottom: '20px' }}
              >
                En {hoursDifference.toFixed(2)} horas será:
              </Typography>
              <StaticClock staticDateTime={selectedDateTime.format('dddd DD/MM/YYYY hh:mm:ss A')} />
            </>
          )}
        </div>

        {/* Confetti Animation */}
        {confetti && (
          <div className="confetti-container">
            <Confetti width={window.innerWidth} height={window.innerHeight} numberOfPieces={300} tweenDuration={5000} />
          </div>
        )}
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;