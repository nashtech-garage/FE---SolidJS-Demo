import { createTheme } from '@suid/material';
import { grey, deepOrange, green } from '@suid/material/colors';

const themeConfig = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        style: {
          "border-radius": 0
        },
      }
    }
  },
  typography: {
    fontFamily: 'Lato'
  },
  palette: {
    text: {
      primary: grey[900],
      secondary: grey[500]
    },
    primary: {
      main: deepOrange[500],
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

export { themeConfig };
