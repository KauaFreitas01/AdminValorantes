import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TimesView from '../views/TimesView.vue'
import MatchsView from '../views/MatchsView.vue'
import LoginView from '../views/LoginView.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: HomeView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/times',
    name: 'Equipes',
    component: TimesView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/matchs',
    name: 'Partidas',
    component: MatchsView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Entre no Painel',
    component: LoginView
  },
]
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})
// Verifica a autenticação antes de cada rota com meta.requiresAuth
router.beforeEach((to, from, next) => {
  const currentUser = localStorage.getItem("user");
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) {
    next("/login");
  } else {
    next();
  }
});
export default router
