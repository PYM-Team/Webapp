<template>
<div id="player-view" class="tile is-ancestor">
  <div class="tile is-parent is-vertical">
    <article class="tile is-child is-12 is-centered">
      <PlayerPanel :random="this.RandomiseOn" v-on:selected='setSelected($event)' v-on:randomise='Assigner($event)'/>
    </article>
     <b-button class="notification is-primary title-font is-vcentered is-centered"  v-on:click="Randomize">
      <strong> Distribution aléatoire </strong>
     </b-button>
    <b-button class="notification is-primary title-font menu-list"  v-on:click="Start">
      <strong> Commencer </strong>
    </b-button>
    <b-modal :active.sync="start" scroll="keep">
        <b-message title="Description" class= "is-primary has-text-centered is-size-5">
           <article class="is-centered has-text-centered"> Voulez vous vraiment lancer la partie ? </article>
           <b-button class="button is-primary tile is-centered is-12" @click="demarrer"> C'est parti ! </b-button>
        </b-message>
  </b-modal>
  </div>
  <div class="tile is-vertical is-8">
    <div class="tile">
      <div class="tile is-parent is-vertical">
        <article class="notification is-primary title-font">
          <p class="title is-1">{{this.$store.state.Game.gameTemplate}}</p>
          <h1 class="title is-4">Création de la partie : <h1 class="content is-large">{{this.$store.state.Game.gameName}}</h1></h1>
          <h1 class="title is-4">Identifiant de partie : <h1 class="content is-large">{{this.$store.state.Game.gameId}}</h1></h1>
        </article>
        <article class="is-primary notification title-font">
          <h1>{{this.$store.state.gameTemplate}}</h1>
          <p class="content is-large">{{this.$store.state.Game.description}}</p>
        </article>
        <div id="app" class="tile is-child is-12">
          <div :key="Players.length" class="state has-text-centered">
            {{ Players.length}} / {{ Value}}
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
            <b-button class="button is-primary tile is-right is-4" @click="Choose(SelectedRole, selectedKey, ValidatePlayer, inputPlayers)"> Valider </b-button>
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
      RandomiseOn: false,
      Value: 6,
      Players: [],
      SelectedRole: [],
      role: ['Vito Falcaninio', 'Carla Gurzio', 'Petro Francesco', 'Sebastiano Pechetto', 'Tommaso-Giorgio', '“El Sampico”'],
      choose: false,
      start: false,
      selectedKey: {},
      pref: {},
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
      this.RandomiseOn = true; // dis à la liste de player de faire un tirage aléatoire
    },
    Assigner(_SelectedKey) {
      for (let i = 0; i < _SelectedKey.length; i += 1) {
        this.ValidatePlayer(_SelectedKey[i][0], _SelectedKey[i][1]); // récupère et assigne en fonction de la ditribution aléatoire
      }
    },
    Start() {
      if (this.Players.length === this.Value) {
        this.start = true;
      } else {
        this.$buefy.snackbar.open('Tous les rôles ne sont pas attribués');
      }
    },
    demarrer() {
      this.$store.commit('setPlayers', this.Players);
      this.$router.push({ path: '/overview' });
    },
    Choose(Role, Player, ValidatePlayer) {
      if (Role.length !== 0) {
        this.choose = false;
        this.SelectedRole = [];
        ValidatePlayer(Role, Player);
      } else {
        this.$buefy.snackbar.open('Vous n\'avez pas assigné de rôle');
      }
    },
    inputPlayers() {
      console.log('done');
      this.$store.commit('setPlayers', this.Players);
      console.log('done');
    },
    ValidatePlayer(genre, player) {
      let place = 0;
      let act;
      console.log(`entrance in validate player ${player}`);
      for (let i = 0; i < this.Players.length; i += 1) {
        if (this.Players[i].name === player) {
          place = i; // Found it
          act = this.Players[i].role;
          console.log(`doublon detecte${act}`);
          break;
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
  created() {
    console.log('creating the data');
    const ourtoken = this.$store.state.token;
    const content = {
      type: 'getSetup',
      status: 'ok',
      token: ourtoken,
      data: {
      },
    };
    let data;
    console.log('sending the data');
    this.$socket.sendObj(content);
    console.log('data sent');
    this.$options.sockets.onmessage = function (message) {
      data = JSON.parse(message.data);
      this.$store.commit('setRoles', data.data.rolesNames);
      // this.$store.commit('setPlayerInit', data.data.players);
      this.$store.commit('setDescription', data.data.gameDescription);
      console.log(data);
    };
    if (data) {
      delete this.$options.sockets.onmessage;
    }
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
.title {
  font-family: "Luckiest Guy", cursive;
  color: white !important;
}
</style>
