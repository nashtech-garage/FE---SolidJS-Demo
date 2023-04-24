import { Container } from '@suid/material';
import { createQuery } from '@tanstack/solid-query';

import { medusaClient } from '../../utils';
import { Product } from '../../components';

function Products() {
  const productsQuery = createQuery(() => ['products'], () => medusaClient.products.list())

  const products = () => {  
    return productsQuery.data?.products || []
  }

  return (
    <Container>
      <Product.List list={products()} />
    </Container>
  );
}

export default Products;
