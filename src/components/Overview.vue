<template>
  <div id="Overview"> <!-- affichage de l'interface joueur -->
    <article class="notification is-primary title-font"> <!-- Première partie affichant les données de la partie en cours (Nom- description - ID) -->
      <h1>Partie en cours : {{this.$store.state.Game.gameName}}</h1>
      <p>{{this.$store.state.Game.gameTemplate}}</p>
      <p>Identifiant de partie : {{this.$store.state.Game.gameId}}</p>
    </article>

    <button class="button is-primary is-medium" @click="isAnnModalActive = true">Faire une annonce</button> <!-- Bouton pour faire une annonce à tout les joueurs -->

    <b-modal :active.sync="isAnnModalActive" scroll="keep"> <!-- bodal pour ecrire et envoyer l'annonce -->
      <div class="card">
        <div class="card-header">
          <p class="card-header-title is-centered player-name">Annonce</p>
        </div>
        <div class="card-content">
          <b-field>
            <b-input placeholder="Message" v-model="announce"></b-input>
          </b-field>
          <button class="button is-medium is-centered is-primary" @click="sendAnnounce(sendAnnounce)">Envoyer !</button>
        </div>
      </div>
    </b-modal>

    <div class="tile is-ancestor is-vertical"><!-- Mis en place d'un tile pour afficher l'heure et les joueurs connectés -->
      <div class="tile is-parent">

        <article class="tile is-child is-5 is-centered">
          <playerPanel v-on:selected="setSelected($event)" /> <!--  affiche les joueurs connectés  -->
        </article>

        <div class="tile is-parent is-vertical is-12"> <!-- affiche la durée de la partie en cours avec la durée parametrée -->
          <article class="tile notification is-child is-primary is-5 is-centered">
            <h1 v-if="TempsDepasse === true" class="time is-size-1 has-text-danger">Temps dépassé</h1>
            <h1 class="is-size-4">Partie débutée le :</h1>
            <h1 class="date is-size-2 is-centered">{{ getDate() }}</h1>
            <h1 class="is-size-4">En cours depuis :</h1>
            <h1 v-if="TempsDepasse === false" class="time is-size-1 has-text-white">{{ temps }}</h1>
            <h1 v-if="TempsDepasse === true" class="time is-size-1 has-text-danger">{{ temps }}</h1>
            <h1 v-if="TempsDepasse === false"  class="is-size-4 has-text-white">soit {{ pourcentage }} % du temps conseillé de {{ afficheHeureMax(tempsMax).heures }}h{{afficheHeureMax(tempsMax).minutes}}min</h1>
            <h1 v-if="TempsDepasse === true"  class="is-size-4 has-text-danger">soit {{ pourcentage }} % du temps conseillé de {{ afficheHeureMax(tempsMax).heures }}h{{afficheHeureMax(tempsMax).minutes}}min</h1>

          </article>

          <button class="button tile is-child is-primary is-medium is-5" @click="setPause(setPause)">Pause</button>

          <b-loading :is-full-page="isFullPage" :active.sync="isLoading" :can-cancel="false"> <!-- Quand la partie est mise en pause fige l'ecran avec seulement un bouton play -->
            <button class="button tile is-child is-primary is-large is-1 is-rounded" @click="setPlay(setPlay, calculTemps)">Play</button>
          </b-loading>

          <b-modal :active.sync="AlertTemps" scroll="keep">
            <b-message >
            <article class="title is-2 has-text-danger is-centered has-text-centered"> Le temps est depassé ! <br></article>
            </b-message>
          </b-modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import playerPanel from '@/components/PlayerPanel.vue';
