import { createSignal } from 'solid-js';
import { Button, Grid, Menu, MenuItem, Typography, IconButton, styled } from '@suid/material';
import LocalPhoneIcon from '@suid/icons-material/LocalPhone';
import FavoriteIcon from '@suid/icons-material/Favorite';
import PersonIcon from '@suid/icons-material/Person';
import KeyboardArrowDownIcon from '@suid/icons-material/KeyboardArrowDown';

function SubHeader() {
  const [anchorEl, setAnchorEl] = createSignal<null | HTMLElement>(null);
  const open = () => Boolean(anchorEl());
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ContainerStyled container>
      <LeftBoxStyled item xs={6} md={6}>
        <WelcomeTextStyled>Welcome to NT Store</WelcomeTextStyled>
        <CallUsTextStyled>
          <LocalPhoneIconStyled fontSize='inherit' />
          Call Us: 123-456-7890
        </CallUsTextStyled>
      </LeftBoxStyled>
      <ToolBoxStyled item xs={6} md={6}>
        <ButtonStyled startIcon={<FavoriteIcon />}>Wishlist</ButtonStyled>
        <ButtonStyled
          startIcon={<PersonIcon />}
          endIcon={<KeyboardArrowDownIcon />}
          id='my-account-button'
          aria-controls={open() ? 'my-account-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open() ? 'true' : undefined}
          onClick={(event) => {
            setAnchorEl(event.currentTarget);
          }}>
          My Account
        </ButtonStyled>
        {/* Mobile view */}
        <IconButtonStyled size='small'>
          <FavoriteIcon fontSize='inherit' />
        </IconButtonStyled>
        <IconButtonStyled
          size='small'
          id='my-account-button'
          aria-controls={open() ? 'my-account-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open() ? 'true' : undefined}
          onClick={(event) => {
            setAnchorEl(event.currentTarget);
          }}>
          <PersonIcon fontSize='inherit' />
        </IconButtonStyled>
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
      </ToolBoxStyled>
    </ContainerStyled>
  );
}

const ContainerStyled = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    paddingInline: 32,
  },
  [theme.breakpoints.down('md')]: {
    paddingInline: 16,
  },
  backgroundColor: theme.palette.grey[300],
}));

const WelcomeTextStyled = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  color: theme.palette.grey[600],
  alignItems: 'center',
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const CallUsTextStyled = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  color: theme.palette.grey[600],
  alignItems: 'center',
  display: 'flex',
}));

const LeftBoxStyled = styled(Grid)({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
});

const LocalPhoneIconStyled = styled(LocalPhoneIcon)(({ theme }) => ({
  fontSize: '15px !important',
  marginRight: 4,
  color: theme.palette.primary.main,
  [theme.breakpoints.up('md')]: {
    marginLeft: 16,
  },
}));

const ToolBoxStyled = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  [theme.breakpoints.up('md')]: {
    gap: 16,
  },
  [theme.breakpoints.down('md')]: {
    gap: 4,
  },
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
  color: theme.palette.grey[600],
  textTransform: 'none',
  fontSize: 15,
  [theme.breakpoints.up('md')]: {
    display: 'inline-flex',
  },
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const IconButtonStyled = styled(IconButton)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
  [theme.breakpoints.down('md')]: {
    display: 'block',
  },
}));

export { SubHeader };
