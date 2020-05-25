<template>
  <div class="container" id="board"> <!-- Pour chaque template affiche un template card de ce template -->
    <div class="columns is-multiline is-desktop">
      <div class="column is-3" v-for="template in templates" v-bind:key="template">
          <TemplateCard :title="template.name" :catchphrase="template.catchphrase" :description="template.description" />
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
