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
        Une ou deux phrases d'accroches afin de titiller votre curiosité.
      </div>
    </div>
    <footer class="card-footer">
      <a href="#" @click="learn = true" class="card-footer-item">En savoir plus</a>
    </footer>
  </div>
  <b-modal :active.sync="learn" scroll="keep">
        <b-message title="Description" class= "is-primary has-text-centered is-size-5">
           <article class="is-centered has-text-centered"> {{description}} </article>
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
      description: 'Don Giorgio, baron de la drogue et parrain de la pègre locale, a rendu l\'âme. A qui profite le crime ? ',
    };
  },
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
          this.$router.push({ name: 'Dashboard', params: { nameGame: this.title, idGame: '0001' } });
          console.log(data);
        })
        .catch(() => {
          console.log('error');
        });
    },
  },
};
</script>
