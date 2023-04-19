import { Error, CheckCircle } from '@suid/icons-material';
import { green, yellow, red } from '@suid/material/colors';

export const getSnackbarVariant = (variant?: 'success' | 'warning' | 'error') => {
  if (variant === 'warning') {
    return {
      icon: Error,
      color: yellow[500],
    };
  }
  if (variant === 'error') {
    return {
      icon: Error,
      color: red[600],
    };
  }
  return {
    icon: CheckCircle,
    color: green[600],
  };
};
