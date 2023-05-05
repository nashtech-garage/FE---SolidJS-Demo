import { ValidatorFn, createFormControl, createFormGroup } from 'solid-forms';
import { Box, Button, Dialog, DialogTitle, styled } from '@suid/material';
import { createEffect, createRenderEffect, createSignal } from 'solid-js';
import { TextInput } from '../Input/Input';
import { customerLogin, customerRegister } from '../../utils';
import { setIsLoggin } from '../../layouts/SubHeader';

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
}

const [isLogginForm, setIsLogginForm] = createSignal(true);
const requiredValidator: ValidatorFn = (rawValue: string) => {
  if (rawValue) {
    rawValue.length === 0 ? { isMissing: true } : null;
  }
  return null;
};

export const RegisterForm = (props: SimpleDialogProps) => {
  const handleClose = () => {
    props.onClose();
  };
  const loginGroup = createFormGroup({
    password: createFormControl('', {
      required: true,
      // validators: [requiredValidator],
    }),
    email: createFormControl('', {
      required: true,
      // validators: [requiredValidator],
    }),
  });

  const registerGroup = createFormGroup({
    email: createFormControl('', {
      required: true,
      validators: [requiredValidator],
    }),
    first_name: createFormControl('', {
      required: true,
      validators: [requiredValidator],
    }),
    last_name: createFormControl('', {
      required: true,
      validators: [requiredValidator],
    }),
    password: createFormControl('', {
      required: true,
    }),
    confirmpassword: createFormControl('', {
      required: true,
    }),
  });

  createRenderEffect(() => {
    const password = registerGroup.value.password;
    if (registerGroup.value.confirmpassword !== password) {
      registerGroup.setErrors({ isMissing: true });
    } else {
      registerGroup.setErrors({ passworAndConfirmPasswordMismatch: false });
    }
  });
  // This will automatically re-run whenever `loginGroup.isDisabled`, `loginGroup.isValid` or `loginGroup.value` change
  createEffect(() => {
    if (loginGroup.isDisabled || !loginGroup.isValid) return;
    console.log('Current loginGroup value', loginGroup.value);
  });

  const onSubmit = async (event: any) => {
    event.preventDefault();
    console.log(registerGroup);
    if (isLogginForm()) {
      if (loginGroup.isSubmitted || !loginGroup.isValid) return;

      const { email, password } = loginGroup.value;
      if (email && password) {
        try {
          await customerLogin(email, password);
          setIsLoggin(true);
          handleClose();
        } catch (e) {
          console.log(e);
        }
      }
      // do stuff...
    } else {
      const { first_name, last_name, email, password } = registerGroup.value;
      if (first_name && last_name && email && password) {
        try {
          await customerRegister(email, password, first_name, last_name);
          handleClose();
        } catch (e) {
          console.log(e);
        }
      }
    }
  };
  return (
    <Dialog onClose={handleClose} open={props.open}>
      <DialogTitle style={{ 'text-align': 'center' }}>Log in</DialogTitle>
      <Box style={{ padding: '2rem 4rem' }}>
        <form onSubmit={onSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr' }}>
          {isLogginForm() ? (
            <>
              <TextInput name='email' type='email' label='Email' control={loginGroup.controls.email} />
              <TextInput name='password' label='Password' control={loginGroup.controls.password} />
              <StyledBox onClick={() => setIsLogginForm(false)}>Don't have account? click here to register</StyledBox>
            </>
          ) : (
            <>
              <TextInput name='first_name' type='text' label='First Name' control={registerGroup.controls.first_name} />
              <TextInput name='last_name' type='text' label='Last Name' control={registerGroup.controls.last_name} />
              <TextInput name='email' type='email' label='Email' control={registerGroup.controls.email} />
              <TextInput name='password' label='Password' control={registerGroup.controls.password} />
              <TextInput
                name='confirmpassword'
                label='Confirm Password'
                control={registerGroup.controls.confirmpassword}
              />
              <StyledBox onClick={() => setIsLogginForm(true)}>Already have account? click here to login</StyledBox>
            </>
          )}
          <Button type='submit' variant='outlined'>
            Submit
          </Button>
        </form>
      </Box>
    </Dialog>
  );
};

const StyledBox = styled(Box)({
  cursor: 'pointer',
  color: 'blue',
  textAlign: 'center',
  paddingBottom: '1rem',
});
