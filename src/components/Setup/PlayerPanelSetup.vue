<template>
<div>
  <aside class="menu">
    <p class="menu-label">
      Players
    </p>
    <ul class="menu-list player-name">
      <div v-for="(player, key) in players" v-bind:key="key">
        <li v-if="player.connected" v-on:click="SelectPlayer(key, player.prefered)"><a><strong> {{ key }} </strong> <br> <sub> veut etre {{ player.prefered }} </sub></a></li>
      </div>
    </ul>
  </aside>

</div>
</template>

<script>
export default {
  name: 'PlayerPanel',
  data() {
    return {
      players: this.$store.state.players,
    };
  },
  methods: {
    SelectPlayer(key, prefered) {
      this.$emit('selected', [key, prefered]);
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
