<template>
    <b-navbar id="home-nav"> <!-- barre de navigation avec un bouton home et un autre identification ouvrant un modal -->
      <template slot="brand">
          <b-navbar-item tag="router-link" :to="{ path: '/' }">
              <img
                  src="https://i.imgur.com/vmOM3ZT.png"
                  alt="Lightweight UI components for Vue.js based on Bulma"
              >
          </b-navbar-item>
      </template>

      <template slot="end">
        <b-navbar-item tag="div">
          <h1 v-if="url === 'Overview' " class="has-text-grey-lighter is-size-4 is-centered">
            Joueur
          </h1>
          <h1 v-if="url === 'Dashboard' " class="has-text-grey-lighter is-size-4 is-centered">
            Maitre du jeu
          </h1>
        </b-navbar-item>
        <b-navbar-item v-if="url === 'Dashboard' || url === 'Overview' " tag="div">
              <div class="field">
                <b-switch size="is-large" :outlined=true @input="ChangePageDelay(ChangePage), Save()" v-bind:value="changePage"></b-switch>
              </div>
          </b-navbar-item>
          <b-navbar-item tag="div">
              <div class="buttons">
                  <a class="button is-primary" @click="Save">
                      Sauvegarder
                  </a>
              </div>
          </b-navbar-item>
          <b-navbar-item tag="div">
              <div class="buttons">
                  <a class="button is-primary" @click="quit = true">
                      Sauvegarder et quitter
                  </a>
              </div>
          </b-navbar-item>
          <b-modal :active.sync="quit" scroll="keep"> <!-- le modal demande confirmation avant de quitter -->
            <b-message class= "is-primary has-text-centered is-size-5">
            <article class="title is-centered has-text-black has-text-centered"> Voulez vous vraiment quitter la partie en cours ? </article>
            <article class="is-centered is-size-3 has-text-centered"> Notez bien votre numéro de partie : <strong>{{this.$store.state.Game.gameId}}</strong> </article> <br>
            <b-button class="button is-primary tile is-centered is-12" @click="Save(), Quitter()"> Salut ! </b-button>
            </b-message>
          </b-modal>
      </template>
  </b-navbar>
</template>

<script>
export default {
  name: 'DashboardNavBar',

  data() {
    return {
      quit: false,
      url: '',
      changePage: false,
      trysave: 0,
    };
  },
  methods: {
    Save() {
      const ourtoken = this.$store.state.token;
      const content = {
        type: 'save',
        status: 'ok',
        token: ourtoken,
        data: {
        },
      };
      let data;
      this.$socket.sendObj(content);
      this.$options.sockets.onmessage = function (message) {
        data = JSON.parse(message.data);
        if (data.type === 'save') {
          if (data.status === 'error') {
            this.trysave += 1;
            if (this.trysave === 5) {
              this.Error();
              delete this.$options.sockets.onmessage;
              this.trysave = 0;
            } else {
              setTimeout(this.StopPartie(), 300);
            }
          } else {
            this.$buefy.toast.open({
              message: 'Partie sauvegardé ! ',
              type: 'is-success',
            });
          }
        }
        if (data) {
          delete this.$options.sockets.onmessage;
        }
      };
    },
    Quitter() {
      this.$router.push({ path: '/' });
    },
    ChangePageDelay(ChangePage) {
      setTimeout(ChangePage, 180);
    },
    ChangePage() {
      if (this.url === 'Overview') {
        this.$router.push({ path: '/Dashboard' });
      } else {
        this.$router.push({ path: '/Overview' });
      }
    },
  },
  created() {
    this.url = this.$route.name;
    if (this.url === 'Overview') {
      this.changePage = false;
    } else {
      this.changePage = true;
    }
  },
};
</script>

<style>
#dashboard-nav {
    background: none;
}
</style>
