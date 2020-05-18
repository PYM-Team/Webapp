import Vue from 'vue';
import Vuex from 'vuex';
import io from 'socket.io-client';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    players: [
        { name: 'toto', connected: true, prefered: 'Meurtrier' },
        { name: 'tata', connected: true, prefered: 'Serviteur' },
        { name: 'tutu', connected: false, prefered: 'Epouse' },
        { name: 'tato', connected: true, prefered: 'Espion' },
        { name: 'tito', connected: true, prefered: 'Serviteur' },
        { name: 'tuti', connected: true, prefered: 'Fils' },
      ],
    Game: {
      gameName: 'fff',
      gameTemplate: 'La mort du parrain',
      gameId: 100000,
      description: 'Cette enquête se déroule dans les années 30, en plein coeur de la mafia italienne. Le parrain Don Giorgio a été assassiné. Qui a pu commettre une telle atrocité ? Qui va hériter de son empire et de sa fortune ? Toutes ces questions trouveront leur réponse ce soir.',
      duree: 0,
      Players: [],
    },
    socket: io('http://localhost:1337/'),
  },
  mutations: {
    setDuree(state, n) {
      state.Game.duree = n;
    },
    setName(state, n) {
      state.Game.gameName = n;
    },
    setPlayers(state, tab) {
      for (let i = 0; i < tab.length; i += 1) {
        state.Game.Players.push(tab[i]);
      }
    },
  },
  actions: {
  },
  modules: {
  },
});
