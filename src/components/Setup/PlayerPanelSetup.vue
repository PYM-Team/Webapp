<template>
<div>
  <aside class="menu"> <!-- on affiche un menu avec pour titre players et comme contenu la liste des joueurs connectés avec leurs rôles préférés-->
    <p class="menu-label">
      <strong> Joueurs </strong>
    </p>
    <ul class="menu-list">
      <div v-for="player in players" v-bind:key="player.name">
        <li v-if="player.connected" v-on:click="SelectPlayer(player.name, player.prefered)"><a><strong> {{ player.name }} </strong> <br> <sub> veut etre {{ player.prefered }} </sub></a></li>
      </div>
    </ul>
  </aside>
  <b-modal :active.sync="isClicked" scroll="keep">
    <article>
      <b-button class="button is-primary is-large is-vcentered is-4" @click="SendRandom()"> Êtes vous vraiment sûr ? </b-button>
    </article>
  </b-modal>
</div>
</template>

<script>
export default {
  name: 'PlayerPanel',
  data() {
    return {
      players: this.$store.state.players, // la liste des joueurs connectés avec leur rôles préférés
      RandomRoles: [],
      roles: [],
      // roles: ['Vito Falcaninio', 'Carla Gurzio', 'Petro Francesco', 'Sebastiano Pechetto', 'Tommaso-Giorgio', '“El Sampico”'], // rôle disponible initialement
    };
  },
  methods: {
    SelectPlayer(key, prefered) {
      this.$emit('selected', [key, prefered]); // quand on clique sur un joueur emet un evenement renvoyant un tableau avec le nom du joueur et son rôle preféré
    },
    SendRandom() {
      const RolesBases = this.$store.state.Game.roles;
      for (let i = 0; i < this.$store.state.Game.roles.length; i += 1) {
        this.roles.push(RolesBases[i]);
      }
      let dice = 0;
      for (let i = 0; i < (this.players.length); i += 1) {
        if (this.players[i].connected) {
          dice = Math.floor(Math.random() * this.roles.length);
          this.RandomRoles.push([this.roles[dice], this.players[i].name]);
          this.roles.splice(dice, 1);
        }
      }
      // this.$store.commit('setRandom', false);
      this.$emit('randomise', this.RandomRoles);
      this.RandomRoles = [];
    },
  },
  mounted() { // a la creation de la page on instaure un listener qui recoit une update quand un nouveau joueur se connecte
    this.players = this.$store.state.players;
    let data;
    let RolesBases;
    let n = 0;
    this.$options.sockets.onmessage = function (message) {
      data = JSON.parse(message.data);
      if (data.type === 'startGame') {
        console.log(data);
        console.log('PartieStarted');
        if (data.status === 'error') {
          this.tryStart += 1;
          if (this.tryCreate === 5) {
            this.Error();
            delete this.$options.sockets.onmessage;
            this.tryCreate = 0;
          } else {
            setTimeout(this.demarrer(), 300);
          }
        } else {
          console.log('goo');
          this.$router.push({ path: '/overview' }); // on change de page
        }
      }
      if (data.type === 'updatePlayers') {
        console.log(data);
        n += 1;
        this.$store.commit('setPlayerInit', data.data.players);
        this.players = this.$store.state.players;
        if (n === 1) { // au premier joueur reçu on recupere les rôles
          RolesBases = this.$store.state.Game.roles;
          for (let i = 0; i < this.$store.state.Game.roles.length; i += 1) {
            this.roles.push(RolesBases[i]);
          }
        }
      }
    };
  },
  props: {
    isClicked: Boolean,
  },
};

</script>

<style>
.menu-list {
  font-family: "sans serif";
  font-size: 1.5rem !important;
  color: white !important;
}
</style>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Player</title>
</head>
<body>
  <h1>Player view</h1>
</body>
</html>
