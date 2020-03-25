<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-6 is-parent">
        <article class="tile is-child notification is-dark">
          <h1>Players</h1>
          <p>Liste des players</p>
          <ul>
            <li v-for="(player, key) in this.$store.state.players" v-bind:key="key">
              <span v-if="player.connected">{{ key }}</span>
            </li>
          </ul>
        </article>
      </div>
      <div class="tile is-6 is-parent">
        <article class="tile is-child notification is-link">
          <h1>Running Game</h1>
          <p>{{this.$store.state.gameTemplate}}</p>
          <p>Game Number : {{this.$store.state.gameId}}</p>
        </article>
      </div>
    </div>
    <div class="columns is-multiline is-desktop">
      <div class="column is-3" v-for="(player, key) in this.$store.state.players" v-bind:key="key">
          <PlayerCard v-if="player.connected" :title="key" />
      </div>
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
