import { Backdrop, CircularProgress } from '@suid/material';
import { Component } from 'solid-js';

const LoadingOverlay: Component<{ open: boolean }> = (props) => {
  return (
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.modal + 1 }} open={props.open}>
      <CircularProgress color='inherit' />
    </Backdrop>
  );
};

export { LoadingOverlay };
