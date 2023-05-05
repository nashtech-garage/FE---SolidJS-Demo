import { Component, Show, createMemo } from 'solid-js';
import { createFormControl, createFormGroup } from 'solid-forms';
import {
  Box,
  Button,
  Dialog,
  styled,
  Container,
  Avatar,
  CssBaseline,
  Typography,
  FormControlLabel,
  Alert,
  CircularProgress,
} from '@suid/material';
import { LockOutlined as LockOutlinedIcon } from '@suid/icons-material';

import { SNACKBAR_MESSAGE } from '../constants';
import { authStore } from '../store';
import { formValidators } from '../helpers';
import { useSnackbar } from '../contexts';
import { ModalType } from '../store/auth/types';
import { Phase } from '../types';
import { CopyrightText, TextFieldCustom, CheckBoxCustom } from '../components';

const LoginModal: Component = () => {
  const { pushSnackbar } = useSnackbar();
  const { authState, actions } = authStore;
  const loginGroup = createFormGroup({
    password: createFormControl('', {
      required: true,
    }),
    email: createFormControl('', {
      required: true,
      validators: [formValidators.email],
    }),
    persist: createFormControl(false),
  });

  const isLoading = createMemo(() => authState.state.status === Phase.Loading);

  const onClose = () => actions.setModalState({ status: null, type: null });

  const onLoginSuccess = () => {
    onClose();
    pushSnackbar(...SNACKBAR_MESSAGE.LOGIN_SUCCESS);
  };

  const handleCloseModal = (_e: {}, reason: 'backdropClick' | 'escapeKeyDown') => {
    if (reason === 'backdropClick' && isLoading()) {
      return;
    }
    onClose();
  };

  const onSubmit = async (e: Event) => {
    e.preventDefault();
    const { password, email, persist } = loginGroup.value;
    if (!loginGroup.isValid || !password || !email || typeof persist !== 'boolean') {
      return;
    }

    loginGroup.markSubmitted(true);
    actions.loggin({ email, password, persist, onLoginSuccess });
  };

  const redirectRegisterForm = () => actions.setModalState({ status: null, type: ModalType.Register, alert: null });

  return (
    <Dialog onClose={handleCloseModal} open={authState.state.type === ModalType.Login}>
      <Container maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Login
          </Typography>
          <Show
            when={authState.state.status === Phase.Error && !!authState.state.alert}
            children={<AlertStyled severity='error'>{authState.state.alert}</AlertStyled>}
          />
          <Box component='form' onSubmit={onSubmit} sx={{ mt: 1 }}>
            <TextFieldCustom
              margin='normal'
              fullWidth
              label='Email Address'
              name='email'
              autoComplete='email'
              control={loginGroup.controls.email}
            />
            <TextFieldCustom
              margin='normal'
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              control={loginGroup.controls.password}
            />
            <FormControlLabel
              control={<CheckBoxCustom control={loginGroup.controls.persist} />}
              label='Remember me'
              sx={{ marginBlockStart: '16px' }}
            />
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }} disabled={isLoading()}>
              <Show when={!isLoading()} fallback={<CircularProgress color='inherit' size={31} />}>
                Login
              </Show>
            </Button>
            <RegisterTypographyStyled variant='body2' onClick={redirectRegisterForm}>
              Don't have an account? Register
            </RegisterTypographyStyled>
          </Box>
        </Box>
        <CopyrightText sx={{ marginBlock: 4 }} />
      </Container>
    </Dialog>
  );
};

const RegisterTypographyStyled = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'underline',
  cursor: 'pointer',
  textAlign: 'right',
}));

const AlertStyled = styled(Alert)({
  alignItems: 'center',
  marginBlock: 8,
});

export { LoginModal };
