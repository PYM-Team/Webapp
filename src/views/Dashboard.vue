<template>
  <div id="dashboard">
    <b-loading :active.sync="Loading" :can-cancel="false" :is-full-page="false"></b-loading>
    <NavBar v-if="Loading === false"/>
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
      Loading: true,
      players: {
        toto: { connected: true },
        tata: { connected: true },
        tutu: { connected: false },
      },
      activeTab: 0,
    };
  },
  methods: {
    notification() {
      let data;
      this.$options.sockets.onmessage = function (message) {
        data = JSON.parse(message.data);
        if (data.type === 'notification') {
          if (data.data.type === 'info') {
            this.$buefy.toast.open({
              duration: 6000,
              message: data.data.message,
              position: 'is-bottom',
              type: 'is-info',
            });
          }
          if (data.data.type === 'warn') {
            this.$buefy.toast.open({
              duration: 6000,
              message: data.data.message,
              position: 'is-bottom',
              type: 'is-warning',
            });
          }
        }
      };
    },
  },
  mounted() {
    if (this.$store.state.token === 0) {
      this.$router.push({ path: '/' });
    }
  },
  created() {
    const ourtoken = this.$store.state.token;
    const content = {
      type: 'getMg',
      status: 'ok',
      token: ourtoken,
      data: {},
    };
    let data;
    this.$socket.sendObj(content);
    this.$options.sockets.onmessage = function (message) {
      data = JSON.parse(message.data);
      console.log(data);
      if (data.type === 'getMg') {
        console.log(data);
        if (data.status === 'error') {
          this.$buefy.toast.open({
            duration: 5000,
            message: 'Une erreur s\'est produite veuillez reessayer plus tard',
            position: 'is-bottom',
            type: 'is-danger',
          });
        } else {
          this.$store.commit('setEvents', data.data.events);
          this.$store.commit('setPlayersDetailed', data.data.players);
          this.Loading = false;
        }
      }
      if (data) {
        delete this.$options.sockets.onmessage;
        setTimeout(() => {
          this.notification();
        }, 10000);
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
