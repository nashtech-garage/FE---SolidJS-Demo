import type { Component } from 'solid-js';
import { Box, Button, Typography, Grid } from '@suid/material';
import { Link } from '@solidjs/router';

import { Slider } from './Slider';
import heroBg1 from '../assets/images/hero-banner-1.jpg';
import heroBg2 from '../assets/images/hero-banner-2.jpg';
import { headerTextColor } from '../theme';

const subTitleStyle = {
  fontWeight: 700,
  letterSpacing: '.4em',
  color: headerTextColor,
  fontSize: '18px',
};

const titleStyle = {
  fontSize: '59px',
  marginBlock: 2,
};

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
                <Typography variant='h4' sx={subTitleStyle}>
                  Welcome To NT Store
                </Typography>
                <Typography variant='h1' sx={titleStyle}>
                  FIND YOUR FAVORITE
                </Typography>
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
                <Typography variant='h4' sx={subTitleStyle}>
                  Thank You Your Visting
                </Typography>
                <Typography variant='h1' sx={titleStyle}>
                  EXPLORE OUR STORE
                </Typography>
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

export { HeroBanner };
