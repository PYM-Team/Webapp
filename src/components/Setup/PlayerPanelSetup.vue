<template>
  <aside class="menu">
    <p class="menu-label">
      Players
    </p>
    <ul class="menu-list player-name">
      <div v-for="(player, key) in players" v-bind:key="key">
        <li v-if="player.connected" v-on:click="SelectPlayer(key)"><a><strong> {{ key }} </strong> <br> <sub> veut etre {{ player.prefered }} </sub></a></li>
      </div>
    </ul>
  </aside>
</template>

<script>
export default {
  name: 'PlayerPanel',
  data() {
    return {
      players: {
        toto: { connected: true, prefered: 'Meurtrier' },
        tata: { connected: true, prefered: 'Serviteur' },
        tutu: { connected: false, prefered: 'Epouse' },
        tato: { connected: true, prefered: 'Espion' },
        tito: { connected: true, prefered: 'Serviteur' },
        tuti: { connected: true, prefered: 'Fils' },
      },
    };
  },
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
