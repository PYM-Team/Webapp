<template>
  <div class="tile is-ancestor">
    <div class="tile is-6 is-parent">
      <article class="tile is-child notification is-dark">
        <h1>Players</h1>
        <p>Liste des players</p>
        <ul>
          <li v-for="(player, key) in players" v-bind:key="key">
            <span v-if="player.connected">{{ key }}</span>
          </li>
        </ul>
      </article>
    </div>
    <div class="tile is-6 is-parent">
      <article class="tile is-child notification is-link">
        <h1>Running Game</h1>
        <p>{{nameGame}}</p>
        <p>Game Number : {{idGame}}</p>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlayerView',
  props: {
    players: {
      type: Object,
      default: () => {},
    },
    nameGame: {
      type: String,
      default: 'no game here',
    },
    idGame: {
      type: Number,
      default: 0,
    },
  },
};
</script>
