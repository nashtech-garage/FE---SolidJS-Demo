import { createTheme } from '@suid/material';
import { grey, deepOrange } from '@suid/material/colors';

const themeConfig = createTheme({
  palette: {
    text: {
      primary: grey[900],
    },
    primary: {
      main: deepOrange[500],
    },
  },
});

export { themeConfig };
