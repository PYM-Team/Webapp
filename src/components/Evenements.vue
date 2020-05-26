<template>
  <ul id="item-list" class = "tile is-ancestor is-vertical">
    <br><br>
    <li class="tile is-child is-12" v-for="(event, index) of evenements" v-bind:key="index" :id="event.nom">
    <b-tooltip v-bind:label="[event.declenche? Done : NotDone]" position="is-right">
      <div class="card">
        <header class="card-header">
          <h1 class="card-header-title title has-text-black is-centered">
            {{event.nom}}
          </h1>
        </header>
        <div class="card-content">
          <div class="content">
          {{ event.description}}
            <br>
            <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
          </div>
        </div>
        <footer class="card-footer">
          <a v-if='event.declenche === true' v-on:click="RelancerEvent()" class="card-footer-item">Relancer cet evenement</a>
          <a v-if='event.declenche === false' v-on:click="lancerEvent()" class="card-footer-item">Lancer cet evenement</a>
        </footer>
      </div>
      <br>
    </b-tooltip>
    <br>
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
      Done: 'Fait',
      NotDone: 'Pas fait',
    };
  },
  methods: {
    lancerEvent() {
      console.log('eventlance');
    },
    RelancerEvent() {
      console.log('eventrelance');
    },
  },
};
</script>
<style>
#dashboard-nav {
    background: none;
}
</style>
