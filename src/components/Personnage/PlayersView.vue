<template>
  <div class="columns is-multiline is-desktop"> <!--affiche la carte résumé de tous les joueurs -->
    <div class="column is-3" v-for="(player, key) in this.$store.state.players" v-bind:key="key"> <!--this.$store.state.Game.PlayersDetailed-->
        <PlayerCard v-if="player.connected" :num="key" />
    </div>
  </div>
</template>

<script>

import PlayerCard from './PlayerCard.vue';

export default {
  name: 'PlayersView',
  components: { PlayerCard },
};
</script>
