import { createSignal } from 'solid-js';
import { Button, Grid, Menu, MenuItem, Typography, IconButton } from '@suid/material';
import LocalPhoneIcon from '@suid/icons-material/LocalPhone';
import FavoriteIcon from '@suid/icons-material/Favorite';
import PersonIcon from '@suid/icons-material/Person';
import KeyboardArrowDownIcon from '@suid/icons-material/KeyboardArrowDown';

import { headerTextColor, headerBg } from '../theme';

function SubHeader() {
  const [anchorEl, setAnchorEl] = createSignal<null | HTMLElement>(null);
  const open = () => Boolean(anchorEl());
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid container backgroundColor={headerBg} sx={{ paddingInline: { xs: 1, md: 4 } }}>
      <Grid item xs={6} md={6} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
        <Typography
          sx={{ fontSize: '14px', color: headerTextColor, alignItems: 'center', display: { xs: 'none', md: 'flex' } }}>
          Welcome to NT Store
        </Typography>
        <Typography sx={{ fontSize: '14px', color: headerTextColor, alignItems: 'center', display: 'flex' }}>
          <LocalPhoneIcon sx={{ fontSize: '15px', marginLeft: { md: 2 }, marginRight: 1, color: 'primary.main' }} />
          Call Us: 123-456-7890
        </Typography>
      </Grid>
      <Grid
        item
        xs={6}
        md={6}
        sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: { md: 2, xs: 0.5 } }}>
        <Button
          startIcon={<FavoriteIcon />}
          sx={{ color: headerTextColor, textTransform: 'none', display: { xs: 'none', md: 'inline-flex' } }}>
          Wishlist
        </Button>
        <Button
          startIcon={<PersonIcon />}
          endIcon={<KeyboardArrowDownIcon />}
          sx={{ color: headerTextColor, textTransform: 'none', display: { xs: 'none', md: 'inline-flex' } }}
          id='my-account-button'
          aria-controls={open() ? 'my-account-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open() ? 'true' : undefined}
          onClick={(event) => {
            setAnchorEl(event.currentTarget);
          }}>
          My Account
        </Button>
        {/* Mobile view */}
        <IconButton sx={{ display: { xs: 'block', md: 'none' } }} size='small'>
          <FavoriteIcon fontSize='inherit' />
        </IconButton>
        <IconButton
          sx={{ display: { xs: 'block', md: 'none' } }}
          size='small'
          id='my-account-button'
          aria-controls={open() ? 'my-account-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open() ? 'true' : undefined}
          onClick={(event) => {
            setAnchorEl(event.currentTarget);
          }}>
          <PersonIcon fontSize='inherit' />
        </IconButton>
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
