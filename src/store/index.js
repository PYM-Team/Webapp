import Vue from 'vue';
import Vuex from 'vuex';
import io from 'socket.io-client';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    players: {
      toto: { connected: true },
      tata: { connected: true },
      tutu: { connected: false },
      titi: { connected: true },
    },
    gameTemplate: 'La mort du parrain',
    gameId: 100000,
    socket: io('http://localhost:1337/'),
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
});
