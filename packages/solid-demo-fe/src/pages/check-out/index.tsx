import {
  Button,
  Container,
  FormControl,
  Grid,
  List,
  ListItem,
  ListItemText,
  OutlinedInput,
  styled,
} from '@suid/material';
import { createFormControl, createFormGroup } from 'solid-forms';
import { createEffect } from 'solid-js';
import GreyCard from '../../components/GreyCard/GreyCard';
import CheckoutDetail from './CheckoutDetail';
import { FormValidators } from './validators';
import { TextFieldCustom } from '../../components';

const Checkout = () => {
  const group = createFormGroup({
    fisrtName: createFormControl(''),
    lastName: createFormControl(''),
    phone: createFormControl(''),
    email: createFormControl('', {
      required: true,
      validators: [FormValidators.required, FormValidators.email],
    }),
    country: createFormControl(''),
    address: createFormControl(''),
    city: createFormControl(''),
  });

  // This will automatically re-run whenever `group.isDisabled`, `group.isValid` or `group.value` change
  createEffect(() => {
    if (group.isDisabled || !group.isValid) return;

    console.log('Current group value', group.value);
  });

  const onSubmit = async (e: Event) => {
    e.preventDefault();
    if (group.isSubmitted) {
      console.log('already submitted');
      return;
    }

    if (!group.isValid) {
      console.log('form invalid');
      return;
    }

    // group.markSubmitted(true);

    console.log('submitted!');
    // do stuff...
    // const { name, email } = group.value;
    console.log(group.value);
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
                  <TextFieldCustom id='first-name' name='firstName' control={group.controls.fisrtName} />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <p>Last Name</p>
                  <TextFieldCustom id='last-name' name='lastName' control={group.controls.lastName} />
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <p>Phone</p>
                  <TextFieldCustom id='phone' name='phone' control={group.controls.phone} />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <p>Email address</p>
                  <TextFieldCustom id='email' name='email' control={group.controls.email} />
                </FormControl>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <p>Country</p>
                <TextFieldCustom id='country' name='country' control={group.controls.country} />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <p>Address</p>
                <TextFieldCustom id='address' name='address' control={group.controls.address} />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <p>Town / City</p>
                <TextFieldCustom id='city' name='city' control={group.controls.city} />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <p>State / County</p>
                <TextFieldCustom id='city' name='city' control={group.controls.city} />
              </FormControl>
            </Grid>
            <Grid item xs={12} sx={{ marginBottom: '16px' }}>
              <FormControl fullWidth>
                <p>Postal Code</p>
                <OutlinedInput />
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
