import { useContext, createContext } from 'solid-js';

interface ISnackbarContext {
  pushSnackbar: (message: string, timeout?: number) => void;
}

export const SnackbarContext = createContext<ISnackbarContext>({
  pushSnackbar: () => {},
});

const useSnackbar = (): ISnackbarContext => useContext(SnackbarContext);

export { useSnackbar };
