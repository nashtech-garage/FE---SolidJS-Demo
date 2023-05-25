import { Component } from 'solid-js';
import collectionBanner from '../../assets/images/collection-banner.jpg';
import { Box, Typography, styled } from '@suid/material';

const Banner: Component = () => {
  return (
    <Box class='banner'>
      <img src={collectionBanner} alt='test' class='banner__img' elementtiming={''} fetchpriority={'auto'} />
      <BannerContentStyled>
        <Heading5Styled variant='h5'>Fashion</Heading5Styled>
        <Heading6Styled variant='h6'>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </Heading6Styled>
        <Subtitle1Styled variant='subtitle1'>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of
          the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has
          survived not only five centuries, but also the leap into electronic typesetting, remaining essentially
          unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
          passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem
          Ipsum.
        </Subtitle1Styled>
      </BannerContentStyled>
    </Box>
  );
};

const BannerContentStyled = styled('div')({
  padding: '23px 0 20px',
});

const Heading5Styled = styled(Typography)({
  fontWeight: 600,
  color: '#444',
  marginBottom: '15px',
});

const Heading6Styled = styled(Typography)({
  fontSize: '16px',
  fontWeight: 600,
  color: '#444',
  letterSpacing: '1px',
  lineHeight: 1.2,
  marginBottom: '10px',
});

const Subtitle1Styled = styled(Typography)({
  lineHeight: 1.5,
  color: '#777',
  marginBottom: 0,
  fontSize: '14px',
  letterSpacing: '.03em',
});

export default Banner;
