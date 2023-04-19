import { IconButton, AppBar, Toolbar, Box, Grid, Link, Menu, MenuItem } from '@suid/material';
import ShoppingCartIcon from '@suid/icons-material/ShoppingCart';
import SettingsIcon from '@suid/icons-material/Settings';
import SearchIcon from '@suid/icons-material/Search';
import { createEffect, createSignal, For } from 'solid-js';

import { medusaClient } from '../utils/medusaClient';
import { ICollection } from '../types';
import { SubHeader } from './SubHeader';
import logoImg from '../assets/logo.png';

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
      <AppBar position='fixed' sx={{ boxShadow: 'none', backgroundColor: '#fff' }}>
        <Toolbar sx={{ flexDirection: 'column' }} disableGutters>
          <SubHeader />
          <Grid container sx={{ paddingInline: { xs: 0, md: 4 } }}>
            <Grid item xs={3} md={3} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
              <img alt='logo' src={logoImg} height={56} />
            </Grid>
            <Grid
              item
              xs={0}
              md={6}
              sx={{ display: { md: 'flex', xs: 'none' }, justifyContent: 'center', alignItems: 'center', gap: 4 }}>
              <Link href='/' sx={{ textTransform: 'uppercase', textDecoration: 'none', color: 'text.primary' }}>
                Home
              </Link>
              <Link href='/products' sx={{ textTransform: 'uppercase', textDecoration: 'none', color: 'text.primary' }}>
                Products
              </Link>
              <Link
                id='collection-btn'
                sx={{ textTransform: 'uppercase', textDecoration: 'none', cursor: 'pointer', color: 'text.primary' }}
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
                  <SearchIcon color='inherit' sx={{ color: 'text.primary' }} />
                </IconButton>
                <IconButton>
                  <SettingsIcon color='inherit' sx={{ color: 'text.primary' }} />
                </IconButton>
                <IconButton>
                  <ShoppingCartIcon color='inherit' sx={{ color: 'text.primary' }} />
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
