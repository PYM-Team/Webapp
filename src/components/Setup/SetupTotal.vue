<template>
<div id="player-view" class="tile is-ancestor">
  <!-- On cree un entier de type tile qui va contenir l'ensemble des elements presents -->
  <div class="tile is-parent is-vertical">
    <!-- La première partie est verticale - c'est notre panneau avec les joueurs et les boutons de choix aléatoire et de démarrage de la partie -->

    <article class="tile is-child is-12 is-centered"> <!-- Le panneau avec les joueurs qui renvoit les fonctions random/selected/randomise-->
      <PlayerPanel :isClicked="RandomiseOn" v-on:selected='setSelected($event)' v-on:randomise='Assigner($event)'/>
    </article>

     <b-button class="notification is-primary title-font is-vcentered is-centered"  v-on:click="Randomize"> <!-- Le bouton qui lance la distribution aleatoire en appelant la fonction Randomize-->
      <strong> Distribution aléatoire </strong>
     </b-button>

    <b-button class="notification is-primary title-font menu-list"  v-on:click="Start"> <!-- Le bouton start lançant la fonction start qui lance le modal associé si tous les joueurs sont assignés -->
      <strong> Commencer </strong>
    </b-button>

    <b-modal :active.sync="start" scroll="keep"> <!-- le modal associé au start permettant de valider le lancement de la partie. Lance la partie avec la fonction demarrer -->
        <b-message class= "is-primary has-text-centered is-size-5">
          <article class="is-centered has-text-centered"> Voulez vous vraiment lancer la partie ? </article>
          <b-button class="button is-primary tile is-centered is-12" @click="demarrer()"> C'est parti ! </b-button>
        </b-message>
    </b-modal>
  </div>

  <div class="tile is-vertical is-8"> <!-- Seconde partie, à droite de la première, aussi verticale -->
    <div class="tile">

      <div class="tile is-parent is-vertical">
        <article class="notification is-primary title-font"> <!-- affichage d'un panneau de texte contenant le titre de la partie, son Id et le template qu'elle suit - recupere dans le store -->
          <p class="title is-1">{{this.$store.state.Game.gameTemplate}}</p>
          <h1 class="title is-4">Création de la partie : <h1 class="content is-large">{{this.$store.state.Game.gameName}}</h1></h1>
          <h1 class="title is-4">Identifiant de partie : <h1 class="content is-large">{{this.$store.state.Game.gameId}}</h1></h1>
        </article>

        <article class="is-primary notification title-font"> <!-- Description detaille du template de la partie - recupere dans le store -->
          <h1>{{this.$store.state.gameTemplate}}</h1>
          <p class="content is-large">{{this.$store.state.Game.description}}</p>
        </article>

        <div id="app" class="tile is-child is-12"> <!-- second panel de cette partie contenant le visuel des joueurs connectés -->
          <div :key="Players.length" class="state title is-2 has-text-centered"> <!-- affichage du nombre de joueur connecté sur le nombre total de rôle à attribuer -->
            {{ Players.length}} / {{ Value}}
          </div>

          <div class="container is-vcentered"> <!-- affichage pour chaque joueur dans la liste des joueurs aux rôles attribué une image avec une entrée personnalisée -->
            <transition-group class="tile is-parent is-12 is-centered" name="fading">
              <span class="tile is-child fading-item is-vcentered" v-for="(value, key) in Players" v-bind:key="key">
                <h1 class="title is-4 has-text-white">{{value.name}} </h1>
                <img class="" src="https://img.pngio.com/parent-directory-avatar-2png-avatar-png-256_256.png" />
                <p class=" is-6 has-text-white"> {{value.role}} </p>
                </span>
            </transition-group>
            <img v-if="Players.length==0" class="empty" src="https://img.pngio.com/parent-directory-avatar-2png-avatar-png-256_256.png"/> <!-- si il n'y a aucun element image à afficher -->
          </div>
        </div>
      </div>

      <b-modal :active.sync="choose" scroll="keep"> <!-- modal de choix du rôle pour chaque joueur -  appeler en cliquant sur un joueur -->
        <b-message v-if="role.length!==0">
          <article class="title is-2 has-text-black is-centered has-text-centered"> Choisissez votre rôle <br></article>
           <h1 class ="is-size-4 has-text-centered"><em> {{selectedKey}} voudrait jouer {{pref}}</em><br></h1>
            <b-select expanded placeholder='default' v-model="SelectedRole"> <!-- menu déroulant -->
                <option v-for="Role in role"
                :value = Role
                :key= Role>
                {{Role}}
                </option>
            </b-select>
            <br>
            <b-button class="button is-primary is-pulled-right tile is-right is-4" @click="Choose(SelectedRole, selectedKey)"> Valider </b-button> <!-- bouton pour valider un choix en appelant la fonction choose -->
        </b-message>
        <b-message v-if="role.length===0">
          <article class="title is-2 has-text-black is-centered has-text-centered"> Tout les rôles sont assignés <br></article>
            <h1 class ="is-size-4 has-text-centered"><em> {{selectedKey}} voulait jouer {{pref}}</em><br></h1>
            <h1 class ="is-size-4 has-text-centered"><em> Il joue {{Quelrole(selectedKey)}}</em><br></h1>
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
      tryStart: 0,
      tryRole: 0,
      tryGet: 0,
      RandomiseOn: false,
      Value: 0,
      Players: [], // tableau des players attribue
      SelectedRole: [], // rôle choisi dans le menu déroulant
      role: [],
      RolesBases: [],
      choose: false, // permet d'activer le modal pour assigner un rôle à un joueur
      start: false, // permet d'activer le modal pour valider le demarrage de la partie
      selectedKey: {}, // joueur selectionné
      pref: {}, // rôle préféré du joueur concerné
    };
  },
  components: { PlayerPanel },
  methods: {
    Quelrole(Player) { // renvoie le rôle d'un joueur assigne
      let role;
      for (let i = 0; i < this.Players.length; i += 1) {
        if (this.Players[i].name === Player) { // recherche le nom du joueur dans le tableau des joueurs aux roles attribués
          role = (this.Players[i].role);
        }
      }
      return role;
    },
    setSelected(_SelectedKey) {
      // eslint-disable-next-line prefer-destructuring
      this.selectedKey = _SelectedKey[0]; // le joueur selectionne est renvoye par le player panel dans un tableau de la forme [nom_du_joueur, role prefere]
      this.choose = true; // on active choose qui permet de lancer le modal pour choisir un joueur
      // eslint-disable-next-line prefer-destructuring
      this.pref = _SelectedKey[1]; // on assigne a pref le rôle prefere du joueur selectionne
    },
    Randomize() {
      this.RandomiseOn = true;
    },
    Assigner(_SelectedKey) {
      for (let i = 0; i < _SelectedKey.length; i += 1) {
        this.ValidatePlayer(_SelectedKey[i][0], _SelectedKey[i][1]); // récupère et assigne en fonction de la ditribution aléatoire
      }
      this.RandomiseOn = false;
    },
    Start() {
      if (this.Players.length === this.Value) { // si il y a autant de joueurs avec rôles que de rôles à assigner (=chaque joueur à un rôle)
        this.start = true; // on lance le modal pour lancer la partie
      } else {
        this.$buefy.snackbar.open('Tous les rôles ne sont pas attribués'); // sinon on affiche un popup pour dire que tous les rôles ne sont pas assignés
      }
    },
    Error() {
      this.$buefy.toast.open({
        duration: 5000,
        message: 'Une erreur s\'est produite veuillez reessayer plus tard',
        position: 'is-bottom',
        type: 'is-danger',
      });
    },
    envoijoueur(name, role) {
      const ourtoken = this.$store.state.token;
      const content = {
        type: 'setPlayerRole',
        status: 'ok',
        token: ourtoken,
        data: {
          roleName: role,
          playerName: name,
        },
      };
      let data;
      this.$socket.sendObj(content);
      // eslint-disable-next-line func-names
      this.$options.sockets.onmessage = function (message) {
        data = JSON.parse(message.data);
        if (data.type === 'setPlayerRole') {
          if (data.status === 'error') {
            this.tryRole += 1;
            if (this.tryRole === 5) {
              this.Error();
              delete this.$options.sockets.onmessage;
              this.tryRole = 0;
            } else {
              setTimeout(this.envoijoueur(name, role), 300);
            }
          }
        }
        if (data) {
          delete this.$options.sockets.onmessage;
        }
      };
    },
    demarrer() {
      const ourtoken = this.$store.state.token;
      this.$store.commit('setPlayers', this.Players);
      const content = {
        type: 'startGame',
        status: 'ok',
        token: ourtoken,
        data: {
        },
      };
      let data;
      this.$socket.sendObj(content);
      this.$options.sockets.onmessage = function (message) {
        data = JSON.parse(message.data);
        if (data.type === 'startGame') {
          if (data.status === 'error') {
            this.tryStart += 1;
            if (this.tryCreate === 5) {
              this.Error();
              delete this.$options.sockets.onmessage;
              this.tryCreate = 0;
            } else {
              setTimeout(this.demarrer(), 300);
            }
          } else {
            console.log('goo'); // on enregistre nos joueurs avec leurs rôles dans le store
            this.$router.push({ path: '/overview' }); // on change de page
          }
        }
        if (data) {
          delete this.$options.sockets.onmessage;
        }
      };
    },
    Choose(Role, Player) {
      if (Role.length !== 0) { // si un rôle est selectionne
        this.choose = false; // on ferme le modal
        this.ValidatePlayer(Role, Player); // on lance validatePlayer avec notre rôle et notre player
        this.SelectedRole = []; // on reinitialise le rôle selectionne
      } else {
        this.$buefy.snackbar.open('Vous n\'avez pas assigné de rôle');
      }
    },
    // eslint-disable-next-line no-unused-vars
    ValidatePlayer(genre, player) { // permet d'assigner à un joueur un role
      // if (this.role.length !== 0) {
      let place = -1;
      let act;
      for (let i = 0; i < this.Players.length; i += 1) {
        if (this.Players[i].name === player) { // recherche le nom du joueur dans le tableau des joueurs aux roles attribués
          place = i; // Found it
          act = this.Players[i].role;
          break;
        } else {
          place = -1;
        }
      } // Not found
      if (place !== -1) { // si le joueur a deja un role on place ce role dans la liste des rôles dispo et on retire ce joueur des joueurs avec un role
        this.role.push(act);
        this.Players.splice(place, 1);
      }
      console.log(this.Players.length);
      console.log(this.$store.state.Game.roles.length);
      if (this.Players.length < this.$store.state.Game.roles.length) {
        this.Players.push({ // on ajoute ce joueur avec ce role à la liste des joueurs avec un role
          name: player,
          role: genre,
        });
      }
      this.role.splice(this.role.indexOf(genre), 1);// on enleve ce role des roles dispos
      this.envoijoueur(player, genre);
      // }
    },
  },
  created() { // a la creation de la page on demande à l'API les roles dispos -  la description de la partie - les joueurs connectés et leur préférence de role
    const ourtoken = this.$store.state.token;
    const content = {
      type: 'getSetup',
      status: 'ok',
      token: ourtoken,
      data: {
      },
    };
    let data;
    this.$socket.sendObj(content);
    this.$options.sockets.onmessage = function (message) {
      data = JSON.parse(message.data);
      console.log(data);
      if (data.type === 'getSetup') {
        if (data.status === 'error') {
          this.tryGet += 1;
          if (this.tryGet === 5) {
            this.Error();
            delete this.$options.sockets.onmessage;
            this.tryGet = 0;
          }
        }
        this.$store.commit('setRoles', data.data.rolesNames);
        this.$store.commit('setPlayerInit', data.data.players);
        this.$store.commit('setDescription', data.data.gameDescription);
        this.RolesBases = this.$store.state.Game.roles;
        for (let i = 0; i < this.$store.state.Game.roles.length; i += 1) {
          this.role.push(this.RolesBases[i]);
        }
        this.Value = this.role.length;
        console.log(data);
      }
      if (data) {
        delete this.$options.sockets.onmessage;
      }
    };
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
