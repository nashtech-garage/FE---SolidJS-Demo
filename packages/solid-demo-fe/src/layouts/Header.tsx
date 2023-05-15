import { IconButton, AppBar, Toolbar, Box, Grid, Badge, styled, Typography } from '@suid/material';
import ShoppingCartIcon from '@suid/icons-material/ShoppingCart';
import { Settings as SettingsIcon, Search as SearchIcon, Menu as MenuIcon } from '@suid/icons-material';
import { createSignal } from 'solid-js';
import { Link } from '@solidjs/router';

import { cartStore } from '../store';
import { SubHeader } from './SubHeader';
import { Logo, Drawer } from '../components';

const Header = () => {
  const [isOpenDrawer, setOpenDrawer] = createSignal(false);
  const cart = () => cartStore.cart;

  const handleOpenDrawer = () => {
    setOpenDrawer(true);
  };

  return (
    <>
      <AppBar position='fixed' sx={{ backgroundColor: '#FFF' }}>
        <Toolbar sx={{ flexDirection: 'column' }} disableGutters>
          <SubHeader />
          <Grid container>
            <Grid item xs={3} md={3} px={2}>
              <Box sx={{ display: 'flex' }}>
                <IconButton onClick={handleOpenDrawer} sx={{ alignSelf:'center'}}>
                  <MenuIcon />
                </IconButton>
                <LinkStyled href='/'>
                  <Logo />
                </LinkStyled>
              </Box>
            </Grid>
            <Grid
              item
              xs={0}
              md={6}
              sx={{ display: { md: 'flex', xs: 'none' }, justifyContent: 'center', alignItems: 'center', gap: 4 }}>
              <LinkStyled href='/'>
                <HeaderTextItem>Home</HeaderTextItem>
              </LinkStyled>
              <LinkStyled href='/products'>
                <HeaderTextItem>Products</HeaderTextItem>
              </LinkStyled>
              <LinkStyled href='#'>
                <HeaderTextItem>Pages</HeaderTextItem>
              </LinkStyled>
              <LinkStyled href='#'>
                <HeaderTextItem>Blogs</HeaderTextItem>
              </LinkStyled>
              <LinkStyled href='/collections'>
                <HeaderTextItem>Collections</HeaderTextItem>
              </LinkStyled>
            </Grid>
            <Grid item xs={9} md={3} pr={2}>
              <CartContainer>
                <IconButton>
                  <SearchIcon />
                </IconButton>
                <IconButton>
                  <SettingsIcon />
                </IconButton>
                <IconButton>
                  <SearchIcon />
                </IconButton>
                <IconButton>
                  <SettingsIcon />
                </IconButton>
                <Link href='/shopping-cart'>
                  <IconButton>
                    <Badge badgeContent={cart()?.items.length} color='primary'>
                      <ShoppingCartIcon sx={{ color: '#777' }} />
                    </Badge>
                  </IconButton>
                </Link>
              </CartContainer>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer open={isOpenDrawer()} handleClose={() => setOpenDrawer(false)} />
    </>
  );
};

const LinkStyled = styled(Link)({
  textDecoration: 'none',
});

const CartContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  height: '100%',
});

const HeaderTextItem = styled(Typography)({
  fontSize: 14,
  color: '#222',
  textTransform: 'uppercase',
});

export { Header };
