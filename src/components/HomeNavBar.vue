<template>
<div>
  <b-navbar id="home-nav"> <!-- barre de navigation avec un bouton home et un autre identification ouvrant un modal -->
      <template slot="brand">
          <b-navbar-item tag="router-link" :to="{ name: 'Dashboard', params: {nameGame: 'Test'}}"  >
              <img
                  src="https://i.imgur.com/vmOM3ZT.png"
                  alt="Lightweight UI components for Vue.js based on Bulma"
              >
          </b-navbar-item>
      </template>

      <template slot="end">
          <b-navbar-item tag="div">
              <div class="buttons">
                  <a class="button is-primary" @click="log = true">
                      Identification
                  </a>
              </div>
          </b-navbar-item>
      </template>
  </b-navbar>

  <b-modal :active.sync="log" scroll="keep"> <!-- modal demandant de rentrer l'identifiant de partie et le nom d'un des joueurs -->
    <b-message title="Log in" class= "is-primary has-text-centered is-size-5">
      <div class="field">
        <label v-if="error === true" class =" is-danger">  <b>Game ID ou prénom incorrect </b> </label> <!-- si erreur cette ligne s'affiche  -->
        <label class="label">Identifiant de partie</label>

        <div class="control">
            <input class="input" type="number" v-model="Game.id" placeholder="135644" maxlength="6"> <!-- identifiant de partie -->
        </div>
      </div>

      <div class="field">
        <b-field label="Prenom d'un joueur"> <!-- prenom d'un joueur qui ne s'affiche pas directement -->
          <b-input type="password"
            value="Tom" v-model="Game.name"
            password-reveal>
          </b-input>
        </b-field>
      </div>

      <b-button  class="button is-primary" @click="Submit()" >Valider</b-button> <!-- bouton pour valider et vérifier les données -->
    </b-message>
  </b-modal>
</div>
</template>

<script>
export default {
  name: 'HomeNavBar',
  data() {
    return {
      log: false,
      error: false,
      Game: {
        id: '',
        name: '',
      },
      Receive: {
        name: ['jean', 'toto', 'jacques'],
      },
    };
  },
  methods: {
    Submit() {
      // eslint-disable-next-line no-unused-vars
      let valid = false;
      // sent Game id
      // receive name
      for (let i = 0; i < this.Receive.name.length; i += 1) {
        if (this.Game.name === this.Receive.name[i]) {
          valid = true;
          this.$router.push({ path: '/Choice' });
        }
      }
      if (valid === false) {
        this.error = true;
      }
    },
  },
};
</script>

<style>
#home-nav {
    background: none;
}
</style>
