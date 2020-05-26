<template>
  <div id="Overview"> <!-- affichage de l'interface joueur -->
    <article class="notification is-primary title-font"> <!-- Première partie affichant les données de la partie en cours (Nom- description - ID) -->
      <h1>Partie en cours : {{this.$store.state.Game.gameName}}</h1>
      <p>{{this.$store.state.Game.gameTemplate}}</p>
      <p>Identifiant de partie : {{this.$store.state.Game.gameId}}</p>
    </article>
    <div class="tile is-ancestor is-vertical"><!-- Mise en place d'un tile pour afficher l'heure et les joueurs connectés -->
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

          <button class="button tile is-child is-primary is-medium is-5" @click="setPause()">Pause</button>
          <button class="button tile is-child is-primary is-medium is-5" @click="stop = true">Arreter la partie</button>

          <b-modal :active.sync="stop" scroll="keep"> <!-- le modal demande confirmation avant de quitter -->
            <b-message class= "is-primary has-text-centered is-size-5">
            <article class="title is-centered has-text-black has-text-centered"> Voulez vous vraiment arreter la partie ? </article>
            <article class="is-centered is-size-3 has-text-centered"> Ceci est définitif, vous ne pourrez plus la reprendre plus tard</article> <br>
            <b-button class="button is-primary is-pulled-right tile is-right is-4" @click="stopsur = true, stop = false"> Je suis sûr ! </b-button>
            <b-button class="button is-primary is-pulled-left tile is-right is-4" @click="stop = false"> Non </b-button>
            </b-message>
          </b-modal>

          <b-modal :active.sync="stopsur" scroll="keep"> <!-- le modal demande confirmation avant de quitter -->
            <b-message class= "is-primary has-text-centered is-size-5">
            <article class="is-centered is-size-3 has-text-centered"> Vraiment sûr ?</article> <br>
            <b-button class="button is-primary is-pulled-right tile is-right is-4" @click="StopPartie"> Oui </b-button>
            <b-button class="button is-primary is-pulled-left tile is-right is-4" @click="stopsur = false"> Non </b-button>
            </b-message>
          </b-modal>

          <b-loading :active.sync="isLoading" :can-cancel="false"> <!-- Quand la partie est mise en pause fige l'ecran avec seulement un bouton play -->
            <button class="button tile is-child is-primary is-large is-1 is-rounded" @click="setPlay( calculTemps)">Play</button>
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
      tryPause: 0,
      tryPlay: 0,
      stopsur: false,
      stop: false,
      AlertTemps: false, // declencheur du modal pour dire que le temps est depassé
      n: 0, // permet de vérifier que le modal ne se déclenche qu'une fois
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
    StopPartie() {
      // Envoyer à l'API
      this.$router.push({ path: '/' });
    },
    setPlay(calculTemps) {
      calculTemps();
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
          if (data.status === 'error') {
            this.tryPlay += 1;
            if (this.tryPlay === 5) {
              this.Error();
              delete this.$options.sockets.onmessage;
              this.tryPlay = 0;
            } else {
              setTimeout(this.setPlay(calculTemps), 300);
            }
          } else {
            this.data.data.currentTime = this.tempsActuelSecondes;
            this.isLoading = false;
          }
        }
        if (data) {
          delete this.$options.sockets.onmessage;
        }
      };
    },
    setSelected(_SelectedKey) {
      this.selectedKey = _SelectedKey;
    },
    Error() {
      this.$buefy.toast.open({
        duration: 5000,
        message: 'Une erreur s\'est produite veuillez reessayer plus tard',
        position: 'is-bottom',
        type: 'is-danger',
      });
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
    setPause() {
      clearInterval(this.intervalle);

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
            this.tryPause += 1;
            if (this.tryPause === 5) {
              this.Error();
              delete this.$options.sockets.onmessage;
              this.tryPause = 0;
            } else {
              setTimeout(this.setPause, 300);
            }
          } else {
            this.isLoading = true;
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
