import { IconButton, AppBar, Toolbar, Box, Grid, Link, Typography, Menu, MenuItem } from '@suid/material';
import ShoppingCartIcon from '@suid/icons-material/ShoppingCart';
import { createEffect, createSignal, For } from 'solid-js';

import { medusaClient } from '../utils/medusaClient';
import { ICollection } from '../types';

const Header = () => {
  const cartCount = localStorage.getItem('cartCount') ?? 0;
  const [anchorEl, setAnchorEl] = createSignal<HTMLElement | null>(null);
  const [open, setOpen] = createSignal<boolean>(false);
  const [collections, setCollections] = createSignal<ICollection[]>([]);

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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='fixed' color='primary'>
        <Toolbar>
          <Grid container>
            <Grid item xs={3} md={3} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
              <Typography
                sx={{ fontSize: '1.3rem', color: '#fff', fontWeight: 'bold', border: '1px solid #fff', p: 1 }}>
                NT Store
              </Typography>
            </Grid>
            <Grid
              item
              xs={0}
              md={6}
              sx={{ display: { md: 'flex', xs: 'none' }, justifyContent: 'center', alignItems: 'center', gap: 4 }}>
              <Link href='/' sx={{ color: '#fff', textTransform: 'uppercase' }}>
                Home
              </Link>
              <Link href='/products' sx={{ color: '#fff', textTransform: 'uppercase' }}>
                Products
              </Link>
              <Link
                id='collection-btn'
                sx={{ color: '#fff', textTransform: 'uppercase' }}
                aria-controls={open() ? 'basic-menu' : undefined}
                aria-expanded={open() ? 'true' : undefined}
                aria-haspopup='true'
                onClick={handlePopoverOpen}>
                Collections
              </Link>
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
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <IconButton>
                  <ShoppingCartIcon sx={{ color: '#fff' }} />
                </IconButton>
                <Box as='p'>{cartCount}</Box>
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
