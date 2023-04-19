import { Outlet } from '@solidjs/router';
import { Box, styled } from '@suid/material';

import { Header } from './Header';
import { Footer } from './Footer';

function MainLayout() {
  return (
    <>
      <Header />
      <BoxStyled component='main'>
        <Outlet />
      </BoxStyled>
      <Footer />
    </>
  );
}

const BoxStyled = styled(Box)({
  marginBlockStart: 128,
});

export { MainLayout };
