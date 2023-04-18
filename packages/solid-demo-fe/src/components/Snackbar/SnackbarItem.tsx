import { Component, Show } from 'solid-js';
import { Box, IconButton, Typography } from '@suid/material';
import { Close as CloseIcon } from '@suid/icons-material';
import { grey } from '@suid/material/colors';

import { getSnackbarVariant } from '../../utils';
import { SnackbarProps } from '../../providers';

interface SnackbarItemProps extends SnackbarProps {
  onClose?: (id: string) => void;
}

const SnackbarItem: Component<SnackbarItemProps> = ({ variant = 'success', message, delay, id, title, onClose }) => {
  const handleClose = () => onClose && onClose(id);
  const { icon: Icon, color } = getSnackbarVariant(variant);
  const delayAnimation = (delay / 1000).toFixed(1);

  return (
    <div class='snackbar' style={{ animation: `slideInLeft ease 0.3s, fadeOut linear 1s ${delayAnimation}s forwards` }}>
      <Icon sx={{ color }} />
      <Box>
        <Show
          when={!!title}
          children={
            <Typography
              class='snackbar__message'
              variant='subtitle1'
              sx={{ color: grey[600], marginInline: 2, fontSize: '15px', fontWeight: 'bold' }}>
              {title}
            </Typography>
          }
        />

        <Typography class='snackbar__message' sx={{ color: grey[600], fontSize: '15px', marginInline: 2 }}>
          {message}
        </Typography>
      </Box>

      <IconButton class='snackbar__close-button' size='small' onClick={handleClose}>
        <CloseIcon sx={{ fontSize: '21px' }} />
      </IconButton>
    </div>
  );
};

export { SnackbarItem };
