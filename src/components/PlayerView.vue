<template>
  <div id="player-view" class="columns is-desktop is-vcentered">
      <div id="player-panel-column" class="column is-3">
        <PlayerPanel v-on:selected='setSelected($event)'/>
      </div>
      <div class="column is-9">
          <span class="notification is-primary">Please select a Player to show the detailled PlayerCard</span>
        <PlayerCard :title='selectedKey' />
      </div>
  </div>
</template>

<script>

import PlayerPanel from '@/components/PlayerPanel.vue';
import PlayerCard from '@/components/PlayerCard.vue';

export default {
  name: 'PlayerView',
  data() {
    return {
      selectedKey: {},
    };
  },
  components: { PlayerPanel, PlayerCard },
  methods: {
    setSelected(_SelectedKey) {
      this.selectedKey = _SelectedKey;
    },
  },

};
</script>

<style>
#player-panel-column {
  min-height: 80vh;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  margin-left: 1rem;
}
</style>
