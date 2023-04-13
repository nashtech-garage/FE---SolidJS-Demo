import { Outlet } from '@solidjs/router';
import Header from './Header';

function MainLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export { MainLayout };
