<template>
  <div class="home">
    <NavBar />
      <GameBoard />
  </div>
</template>

<script>
// @ is an alias to /src
import GameBoard from '@/components/GameBoard.vue';
import NavBar from '@/components/HomeNavBar.vue';

export default {
  name: 'Home',
  components: {
    GameBoard,
    NavBar,
  },
  mounted() {
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

<style>
</style>
