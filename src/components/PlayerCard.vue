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
    <b-menu-list>
      <b-menu-item icon="settings" :active="isActive" expanded>
        <template slot="label" slot-scope="props">
          See more
          <b-icon class="is-pulled-right" :icon="props.expanded ? 'menu-down' : 'menu-up'"></b-icon>
        </template>
        <b-menu-item>
          <template slot="label">
            <strong> Etat : </strong> {{Etat}} <br/>
            <strong> Dernière mission: </strong> {{Last_Mission}} <br/>
            <strong> Avancée du personnage: </strong>
            <b-progress class="progress is-small" :value="Advancement" show-value format="percent"></b-progress>
            <b-dropdown aria-role="list" class="is-pulled-right" position="is-bottom-left">
              <b-icon icon="dots-vertical" slot="trigger"></b-icon>
            </b-dropdown>
          </template>
        </b-menu-item>
      </b-menu-item>
    </b-menu-list>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: true,
      Etat: 'Vivant',
      Last_Mission: 'Tuer le colonel (avec le chandelier)',
    };
  },
  name: 'TemplateCard',
  props: {
    title: String,
  },
  methods: {
    CompleteCard() {
      return 4;
    },
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
