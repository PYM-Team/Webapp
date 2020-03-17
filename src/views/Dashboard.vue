<template>
  <div class="dahsboard">
    <NavBar />
    <div class="title is-1">This will be a pretty Dashboard</div>
    <b-button @click="incrPlayers">Increment players number</b-button>
    <PlayerView :nombrePlayers  ="this.nbPlayers" />
  </div>
</template>

<script>

import NavBar from '@/components/DashboardNavBar.vue';
import PlayerView from '@/components/PlayerView.vue';

export default {
  name: 'Dashboard',
  components: {
    NavBar,
    PlayerView,
  },
  data() {
    return {
      nbPlayers: 4,
    };
  },
  methods: {
    incrPlayers() {
      this.nbPlayers += 1;
      console.log(this.nbPlayers);
    },
  },
};
</script>
