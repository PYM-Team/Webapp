<template>
  <div class="container" id="board"> <!-- Pour chaque template affiche un template card de ce template -->
    <div class="columns is-multiline is-desktop">
    <b-loading :active.sync="Loading" :can-cancel="false"></b-loading>
      <div class="column is-3" v-for="template in templates" v-bind:key="template">
          <TemplateCard v-if="Loading === false" :title="template.name" :catchphrase="template.summary" :description="template.description" />
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
      templates: this.$store.state.init.templates,
      tryGet: 0,
      Loading: true,
    };
  },
  methods: {
    GetTemplates() {
      const content = {
        type: 'getTemplatesPage',
        status: 'ok',
        token: null,
        data: {
        },
      };
      let data;
      this.$socket.sendObj(content);
      this.$options.sockets.onmessage = function (message) {
        data = JSON.parse(message.data);
        if (data.type === 'getTemplatesPage') {
          console.log(data);
          if (data.status === 'error') {
            this.tryGet += 1;
            if (this.tryGet === 5) {
              delete this.$options.sockets.onmessage;
            } else {
              setTimeout(this.GetTemplates(), 300);
            }
          } else {
            this.$store.commit('setTemplates', data.data.templates);
            this.Loading = false;
            this.templates = this.$store.state.init.templates;
          }
        }
      };
      if (data) {
        delete this.$options.sockets.onmessage;
      }
    },
  },
  created() {
    setTimeout(() => {
      this.GetTemplates();
    }, 500); // a la creation de la page on demande à l'API les roles dispos -  la description de la partie - les joueurs connectés et leur préférence de role
  },
};
</script>


<style>
#board {
  margin-top: 1rem;
}
</style>
