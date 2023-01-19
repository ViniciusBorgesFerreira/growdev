import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#7e37ef',
      main: '#243fc9',     
      contrastText: '#fff',
    },
    secondary: {
      light: '#7e37ef',
      main: '#7e37ef',
      dark: '#243fc9',
      contrastText: '#fff',
    },
  },
});

export { theme }