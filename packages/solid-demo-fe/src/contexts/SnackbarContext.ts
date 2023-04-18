import { useContext, createContext } from 'solid-js';

interface ISnackbarContext {
  pushSnackbar: (message: string, variant?: 'success' | 'warning' | 'error', title?: string, delay?: number) => void;
}

export const SnackbarContext = createContext<ISnackbarContext>({
  pushSnackbar: () => {},
});

const useSnackbar = (): ISnackbarContext => useContext(SnackbarContext);

export { useSnackbar };
