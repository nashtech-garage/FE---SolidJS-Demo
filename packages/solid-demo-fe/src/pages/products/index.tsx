import { createSignal, createEffect } from 'solid-js';
import { Container } from '@suid/material';

import { medusaClient } from '../../utils';
import { IProduct } from '../../types';
import { Product } from '../../components';

function Products() {
  const [products, setProducts] = createSignal<IProduct[]>([]);
  createEffect(() => {
    const fetchProducts = async () => {
      const res = await medusaClient.products.list();
      setProducts(res.products as IProduct[]);
    };

    fetchProducts();
  });
  return (
    <Container>
      <Product.List list={products} />
    </Container>
  );
}

export default Products;
