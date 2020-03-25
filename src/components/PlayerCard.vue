<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title is-centered">
        {{title}} aka "The Murderer"
      </p>
    </header>
    <div class="card-content">
      <div class="content">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque sed blanditiis,
        assumenda repellendus tempore voluptatum eum! Aspernatur nam doloremque asperiores.
        Expedita vero ducimus alias repudiandae dolorem distinctio officia tempora quas.
      </div>
    </div>
    <footer class="card-footer ">
      <a @click="activeTab = 0" class="card-footer-item">See more infos</a>
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
