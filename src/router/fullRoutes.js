import error from './error'
import dynamicRoutes from './dynamicRoutes'

const fullRoutes = [
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
	},
	{
		path: '/dash',
		name: 'dash',
		components: {
			default: () => import('@/views/common/Home/index'),
			tip: () => import('@/views/common/Home/tip')
		},
		meta: {
			icon: 'earth',
			meta: {
				requiresAuth: true
			}
		}
	},
	{
		path: '/test',
		name: 'test',
		components: {
			default: () => import('@/views/common/Home/login'),
		},
		meta: {
			icon: 'earth',
			role: 'root'
		}
	},
	{
		path: '/about',
		name: 'about',
		components: {
			default: () => import('@/views/common/About/index'),
			tip: () => import('@/views/common/About/tip')
		},
		meta: {
			icon: 'info-circle',
			role: 'root',
		},
		children: [
			{
				path: 'a',
				name: 'a',
				component: () => import('@/views/common/About/a'),
				children: [
					{
						path: 'b',
						name: 'b',
						component: () => import('@/views/common/About/b')
					},
					{
						path: 'c',
						name: 'c',
						component: () => import('@/views/common/About/c')
					},
				]
			}
		]
	},
	{
		path: '/playground',
		name: 'playground',
		components: {
			default: () => import('@/views/common/Playground/index'),
			tip: () => import('@/views/common/Playground/tip')
		},
		meta: {
			icon: 'earth',
			sideName: 'play',
			role: 'root'
		}
	},
	...dynamicRoutes,
	{
		path: '/icons',
		name: 'icons',
		components: {
			default: () => import('@/views/common/Icon/index'),
			tip: () => import('@/views/common/Icon/tip')
		},
		meta: {
			icon: 'crown',
			role: 'root'
		}
	},
	error,
];

export default fullRoutes;
