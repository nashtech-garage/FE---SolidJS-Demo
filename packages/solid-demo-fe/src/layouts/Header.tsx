import { IconButton, AppBar, Toolbar, Box, Grid, Menu, MenuItem, Badge, styled, Typography } from '@suid/material';
import ShoppingCartIcon from '@suid/icons-material/ShoppingCart';
import { Settings as SettingsIcon, Search as SearchIcon } from '@suid/icons-material';
import { createSignal, For } from 'solid-js';
import { Link } from '@solidjs/router';
import { createQuery } from '@tanstack/solid-query';

import { medusaClient } from '../utils/medusaClient';
import { useCart } from '../contexts';
import { SubHeader } from './SubHeader';
import { Logo } from '../components';

const Header = () => {
  const [anchorEl, setAnchorEl] = createSignal<HTMLElement | null>(null);
  const [open, setOpen] = createSignal<boolean>(false);
  const { cart } = useCart();
  const collectionsQuery = createQuery(
    () => ['collections'],
    () => medusaClient.collections.list()
  );

  const handlePopoverOpen = (event: MouseEvent) => {
    setAnchorEl(event.currentTarget as HTMLElement);
    setOpen(true);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const collections = () => {
    return collectionsQuery.data?.collections || [];
  };

  return (
    <AppBar position='fixed' sx={{ backgroundColor: '#FFF' }}>
      <Toolbar sx={{ flexDirection: 'column' }} disableGutters>
        <SubHeader />
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
            <HeaderTextItem
              sx={{ cursor: 'pointer' }}
              id='collection-btn'
              aria-controls={open() ? 'basic-menu' : undefined}
              aria-expanded={open() ? 'true' : undefined}
              aria-haspopup='true'
              onClick={handlePopoverOpen}>
              Collections
            </HeaderTextItem>
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
                children={(collection) => <MenuItem sx={{ p: 2 }}>{collection.title}</MenuItem>}
              />
            </Menu>
          </Grid>
          <Grid item xs={9} md={3} pr={2}>
            <CartContainer>
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
