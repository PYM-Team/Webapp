<template>
<div>
  <aside class="menu"> <!-- on affiche un menu avec pour titre players et comme contenu la liste des joueurs connectés avec leurs rôles préférés-->
    <p class="menu-label">
      Players
    </p>
    <ul class="menu-list player-name">
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
      // roles: [];
      roles: ['Vito Falcaninio', 'Carla Gurzio', 'Petro Francesco', 'Sebastiano Pechetto', 'Tommaso-Giorgio', '“El Sampico”'], // rôle disponible initialement
    };
  },
  methods: {
    SelectPlayer(key, prefered) {
      this.$emit('selected', [key, prefered]); // quand on clique sur un joueur emet un evenement renvoyant un tableau avec le nom du joueur et son rôle preféré
    },
    SendRandom() {
      let dice = 0;
      for (let i = 0; i < (this.players.length); i += 1) {
        if (this.players[i].connected) {
          dice = Math.floor(Math.random() * this.roles.length);
          this.RandomRoles.push([this.roles[dice], this.players[i].name]);
          this.roles.splice(dice, 1);
        }
      }
      this.$store.commit('setRandom', false);
      this.$emit('randomise', this.RandomRoles);
      this.RandomRoles = [];
      this.roles = ['Vito Falcaninio', 'Carla Gurzio', 'Petro Francesco', 'Sebastiano Pechetto', 'Tommaso-Giorgio', '“El Sampico”'];
    },
  },
  mounted() { // a la creation de la page on instaure un listener qui recoit une update quand un nouveau joueur se connecte
    this.players = this.$store.state.players;
    let data;
    let n = 0;
    console.log('done1');
    this.$options.sockets.onmessage = function (message) {
      data = JSON.parse(message.data);
      console.log(data);
      if (data.type === 'updatePlayers') {
        n += 1;
        this.$store.commit('setPlayerInit', data.data.players);
        this.players = this.$store.state.players;
        console.log(data);
        if (n === 1) { // au premier joueur reçu on recupere les rôles
          console.log('done');
          this.roles = this.$store.state.Game.roles;
        }
      }
    };
    if (n === this.roles.length) {
      delete this.$options.sockets.onmessage;
    }
  },
  props: {
    isClicked: Boolean,
  },
};

</script>

<style>
.menu-label {
  font-family: "Luckiest Guy", cursive;
  font-size: 2rem !important;
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
