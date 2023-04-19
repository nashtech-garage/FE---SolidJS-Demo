import { Component, JSX } from 'solid-js';

interface SnackbarContainerProps {
  children: JSX.Element;
}

const SnackbarContainer: Component<SnackbarContainerProps> = ({ children }) => {
  return (
    <div id='snackbar-container' class='snackbar-container'>
      {children}
    </div>
  );
};

export { SnackbarContainer };
