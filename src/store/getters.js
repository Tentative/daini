export default {
  appTitle: state => state.apps.title,

  sidebarOpen: state => state.apps.sidebar.open,
  tipbarOpen: state => state.apps.tipbar.open,

  role: state => state.permission.role,

  routes: state => state.permission.permittedRoutes,
  showRole: state => state.authenticated,
  isLoggedIn: () => !!localStorage.getItem('jwtUtente') || !!sessionStorage.getItem('jwtUtente'),
  isSession: state => state.login.IsMemorizzaPassword,
  authStatus: state => state.status,
  keepLogged: state => state.keepLogged
};
