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
        <div class="field is-grouped">
          <p class="control">
            <button class="button is-primary is-3 is-medium is-pulled-right is-rounded" @click="voirInv()">Voir inventaire</button>
          </p>
          <p class="control">
          <button class="button is-primary is-3 is-medium is-rounded is-pulled-left" @click="voirRel()">Voir relations</button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: true,
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
    voirInv() {
      // affiche l'inventaire sous forme d'un tableau
    },
    voirRel() {
      // affiche le tableau des relations
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
