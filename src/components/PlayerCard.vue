<template>
  <div class="card"> <!-- Creer la carte resumé d'un joueur avec son avancement son etat et ses dernières missions -->
    <header class="card-header">
      <p class="card-header-title is-centered player-name">
        <img class="player-profile-pic" src="https://i.imgur.com/SfvDmCx.png"/>
        <br /> {{this.$store.state.players[this.num].prefered}}
      </p>
    </header>
    <div class="card-content">
      <div class="content player-role">
        <p>
          Joueur : {{this.$store.state.players[this.num].name}}
        </p>
        <p>
          Etat : Vivant
        </p>
      </div>
    </div>
    <button class="button is-primary is-medium" @click="voir()">Voir inventaire</button>
    <!-- <footer class="card-footer">
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
    </footer> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      // IL FAUDRAIT Game.Players.name au lieu de players.name utilisé pour les tests
      isActive: true,
      Etat: 'Vivant',
      Last_Mission: 'Tuer le colonel (avec le chandelier)',
    };
  },
  name: 'TemplateCard',
  props: {
    num: String, // l'index de this.store.state.Game.Players
  },
  methods: {
    CompleteCard() {
      return 4;
    },
    voir() {
      console.log('YEAH');
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
