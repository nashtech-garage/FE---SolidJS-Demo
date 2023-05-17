import {
  Card,
  Container,
  FormControl,
  Grid,
  List,
  ListItem,
  ListItemText,
  OutlinedInput,
  styled,
} from '@suid/material';
import { createSignal } from 'solid-js';
import GreyCard from '../../components/GreyCard/GreyCard';
import CheckoutDetail from './CheckoutDetail';

const Checkout = () => {
  const [hovering, setHovering] = createSignal(false);

  const addToCart = (event: MouseEvent) => {
    event.preventDefault();
  };

  const addToFavorite = () => {
    console.log('==========addToFavorite==================');
  };

  const openQuickView = () => {
    console.log('==========openQuickView==================');
  };

  return (
    <ContainerStyle>
      <Grid container spacing={2}>
        <Grid item xs={6} md={6}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <p>First Name</p>
                <OutlinedInput />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <p>Last Name</p>
                <OutlinedInput />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <p>Phone</p>
                <OutlinedInput />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <p>Email address</p>
                <OutlinedInput />
              </FormControl>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <p>Country</p>
              <OutlinedInput />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <p>Address</p>
              <OutlinedInput />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <p>Town / City</p>
              <OutlinedInput />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <p>State / County</p>
              <OutlinedInput />
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
