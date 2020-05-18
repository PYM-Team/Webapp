import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    socket: {
      isConnected: false,
      message: '',
      reconnectError: false,
    },
    connection: null,
    token: '',
    ID: 0,
    players: {
      toto: { connected: true, prefered: 'Meurtrier' },
      tata: { connected: true, prefered: 'Serviteur' },
      tutu: { connected: false, prefered: 'Epouse' },
      tato: { connected: true, prefered: 'Espion' },
      tito: { connected: true, prefered: 'Serviteur' },
      tuti: { connected: true, prefered: 'Fils' },
      titi: { connected: true, prefered: 'Femme' },
    },
    Game: {
      gameName: 'fff',
      gameTemplate: 'La mort du parrain',
      gameId: 100000,
      description: 'Cette enquête se déroule dans les années 30, en plein coeur de la mafia italienne. Le parrain Don Giorgio a été assassiné. Qui a pu commettre une telle atrocité ? Qui va hériter de son empire et de sa fortune ? Toutes ces questions trouveront leur réponse ce soir.',
      duree: 0,
      Players: [],
    },
  },
  mutations: {
    SOCKET_ONOPEN(state, event) {
      Vue.prototype.$socket = event.currentTarget;
      state.socket.isConnected = true;
    },
    // eslint-disable-next-line no-unused-vars
    SOCKET_ONCLOSE(state, event) {
      state.socket.isConnected = false;
    },
    SOCKET_ONERROR(state, event) {
      console.error(state, event);
    },
    // default handler called for all methods
    SOCKET_ONMESSAGE(state, message) {
      state.socket.message = message;
    },
    // mutations for reconnect methods
    SOCKET_RECONNECT(state, count) {
      console.info(state, count);
    },
    SOCKET_RECONNECT_ERROR(state) {
      state.socket.reconnectError = true;
    },
    setDuree(state, n) {
      state.Game.duree = n;
    },
    setGameId(state, n) {
      state.Game.gameId = n;
    },
    /* dataobtain(state, content) {
      let data;
      this.$socket.sendObj(content);
      this.$options.sockets.onmessage = function (message) {
        data = JSON.parse(message.data);
        console.log(data);
        // this.$store.commit('setGameId', data.data.gameId);
      };
      if (data) {
        delete this.$options.sockets.onmessage;
      }
    }, */
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
