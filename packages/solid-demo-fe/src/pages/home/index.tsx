import { Box, Typography, Button, styled } from '@suid/material';
import { Link } from '@solidjs/router'
import { FeaturedProducts } from '../../components';
import { Footer } from '../../layouts';
import Banner from '../../assets/banner.jpg';
import Logo from '../../components/Logo';

function Home() {
  return (
    <Container>
      <BannerWrapper>
        <LogoStyled />
        <Box sx={{ marginTop: '1rem' }}>
          <Link href='/products'>
            <Button variant="contained" color='primary' sx={{ marginRight: '0.5rem' }}>
              Shop now
            </Button>
          </Link>
          <Button variant='contained' color='secondary' sx={{ marginLeft: '0.5rem' }}>
            Learn more
          </Button>
        </Box>
      </BannerWrapper>
      <Box component='div' sx={{ marginBottom: '2rem' }}>
        <FeaturedProducts />
      </Box>
      <Box>
        <Footer />
      </Box>
    </Container>
  );
}

const Container = styled(Box)({
  marginBlockStart: '64px',
});

const BannerWrapper = styled(Box)({
  backgroundImage: `url(${Banner})`,
  width: '100%',
  height: '80vh',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

const LogoStyled = styled(Logo)({
  fontSize: '3rem',
});

export default Home;
