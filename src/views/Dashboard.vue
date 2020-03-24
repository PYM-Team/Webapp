
<template>
  <div class="dahsboard">
    <NavBar />
    <div class="title is-1">This will be a pretty Dashboard</div>
    <PlayerView :players="this.players" :nameGame="this.nameGame" :idGame="this.idGame" />
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
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
      players: {},
      socket: io('localhost:1337'),
    };
  },
  mounted() {
    // on atend la fin du chargement de la page pour commencer les écoutes
    this.socket.emit('createGame', 101938);

    this.socket.on('playerConnected', (playerlist) => {
      console.log('New player');
      this.players = playerlist;
    });
    this.socket.on('playerDisconnected', (playerlist) => {
      console.log('Lost a player');
      this.players = playerlist;
    });
  },
};
</script>
