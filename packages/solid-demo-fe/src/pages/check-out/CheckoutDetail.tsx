import {
  Button,
  Card,
  FormControl,
  FormControlLabel,
  Grid,
  List,
  ListItem,
  ListItemText,
  Radio,
  RadioGroup,
  styled,
} from '@suid/material';
import { For } from 'solid-js';
import { createSignal } from 'solid-js';
import { cartStore } from '../../store';

const CheckoutDetail = () => {
  const [hovering, setHovering] = createSignal(false);
  const cart = cartStore.cart;

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
    <CustomCard>
      <ListStyle>
        <ListItem divider disablePadding>
          <Grid container spacing={2}>
            <Grid item xs={7} md={7}>
              <ListItemText primary='Product' />
            </Grid>
            <Grid item xs={5} md={5}>
              <ListItemText primary='Total' />
            </Grid>
          </Grid>
        </ListItem>
        <ListItem divider disablePadding>
          <Grid container spacing={2}>
            <For each={cart?.items}>
              {(item) => (
                <>
                  <Grid item xs={7} md={7}>
                    <ListItemText primary={`${item.title} x${item.quantity}`} />
                  </Grid>
                  <Grid item xs={5} md={5}>
                    <ItemPriceStyle primary={`${item.total}`} />
                  </Grid>
                </>
              )}
            </For>
          </Grid>
        </ListItem>
        <ShippingMethodStyle divider disablePadding>
          <Grid container spacing={2}>
            <Grid item xs={7} md={7}>
              <ShippingMethodLabelStyle primary='Subtotal' />
            </Grid>
            <Grid item xs={5} md={5}>
              <ItemPriceStyle sx={{ color: 'red' }} primary={`$${cart?.subtotal || 0}`} />
            </Grid>
            <Grid item xs={7} md={7}>
              <ShippingMethodLabelStyle primary='Shipping' />
            </Grid>
            <Grid item xs={5} md={5}>
              <ItemPriceStyle primary={`$${cart?.shipping_total || 0}`} />
            </Grid>
          </Grid>
        </ShippingMethodStyle>
        <PaymentMethodStyle disablePadding>
          <Grid container spacing={2}>
            <Grid item xs={7} md={7}>
              <ListItemText sx={{ '& > span': { fontSize: '18px' } }} primary='Total' />
            </Grid>
            <Grid item xs={5} md={5}>
              <ItemPriceStyle sx={{ color: 'red' }} primary={`$${cart?.total || 0}`} />
            </Grid>
            <Grid item xs={12}>
              <FormControl>
                <RadioGroup
                  aria-labelledby='demo-radio-buttons-group-label'
                  defaultValue='female'
                  name='radio-buttons-group'>
                  <FormControlLabel value='checkPayments' control={<Radio />} label='Check Payments' />
                  <FormControlLabel value='cashOnDelivery' control={<Radio />} label='Cash On Delivery' />
                  <FormControlLabel value='paypal' control={<Radio />} label='PayPal' />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </PaymentMethodStyle>
        <Grid item xs={12} sx={{ textAlign: 'right' }}>
          <ButtonStyle type='submit' variant='contained' size='large'>
            Place order
          </ButtonStyle>
        </Grid>
      </ListStyle>
    </CustomCard>
  );
};

const CustomCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  borderRadius: 'initial',
  boxShadow: 'initial',
  padding: '40px',
}));

const ListStyle = styled(List)(() => ({
  '& > li': {
    padding: '8px 0px',
    fontSize: '14px',
    '&:first-child': {
      '.MuiListItemText-root > span': {
        fontWeight: '600',
        fontSize: '22px',
        color: '#444',
      },
    },
  },
}));

const ItemPriceStyle = styled(ListItemText)(() => ({
  '& > span': {
    fontSize: '18px',
  },
}));

const ShippingMethodStyle = styled(ListItem)(() => ({
  '& > span': {
    fontSize: '18px',
  },
}));

const ShippingMethodLabelStyle = styled(ListItemText)(() => ({
  '& > span': {
    fontWeight: '600',
    color: '#333',
  },
}));

const PaymentMethodStyle = styled(ListItem)(() => ({
  '& > span': {
    fontSize: '18px',
  },
}));

const ButtonStyle = styled(Button)({
  padding: '13px 29px',
  color: '#fff!important',
  letterSpacing: '.05em',
  border: '2px solid var(--theme-deafult)!important',
  backgroundImage: 'linear-gradient(30deg,var(--theme-deafult) 50%,transparent 50%)!important',
  backgroundSize: '850px',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 0,
  transition: 'background .3s ease-in-out',
});

export default CheckoutDetail;
