<template>
<div id="player-view" class="tile is-ancestor">
  <div class="tile is-parent is-vertical">
    <article class="tile is-child is-12 is-centered">
      <PlayerPanel v-on:selected='setSelected($event)'/>
    </article>
     <b-button class="notification is-primary title-font is-vcentered is-centered"  v-on:click="Randomize">
      <strong> Randomize </strong>
     </b-button>
    <b-button tag="router-link" :to="{ path: '/Overview' }" class="notification is-primary title-font menu-list"  v-on:click="Start">
      <strong> Start </strong>
    </b-button>
  </div>
  <div class="tile is-vertical is-8">
    <div class="tile">
      <div class="tile is-parent is-vertical">
        <article class="notification is-primary title-font">
      <h1>Creation of the Game</h1>
      <p>{{this.$store.state.gameTemplate}}</p>
      <p>Game Number : {{this.$store.state.gameId}}</p>
    </article>
    <article class="is-primary title-font">
      <h1>{{this.$store.state.gameTemplate}}</h1>
      <strong>{{Description}}</strong>
    </article>
        <p class="tile is-child">
          <Setup />
        </p>
      </div>
      <b-modal :active.sync="choose" scroll="keep">
        <b-message title="Choose the role" class= "is-primary has-text-centered is-size-5">
           <article class="is-centered has-text-centered"> {{selectedKey}} jouera {{pref}}</article>
            <b-select placeholder='ok' v-model="SelectedRole">
                <option v-for="Role in role"
                :value = Role
                :key= Role>
                {{Role}}
                </option>
            </b-select>
             <b-button class="button is-primary tile is-right is-4" @click="ValidatePlayer(SelectedRole, selectedKey), choose = false"> Valid </b-button>
        </b-message>
        
  </b-modal>
    </div>
  </div>
</div>
</template>

<script>

import PlayerPanel from '@/components/Setup/PlayerPanelSetup.vue';
import Setup from '@/components/Setup/Setup.vue';

export default {
  name: 'PlayerView',
  data() {
    return {
      Players: [],
      SelectedRole: [],
      role: ['Espion', 'meurtrier', 'fils', 'serviteur'],
      choose: false,
      selectedKey: {},
      pref: {},
      Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum ',
    };
  },
  components: { PlayerPanel, Setup },
  methods: {
    setSelected(_SelectedKey) {
      // eslint-disable-next-line prefer-destructuring
      this.selectedKey = _SelectedKey[0];
      this.choose = true;
      // eslint-disable-next-line prefer-destructuring
      this.pref = _SelectedKey[1];
    },
    Randomize() {
    },
    ValidatePlayer(Role, Player) {
      this.Players.push({
        name: Player,
        role: Role,
      });
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
