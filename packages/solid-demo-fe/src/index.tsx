/* @refresh reload */
import { render } from 'solid-js/web';
import { Router } from '@solidjs/router';
import { ThemeProvider } from '@suid/material';

import './assets/scss/root.scss';
import App from './App';
import { themeConfig } from './theme';
import { SnackbarProvider } from './providers';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?'
  );
}

render(
  () => (
    <ThemeProvider theme={themeConfig}>
      <SnackbarProvider>
        <Router>
          <App />
        </Router>
      </SnackbarProvider>
    </ThemeProvider>
  ),
  root!
);
