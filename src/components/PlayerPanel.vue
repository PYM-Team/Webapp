<template>
  <aside class="menu">
    <p class="menu-label">
      Joueurs
    </p>
    <ul class="menu-list player-name">
      <div v-for="(player, key) in this.$store.state.Game.Players" v-bind:key="key">
        <li v-if="player.connected" v-on:click="SelectPlayer(key)"><a>{{ key }}</a></li>
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
