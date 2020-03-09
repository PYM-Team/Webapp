<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">
        {{title}}
      </p>
      <a href="#" class="card-header-icon" aria-label="more options">
        <span class="icon">
          <i class="fas fa-angle-down" aria-hidden="true"></i>
        </span>
      </a>
    </header>
    <div class="card-content">
      <div class="content">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque sed blanditiis,
        assumenda repellendus tempore voluptatum eum! Aspernatur nam doloremque asperiores.
        Expedita vero ducimus alias repudiandae dolorem distinctio officia tempora quas.
      </div>
    </div>
    <footer class="card-footer">
      <a href="#" v-on:click="createGame" class="card-footer-item">Create a game</a>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'TemplateCard',
  props: {
    title: String,
  },
  methods: {
    createGame() {
      fetch('https://rpplanner-api.herokuapp.com/api/games', {
        method: 'post',
      })
        .then((res) => res.json())
        .then((data) => {
          // do something
          console.log(data);
        })
        .catch(() => {
          console.log('error');
        });
    },
  },
};
</script>
