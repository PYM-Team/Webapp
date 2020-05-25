<template>
  <ul id="item-list">
    <li v-for="(event, index) of evenements" v-bind:key="index" :id="event.nom">
      {{ event.nom }} : {{ event.description }}
      <h1 v-if="event.declenche">FAIT</h1>
      <h1 v-else>PAS FAIT</h1>
    </li>
</ul>
</template>

<script>
export default {
  name: 'Evenements',
  data() {
    return {
      evenements: this.$store.state.Game.events,
    };
  },
};
</script>
<style>
#dashboard-nav {
    background: none;
}
</style>
