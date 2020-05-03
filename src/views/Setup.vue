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
};
</script>
