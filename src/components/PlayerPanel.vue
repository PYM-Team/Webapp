<template>
  <aside class="menu">
    <p class="menu-label">
      Joueurs
    </p>
    <ul class="menu-list player-name"> <!-- Pour tous les joueurs connectés on les affiche dans un menu -->
      <div v-for="(player) in this.$store.state.Game.Players" v-bind:key="player.name">
        <li v-on:click="SelectPlayer(player.name)"><a>{{ player.name }}</a></li>
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
};

</script>

<style>
.menu-label {
  font-family: "Luckiest Guy", cursive;
  font-size: 2rem !important;
  color: white !important;
}
</style>
