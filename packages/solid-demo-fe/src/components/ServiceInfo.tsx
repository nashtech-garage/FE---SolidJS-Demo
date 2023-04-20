import { Divider, Box, Grid, Typography, styled } from '@suid/material';
import {
  AirportShuttle as AirportShuttleIcon,
  QueryBuilder as QueryBuilderIcon,
  AddShoppingCart as AddShoppingCartIcon,
} from '@suid/icons-material';

import { Section } from './Section';

const iconStyle = {
  fontSize: '2.5rem',
  color: 'primary.main',
};

const ServiceInfo = () => {
  return (
    <Section>
      <Divider />
      <ContainerStyled container>
        <ItemStyled item md>
          <AirportShuttleIcon fontSize='inherit' sx={iconStyle} />
          <ItemContentStyled>
            <TitleStyled variant='button'>SHIPPING</TitleStyled>
            <Typography variant='caption'>Nationwide shipping service</Typography>
          </ItemContentStyled>
        </ItemStyled>
        <DividerStyled orientation='vertical' flexItem />
        <ItemStyled item md>
          <QueryBuilderIcon fontSize='inherit' sx={iconStyle} />
          <ItemContentStyled>
            <TitleStyled variant='button'>24 X 7 SERVICE</TitleStyled>
            <Typography variant='caption'>Online Service For New Customer</Typography>
          </ItemContentStyled>
        </ItemStyled>
        <DividerStyled orientation='vertical' flexItem />
        <ItemStyled item md>
          <AddShoppingCartIcon fontSize='inherit' sx={iconStyle} />
          <ItemContentStyled>
            <TitleStyled variant='button'>FESTIVAL OFFER</TitleStyled>
            <Typography variant='caption'>New Online Special Festival Offer</Typography>
          </ItemContentStyled>
        </ItemStyled>
      </ContainerStyled>
      <Divider />
    </Section>
  );
};

const ContainerStyled = styled(Grid)(({ theme }) => ({
  paddingBlock: 16,
  [theme.breakpoints.up('xs')]: {
    justifyContent: 'center',
    gap: 8,
  },
}));

const ItemStyled = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 4,
  gap: 16,
  [theme.breakpoints.up('xs')]: {
    flexDirection: 'column',
  },
}));

const DividerStyled = styled(Divider)(({ theme }) => ({
  [theme.breakpoints.up('xs')]: {
    display: 'none',
  },
  [theme.breakpoints.up('md')]: {
    display: 'block',
  },
}));

const ItemContentStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  flexDirection: 'column',
  [theme.breakpoints.up('xs')]: {
    alignItems: 'center',
  },
}));

const TitleStyled = styled(Typography)(({ theme }) => ({
  fontSize: '21px',
  transition: 'all .3s ease',
  '&:hover': {
    color: theme.palette.primary.main,
  },
}));

export { ServiceInfo };
