<template>
  <div class="home">
    <NavBar />
      <Results />
  </div>
</template>

<script>
// @ is an alias to /src
import Results from '@/components/Results.vue';
import NavBar from '@/components/DashboardNavBar.vue';

export default {
  name: 'Home',
  components: {
    Results,
    NavBar,
  },
  mounted() {
    if (this.$store.state.token === 0) {
      this.$router.push({ path: '/' });
    }
  },
};
</script>
