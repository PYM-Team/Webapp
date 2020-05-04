<template>
  <div id="Overview">
    <article class="notification is-primary title-font">
      <h1>Running Game</h1>
      <p>{{this.$store.state.gameTemplate}}</p>
      <p>Game Number : {{this.$store.state.gameId}}</p>
    </article>
    <button class="button is-primary is-medium" @click="isAnnModalActive = true">Faire une annonce</button>
    <b-modal :active.sync="isAnnModalActive" scroll="keep">
      <div class="card">
        <div class="card-header">
          <p class="card-header-title is-centered player-name">Annonce</p>
        </div>
        <div class="card-content">
          <b-field>
            <b-input placeholder="Message" v-model="announce"></b-input>
          </b-field>
          <button class="button is-medium is-centered is-primary" @click="sendAnnounce()">Envoyer !</button>
        </div>
      </div>
    </b-modal>
    <p>
      <br />
    </p>
    <div class="tile is-ancestor is-vertical">
      <div class="tile is-parent">
        <article class="tile is-child is-5 is-centered">
          <playerPanel v-on:selected="setSelected($event)" />
        </article>
        <div class="tile is-parent is-vertical is-12">
          <article class="tile notification is-child is-primary is-5 is-centered">
            <h1 class="is-size-4">Partie débutée le :</h1>
            <h1 class="date is-size-2 is-centered has-text-dark">{{ getDate() }}</h1>
            <h1 class="is-size-4">En cours depuis :</h1>
            <h1 class="time is-size-1 has-text-white">{{ temps }}</h1>
          </article>
          <button class="button tile is-child is-primary is-medium is-5" @click="Pause= true">Pause</button>
          <b-modal :active.sync="Pause" scroll="keep">
            <b-message title="Pause" class="is-primary has-text-centered is-size-5">
              <article class="is-centered has-text-centered">
                La partie est en pause, aucune action n'est plus possible et le timer a été mis en pause.
                <br />Pour reprendre la partie, cliquer sur play
              </article>
            </b-message>
          </b-modal>
          <button class="button tile is-child is-primary is-medium is-5" @click="Play = true">Play</button>
          <b-modal :active.sync="Play" scroll="keep">
            <b-message title="Play" class="is-primary has-text-centered is-size-5">
              <article class="is-centered has-text-centered">La partie a repris</article>
            </b-message>
          </b-modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import playerPanel from '@/components/PlayerPanel.vue';

// fonction utile pour afficher le temps (ex : remplace 4 par 04)
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
      isAnnModalActive: false,
      temps: '',
      Pause: false,
      Play: false,
    };
  },
  methods: {
    // TODO: Handle message
    sendAnnounce() {
      this.$store.state.socket.emit('announcement', this.announce);
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
      setInterval(() => {
        this.temps = new Date().toLocaleTimeString();
      }, 1000);
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
