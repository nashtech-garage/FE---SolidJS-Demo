import { createQuery } from '@tanstack/solid-query';

import { medusaClient } from '../../utils';
import { ProductList } from '../Product';
import Section from '../Section';

const NewProducts = () => {
  const productsQuery = createQuery(
    () => ['products'],
    () =>
      medusaClient.products.list({
        limit: 4,
      })
  );

  const products = () => {
    return productsQuery.data?.products || [];
  };

  return (
    <>
      <Section>
        <Section.Title
          title='New Products'
          subtitle='Exclusive Products'
          body={`Lorem Ipsum is simply dummy text of the printing and typesetting industry, Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.`}
        />
        <ProductList list={products()} />
      </Section>
    </>
  );
};

export { NewProducts };
