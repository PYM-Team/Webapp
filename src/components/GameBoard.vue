<template>
  <div class="container" id="board">
    <div class="columns is-multiline is-desktop">
      <div class="column is-3" v-for="template in templates" v-bind:key="template">
          <TemplateCard :title="template.name" />
      </div>
      <button @click="gamestart"> button </button>
    </div>
  </div>
</template>

<script>

import TemplateCard from '@/components/TemplateCard.vue';

export default {
  name: 'GameBoard',
  components: { TemplateCard },
  data() {
    return {
      templates: [{ name: 'La mort du parrain' }, { name: 'Intrigues à la cour du roi' }, { name: 'En pleine guerre froide' }, { name: 'Bagarre de saloon' }, { name: 'Mariage compromis' }, { name: 'Panique à la discothèque' }],
    };
  },
  methods: {
    gamestart() {
      const content = {
        type: 'createGame',
        status: 'ok',
        token: null,
        data: {
          templateName: 'basicMurder',
        },
      };
      let data;
      this.$socket.sendObj(content);
      this.$options.sockets.onmessage = function (message) {
        data = JSON.parse(message.data);
        this.$store.commit('setGameId', data.data.gameId);
      };
      if (data) {
        delete this.$options.sockets.onmessage;
      }
    },
  },
};
</script>

<style>
#board {
  margin-top: 1rem;
}
</style>
