// // import { useState } from 'react'
// import './App.css'
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

// function App() {
//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DemoContainer components={['DateTimePicker']}>
//         <DateTimePicker label="💘 Mor cuando va a caer 💞" />
//       </DemoContainer>
//     </LocalizationProvider>
//   );
// }

// export default App

// import { useState } from 'react';
// import './App.css';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
// import { TextField, createTheme, ThemeProvider } from '@mui/material';
// import dayjs from 'dayjs'; // Import dayjs
// import 'dayjs/locale/es'; // Import the Spanish locale

// // Set dayjs to use the Spanish locale
// dayjs.locale('es');  // This tells dayjs to use Spanish locale globally

// function App() {
//   const [value, setValue] = useState(null);

//   // Create a light theme using MUI's createTheme
//   const theme = createTheme({
//     palette: {
//       mode: 'light', // Light theme
//     },
//   });

//   return (
//     // Apply the theme globally using ThemeProvider
//     <ThemeProvider theme={theme}>
//       <LocalizationProvider dateAdapter={AdapterDayjs}>
//         <DateTimePicker
//           label="💘 Mor cuando va a caer 💞"  // Spanish label
//           value={value}
//           onChange={(newValue) => setValue(newValue)}
//           renderInput={(params) => <TextField {...params} />}
//         />
//       </LocalizationProvider>
//     </ThemeProvider>
//   );
// }

// export default App;


// import { useState } from 'react';
// import './App.css';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
// import { TextField, Button, createTheme, ThemeProvider, Typography } from '@mui/material';
// import dayjs from 'dayjs'; // Import dayjs
// import 'dayjs/locale/es'; // Import the Spanish locale for dayjs
// import 'dayjs/plugin/localeData'; // Import localeData plugin for AM/PM formatting
// import 'dayjs/plugin/advancedFormat'; // Import advancedFormat plugin for custom formatting

// // Set the locale for dayjs to Spanish
// dayjs.locale('es'); // This will set dayjs to use Spanish globally

// function App() {
//   const [selectedDateTime, setSelectedDateTime] = useState(null); // Selected date from picker
//   const [hoursDifference, setHoursDifference] = useState(null); // To store the calculated difference in hours

//   // Function to calculate the difference in hours
//   const calculateDifference = () => {
//     if (selectedDateTime) {
//       const currentDateTime = dayjs(); // Get current date and time
//       const diffInHours = currentDateTime.diff(selectedDateTime, 'hour', true); // 'true' gives a floating point result
//       setHoursDifference(-diffInHours); // Store the result
//     } else {
//       alert('Por favor, selecciona una fecha y hora.');
//     }
//   };

//   // Create a light theme using MUI's createTheme
//   const theme = createTheme({
//     palette: {
//       mode: 'light', // Light theme
//     },
//   });

//   return (
//     // Apply the theme globally using ThemeProvider
//     <ThemeProvider theme={theme}>
//       {/* LocalizationProvider with AdapterDayjs and Spanish locale */}
//       <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='zh-cn'>
//         <div style={{ padding: '20px' }}>
//           <DateTimePicker
//             label="Selecciona fecha y hora" // Label in Spanish
//             value={selectedDateTime}
//             onChange={(newValue) => setSelectedDateTime(newValue)}
//             renderInput={(params) => <TextField {...params} fullWidth />}
//             format="DD/MM/YYYY hh:mm A"
//            // Custom format for input: day/month/year hour:minute AM/PM
//           />
//           <Button 
//             variant="contained" 
//             color="primary" 
//             onClick={calculateDifference} 
//             style={{ marginTop: '20px' }}
//             disabled={!selectedDateTime}  // Disable button if no date is selected
//           >
//             Calcular diferencia en horas
//           </Button>

//           {hoursDifference !== null && (
//             <Typography variant="h6" style={{ marginTop: '20px' }}>
//               Diferencia: {hoursDifference.toFixed(2)} horas
//             </Typography>
//           )}
//         </div>
//       </LocalizationProvider>
//     </ThemeProvider>
//   );
// }

// export default App;


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

// Set the locale for dayjs to Spanish
dayjs.locale('es'); // This will set dayjs to use Spanish globally

function App() {
  const [selectedDateTime, setSelectedDateTime] = useState(null); // Selected date from picker
  const [hoursDifference, setHoursDifference] = useState(null); // To store the calculated difference in hours
  const [currentDateTime, setCurrentDateTime] = useState(dayjs()); // To store the current date and time

  // Function to calculate the difference in hours
  const calculateDifference = () => {
    if (selectedDateTime) {
      const diffInHours = dayjs().diff(selectedDateTime, 'hour', true); // Calculate the difference in hours
      setHoursDifference(-diffInHours); // Store the result (negative to show difference as positive)
    } else {
      alert('Por favor, selecciona una fecha y hora.');
    }
  };

  // Update current date and time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(dayjs()); // Update the current date and time
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  // Create a light theme using MUI's createTheme
  const theme = createTheme({
    palette: {
      mode: 'light', // Light theme
    },
  });

  return (
    // Apply the theme globally using ThemeProvider
    <ThemeProvider theme={theme}>
      {/* LocalizationProvider with AdapterDayjs and Spanish locale */}
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='zh-cn'>
        <div style={{ padding: '20px' }}>
          {/* Display the current date and time in the desired format */}
          <Typography variant="h6" style={{ marginBottom: '20px' }}>
            ¿Qué fecha es hoy? pues hoy es {currentDateTime.format('dddd DD/MM/YYYY hh:mm:ss A')} {/* Format the current datetime */}
          </Typography>

          <DateTimePicker
            label="💘 Mor cuando va a caer 💞" // Label in Spanish
            value={selectedDateTime}
            onChange={(newValue) => setSelectedDateTime(newValue)}
            renderInput={(params) => <TextField {...params} fullWidth />}
            // inputFormat="DD/MM/YYYY hh:mm A" // Custom format for input: day/month/year hour:minute AM/PM
            format="DD/MM/YYYY hh:mm A"

          />
          <Button 
            variant="contained" 
            color="primary" 
            onClick={calculateDifference} 
            style={{ marginTop: '20px' }}
            disabled={!selectedDateTime}  // Disable button if no date is selected
          >
            En cuantas horas cae
          </Button>

          {hoursDifference !== null && (
            <><Typography variant="h6" style={{ marginTop: '20px' }}>
              En {hoursDifference.toFixed(2)} horas será
            </Typography>
                      <Typography variant="h6" style={{ marginBottom: '20px' }}>
                      {selectedDateTime.format('dddd DD/MM/YYYY hh:mm:ss A')} {/* Format the current datetime */}
                    </Typography>
                    </>
          )}
        </div>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;