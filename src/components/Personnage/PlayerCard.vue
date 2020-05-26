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
  data() { // donneesInv, colonnesInv etc seront récupérées depuis le store (et donc depuis l'API)
    return {
      isActive: true,
      modalInv: false,
      modalRel: false,
      donneesInv: [
        { objet: 'Flasque de Tequila', description: 'Un petit remontant pour se donner du courage' },
        { objet: 'Flingue', description: 'Pour El Sampico, cette arme est une extension de sa volonté' },
        { objet: 'Note de l’hôtel', description: 'Une note de l’hôtel où il a passé la nuit avec Carla le soir du meurtre. Elle aurait été l’alibi parfait si elle ne révélait pas en même temps sa relation secrète et incriminante avec sa dulcinée' },
      ],
      colonnesInv: [
        {
          field: 'objet',
          label: 'Objet',
        },
        {
          field: 'description',
          label: 'Description',
        },
      ],
      donneesRel: [
        { perso: 'Petro Francesco', pensee: 'Le gars a l’air solide, il à l’oeil et le corps entraînés, ça se voit' },
        { perso: 'Tomasso Giorgio', pensee: 'Le fils à papa. Le gringo n’a jamais touché à un flingue de sa vie' },
      ],
      colonnesRel: [
        {
          field: 'perso',
          label: 'Personnage',
        },
        {
          field: 'pensee',
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
.card {
  border-radius: 1rem;
  background-image: linear-gradient(#c463ff, #d18bfc);
}
</style>
