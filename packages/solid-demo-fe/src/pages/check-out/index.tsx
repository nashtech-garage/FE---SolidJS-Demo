import { Container, FormControl, Grid, List, ListItem, ListItemText, OutlinedInput, styled } from '@suid/material';
import { createFormControl, createFormGroup } from 'solid-forms';
import { createEffect } from 'solid-js';
import { TextFieldCustom } from '../../components';
import GreyCard from '../../components/GreyCard/GreyCard';
import { CartAction, cartStore, dispatchCart } from '../../store';
import { authStore } from '../../store';
import CheckoutDetail from './CheckoutDetail';
import { FormValidators } from './validators';
import { useSnackbar } from '../../contexts';
import { SNACKBAR_MESSAGE } from '../../constants';

const Checkout = () => {
  const cart = () => cartStore.cart;
  const auth = () => authStore;
  const { actions } = authStore;
  const { pushSnackbar } = useSnackbar();

  const onClose = () => actions.setModalState({ status: null, type: null });

  const onOpenNoti = (isSuccess: boolean) => {
    onClose();
    if (isSuccess) {
      pushSnackbar(...SNACKBAR_MESSAGE.PLACE_ORDER_SUCCESS);
    } else {
      pushSnackbar(...SNACKBAR_MESSAGE.PLACE_ORDER_FAIL);
    }
  };

  const form = createFormGroup({
    firstName: createFormControl('', {
      required: true,
      validators: [FormValidators.required],
    }),
    lastName: createFormControl('', {
      required: true,
      validators: [FormValidators.required],
    }),
    phone: createFormControl('', {
      required: true,
      validators: [FormValidators.required, FormValidators.phone],
    }),
    email: createFormControl('', {
      required: true,
      validators: [FormValidators.required, FormValidators.email],
    }),
    countryCode: createFormControl(''),
    address: createFormControl(''),
    city: createFormControl(''),
    state: createFormControl(''),
    province: createFormControl(''),
    postalCode: createFormControl(''),
  });

  const onSubmit = async (e: Event) => {
    e.preventDefault();

    if (!form.isValid) {
      return;
    }
    form.markSubmitted(true);
    dispatchCart(CartAction.CompleteCart, { form: form.value, onOpenNoti });
  };

  return (
    <ContainerStyle>
      <form onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6} md={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <p>First Name</p>
                  <TextFieldCustom id='first-name' name='firstName' control={form.controls.firstName} />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <p>Last Name</p>
                  <TextFieldCustom id='last-name' name='lastName' control={form.controls.lastName} />
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <p>Phone</p>
                  <TextFieldCustom id='phone' name='phone' control={form.controls.phone} />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <p>Email address</p>
                  <TextFieldCustom id='email' name='email' autoComplete='email' control={form.controls.email} />
                </FormControl>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <p>Country</p>
                <TextFieldCustom id='country' name='country' control={form.controls.countryCode} />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <p>Address</p>
                <TextFieldCustom id='address' name='address' control={form.controls.address} />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <p>Town / City</p>
                <TextFieldCustom id='city' name='city' control={form.controls.city} />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <p>State / County</p>
                <TextFieldCustom id='state' name='state' control={form.controls.state} />
              </FormControl>
            </Grid>
            <Grid item xs={12} sx={{ marginBottom: '16px' }}>
              <FormControl fullWidth>
                <p>Postal Code</p>
                <TextFieldCustom id='postalCode' name='postalCode' control={form.controls.postalCode} />
              </FormControl>
            </Grid>
            <GreyCard
              headerText='PAYPAL'
              content={
                <ListStyle>
                  <ListItem divider disablePadding>
                    <DivStyle>
                      <ListItemText primary='CART NUMBER' />
                      <ListItemText sx={{ textAlign: 'right' }} primary='4242424242424242' />
                    </DivStyle>
                  </ListItem>
                  <ListItem divider disablePadding>
                    <DivStyle>
                      <ListItemText primary='MM/YY' />
                      <ListItemText sx={{ textAlign: 'right' }} primary='2/2020' />
                    </DivStyle>
                  </ListItem>
                  <ListItem disablePadding>
                    <DivStyle>
                      <ListItemText primary='CVC' />
                      <ListItemText sx={{ textAlign: 'right' }} primary='4242424242424242' />
                    </DivStyle>
                  </ListItem>
                </ListStyle>
              }
            />
          </Grid>

          <Grid item xs={6} md={6}>
            <CheckoutDetail />
          </Grid>
        </Grid>
      </form>
    </ContainerStyle>
  );
};

const ContainerStyle = styled(Container)(() => ({
  '& .MuiInputBase-root, .MuiInputBase-input': {
    height: '45px',
    boxSizing: 'border-box',
    // padding: '0'
  },
}));

const DivStyle = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
}));

const ListStyle = styled(List)(() => ({
  '& > li': {
    padding: '8px 0px',
    fontSize: '14px',
  },
}));

export default Checkout;
