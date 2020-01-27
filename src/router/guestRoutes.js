import error from './error'
import dynamicRoutes from './dynamicRoutes'

const guestRoutes = [
    {
        path: '/',
        name: 'home',
        components: {
            default: () => import('@/views/common/Home/index'),
            tip: () => import('@/views/common/Home/tip')
        },
        meta: {
            icon: 'home'
        }
    },

    error,
];

export default guestRoutes;