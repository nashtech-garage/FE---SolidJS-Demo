import { createTheme } from '@suid/material';
import { green, orange, purple, red } from '@suid/material/colors';

export const theme = createTheme({
  components: {
    MuiButton: {

    }
  },
  palette: {
    primary: {
      main: red[500]
    },
    secondary: {
      main: green[500],
      contrastText: '#FFF'
    }
  },
});



