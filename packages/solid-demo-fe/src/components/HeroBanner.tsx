import { Component } from 'solid-js';
import { Box, Button, Typography, Grid, styled } from '@suid/material';
import { Link } from '@solidjs/router';

import { Slider } from './Slider';
import heroBg1 from '../assets/images/hero-banner-1.jpg';
import heroBg2 from '../assets/images/hero-banner-2.jpg';

const HeroBanner: Component = () => {
  return (
    <Box component='section'>
      <Slider>
        <Box class='hero-item'>
          <Grid
            container
            class='hero-item-container hero-item-container--first-block'
            sx={{ backgroundImage: `url(${heroBg1})` }}>
            <Grid md={6} class='hero-item-container--info'>
              <Box class='hero-item-container--info__content'>
                <SubTitleStyled variant='h4'>Welcome To NT Store</SubTitleStyled>
                <TitleStyled variant='h1'>FIND YOUR FAVORITE</TitleStyled>
                <Link href='/products'>
                  <Button variant='contained' color='primary' sx={{ color: '#fff' }}>
                    SHOP NOW
                  </Button>
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box class='hero-item'>
          <Grid
            container
            class='hero-item-container hero-item-container--second-block'
            sx={{ backgroundImage: `url(${heroBg2})` }}>
            <Grid md={6} class='hero-item-container--info'>
              <Box class='hero-item-container--info__content'>
                <SubTitleStyled variant='h4'>Thank You Your Visting</SubTitleStyled>
                <TitleStyled variant='h1'>EXPLORE OUR STORE</TitleStyled>
                <Link href='/products'>
                  <Button variant='contained' color='primary' sx={{ color: '#fff' }}>
                    LEARN MORE
                  </Button>
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Slider>
    </Box>
  );
};

const TitleStyled = styled(Typography)({
  fontSize: '59px',
  marginBlock: 16,
});

const SubTitleStyled = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  letterSpacing: '.4em',
  color: theme.palette.grey[600],
  fontSize: '18px',
}));

export { HeroBanner };
