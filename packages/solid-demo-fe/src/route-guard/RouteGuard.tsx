


import { createEffect } from "solid-js";
import { Outlet, useNavigate } from "@solidjs/router";
export default function RouteGuard() {
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');

    createEffect(() => {
        if (!token) {
            navigate('/', { replace: true });
        }
    })
    return (
        <div>
            <Outlet />
        </div>
    )
}

