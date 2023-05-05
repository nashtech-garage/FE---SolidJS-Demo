import { Show, createSignal } from 'solid-js';
import { Button, Grid, Menu, MenuItem, Typography, IconButton, styled } from '@suid/material';
import {
  LocalPhone as LocalPhoneIcon,
  Favorite as FavoriteIcon,
  Person as PersonIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  Login as LoginIcon,
} from '@suid/icons-material';
import { useNavigate } from '@solidjs/router';

import { authStore } from '../store';
import { ModalType } from '../store/auth/types';
import { useSnackbar } from '../contexts';
import { SNACKBAR_MESSAGE } from '../constants';

export const [isLoggin, setIsLoggin] = createSignal(false);

const SubHeader = () => {
  const { pushSnackbar } = useSnackbar();
  const { authState, actions } = authStore;
  const [anchorEl, setAnchorEl] = createSignal<null | HTMLElement>(null);
  const open = () => Boolean(anchorEl());
  const navigate = useNavigate();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickOpenDialog = () => actions.setModalState({ ...authState.state, type: ModalType.Login });

  const onLogoutSuccess = () => pushSnackbar(...SNACKBAR_MESSAGE.LOGOUT_SUCCESS);
  const handleLogout = () => {
    actions.logout({ onLogoutSuccess });
    handleClose();
  };
  const handleGoToAccount = () => navigate('/my-profile/detail');

  return (
    <>
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
          <Show
            when={!!authState.user}
            fallback={
              <ButtonStyled onClick={handleClickOpenDialog} startIcon={<LoginIcon />}>
                Log in
              </ButtonStyled>
            }>
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
          </Show>

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
            <MenuItem onClick={handleGoToAccount}>My account</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </ToolBoxStyled>
      </ContainerStyled>
    </>
  );
};

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
