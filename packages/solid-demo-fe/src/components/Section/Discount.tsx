import { Component } from 'solid-js';
import { Box, Typography, styled } from '@suid/material';

import discountBg1 from '../../assets/images/discount-bg-1.jpg';
import discountBg2 from '../../assets/images/discount-bg-2.jpg';
import { Section } from './Section';

const Discount: Component = () => {
  return (
    <Section>
      <ContainerStyled>
        <ItemStyled>
          <ImageStyled component='img' src={discountBg1} alt='Discount 1' />
          <ContainBannerStyled>
            <ContentStyled>
              <DiscountAmountStyled variant='h4'>Save 50%</DiscountAmountStyled>
              <DiscountTitleStyled variant='h2'>T-shirt</DiscountTitleStyled>
            </ContentStyled>
          </ContainBannerStyled>
        </ItemStyled>
        <ItemStyled>
          <ImageStyled component='img' src={discountBg2} alt='Discount 2' />
          <ContainBannerStyled>
            <ContentStyled>
              <DiscountAmountStyled variant='h4'>Save 50%</DiscountAmountStyled>
              <DiscountTitleStyled variant='h2'>Accessories</DiscountTitleStyled>
            </ContentStyled>
          </ContainBannerStyled>
        </ItemStyled>
      </ContainerStyled>
    </Section>
  );
};

const ContainerStyled = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 32,
});

const ItemStyled = styled(Box)({
  position: 'relative',
  overflow: 'hidden',
  width: '50%',
  '&:hover img': {
    transform: 'scale(1.05)',
    transition: 'all .5s ease',
  },
});

const ImageStyled = styled(Box)({
  transition: 'all .5s ease',
  width: '100%',
  height: 'auto',
});

const ContainBannerStyled = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {},
}));

const ContentStyled = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  paddingInlineStart: '50%',
  [theme.breakpoints.down('md')]: {},
}));

const DiscountAmountStyled = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  textTransform: 'uppercase',
  fontWeight: 700,
  fontSize: 18,
  letterSpacing: 2.5,
}));

const DiscountTitleStyled = styled(Typography)({
  textTransform: 'uppercase',
  letterSpacing: 2.5,
  fontSize: 35,
  fontWeight: 700,
});

export { Discount };
