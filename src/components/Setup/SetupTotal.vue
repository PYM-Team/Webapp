<template>
<div id="player-view" class="tile is-ancestor">
  <div class="tile is-parent is-vertical">
    <article class="tile is-child is-12 is-centered">
      <PlayerPanel v-on:selected='setSelected($event)'/>
    </article>
     <b-button class="notification is-primary title-font is-vcentered is-centered"  v-on:click="Randomize">
      <strong> Randomize </strong>
     </b-button>
    <b-button class="notification is-primary title-font menu-list"  v-on:click="Start">
      <strong> Start </strong>
    </b-button>
    <b-modal :active.sync="start" scroll="keep">
        <b-message title="Description" class= "is-primary has-text-centered is-size-5">
           <article class="is-centered has-text-centered"> {{description}} </article>
           <b-button tag="router-link" :to="{ path: '/Overview' }" class="button is-primary tile is-centered is-12" @click="createGame"> Démarrer </b-button>
        </b-message>
  </b-modal>
  </div>
  <div class="tile is-vertical is-8">
    <div class="tile">
      <div class="tile is-parent is-vertical">
        <article class="notification is-primary title-font">
          <h1>Creation of the Game</h1>
          <p>{{this.$store.state.gameTemplate}}</p>
          <p>Game Number : {{this.$store.state.gameId}}</p>
        </article>
        <article class="is-primary notification title-font">
          <h1>{{this.$store.state.gameTemplate}}</h1>
          <strong>{{Description}}</strong>
        </article>
        <div id="app" class="tile is-child is-12">
          <div :key="Players.length" class="state has-text-centered">
            {{ Players.length}} / {{role.length}}
          </div>
          <div class="container has-text-centered">
            <transition-group name="fading">
              <span class="fading-item" v-for="(value, key) in Players" v-bind:key="key">
                <img class="" src="https://img.pngio.com/parent-directory-avatar-2png-avatar-png-256_256.png" />
                <h1 class=""> {{value.name}} <br> jouera <br>{{value.role}} </h1>
                </span>
            </transition-group>
            <img v-if="value==0" class="empty" src="https://img.pngio.com/parent-directory-avatar-2png-avatar-png-256_256.png"/>
          </div>
        </div>
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
            <b-button class="button is-primary tile is-right is-4" @click="Choose(SelectedRole, selectedKey, ValidatePlayer)"> Valid </b-button>
        </b-message>
      </b-modal>
    </div>
  </div>
</div>
</template>

<script>

import PlayerPanel from '@/components/Setup/PlayerPanelSetup.vue';


export default {
  name: 'PlayerView',
  data() {
    return {
      Value: 1,
      Players: [],
      SelectedRole: [],
      role: ['Espion', 'meurtrier', 'fils', 'serviteur', 'femme'],
      choose: false,
      start: false,
      selectedKey: {},
      pref: {},
      Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum ',
    };
  },
  components: { PlayerPanel },
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
    Start() {
      if (this.Players.length === this.Value) {
        this.start = true;
      } else {
        this.$buefy.snackbar.open('Tout les rôles ne sont pas attribués');
      }
    },
    Choose(Role, Player, ValidatePlayer) {
      if (Role.length !== 0) {
        this.choose = false;
        this.SelectedRole = [];
        ValidatePlayer(Role, Player);
      } else {
        this.$buefy.snackbar.open('You didn\'t choose a role');
      }
    },
    ValidatePlayer(genre, player) {
      let place = 0;
      let act;
      for (let i = 0; i < this.Players.length; i += 1) {
        if (this.Players[i].name === player) {
          place = i; // Found it
          act = this.Players[i].role;
        } else {
          place = -1;
        }
      } // Not found
      if (place !== -1) {
        this.role.push(act);
        this.Players.splice(place, 1);
      }
      this.Players.push({
        name: player,
        role: genre,
      });
      this.role.splice(this.role.indexOf(genre), 1);
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
.fading-item {
  margin-left: 10px;
  margin-right: 10px;
  width: 100px;
  height: auto;
  display: inline-block;
  transition: all 1s;
}
.fading-enter,
.fading-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.fading-leave-active {
  position: absolute;
}
.state {
  margin-bottom: 20px;
}
.addremove {
  margin-top: 20px;
}
.empty {
  filter: grayscale(100%);
  width: 100px;
  height: auto;
}
</style>
