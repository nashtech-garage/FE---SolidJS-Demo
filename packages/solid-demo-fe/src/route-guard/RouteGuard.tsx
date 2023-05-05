import { createEffect } from 'solid-js';
import { Outlet, useNavigate } from '@solidjs/router';
import { authStore } from '../store';
export default function RouteGuard() {
  const {
    authState: { user },
  } = authStore;
  const navigate = useNavigate();
  createEffect(() => {
    if (!user) {
      navigate('/', { replace: true });
    }
  });
  return <Outlet />;
}
