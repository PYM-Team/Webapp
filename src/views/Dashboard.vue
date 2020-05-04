<template>
  <div id="dashboard">
    <NavBar />
    <b-tabs type="is-toggle" position="is-centered" v-model="activeTab">
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
        <Missions />
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
import Missions from '@/components/Missions.vue';

export default {
  name: 'Dashboard',
  components: {
    NavBar,
    PlayersView,
    PlayerView,
    Overview,
    Missions,
  },
  data() {
    return {
      players: {
        toto: { connected: true },
        tata: { connected: true },
        tutu: { connected: false },
      },
      activeTab: 0,
    };
  },
  mounted() {
    // on atend la fin du chargement de la page pour commencer les écoutes
    this.$store.state.socket.emit('createGame', 101938);
    this.$store.state.gameId = 101938;

    this.$store.state.socket.on('playerConnected', (playerlist) => {
      console.log('New player');
      this.$store.state.players = playerlist;
    });
    this.$store.state.socket.on('playerDisconnected', (playerlist) => {
      console.log('Lost a player');
      this.$store.state.players = playerlist;
    });
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Luckiest+Guy|Patrick+Hand&display=swap');

html {
  height: 100%;
  background: linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url("https://i.imgur.com/Q6jFqbg.jpg") no-repeat center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
.player-name {
  font-family: "Luckiest Guy", cursive;
  font-size: 1.2rem;
}
.player-role {
  font-family: "Patrick Hand", cursive;
  font-size: 1.2rem;
}
.tabs a {
  border: none !important;
  font-family: "Luckiest Guy", cursive;
  font-size: 1rem;
  color: white !important;
}
.tabs a:hover {
  color: black !important;
}
.card-footer-item {
  /* trick to remove the uggly white line on the bottom */
  margin-top: -1px;
  border-top-style: solid;
  border-top-width: 1px;
  border-color: #cf86fc;
}
</style>
