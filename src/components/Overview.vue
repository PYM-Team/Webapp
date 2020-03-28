<template>
  <div>
    <article class="notification is-primary title-font">
      <h1>Running Game</h1>
      <p>{{this.$store.state.gameTemplate}}</p>
      <p>Game Number : {{this.$store.state.gameId}}</p>
    </article>
    <button class="button is-primary is-medium"
            @click="isAnnModalActive = true">
            Make an annoncement
    </button>
    <b-modal :active.sync="isAnnModalActive" scroll="keep">
        <div class="card">
              <div class="card-header">
                  <p class="card-header-title is-centered player-name">Annoucement</p>
              </div>
              <div class="card-content">
                  <b-field>
                      <b-input placeholder="Message" v-model="announce"></b-input>
                  </b-field>
                  <button class="button is-medium is-centered is-primary" @click="sendAnnounce()">Send it !</button>
              </div>
        </div>
    </b-modal>
  </div>
</template>

<style scoped>
.card {
  border-radius: 1rem;
  background: linear-gradient(rgba(255,255,255,0.1), rgba(255,255,255,0.1));
}
.card-header-title {
  color: white;
}
</style>

<script>
/* eslint-disable func-names */
/* eslint-disable object-shorthand */
export default {
  name: 'Overview',
  data() {
    return {
      isAnnModalActive: false,
    };
  },
  methods: {
    // TODO: Handle message
    sendAnnounce: function () {
      this.$store.state.socket.emit('announcement', this.announce);
      this.isAnnModalActive = false;
    },
  },
};
</script>
