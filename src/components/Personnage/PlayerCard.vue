<template>
  <div class="card"> <!-- Creer la carte resumé d'un joueur avec son avancement son etat et ses dernières missions -->
    <header class="card-header">
      <p class="card-header-title is-centered player-name">
        <img class="player-profile-pic" src="https://i.imgur.com/SfvDmCx.png"/>
        <br /> {{this.$store.state.Game.PlayersDetailed[this.num].role}}
      </p>
    </header>
    <div class="card-content">
      <div class="content player-role">
        <p>
          Joueur : {{this.$store.state.Game.PlayersDetailed[this.num].description}}
        </p>
        <p v-if="this.$store.state.Game.PlayersDetailed[this.num].state === true">Etat : conscient</p>
        <p v-if="this.$store.state.Game.PlayersDetailed[this.num].state === false">Etat : inconscient</p>
      </div>
    <button class="button is-primary is-medium is-pulled-right" @click="modalInv = true">Voir inventaire</button>
    <button class="button is-primary is-medium if-pulled-left" @click="modalRel = true">Voir relations</button>

    <!-- INVENTAIRE -->
    <b-modal :active.sync="modalInv">
      <b-table :data="donneesInv" :columns="colonnesInv"></b-table>
    </b-modal>

    <!-- RELATIONS -->
    <b-modal :active.sync="modalRel">
      <b-table :data="donneesRel" :columns="colonnesRel"></b-table>
    </b-modal>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: true,
      modalInv: false,
      modalRel: false,
      donneesInv: this.$store.state.Game.PlayersDetailed[this.num].inventory,
      donneesRel: this.$store.state.Game.PlayersDetailed[this.num].relations,

      colonnesInv: [
        {
          field: 'name',
          label: 'Objet',
        },
        {
          field: 'description',
          label: 'Description',
        },
        {
          field: 'clue',
          label: 'Indice',
        },
      ],
      colonnesRel: [
        {
          field: 'target',
          label: 'Personnage',
        },
        {
          field: 'thought',
          label: 'Ce que je pense du personnage',
        },
      ],
    };
  },
  name: 'TemplateCard',
  props: {
    num: String, // l'index de this.store.state.Game.Players
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
</style>
