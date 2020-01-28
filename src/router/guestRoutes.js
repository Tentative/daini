import error from './error'
const guestRoutes = [
    {
        path: '/',
        name: 'home',
        components: {
            default: () => import('@/views/common/Dashboard/login'),
            tip: () => import('@/views/common/Home/tip')
        },
        meta: {
            icon: 'earth',
            role: 'guest'
        }
    }
]

export default guestRoutes;