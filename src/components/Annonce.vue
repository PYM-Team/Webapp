<template>
  <div id="Annonce">
    <article class="title is-1 is-centered"> Entrez le texte à envoyer </article>
       <br>
    <b-field>
      <b-input maxlength="100" size="is-medium" v-model="texteAnnonce"></b-input>
    </b-field>
    <button class="button is-primary is-medium" @click="envoiAnnonce()">Envoyer aux joueurs</button>
  </div>
</template>

<script>
export default {
  name: 'Annonce',
  data() {
    return {
      tryAnnonce: 0,
      texteAnnonce: '',
    };
  },
  methods: {
    Error() {
      this.$buefy.toast.open({
        duration: 5000,
        message: 'Une erreur s\'est produite veuillez reessayer plus tard',
        position: 'is-bottom',
        type: 'is-danger',
      });
    },
    envoiAnnonce() {
      const ourtoken = this.$store.state.token;
      const ourmessage = this.texteAnnonce;
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
            this.envoiAnnonce();
            this.tryAnnonce += 1;
            if (this.tryRole === 5) {
              this.Error();
              delete this.$options.sockets.onmessage;
              this.tryAnnonce = 0;
            }
          }
        }
        if (data) {
          delete this.$options.sockets.onmessage;
        }
      };
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
