import { IconButton, AppBar, Toolbar, Box, Grid, Menu, MenuItem, styled } from '@suid/material';
import ShoppingCartIcon from '@suid/icons-material/ShoppingCart';
import { createEffect, createSignal, For } from 'solid-js';
import { Link } from '@solidjs/router';

import { medusaClient } from '../utils/medusaClient';
import { ICollection } from '../types';
import { useCart } from '../components/CartProvider';
import Logo from '../components/Logo';

const Header = () => {
  const [anchorEl, setAnchorEl] = createSignal<HTMLElement | null>(null);
  const [open, setOpen] = createSignal<boolean>(false);
  const [collections, setCollections] = createSignal<ICollection[]>([]);
  const { cart } = useCart();

  const handlePopoverOpen = (event: MouseEvent) => {
    setAnchorEl(event.currentTarget as HTMLElement);
    setOpen(true);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  createEffect(() => {
    const fetchCollections = async () => {
      const res = await medusaClient.collections.list();
      setCollections(res.collections as ICollection[]);
    };
    fetchCollections();
  });

  return (
    <AppBar position='fixed' sx={{ backgroundColor: '#FFF' }}>
      <Toolbar>
        <Grid container>
          <Grid item xs={3} md={3}>
            <LinkStyled href='/'>
              <Logo />
            </LinkStyled>
          </Grid>
          <Grid
            item
            xs={0}
            md={6}
            sx={{ display: { md: 'flex', xs: 'none' }, justifyContent: 'center', alignItems: 'center', gap: 4 }}>
            <LinkStyled href='/'>Home</LinkStyled>
            <LinkStyled href='/products'>Products</LinkStyled>
            <LinkStyled href='#'>Pages</LinkStyled>
            <LinkStyled href='#'>Blogs</LinkStyled>
            <LinkStyled
              id='collection-btn'
              aria-controls={open() ? 'basic-menu' : undefined}
              aria-expanded={open() ? 'true' : undefined}
              aria-haspopup='true'
              onClick={handlePopoverOpen}
              href='#'>
              Collections
            </LinkStyled>
            <Menu
              id='collection-menu'
              open={open()}
              anchorEl={anchorEl()}
              MenuListProps={{
                'aria-labelledby': 'collection-btn',
              }}
              onClose={handlePopoverClose}>
              <For
                each={collections()}
                children={(collection: ICollection) => <MenuItem sx={{ p: 2 }}>{collection.title}</MenuItem>}
              />
            </Menu>
          </Grid>
          <Grid item xs={9} md={3}>
            <CartContainer>
              <IconButton>
                <ShoppingCartIcon sx={{ color: '#777' }} />
              </IconButton>
              <Box as='span' color='#777'>
                {cart().items.length}
              </Box>
            </CartContainer>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

const LinkStyled = styled(Link)({
  color: '#777',
  textDecoration: 'none',
  fontSize: 16,
});

const CartContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  height: '100%',
});

export default Header;
