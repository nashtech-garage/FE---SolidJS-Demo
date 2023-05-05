import { createEffect } from 'solid-js';
import { Outlet, useNavigate } from '@solidjs/router';
export default function RouteGuard() {
    const navigate = useNavigate();
    const customerId = sessionStorage.getItem('customerId');

    createEffect(() => {
        if (!customerId) {
            navigate('/', { replace: true });
        }
    });
    return (
        <div>
            <Outlet />
        </div>
    );
}
