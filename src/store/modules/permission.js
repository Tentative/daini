import router, { cleanRouter, fullRouter } from '@/router'
import fullRoutes from '@/router/fullRoutes'
import guestRoutes from '../../router/guestRoutes';

const roleMap = {
	guest: 0,
	authenticated: 1,
};

const isAuth = {
	state: {
		count: 0
	}
};

const permission = {
	state: {
		role: "guest",
		permittedRoutes: guestRoutes
	},
	mutations: {
		prepareRoutes: state => {
			state.permittedRoutes = filterAsyncRoutes(fullRouter, state.role);
		},

		switchRole: (state, r) => {
			state.role = r;
		}
	},
	actions: {
		UPDATE_ROUTES: ({ commit, state }) => {
			cleanRouter(router);
			commit('prepareRoutes');
			router.addRoutes(state.permittedRoutes);
			return router;
		},
	}
};

function hasPermission(route, role) {
	if (route.meta && route.meta.role) {
		return roleMap[route.meta.role] >= roleMap[role];
	} else {
		return true;
	}
}

function filterAsyncRoutes(routes, role) {
	let temp = [...routes];
	return temp.filter(route => {
		if (hasPermission(route, role)) {
			if (route['children']) {
				filterAsyncRoutes(route['children'])
			}
			return true;
		}
		return false;
	});
}


export default permission;
