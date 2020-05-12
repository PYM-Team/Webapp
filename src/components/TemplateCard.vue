<template>
<div>
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
        Don Giorgio, baron de la drogue et parrain de la pègre locale, a rendu l'âme. A qui profite le crime ?
      </div>
    </div>
    <footer class="card-footer">
      <a href="#" @click="learn = true" class="card-footer-item">En savoir plus</a>
    </footer>
  </div>
  <b-modal :active.sync="learn" scroll="keep">
        <b-message title="Description" class= "is-primary has-text-centered is-size-5">
           <article class="is-centered has-text-centered"> {{description}} </article>
           <b-button class="button is-primary tile is-centered is-12" @click="createGame"> Démarrer </b-button>
        </b-message>
  </b-modal>
  <b-modal :active.sync="Param" scroll="keep">
        <b-message title="Description" class= "is-primary has-text-centered is-size-5">
          <article class="is-centered has-text-centered"> Parametrez votre partie </article>
          <b-field label="Nom de la partie">
            <b-input v-model="name"></b-input> </b-field>
          <b-field label="Durée de la partie (en secondes)">
            <b-numberinput controls-rounded min="0" placeholder="8" type="number" v-bind="duree">
            </b-numberinput>
          </b-field>
          <b-button tag="router-link" :to="{ path: '/Setup' }" class="button is-primary tile is-centered is-12" @click="createGame"> Démarrer </b-button>
        </b-message>
  </b-modal>
</div>
</template>

<script>
export default {
  name: 'TemplateCard',
  data() {
    return {
      learn: false,
      name: [],
      duree: 3600,
      Param: false,
      description: 'Cette enquête se déroule dans les années 30, en plein coeur de la mafia italienne. Le parrain Don Giorgio a été assassiné. Qui a pu commettre une telle atrocité ? Qui va hériter de son empire et de sa fortune ? Toutes ces questions trouveront leur réponse ce soir.',
    };
  },
  props: {
    title: String,
  },
  methods: {
    createGame() {
      this.$store.commit('setDuree', this.duree);
      this.learn = false;
      this.Param = true;
    },
  },
};
</script>
