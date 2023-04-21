import { Component, Accessor, splitProps, createSignal } from 'solid-js';
import { Box, Typography, Grow, styled } from '@suid/material';
import { A } from '@solidjs/router';
import { Star, ShoppingCartOutlined, FavoriteBorderOutlined, SearchOutlined } from '@suid/icons-material';
import { Product } from '@medusajs/medusa/dist/models/product'

import { addProduct, getProductPrice } from '../../utils/productHelper';
import { useCart } from '../../contexts';


interface ProductItemProps {
  product: Product;
  index: Accessor<number>;
}

const StarStyled = () => <Star sx={{ fontSize: '0.8rem', color: '#EDB867' }} />;

const ProductItem: Component<ProductItemProps> = (props) => {
  const [hovering, setHovering] = createSignal(false);
  const [{ product, index }] = splitProps(props, ['product', 'index']);
  const { updateCart } = useCart();
  const { title, thumbnail } = product;

  const addToCart = (event: MouseEvent) => {
    event.preventDefault();
    addProduct(product.variants[0].id, 1, updateCart);
  };

  const addToFavorite = () => {
    console.log('==========addToFavorite==================');
  };

  const openQuickView = () => {
    console.log('==========openQuickView==================');
  };

  return (
    <Grow in={index() > -1} style={{ transformOrigin: '0 0 0' }} timeout={1000}>
      <Container>
        <LinkStyled href={`/products/${product.id}`}>
          <ImageContainer onMouseOver={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
            <Image src={thumbnail || undefined} />
            <ListOption classList={{ hovering: hovering() }}>
              <span>
                <ShoppingCartOutlined onClick={addToCart} />
              </span>
              <span>
                <FavoriteBorderOutlined onClick={addToFavorite} />
              </span>
              <span>
                <SearchOutlined onClick={openQuickView} />
              </span>
            </ListOption>
          </ImageContainer>
          <Box>
            <Box>
              <StarStyled />
              <StarStyled />
              <StarStyled />
              <StarStyled />
              <StarStyled />
            </Box>
            <Title color='#777'>{title}</Title>
            <PriceTag>{getProductPrice(product.variants[0])}</PriceTag>
          </Box>
          <NewTag>NEW</NewTag>
        </LinkStyled>
      </Container>
    </Grow>
  );
};

const Container = styled(Box)({
  position: 'relative',
});

const LinkStyled = styled(A)({
  textDecoration: 'none',
  display: 'flex',
  flexDirection: 'column',

});

const ImageContainer = styled(Box)({
  position: 'relative',
  display: 'flex',
  overflow: 'hidden',
});

const Image = styled('img')({
  width: '100%',
});

const Title = styled(Typography)({
  color: '#777',
  fontWeight: 400,
  fontSize: 14,
  lineHeight: 1,
  marginBottom: 4,
});

const PriceTag = styled(Typography)({
  color: '#666',
  fontWeight: 'bold',
  fontSize: 16,
  lineHeight: 1,
  marginBottom: 4,
});

const NewTag = styled('span')({
  position: 'absolute',
  top: 8,
  left: 8,
  borderRadius: '100%',
  background: '#FF4C3B',
  color: '#FFF',
  padding: '10px 4px',
  fontSize: 10,
  fontWeight: 'bold',
});

const ListOption = styled('div')({
  padding: 4,
  position: 'absolute',
  right: -50,
  bottom: 0,
  display: 'flex',
  gap: 8,
  flexDirection: 'column',
  transitionDuration: '0.5s',

  '& > span > svg': {
    color: '#6f6f6f',
    fontSize: '1.25rem',
  },
  '& > span:hover': {
    '& > svg': {
      color: '#FF4C3B',
    },
  },

  '&.hovering': {
    right: 0,
  },
});
export { ProductItem };
