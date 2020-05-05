<template>
<div id="player-view" class="tile is-ancestor">
  <div class="tile is-parent">
    <article class="tile is-child is-12 is-centered">
      <PlayerPanel v-on:selected='setSelected($event)'/>
    </article>
  </div>
  <div class="tile is-vertical is-8">
    <div class="tile">
      <div class="tile is-parent is-vertical">
        <span class="tile is-child notification is-primary">Please select a Player to show the detailled PlayerCard</span>
        <p class="tile is-child">
          <PlayerCard :title='selectedKey' />
        </p>
      </div>
    </div>
  </div>
</div>
</template>

<script>

import PlayerPanel from '@/components/PlayerPanel.vue';
import PlayerCard from '@/components/PlayerCardComplete.vue';

export default {
  name: 'PlayerView',
  data() {
    return {
      selectedKey: {},
      prefered: {},
    };
  },
  components: { PlayerPanel, PlayerCard },
  methods: {
    setSelected(_SelectedKey) {
      this.selectedKey = _SelectedKey;
      // this.selectedKey = _SelectedKey[1];
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
