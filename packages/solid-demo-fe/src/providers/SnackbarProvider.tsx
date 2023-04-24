import { For, JSX, createEffect, createSignal, onCleanup, createMemo } from 'solid-js';
import { v4 as uuidv4 } from 'uuid';
import { Portal } from 'solid-js/web';

import { SnackbarContext } from '../contexts';
import { Snackbar } from '../components';

export interface SnackbarProps {
  id: string;
  title?: string;
  message: string;
  delay: number;
  variant?: 'success' | 'warning' | 'error';
  timerId?: ReturnType<typeof setTimeout>;
}

interface SnackbarProviderProps {
  children: JSX.Element;
  maxSnack?: number;
}

const SnackbarProvider = (props: SnackbarProviderProps): JSX.Element => {
  const [queue, setQueue] = createSignal<SnackbarProps[]>([]);
  const { maxSnack = 3 } = props;
  const push = (message: string, variant?: 'success' | 'warning' | 'error', title?: string, delay = 3000) => {
    const newQueue = { message, delay, id: uuidv4(), variant, title };
    setQueue((prevQueue: SnackbarProps[]) => {
      if (prevQueue.length < maxSnack) {
        return [...prevQueue, newQueue];
      }
      const firstQueue = prevQueue.shift();
      if (firstQueue) {
        clearTimeout(firstQueue.timerId);
      }
      return [...prevQueue, newQueue];
    });
  };

  const shift = (id: string) => {
    setQueue(queue().filter((q) => q.id !== id));
  };

  createEffect(() => {
    queue().forEach((s) => {
      s.timerId = setTimeout(() => shift(s.id), s.delay + 1000);
    });
  });

  onCleanup(() => {
    queue().forEach((s) => s.timerId && clearTimeout(s.timerId));
  });

  const valueProvider = createMemo(() => ({ pushSnackbar: push }));

  return (
    <SnackbarContext.Provider value={valueProvider()}>
      {props.children}
      <Portal mount={document.body}>
        <Snackbar>
          <For each={queue()} children={(s) => <Snackbar.Item {...s} onClose={shift} />} />
        </Snackbar>
      </Portal>
    </SnackbarContext.Provider>
  );
};

export { SnackbarProvider };
