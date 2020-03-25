import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    players: {
      toto: { connected: true },
      tata: { connected: true },
      tutu: { connected: false },
    },
    gameTemplate: 'Murder at TC',
    gameId: 100000,
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
});
