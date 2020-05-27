<template>
  <aside class="menu">
    <p class="menu-label">
      <strong>Joueurs</strong>
    </p>
    <ul class="menu-list"> <!-- Pour tous les joueurs connectés on les affiche dans un menu -->
      <div v-for="(player) in this.$store.state.Game.Players" v-bind:key="player.name">
        <li v-on:click="SelectPlayer(player.name)"><a><strong> {{ player.name }} </strong> <br> <sub> {{ player.role.name }} </sub></a></li>
      </div>
    </ul>
  </aside>
</template>

<script>
export default {
  name: 'PlayerPanel',
  methods: {
    SelectPlayer(key) {
      this.$emit('selected', key);
    },
  },
  mounted() {
    this.$options.sockets.onmessage = function (message) {
      if (data.type === 'updatePlayers') {
        console.log(data);
        this.$store.commit('setPlayers', data.data.players);
      }
  }
};

</script>

<style>
.menu-label {
  font-family: "sans serif";
  font-size: 2rem !important;
  color: white !important;
}
</style>
