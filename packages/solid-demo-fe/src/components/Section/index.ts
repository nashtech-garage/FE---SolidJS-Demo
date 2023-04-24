import { Section, SectionFull, SectionContainerFull } from './Section';
import { SectionTitle } from './SectionTitle';
import { BrandList } from './BrandList';
import { Discount } from './Discount';
import { FashionTrends } from './FashionTrends';
import { HeroBanner } from './HeroBanner';
import { ServiceInfo } from './ServiceInfo';
import { FeaturedProducts } from './FeaturedProducts';
import { NewProducts } from './NewProducts';

export default Object.assign(Section, {
  Title: SectionTitle,
  Full: SectionFull,
  ContainerFull: SectionContainerFull,
  BrandList,
  Discount,
  FashionTrends,
  HeroBanner,
  ServiceInfo,
  FeaturedProducts,
  NewProducts,
});
