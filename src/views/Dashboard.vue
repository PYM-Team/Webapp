<template>
  <div id="dashboard">
    <NavBar />
    <b-tabs type="is-toggle" position="is-centered" v-model="activeTab">
      <b-tab-item label="Général">
        <Overview />
      </b-tab-item>
      <b-tab-item label="Faire une annonce">
        <Annonce />
      </b-tab-item>
      <b-tab-item label="Personnages">
        <PlayersView />
      </b-tab-item>
      <b-tab-item label="Evenements">
        <Evenements/>
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import NavBar from '@/components/DashboardNavBar.vue';
import PlayersView from '@/components/Personnage/PlayersView.vue';
import Annonce from '@/components/Annonce.vue';
import Overview from '@/components/Overview.vue';
import Evenements from '@/components/Evenements.vue';

export default {
  name: 'Dashboard',
  components: {
    NavBar,
    PlayersView,
    Annonce,
    Overview,
    Evenements,
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
    // if (this.$store.state.token === 0) {
    //   this.$router.push({ path: '/' });
    // }
    // // on atend la fin du chargement de la page pour commencer les écoutes
    // this.$store.state.socket.emit('createGame', 101938);
    // this.$store.state.gameId = 101938;

    // this.$store.state.socket.on('playerConnected', (playerlist) => {
    //   console.log('New player');
    //   this.$store.state.players = playerlist;
    // });
    // this.$store.state.socket.on('playerDisconnected', (playerlist) => {
    //   console.log('Lost a player');
    //   this.$store.state.players = playerlist;
    // });
    // requête getGM
    console.log('DASHBOARD CREE');
    const ourtoken = this.$store.state.token;
    const content = {
      type: 'getMg',
      status: 'ok',
      token: ourtoken,
      data: {},
    };
    console.log('ENVOYE');
    let data;
    this.$socket.sendObj(content);
    this.$options.sockets.onmessage = function (message) {
      console.log('MESSAGE RECU');
      data = JSON.parse(message.data);
      console.log(data);
      if (data.type === 'getMg') {
        console.log(data);
        if (data.status === 'error') {
          console.log('ERROR');
        } else {
          // ça  a marché
          console.log('BONJOUR');
          this.$store.commit('setEvents', data.data.events);
          this.$store.commit('setPlayersDetailed', data.data.players);
        }
      }
      if (data) {
        delete this.$options.sockets.onmessage;
      }
    };
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Luckiest+Guy|Patrick+Hand&display=swap');

html {
  height: 100%;
  background: url(https://images-na.ssl-images-amazon.com/images/I/014m2zoaPrL.png);
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
.player-role {
  font-family: "Patrick Hand", cursive;
  font-size: 1.2rem;
}
.tabs a {
  border: none !important;
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
  border-color: #ff0000;
}
</style>
