import { Divider, Box, Grid, Typography } from '@suid/material';
import {
  AirportShuttle as AirportShuttleIcon,
  QueryBuilder as QueryBuilderIcon,
  AddShoppingCart as AddShoppingCartIcon,
} from '@suid/icons-material';

const itemStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 4,
  gap: 2,
};

const iconStyle = {
  fontSize: '2.5rem',
  color: 'primary.main',
};

const titleStyle = {
  fontSize: '21px',
  transition: 'all .3s ease',
  '&:hover': {
    color: 'primary.main',
  },
};

const ServiceInfo = () => {
  return (
    <Box component='section' sx={{ paddingInline: 20, marginBlock: 8 }}>
      <Divider />
      <Grid container sx={{ paddingBlock: 4 }}>
        <Grid item md sx={itemStyle}>
          <AirportShuttleIcon fontSize='inherit' sx={iconStyle} />
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'column' }}>
            <Typography variant='button' sx={titleStyle}>
              SHIPPING
            </Typography>
            <Typography variant='caption'>Nationwide shipping service</Typography>
          </Box>
        </Grid>
        <Divider orientation='vertical' flexItem />
        <Grid item md sx={itemStyle}>
          <QueryBuilderIcon fontSize='inherit' sx={iconStyle} />
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'column' }}>
            <Typography variant='button' sx={titleStyle}>
              24 X 7 SERVICE
            </Typography>
            <Typography variant='caption'>Online Service For New Customer</Typography>
          </Box>
        </Grid>
        <Divider orientation='vertical' flexItem />
        <Grid item md sx={itemStyle}>
          <AddShoppingCartIcon fontSize='inherit' sx={iconStyle} />
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'column' }}>
            <Typography variant='button' sx={titleStyle}>
              FESTIVAL OFFER
            </Typography>
            <Typography variant='caption'>New Online Special Festival Offer</Typography>
          </Box>
        </Grid>
      </Grid>
      <Divider />
    </Box>
  );
};

export { ServiceInfo };
