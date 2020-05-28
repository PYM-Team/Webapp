<template>
  <aside class="menu">
    <p class="menu-label">
      <strong class="subtitle">Joueurs</strong>
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
    let data;
    // eslint-disable-next-line func-names
    this.$options.sockets.onmessage = function (message) {
      data = JSON.parse(message.data);
      if (data.type === 'updatePlayers') {
        console.log(data);
        this.$store.commit('setPlayers', data.data.players);
      }
    };
  },
};
</script>

<style>
.menu-label {
  font-family: "sans serif";
  font-size: 2rem !important;
}
</style>
