import { createTheme } from '@suid/material';
import { green, grey, red } from '@suid/material/colors';

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
    },
    info: {
      main: grey[500],
    }
  },
});



