<template>
  <div class="container" id="board"> <!-- Pour chaque template affiche un template card de ce template -->
    <div class="columns is-multiline is-desktop">
      <div class="column is-3" v-for="template in templates" v-bind:key="template">
          <TemplateCard :title="template.name" />
      </div>
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
  },
  created() { // a la creation de la page on demande à l'API les roles dispos -  la description de la partie - les joueurs connectés et leur préférence de role
    const content = {
      type: 'Initialize',
      status: 'ok',
      token: null,
      data: {
      },
    };
    let data;
    this.$socket.sendObj(content);
    this.$options.sockets.onmessage = function (message) {
      data = JSON.parse(message.data);
      if (data.type === 'Initialize') {
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
#board {
  margin-top: 1rem;
}
</style>
