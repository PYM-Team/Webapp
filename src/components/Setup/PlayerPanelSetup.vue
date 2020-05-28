<template>
<div>
  <aside class="menu"> <!-- on affiche un menu avec pour titre players et comme contenu la liste des joueurs connectés avec leurs rôles préférés-->
    <p class="menu-label">
      <strong> Joueurs </strong>
    </p>
    <ul class="menu-list">
    <b-loading :active.sync="Loading" :can-cancel="false" :is-full-page="false"></b-loading>
      <div v-for="player in players" v-bind:key="player.name">
        <li v-if="player.connected && Loading === false" v-on:click="SelectPlayer(player.name, player.prefered)"><a><strong> {{ player.name }} </strong> <br> <sub> veut etre {{ player.prefered }} </sub></a></li>
      </div>
    </ul>
  </aside>
  <b-modal :active.sync="isClicked" class="is-centered" scroll="keep">
    <article>
      <b-button class="button is-8 is-primary is-large is-centered is-rounded is-vcentered is-4" @click="SendUnRandom()"> Tirage prenant en compte les préférences </b-button> <br> <br>
      <b-button class="button is-8 is-primary is-large is-rounded is-vcentered is-4" @click="SendRandom()"> Tirage Aléatoire Total </b-button>
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
      Loading: true,
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
      this.roles.splice(this.$store.state.Game.roles.length, 100);
      let dice = 0;
      let diceP = 0;
      for (let i = 0; i < this.$store.state.Game.roles.length; i += 1) {
        diceP = Math.floor(Math.random() * this.players.length);
        if (this.players[diceP].connected) {
          dice = Math.floor(Math.random() * this.roles.length);
          this.RandomRoles.push([this.roles[dice], this.players[i].name]);
          this.roles.splice(dice, 1);
        }
      }
      this.$store.commit('setRandom', false);
      this.$emit('randomise', this.RandomRoles);
      this.RandomRoles = [];
    },
    SendUnRandom() {
      const RolesBases = this.$store.state.Game.roles;
      for (let k = 0; k < this.$store.state.Game.roles.length; k += 1) {
        this.roles.push(RolesBases[k]);
      }
      this.roles.splice(this.$store.state.Game.roles.length, 100);
      let diceP = 0;
      let diceR = 0;
      let assign = false;
      const RandomPlayer = [];
      const Player = this.$store.state.players;
      for (let t = 0; t < (this.$store.state.players.length); t += 1) {
        RandomPlayer.push(Player[t]);
      }
      RandomPlayer.splice(this.$store.state.players.length, 100);
      console.log(RolesBases.length);
      console.log(RandomPlayer);
      for (let i = 0; i < (RolesBases.length); i += 1) {
        diceP = Math.floor(Math.random() * RandomPlayer.length);
        if (RandomPlayer[diceP] !== undefined && RandomPlayer.indexOf(RandomPlayer[diceP]) !== -1) {
          if (RandomPlayer[diceP].connected) {
            for (let j = 0; j < this.roles.length; j += 1) {
              if (RandomPlayer[diceP].prefered === (this.roles[j])) {
                console.log('role pas aleatoire');
                this.RandomRoles.push([RandomPlayer[diceP].prefered, RandomPlayer[diceP].name]);
                this.roles.splice(j, 1);
                RandomPlayer.splice([diceP], 1);
                assign = true;
              }
            }
            if (assign === false) {
              console.log('role aléatoire');
              diceR = Math.floor(Math.random() * this.roles.length);
              this.RandomRoles.push([this.roles[diceR], this.players[diceP].name]);
              this.roles.splice(diceR, 1);
              RandomPlayer.splice([diceP], 1);
            } else {
              assign = false;
            }
          }
        } else {
          console.log('undefined');
        }
      }
      // this.$store.commit('setRandom', false);
      this.$emit('randomise', this.RandomRoles);
      this.RandomRoles = [];
    },
    InitPlayer() {
      this.players = this.$store.state.players;
      this.Loading = false;
    },
  },
  mounted() { // a la creation de la page on instaure un listener qui recoit une update quand un nouveau joueur se connecte
    setTimeout(() => {
      this.InitPlayer();
    }, 1000);
    let data;
    let RolesBases;
    let n = 0;
    // eslint-disable-next-line func-names
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
