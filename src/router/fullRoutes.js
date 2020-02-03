import error from './error'
// import dynamicRoutes from './dynamicRoutes'

const fullRoutes = [
	{
		path: '/',
		name: 'home',
		components: {
			default: () => import('@/components/Login'),
			tip: () => import('@/views/common/Home/tip')
		},
		meta: {
			icon: 'earth'
		}
	},
	{
		path: '/dash',
		name: 'dash',
		components: {
			default: () => import('@/views/common/Secure/Secure'),
			tip: () => import('@/views/common/Home/tip')
		},
		meta: {
			icon: 'earth',
			requiresAuth: true

		}
	},
	{
		path: '/mainpage',
		name: 'mainpage',
		components: {
			default: () => import('@/views/common/Main/'),
			tip: () => import('@/views/common/Home/tip')
		},
		meta: {
			icon: 'crown',
			requiresAuth: false

		}
	},

	// {
	// 	path: '/test',
	// 	name: 'test',
	// 	components: {
	// 		default: () => import('@/views/common/Home/login'),
	// 	},
	// 	meta: {
	// 		icon: 'earth',
	// 		role: 'root'
	// 	}
	// },
	// {
	// 	path: '/about',
	// 	name: 'about',
	// 	components: {
	// 		default: () => import('@/views/common/About/About'),
	// 		tip: () => import('@/views/common/About/tip')
	// 	},
	// 	meta: {
	// 		icon: 'info-circle',
	// 		role: 'root',
	// 	},

	// },
	// {
	// 	path: '/playground',
	// 	name: 'playground',
	// 	components: {
	// 		default: () => import('@/views/common/Playground/index'),
	// 		tip: () => import('@/views/common/Playground/tip')
	// 	},
	// 	meta: {
	// 		icon: 'earth',
	// 		sideName: 'play',
	// 		role: 'root'
	// 	}
	// },
	// ...dynamicRoutes,
	// {
	// 	path: '/icons',
	// 	name: 'icons',
	// 	components: {
	// 		default: () => import('@/views/common/Icon/index'),
	// 		tip: () => import('@/views/common/Icon/tip')
	// 	},
	// 	meta: {
	// 		icon: 'crown',
	// 		role: 'root'
	// 	}
	// },
	error,

];

export default fullRoutes;
