<template> <!-- Associe avec tile un menu avec les joueurs connectés et lorsque l'on clique sur l'un sa carte détaillée-->
<!-- <div id="player-view" class="tile is-ancestor">
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
</div> -->

  <div id="Evenement">
    <b-field label="Annonce">
        <b-input maxlength="100" size="is-medium" v-model="texteAnnonce"></b-input>
    </b-field>
    <button class="button is-primary is-medium" @click="envoiAnnonce(envoiAnnonce)">Envoyer aux joueurs</button>
  </div>
</template>

<script>
// import PlayerPanel from '@/components/PlayerPanel.vue';
// import PlayerCard from '@/components/PlayerCardComplete.vue';

export default {
  name: 'Annonce',
  data() {
    return {
      texteAnnonce: '',
    };
  },
  methods: {
    envoiAnnonce(envoiAnnonce) {
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
            envoiAnnonce();
          }
        }
        if (data) {
          delete this.$options.sockets.onmessage;
        }
      };
    },
  },
};
//   name: 'PlayerView',
//   data() {
//     return {
//       selectedKey: {},
//       prefered: {},
//     };
//   },
//   components: { PlayerPanel, PlayerCard },
//   methods: {
//     setSelected(_SelectedKey) {
//       this.selectedKey = _SelectedKey;
//       // this.selectedKey = _SelectedKey[1];
//     },
//   },
// };

</script>

<style>
#player-panel-column {
  min-height: 80vh;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  margin-left: 1rem;
}
</style>
