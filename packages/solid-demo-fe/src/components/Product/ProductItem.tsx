import { Component, Accessor } from 'solid-js';
import { Box, Typography, Link, Grow } from '@suid/material';
import { A } from '@solidjs/router';

import { IProduct } from '../../types';

interface ProductItemProps {
  data: IProduct;
  index: Accessor<number>;
}

const ProductItem: Component<ProductItemProps> = ({ data, index }) => {
  return (
    <Grow in={index() > -1} style={{ transformOrigin: '0 0 0' }} timeout={1000}>
      <Box
        component='div'
        sx={{
          backgroundColor: 'rgb(231, 231, 231)',
          height: '350px',
          padding: '0.5rem',
        }}>
        <Box component='div' sx={{ height: '12rem' }}>
          <Box
            component='img'
            src={data?.thumbnail}
            sx={{
              height: '12rem',
              width: '100%',
              objectFit: 'cover',
            }}
          />
        </Box>
        <Typography
          sx={{
            padding: '1rem 0',
            textAlign: 'center',
            fontWeight: '600',
          }}>
          {data.title}
        </Typography>
        <Typography sx={{ textAlign: 'center' }}>&euro; {data.variants[0]?.prices[0]?.amount / 100}</Typography>
        <Box sx={{ textAlign: 'center' }}>
          <Link underline='always'>
            <A href={`/products/${data.id}`}>See product</A>
          </Link>
        </Box>
      </Box>
    </Grow>
  );
};

export { ProductItem };
