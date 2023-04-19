import { Outlet } from '@solidjs/router';
import Header from './Header';
import { Box } from '@suid/material';

function MainLayout() {
  return (
    <>
      <Header />
      <Box sx={{ marginBlockStart: 8 }}>
        <Outlet />
      </Box>
    </>
  );
}

export { MainLayout };
