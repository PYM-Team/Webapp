<template>
  <div class="columns is-desktop is-vcentered">
      <div class="colum is-4">
        <PlayerPanel/>
      </div>
      <div class="column is-8">
          <span class="notification is-primary">Please select a Player to show the detailled PlayerCard</span>
      </div>
  </div>
</template>

<script>

import PlayerPanel from '@/components/PlayerPanel.vue';

export default {
  name: 'PlayerView',
  components: { PlayerPanel },
};
</script>
