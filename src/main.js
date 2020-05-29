import Vue from 'vue';
import Buefy from 'buefy';
import VueNativeSock from 'vue-native-websocket';
import App from './App.vue';
import router from './router';
import store from './store';
// import 'buefy/dist/buefy.css';


Vue.use(VueNativeSock, 'wss://rpplanner-api.herokuapp.com/', {
  reconnection: true, // (Boolean) whether to reconnect automatically (false)
  reconnectionAttempts: 50, // (Number) number of reconnection attempts before giving up (Infinity),
  reconnectionDelay: 3000,
  store,
  format: 'json',
}); // SI ERREUR : npm install vue-native-websocket --save
Vue.use(Buefy);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
