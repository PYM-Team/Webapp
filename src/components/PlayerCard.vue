<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title is-centered player-name">
        <img class="player-profile-pic" src="https://i.imgur.com/SfvDmCx.png"/>
        {{title}}
        <br /> aka "The Murderer"
      </p>
    </header>
    <div class="card-content">
      <div class="content player-role">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque sed blanditiis,
        assumenda repellendus tempore voluptatum eum! Aspernatur nam doloremque asperiores.
        Expedita vero ducimus alias repudiandae dolorem distinctio officia tempora quas.
      </div>
    </div>
    <footer class="card-footer">
      <a @click="activeTab = 0" class="card-footer-item">See More</a>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'TemplateCard',
  props: {
    title: String,
  },
};
</script>

<style scoped>
.player-profile-pic {
  width: 5rem;
  height: 5rem;
  border-radius: 5rem;
  margin-right: 1rem;
}
.card {
  border-radius: 1rem;
  background-image: linear-gradient(#c463ff, #d18bfc);
}
</style>
