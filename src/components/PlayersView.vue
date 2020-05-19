<template>
  <div class="columns is-multiline is-desktop"> <!--affiche la carte résumé de tous les joueurs -->
    <div class="column is-3" v-for="(player, key) in this.$store.state.players" v-bind:key="key">
        <PlayerCard v-if="player.connected" :title="key" />
    </div>
  </div>
</template>

<script>

import PlayerCard from '@/components/PlayerCard.vue';

export default {
  name: 'PlayersView',
  components: { PlayerCard },
};
</script>
