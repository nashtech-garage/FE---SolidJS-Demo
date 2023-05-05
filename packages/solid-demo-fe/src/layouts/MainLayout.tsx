import { Component, createEffect } from 'solid-js';
import { Outlet } from '@solidjs/router';
import { Box, styled } from '@suid/material';

import { Header } from './Header';
import { Footer } from './Footer';
import { authStore } from '../store';
import { LocalStorageService } from '../services';
import { LoadingOverlay } from '../components';

const MainLayout: Component = () => {
  const { actions, authState } = authStore;

  createEffect(() => {
    if (!authState.user && LocalStorageService.getPersist()) {
      actions.refreshSection();
    }
  });

  return (
    <>
      <Header />
      <BoxStyled component='main'>
        <Outlet />
      </BoxStyled>
      <Footer />
      <LoadingOverlay open={authState.isLoading} />
    </>
  );
};

const BoxStyled = styled(Box)({
  marginBlockStart: 118,
});

export { MainLayout };
