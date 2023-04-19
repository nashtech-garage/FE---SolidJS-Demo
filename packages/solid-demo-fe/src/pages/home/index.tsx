import { Product, ServiceInfo, HeroBanner } from '../../components';

function Home() {
  return (
    <>
      <HeroBanner />
      <Product.Featured />
      <ServiceInfo />
    </>
  );
}

export default Home;
