<template>
  <div class="dahsboard">
    <NavBar />
    <div class="title is-1">This will be a pretty Dashboard</div>
    <PlayerView />
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
      nbPlayers: 0,
    };
  },
  methods: {
    incrPlayers() {
      this.nbPlayers += 1;
    },
  },
};
</script>
