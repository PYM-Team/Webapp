<template>
  <div class="dahsboard">
    <NavBar />
    <b-tabs position="is-centered" v-model="activeTab">
      <b-tab-item label="Overview">
        <Overview />
      </b-tab-item>
      <b-tab-item label="Player">
        <PlayerView />
      </b-tab-item>
      <b-tab-item label="Players">
        <PlayersView />
      </b-tab-item>
      <b-tab-item label="Missions">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Minima eveniet amet beatae deserunt dolorum? Cumque necessitatibus
        hic eligendi ipsum amet! Quas totam deserunt natus unde rerum
        delectus placeat et dignissimos.
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import NavBar from '@/components/DashboardNavBar.vue';
import PlayersView from '@/components/PlayersView.vue';
import PlayerView from '@/components/PlayerView.vue';
import Overview from '@/components/Overview.vue';
import io from 'socket.io-client';

export default {
  name: 'Dashboard',
  components: {
    NavBar,
    PlayersView,
    PlayerView,
    Overview,
  },
  data() {
    return {
      players: {
        toto: { connected: true },
        tata: { connected: true },
        tutu: { connected: false },
      },
      socket: io('https://rpplanner-api.herokuapp.com/'),
      activeTab: 0,
    };
  },
  mounted() {
    // on atend la fin du chargement de la page pour commencer les écoutes
    this.socket.emit('createGame', 101938);
    this.$store.state.gameId = 101938;

    this.socket.on('playerConnected', (playerlist) => {
      console.log('New player');
      this.$store.state.players = playerlist;
    });
    this.socket.on('playerDisconnected', (playerlist) => {
      console.log('Lost a player');
      this.$store.state.players = playerlist;
    });
  },
};
</script>
