import { Component, Show, createMemo } from 'solid-js';
import { createFormControl, createFormGroup } from 'solid-forms';
import {
  Box,
  Button,
  Dialog,
  styled,
  Grid,
  Container,
  Avatar,
  CssBaseline,
  Typography,
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
import { CopyrightText, TextFieldCustom } from '../components';

const RegisterModal: Component = () => {
  const { pushSnackbar } = useSnackbar();
  const { authState, actions } = authStore;
  const loginGroup = createFormGroup({
    first_name: createFormControl('', {
      required: true,
    }),
    last_name: createFormControl('', {
      required: true,
    }),
    password: createFormControl('', {
      required: true,
    }),
    email: createFormControl('', {
      required: true,
      validators: [formValidators.email, formValidators.required],
    }),
  });

  const isLoading = createMemo(() => authState.state.status === Phase.Loading);

  const onClose = () => actions.setModalState({ status: null, type: null });

  const onRegisterSuccess = () => pushSnackbar(...SNACKBAR_MESSAGE.REGISTER_SUCCESS);

  const handleCloseModal = (_e: {}, reason: 'backdropClick' | 'escapeKeyDown') => {
    if (reason === 'backdropClick' && isLoading()) {
      return;
    }
    onClose();
  };

  const onSubmit = async (e: Event) => {
    e.preventDefault();
    const { password, email, first_name, last_name } = loginGroup.value;
    if (!loginGroup.isValid || !password || !email || !first_name || !last_name) {
      return;
    }

    loginGroup.markSubmitted(true);
    actions.register({ password, email, first_name, last_name, onRegisterSuccess });
  };

  const redirectLoginForm = () => actions.setModalState({ status: null, type: ModalType.Login });

  return (
    <Dialog onClose={handleCloseModal} open={authState.state.type === ModalType.Register}>
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
            Register
          </Typography>
          <Show
            when={authState.state.status === Phase.Error && !!authState.state.alert}
            children={<AlertStyled severity='error'>{authState.state.alert}</AlertStyled>}
          />
          <Box component='form' onSubmit={onSubmit} sx={{ mt: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextFieldCustom
                  autoComplete='given-name'
                  name='first_name'
                  fullWidth
                  id='firstName'
                  label='First Name'
                  autoFocus
                  control={loginGroup.controls.first_name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextFieldCustom
                  fullWidth
                  id='lastName'
                  label='Last Name'
                  name='last_name'
                  autoComplete='family-name'
                  control={loginGroup.controls.last_name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextFieldCustom
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                  control={loginGroup.controls.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextFieldCustom
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='new-password'
                  control={loginGroup.controls.password}
                />
              </Grid>
            </Grid>
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }} disabled={isLoading()}>
              <Show when={!isLoading()} fallback={<CircularProgress color='inherit' size={31} />}>
                Register
              </Show>
            </Button>
            <RegisterTypographyStyled variant='body2' onClick={redirectLoginForm}>
              Already have an account? Login
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

export { RegisterModal };
