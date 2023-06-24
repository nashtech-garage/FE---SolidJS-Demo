import { Component, Accessor, splitProps, createSignal, Show } from 'solid-js';
import { Box, Typography, Grow, styled } from '@suid/material';
import { A } from '@solidjs/router';
import { Star, ShoppingCartOutlined, FavoriteBorderOutlined, SearchOutlined } from '@suid/icons-material';
import { Product } from '@medusajs/medusa';

import { addProduct, getProductPrice } from '../../utils/productHelper';
import { CartAction, dispatchCart, productFilterStore } from '../../store';
import { enumDisplayTypes } from '../../types/ProductFilter';

interface ProductItemProps {
  product: Product;
  index: Accessor<number>;
}

const StarStyled = () => <Star sx={{ fontSize: '0.8rem', color: '#EDB867' }} />;

const ProductItem: Component<ProductItemProps> = (props) => {
  const [hovering, setHovering] = createSignal(false);
  const [{ product, index }] = splitProps(props, ['product', 'index']);
  const { title, thumbnail } = product;
  const productFilter = () => productFilterStore.data;

  const addToCart = async (event: MouseEvent) => {
    event.preventDefault();
    await addProduct(product.variants[0].id, 1, (updated) => dispatchCart(CartAction.SetCart, updated));
  };

  const addToFavorite = (event: MouseEvent) => {
    event.preventDefault();
    const wishlistItems: Product[] = JSON.parse(localStorage.getItem('wishlistItems') ?? '[]') || [];
    const isExist = wishlistItems.some((item) => item.id === product.id);
    if (!isExist) {
      wishlistItems.push(product);
      localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
    }
  };

  const openQuickView = () => {
    console.log('==========openQuickView==================');
  };

  return (
    <Grow in={index() > -1} style={{ transformOrigin: '0 0 0' }} timeout={1000}>
      <Container>
        <LinkStyled href={`/products/${product.id}`}>
          <Box
            sx={
              productFilter()?.displayType === enumDisplayTypes.LIST
                ? {
                    display: 'grid',
                    gap: '1rem',
                    gridTemplateColumns: {
                      xs: '25% 75%',
                      lg: '25% 75%',
                    },
                  }
                : {
                    display: 'grid',
                    gap: '1rem',
                    gridTemplateColumns: {
                      xs: '1fr',
                    },
                  }
            }>
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
              <Title
                color='#777'
                sx={
                  productFilter()?.displayType === enumDisplayTypes.LIST
                    ? {
                        fontWeight: 700,
                        paddingBottom: '5px',
                      }
                    : {}
                }>
                {title}
              </Title>
              <Show when={productFilter()?.displayType === enumDisplayTypes.LIST}>
                <Description variant='subtitle1' class='product__description'>
                  {product.description}
                </Description>
              </Show>
              <PriceTag>{getProductPrice(product.variants[0])}</PriceTag>
            </Box>
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
  fontSize: 16,
  lineHeight: 1,
  marginBottom: 4,
});

const Description = styled(Typography)({
  color: '#777',
  fontWeight: 400,
  fontSize: 14,
  lineHeight: 1,
  marginBottom: 4,
  paddingBottom: 5,
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
