import error from './error'
import store from "@/store"
import dynamicRoutes from './dynamicRoutes'

const fullRoutes = [
	{
		path: '/',
		name: 'home',
		components: {
			default: () => import('@/components/Homepage'),
			tip: () => import('@/views/common/Home/tip')
		},
		meta: {
			icon: 'user'
		}
	},
	{
		path: '/amz',
		name: 'amazon',
		components: {
			default: () => import('@/views/common/Amazon/index.vue'),
			tip: () => import('@/views/common/Home/tip')
		},
		meta: {
			icon: 'amazon',
			requiresAuth: true

		}
	},
	{
		path: '/test',
		name: 'test',
		components: {
			default: () => import('@/views/common/Test/Table/eTable.vue'),
			tip: () => import('@/views/common/Home/tip')
		},
		meta: {
			icon: 'signal-fill',
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
