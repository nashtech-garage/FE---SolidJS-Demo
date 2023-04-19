import { Box } from '@suid/material';
import { Product, ServiceInfo } from '../../components';
import { Footer } from '../../layouts';
import { HeroBanner } from '../../components/HeroBanner';

function Home() {
  return (
    <Box sx={{ marginBlockStart: 14 }}>
      <HeroBanner />
      <Product.Featured />
      <ServiceInfo />
      <Box>
        <Footer />
      </Box>
    </Box>
  );
}

export default Home;
