<template>
  <div class="home">
    <NavBar />
      <Setup />
  </div>
</template>

<script>
// @ is an alias to /src
import Setup from '@/components/Setup/SetupTotal.vue';
import NavBar from '@/components/DashboardNavBar.vue';

export default {
  name: 'Home',
  components: {
    Setup,
    NavBar,
  },
  mounted() {
    if (this.$store.state.token === 0) {
      this.$router.push({ path: '/' });
      setInterval(() => {
        this.$socket.sendObj({
          type: 'Ping',
          status: 'ok',
          token: null,
          data: {
          },
        });
      }, 10000);
    }
  },
};
</script>
