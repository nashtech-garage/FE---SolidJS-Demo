import { Product, ServiceInfo, HeroBanner, BrandList } from '../../components';

function Home() {
  return (
    <>
      <HeroBanner />
      <Product.Featured />
      <ServiceInfo />
      <BrandList />
    </>
  );
}

export default Home;
