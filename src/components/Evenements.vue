<template>
    <section>
        <h1> Progression Globale </h1>
        <b-progress :value="Advancement" show-value format="percent"></b-progress>
    </section>
</template>

<script>
export default {
  name: 'Evenements',
  props: {
    title: String,
  },
  data() {
    return {
      Advancement: '8',
    };
  },
};
</script>
<style>
#dashboard-nav {
    background: none;
}
</style>
