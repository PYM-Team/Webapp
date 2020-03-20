<template>
  <div class="dahsboard">
    <NavBar />
    <div class="title is-1">This will be a pretty Dashboard</div>
    <b-button @click="incrPlayers">Increment players number</b-button>
    <PlayerView :nombrePlayers  ="this.nbPlayers" :nameGame ="this.nameGame" :idGame="this.idGame"/>
  </div>
</template>

<script>

import NavBar from '@/components/DashboardNavBar.vue';
import PlayerView from '@/components/PlayerView.vue';
import io from 'socket.io-client';

export default {
  name: 'Dashboard',
  props: {
    nameGame: {
      type: String,
      default: 'no game here',
    },
    idGame: {
      type: Number,
      default: 0,
    },
  },
  components: {
    NavBar,
    PlayerView,
  },
  data() {
    return {
      nbPlayers: 0,
      socket: io('localhost:1337'),
    };
  },
  methods: {
    incrPlayers() {
      this.nbPlayers += 1;
      console.log(this.nbPlayers);
    },
  },
  mounted() {
    // on atend la fin du chargement de la page pour commencer les écoutes
    this.socket.emit('createGame', 101938);

    this.socket.on('playerConnected', () => {
      console.log('New player');
      this.nbPlayers += 1;
    });
    this.socket.on('playerDisconnected', () => {
      console.log('Lost a player');
      this.nbPlayers -= 1;
    });
  },
};
</script>
