import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TimesView from '../views/TimesView.vue'
import MatchsView from '../views/MatchsView.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: HomeView
  },
  {
    path: '/times',
    name: 'Equipes',
    component: TimesView
  },
  {
    path: '/matchs',
    name: 'Partidas',
    component: MatchsView
  },
]

const router = new VueRouter({
  routes
})

export default router
