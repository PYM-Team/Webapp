<template>
  <div class="home">
    <NavBar />
      <Choice />
  </div>
</template>

<script>
// @ is an alias to /src
import Choice from '@/components/Choice.vue';
import NavBar from '@/components/DashboardNavBar.vue';

export default {
  name: 'Home',
  components: {
    Choice,
    NavBar,
  },
};
</script>
