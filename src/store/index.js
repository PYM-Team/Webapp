import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    init: {
      templates: [],
    },
    socket: {
      isConnected: false,
      message: '',
      reconnectError: false,
    },
    connection: null,
    token: 0,
    ID: 0,
    players: [],
    Game: {
      gameName: 'fff',
      gameTemplate: 'La mort du parrain',
      gameId: 100000,
      roles: [],
      description: 'Cette enquête se déroule dans les années 30, en plein coeur de la mafia italienne. Le parrain Don Giorgio a été assassiné. Qui a pu commettre une telle atrocité ? Qui va hériter de son empire et de sa fortune ? Toutes ces questions trouveront leur réponse ce soir.',
      duree: 10,
      Players: [],
      PlayersDetailed: [],
      events: [
        { nom: 'start', description: 'lance la partie', declenche: true },
        { nom: 'fin', description: 'termine la partie', declenche: false },
      ],
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
    setDescription(state, desc) {
      state.Game.description = desc;
    },
    setRoles(state, roles) {
      state.Game.roles = roles;
    },
    setPlayerInit(state, playerinit) {
      state.players = playerinit;
    },
    setGameId(state, n) {
      state.Game.gameId = n;
    },
    setToken(state, n) {
      state.token = n;
    },
    setTemplates(state, n) {
      state.init.templates = n;
    },
    setName(state, n) {
      state.Game.gameName = n;
    },
    setPlayers(state, tab) {
      for (let i = 0; i < tab.length; i += 1) {
        state.Game.Players.push(tab[i]);
      }
    },
    setEvents(state, tabEvents) {
      state.Game.events = tabEvents;
    },
    setPlayersDetailed(state, tabPD) {
      state.Game.PlayersDetailed = tabPD;
    },
  },
  actions: {
  },
  modules: {
  },
});
