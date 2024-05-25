import Auth from "../pages/auth/Auth";
import Home from "../pages/home/Home";
import Profile from "../pages/profile/Profile";

export const routes = [
    {
        path: '/',
        exact: true,
        component: Home,
        auth: true,
    },
    {
        path: '/profile',
        exact: false,
        component: Profile,
        auth: true,
    },
    {
        path: '/auth',
        exact: true,
        component: Auth,
        auth: false,
    }
]