// fonction utile pour afficher le temps (ex : remplace 4:16 par 04:16)
function bourrageZeros(k) {
  if (k < 10) {
    return `0${k}`;
  }
  return k;
}
export default {
  name: 'Overview',
  components: { playerPanel },
  data() {
    return {
      AlertTemps: false, // declencheur du modal pour dire que le temps est depassé
      n: 0, // permet de vérifier que le modal ne se déclenche qu'une fois
      isAnnModalActive: false,
      temps: '',
      TempsDepasse: false,
      isLoading: false,
      tempsActuelSecondes: 0,
      pourcentage: 0,
      tempsMax: this.$store.state.Game.duree,
      secondes: 0,
      minutes: 0,
      heures: 0,
      intervalle: undefined,
      announce: '',
    };
  },
  methods: {

    setPlay(setPlay, calculTemps) {
      calculTemps();
      this.isLoading = false;
      const ourtoken = this.$store.state.token;
      const content = {
        type: 'resume',
        status: 'ok',
        token: ourtoken,
        data: {
        },
      };
      let data;
      this.$socket.sendObj(content);
      this.$options.sockets.onmessage = function (message) {
        data = JSON.parse(message.data);
        if (data.type === 'resume') {
          console.log(data);
          this.data.data.currentTime = this.tempsActuelSecondes;
          if (data.status === 'error') {
            setPlay();
          }
        }
        if (data) {
          delete this.$options.sockets.onmessage;
        }
      };
    },
    // TODO: Handle message
    sendAnnounce(sendAnnounce) {
      const ourtoken = this.$store.state.token;
      const ourmessage = this.announce;
      const content = {
        type: 'announce',
        status: 'ok',
        token: ourtoken,
        data: {
          message: ourmessage,
        },
      };
      let data;
      this.$socket.sendObj(content);
      this.$options.sockets.onmessage = function (message) {
        data = JSON.parse(message.data);
        if (data.type === 'announce') {
          console.log(data);
          if (data.status === 'error') {
            sendAnnounce();
          }
        }
        if (data) {
          delete this.$options.sockets.onmessage;
        }
      };
      this.isAnnModalActive = false;
    },
    setSelected(_SelectedKey) {
      this.selectedKey = _SelectedKey;
    },
    getDate() {
      const dateActuelle = new Date();
      const semaine = ['LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM', 'DIM'];
      const jourNom = semaine[dateActuelle.getDay()];
      const jourNum = bourrageZeros(dateActuelle.getDate());
      const mois = bourrageZeros(dateActuelle.getMonth());
      const annee = bourrageZeros(dateActuelle.getFullYear());
      const datePropre = `${jourNom} ${jourNum} / ${mois} / ${annee}`;
      return datePropre;
    },
    calculTemps() {
      this.intervalle = setInterval(() => {
        this.secondes += 1;
        if (this.secondes === 60) {
          this.secondes = 0;
          this.minutes += 1;
        }
        if (this.minutes === 60) {
          this.minutes = 0;
          this.heures += 1;
        }
        if (this.heures === 24) {
          this.heures = 0;
        }
        // calcul
        this.tempsActuelSecondes = this.secondes + this.minutes * 60 + this.heures * 3600;
        this.pourcentage = (100 * this.tempsActuelSecondes) / this.tempsMax;
        this.pourcentage = (Math.round(this.pourcentage * 100) / 100).toFixed(2); // sert à arrondir à deux décimales près
        this.temps = `${bourrageZeros(this.heures)} : ${bourrageZeros(this.minutes)} : ${bourrageZeros(this.secondes)}`;
        if (this.tempsActuelSecondes > this.tempsMax) {
          this.TempsDepasse = true;
          if (this.n === 0) {
            this.AlertTemps = true;
            this.n += 1;
          }
        }
      }, 1000);
    },
    afficheHeureMax(tempsMax) {
      const h = parseInt((tempsMax / 3600), 10);
      const m = parseInt(((tempsMax % 3600) / 60), 10);

      return {
        heures: (h === 24 ? bourrageZeros(0) : bourrageZeros(h)),
        minutes: (m === 60 ? bourrageZeros(0) : bourrageZeros(m)),
      };
    },
    setPause(setPause) {
      clearInterval(this.intervalle);
      this.isLoading = true;

      const ourtoken = this.$store.state.token;
      const TimePause = this.tempsActuelSecondes;
      const content = {
        type: 'pause',
        status: 'ok',
        token: ourtoken,
        data: {
          currentTime: TimePause,
        },
      };
      let data;
      this.$socket.sendObj(content);
      this.$options.sockets.onmessage = function (message) {
        data = JSON.parse(message.data);
        if (data.type === 'pause') {
          console.log(data);
          if (data.status === 'error') {
            setPause();
          }
        }
        if (data) {
          delete this.$options.sockets.onmessage;
        }
      };
    },
  },
  mounted() {
    this.calculTemps();
  },
};
</script>


<style scoped>
.card {
  border-radius: 1rem;
  background: linear-gradient(
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.1)
  );
}
.card-header-title {
  color: white;
}
</style>
