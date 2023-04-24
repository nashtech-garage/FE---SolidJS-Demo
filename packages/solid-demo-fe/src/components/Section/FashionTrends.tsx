import { Component } from 'solid-js';
import { Box, Typography, styled } from '@suid/material';

import bannerBg from '../../assets/images/fashion-trends-bg.jpg';
import { SectionFull, SectionContainerFull } from './Section';

const FashionTrends: Component = () => {
  return (
    <SectionFull>
      <BannerStyled>
        <SectionContainerFull>
          <BannerContent>
            <TypographyH2Styled variant='h2'>2023</TypographyH2Styled>
            <TypographyH3Styled variant='h3'>Fashion Trends</TypographyH3Styled>
            <TypographyH4Styled variant='h4'>Special Offer</TypographyH4Styled>
          </BannerContent>
        </SectionContainerFull>
      </BannerStyled>
    </SectionFull>
  );
};

const BannerStyled = styled(Box)({
  backgroundImage: `url(${bannerBg})`,
  backgroundAttachment: 'fixed',
  position: 'relative',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  paddingBlock: 190,
  backgroundPosition: 'center',
});

const BannerContent = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  width: 'fit-content',
  alignItems: 'center',
  justifyContent: 'center',
});

const TypographyH2Styled = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 700,
  fontSize: 100,
  marginBlockEnd: 8,
  textTransform: 'uppercase',
  lineHeight: 1,
  letterSpacing: 8,
}));

const TypographyH3Styled = styled(Typography)({
  fontWeight: 700,
  fontSize: 60,
  marginBlockEnd: 8,
  textTransform: 'uppercase',
  lineHeight: 1,
  letterSpacing: 4,
});

const TypographyH4Styled = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[600],
  fontWeight: 600,
  fontSize: 24,
  marginBlockEnd: 8,
  textTransform: 'uppercase',
  lineHeight: 1.3,
  letterSpacing: 12,
}));

export { FashionTrends };
