<template>
<div>
  <aside class="menu">
    <p class="menu-label">
      Players
    </p>
    <ul class="menu-list player-name">
      <div v-for="player in players" v-bind:key="player.name">
        <li v-if="player.connected" v-on:click="SelectPlayer(player.name, player.prefered)"><a><strong> {{ player.name }} </strong> <br> <sub> veut etre {{ player.prefered }} </sub></a></li>
      </div>
    </ul>
  </aside>
  <b-modal v-if="!RandomDone && random" :active.sync="random" scroll="keep">
    <b-button class="button is-primary is-large is-vcentered is-4" @click="SendRandom()"> Êtes vous vraiment sûr ? </b-button>
  </b-modal>

</div>
</template>

<script>
export default {
  name: 'PlayerPanel',
  data() {
    return {
      players: this.$store.state.players,
      RandomRoles: [],
      roles: ['Meurtrier', 'Serviteur', 'Epouse', 'Espion', 'Fils'],
      RandomDone: false,
    };
  },
  methods: {
    SelectPlayer(key, prefered) {
      this.$emit('selected', [key, prefered]);
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
      this.RandomDone = true;
      this.$emit('randomise', this.RandomRoles);
    },
  },
  props: {
    random: Boolean,
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
