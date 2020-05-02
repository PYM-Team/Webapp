import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Dashboard from '../views/Dashboard.vue';
import Setup from '../components/Setup/SetupTotal.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/Dashboard',
    name: 'Dashboard',
    component: Dashboard,
    props: true,
  },

  {
    path: '/Setup',
    name: 'Setup',
    component: Setup,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
