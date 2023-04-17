import { createSignal } from 'solid-js';
import { Button, Grid, Menu, MenuItem, Typography } from '@suid/material';
import LocalPhoneIcon from '@suid/icons-material/LocalPhone';
import FavoriteIcon from '@suid/icons-material/Favorite';
import PersonIcon from '@suid/icons-material/Person';
import KeyboardArrowDownIcon from '@suid/icons-material/KeyboardArrowDown';

import { headerTextColor, mainColor, headerBg } from '../theme';

function SubHeader() {
  const [anchorEl, setAnchorEl] = createSignal<null | HTMLElement>(null);
  const open = () => Boolean(anchorEl());
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid container backgroundColor={headerBg} sx={{ paddingInline: 4 }}>
      <Grid item md={6} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
        <Typography sx={{ fontSize: '14px', color: headerTextColor, alignItems: 'center', display: 'flex' }}>
          Welcome to Our store Multikart
          <LocalPhoneIcon sx={{ fontSize: '15px', marginLeft: 2, marginRight: 1, color: mainColor }} />
          Call Us: 123 - 456 - 7890
        </Typography>
      </Grid>
      <Grid item md={6} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 2 }}>
        <Button startIcon={<FavoriteIcon />} sx={{ color: headerTextColor, textTransform: 'none' }}>
          Wishlist
        </Button>
        <Button
          startIcon={<PersonIcon sx={{ fontSize: '21px' }} />}
          endIcon={<KeyboardArrowDownIcon />}
          sx={{ color: headerTextColor, textTransform: 'none' }}
          id='my-account-button'
          aria-controls={open() ? 'my-account-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open() ? 'true' : undefined}
          onClick={(event) => {
            setAnchorEl(event.currentTarget);
          }}>
          My Account
        </Button>

        <Menu
          id='my-account-menu'
          anchorEl={anchorEl()}
          open={open()}
          onClose={handleClose}
          MenuListProps={{ 'aria-labelledby': 'my-account-button' }}>
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </Grid>
    </Grid>
  );
}

export { SubHeader };
