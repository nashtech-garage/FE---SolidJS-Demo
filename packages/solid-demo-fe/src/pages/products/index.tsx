import { createSignal, createEffect } from 'solid-js';
import { Box } from '@suid/material';

import { medusaClient } from '../../utils';
import { IProduct } from '../../types';
import { Product } from '../../components';
import { Footer } from '../../layouts';

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
    <Box>
      <Product.List list={products} />
      <Footer />
    </Box>
  );
}

export default Products;
