<template>
  <ul id="item-list">
    <li v-for="(event, index) of evenements" v-bind:key="index" :id="event.nom">
    <b-tooltip v-bind:label="[event.declenche? Done : NotDone]">
            <b-message class="is-dark">
                {{ event.nom }} : {{ event.description }}
            </b-message>
        </b-tooltip>


    </li>
</ul>
</template>

<script>
export default {
  name: 'Evenements',
  data() {
    return {
      evenements: this.$store.state.Game.events,
      Fait: false,
      Done: 'hey',
      NotDone: 'Not hey',
    };
  },
};
</script>
<style>
#dashboard-nav {
    background: none;
}
</style>
