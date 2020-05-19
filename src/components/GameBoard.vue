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
  },
};
</script>

<style>
#board {
  margin-top: 1rem;
}
</style>
