import { ThemeProvider } from '@suid/material';
import { JSX, ParentComponent } from 'solid-js';
import { QueryClientProvider, QueryClient } from '@tanstack/solid-query';

import { SnackbarProvider } from './SnackbarProvider';
import { themeConfig } from '../theme';

interface AppProviderProps {
  children: JSX.Element;
}

const queryClient = new QueryClient();

const AppProvider: ParentComponent<AppProviderProps> = (props) => {
  return (
    <ThemeProvider theme={themeConfig}>
      <SnackbarProvider>
        <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export { AppProvider };
