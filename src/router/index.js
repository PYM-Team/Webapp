import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Dashboard from '../views/Dashboard.vue';
import Setup from '../views/Setup.vue';
import Overview from '../views/Overview.vue';
import Results from '../views/Results.vue';
import Choice from '../views/Choice.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
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
  {
    path: '/Results',
    name: 'Results',
    component: Results,
  },
  {
    path: '/Overview',
    name: 'Overview',
    component: Overview,
  },

  {
    path: '/Choice',
    name: 'Choice',
    component: Choice,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
