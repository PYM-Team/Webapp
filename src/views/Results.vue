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
  created() {
    const ourtoken = this.$store.state.token;
    const content = {
      type: 'getMg',
      status: 'ok',
      token: ourtoken,
      data: {},
    };
    let data;
    this.$socket.sendObj(content);
    this.$options.sockets.onmessage = function (message) {
      data = JSON.parse(message.data);
      if (data.type === 'getMg') {
        if (data.status === 'error') {
          this.$buefy.toast.open({
            duration: 5000,
            message: 'Une erreur s\'est produite veuillez reessayer plus tard',
            position: 'is-bottom',
            type: 'is-danger',
          });
        } else {
          this.$store.commit('setEvents', data.data.events);
          this.$store.commit('setPlayersDetailed', data.data.players);
          this.Loading = false;
        }
      }
      if (data.type === 'notification') {
        if (data.data.type === 'info') {
          this.$buefy.toast.open({
            duration: 6000,
            message: data.data.message,
            position: 'is-bottom',
            type: 'is-info',
          });
        }
        if (data.data.type === 'warn') {
          this.$buefy.toast.open({
            duration: 6000,
            message: data.data.message,
            position: 'is-bottom',
            type: 'is-warning',
          });
        }
      }
    };
  },
};
</script>
