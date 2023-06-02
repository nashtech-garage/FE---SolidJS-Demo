import * as React from 'react';
import Popover from '@suid/material/Popover';
import Typography from '@suid/material/Typography';
import Button from '@suid/material/Button';
import { Component } from 'solid-js';

interface IPopoverCustomize {
  text: string;
  popoverContent: any;
}
const PopoverCustomize: Component<IPopoverCustomize> = ({ text, popoverContent }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button variant='text' onFocusVisible={handleClick}></Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}>
        {popoverContent}
      </Popover>
    </div>
  );
};

export default PopoverCustomize;
