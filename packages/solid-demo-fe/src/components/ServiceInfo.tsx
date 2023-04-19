import { Divider, Box, Grid, Typography, styled } from '@suid/material';
import {
  AirportShuttle as AirportShuttleIcon,
  QueryBuilder as QueryBuilderIcon,
  AddShoppingCart as AddShoppingCartIcon,
} from '@suid/icons-material';

const iconStyle = {
  fontSize: '2.5rem',
  color: 'primary.main',
};

const ServiceInfo = () => {
  return (
    <SectionStyled component='section'>
      <Divider />
      <ContainerStyled container>
        <ItemStyled item md>
          <AirportShuttleIcon fontSize='inherit' sx={iconStyle} />
          <ItemContentStyled>
            <TitleStyled variant='button'>SHIPPING</TitleStyled>
            <Typography variant='caption'>Nationwide shipping service</Typography>
          </ItemContentStyled>
        </ItemStyled>
        <Divider orientation='vertical' flexItem />
        <ItemStyled item md>
          <QueryBuilderIcon fontSize='inherit' sx={iconStyle} />
          <ItemContentStyled>
            <TitleStyled variant='button'>24 X 7 SERVICE</TitleStyled>
            <Typography variant='caption'>Online Service For New Customer</Typography>
          </ItemContentStyled>
        </ItemStyled>
        <Divider orientation='vertical' flexItem />
        <ItemStyled item md>
          <AddShoppingCartIcon fontSize='inherit' sx={iconStyle} />
          <ItemContentStyled>
            <TitleStyled variant='button'>FESTIVAL OFFER</TitleStyled>
            <Typography variant='caption'>New Online Special Festival Offer</Typography>
          </ItemContentStyled>
        </ItemStyled>
      </ContainerStyled>
      <Divider />
    </SectionStyled>
  );
};

const SectionStyled = styled(Box)(({ theme }) => ({
  marginBlock: 64,
  [theme.breakpoints.up('xs')]: {
    paddingInline: '0.5rem',
  },
  [theme.breakpoints.up('lg')]: {
    paddingInline: '4rem',
  },
}));

const ContainerStyled = styled(Grid)({
  paddingBlock: 16,
});

const ItemStyled = styled(Grid)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 4,
  gap: 2,
});

const ItemContentStyled = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  flexDirection: 'column',
});

const TitleStyled = styled(Typography)(({ theme }) => ({
  fontSize: '21px',
  transition: 'all .3s ease',
  '&:hover': {
    color: theme.palette.primary.main,
  },
}));

export { ServiceInfo };
