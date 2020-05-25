<template>
  <div id="Results"> <!-- affichage de l'interface joueur -->
    <article class="notification is-primary title-font"> <!-- Première partie affichant les données de la partie en cours (Nom- description - ID) -->
      <h1>Partie terminé : {{this.$store.state.Game.gameName}}</h1>
      <p>Template: {{this.$store.state.Game.gameTemplate}}</p>
      <p>Identifiant de partie : {{this.$store.state.Game.gameId}}</p>
    </article>
    <NavBar />
    <b-tabs type="is-toggle" position="is-centered" v-model="activeTab">
      <b-tab-item label="Statistiques">
      </b-tab-item>
      <b-tab-item label="Joueurs">
        <PlayersView />
      </b-tab-item>
      <b-tab-item label="Evenements">
        <Evenements/>
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script>
import PlayersView from '@/components/PlayersView.vue';
import Evenements from '@/components/Evenements.vue';

export default {
  name: 'Results',
  components: {
    PlayersView,
    Evenements,
  },
  data() {
    return {
      stopsur: false,
    };
  },
  methods: {
  },
};
</script>


<style scoped>
.card {
  border-radius: 1rem;
  background: linear-gradient(
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.1)
  );
}
.card-header-title {
  color: white;
}
</style>
