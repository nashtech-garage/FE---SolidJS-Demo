/* @refresh reload */
import { render } from 'solid-js/web';
import { Router } from '@solidjs/router';
import { ThemeProvider } from '@suid/material';

import './assets/scss/root.scss';
import App from './App';
import { themeConfig } from './theme';
import { SnackbarProvider } from './providers';
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?'
  );
}

const queryClient = new QueryClient();

render(
  () => (
    <ThemeProvider theme={themeConfig}>
      <SnackbarProvider>
        <QueryClientProvider client={queryClient}>
          <Router>
            <App />
          </Router>
        </QueryClientProvider>
      </SnackbarProvider>
    </ThemeProvider>
  ),
  root!
);
