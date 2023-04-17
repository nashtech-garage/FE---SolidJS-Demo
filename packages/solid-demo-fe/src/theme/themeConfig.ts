import { createTheme } from '@suid/material';
import { grey } from '@suid/material/colors';

const themeConfig = createTheme({
  palette: {
    text: {
      primary: grey[900],
    },
  },
});

export { themeConfig };
