<template>
  <div class="board">
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
      templates: [{ name: 'murder at TC' }, { name: 'strange story hmm' }, { name: 'murder in the museum' }, { name: 'not a murder at TC' }, { name: 'not a murder at TC' }, { name: 'not a murder at TC' }],
    };
  },
};
</script>
