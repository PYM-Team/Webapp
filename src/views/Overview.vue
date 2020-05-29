<template>
  <div class="home">
    <NavBar />
      <Overview />
  </div>
</template>

<script>
// @ is an alias to /src
import Overview from '@/components/Overview.vue';
import NavBar from '@/components/DashboardNavBar.vue';

export default {
  name: 'Home',
  components: {
    Overview,
    NavBar,
  },
  mounted() {
    if (this.$store.state.token === 0) {
      this.$router.push({ path: '/' });
    }
    setInterval(() => {
      this.$socket.sendObj({
        type: 'Ping',
        status: 'ok',
        token: null,
        data: {
        },
      });
    }, 10000);
  },
};
</script>
