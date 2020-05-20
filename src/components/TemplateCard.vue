<template>
<div>
  <div class="card"> <!-- Implemente la carte de description rapide d'un template -->
    <header class="card-header">
      <p class="card-header-title">
        {{title}} <!-- Affiche le titre des templates -->
      </p>
      <a href="#" class="card-header-icon" aria-label="more options">
        <span class="icon">
          <i class="fas fa-angle-down" aria-hidden="true"></i>
        </span>
      </a>
    </header>

    <div class="card-content">
      <div class="content"> <!-- affiche un resume bref du template -->
        Don Giorgio, baron de la drogue et parrain de la pègre locale, a rendu l'âme. A qui profite le crime ?
      </div>
    </div>

    <footer class="card-footer"> <!-- affiche en savoir plus qui lorsque l'on clique dessus lance un modal -->
      <a href="#" @click="learn = true" class="card-footer-item">En savoir plus</a>
    </footer>
  </div>

  <b-modal :active.sync="learn" scroll="keep"> <!-- modal lancé par le "en savoir plus" donne une description plus detaillée du template -->
        <b-message class= "is-primary has-text-centered is-size-5">
          <article class="title is-2 has-text-black is-centered has-text-centered"> Description <br></article>
          <article class="is-centered has-text-centered"> {{description}} {{data}} </article>
          <b-button class="button is-primary tile is-centered is-12" @click="createGame"> Démarrer </b-button> <!-- Crée un bouton démarrer pour choisir ce template et lancer l'initialisation de la partie -->
        </b-message>
  </b-modal>

  <b-modal :active.sync="Param" scroll="keep"> <!-- modal pour initialiser la partie -->
    <b-message class= "is-primary has-text-centered is-size-5">
      <article class="is-centered title is-2 has-text-black has-text-centered"> Parametrez votre partie </article>
      <label v-if="error === true" class ="is-danger">  <b> Veuillez remplir les deux champs </b> </label>
      <b-field label="Nom de la partie"> <!-- Champ pour remplir le nom de la partie -->
        <b-input v-model="name" @input="inputName"></b-input> </b-field>
      <b-field label="Durée de la partie"> <!-- champ pour choisir la durée de la partie -->
        </b-field>
      <b-timepicker
          placeholder="Cliquez sur l'heure pour la modifier"
          v-model="dureeDate"
          @input="inputChange"
          editable>
      </b-timepicker>
      <br>
      <b-button @click="GameStart" class="button is-primary tile is-centered is-12" > Démarrer </b-button> <!-- Permet de lancer une partie -->
    </b-message>
  </b-modal>
</div>
</template>

<script>
export default {
  name: 'TemplateCard',
  data() {
    return {
      Players: [{ name: 'toto', role: 'Vito Falcaninio' }, { name: 'tata', role: 'Carla Gurzio' }, { name: 'tato', role: 'Petro Francesco' }],
      learn: false,
      error: false,
      name: '',
      connection: null,
      dureeDate: undefined,
      dureeSecondes: 0,
      Param: false,
      data: '',
      description: 'Cette enquête se déroule dans les années 30, en plein coeur de la mafia italienne. Le parrain Don Giorgio a été assassiné. Qui a pu commettre une telle atrocité ? Qui va hériter de son empire et de sa fortune ? Toutes ces questions trouveront leur réponse ce soir.',
    };
  },
  props: {
    title: String,
  },
  mounted() {
    // console.log(this.dureeDate.getMinutes());
  },
  methods: {
    createGame() { // ferme le modal de description de la partie pour ouvrir celui d'initialisation
      this.learn = false;
      this.Param = true;
    },
    inputChange() {
      this.duree = this.dureeDate.getHours() * 3600 + this.dureeDate.getMinutes() * 60;
      console.log(this.duree);
      this.$store.commit('setDuree', this.duree);
    },
    inputName() { // enregistre le nom de la partie dans le store
      this.$store.commit('setName', this.name);
    },
    GameStart() {
      if (!this.duree || !this.name) { // si les deux champs sont remplis on lance un processus de création de partie au backend qui nous renvoi un gameId
        this.error = true;
      } else {
        const content = {
          type: 'createGame',
          status: 'ok',
          token: null,
          data: {
            templateName: 'basicMurder',
          },
        };
        let data;
        this.$socket.sendObj(content);
        this.$options.sockets.onmessage = function (message) {
          data = JSON.parse(message.data);
          this.$store.commit('setGameId', data.data.gameId);
          this.$store.commit('setToken', data.data.token);
          this.$router.push({ path: '/setup' });
        };
        if (data) {
          delete this.$options.sockets.onmessage;
        }
      }
    },
  },
};
</script>
