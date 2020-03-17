<template>
<div class="tile is-ancestor">
  <div class="tile is-6 is-parent">
    <article class="tile is-child notification is-dark">
      <h1>Players</h1>
      <p>Vous avez {{nombrePlayers}} connectés</p>
    </article>
  </div>
</div>
</template>

<script>
export default {
  name: 'PlayerView',
  props: {
    nombrePlayers: {
      type: Number,
      default: 900,
    },
  },
};
</script>
