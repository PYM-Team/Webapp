<template>
  <article class="notification is-primary title-font">
    <h1>Running Game</h1>
    <p>{{this.$store.state.gameTemplate}}</p>
    <p>Game Number : {{this.$store.state.gameId}}</p>
  </article>
</template>

<script>
export default {
  name: 'Overview',
};
</script>
