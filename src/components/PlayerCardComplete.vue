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
      <div class="content Nickname">
        <p><strong> Nickname : </Strong> {{Nickname}} </p>
      </div>
      <div class="content Age">
        <p><strong> Age : </Strong> {{Age}} </p>
      </div>
      <div class="content Role">
        <p><strong> Role : </Strong> {{Role}} </p>
      </div>
      <div class="content Element de jeu">
        <p><strong> Elements de jeu :  </Strong> {{ElementsJeu}}  </p>
      </div>
      <div class="content Objectifs ">
        <p><strong> Objectifs :  </Strong> {{Objectifs}} </p>
      </div>
      <div class="content Inventaire ">
        <p><strong> Inventaire  </Strong></p>
      </div>
      <div class="columns">
      <div class="column is-3">
        <figure class="image is-128x128">
          <img  v-on:click="launch1" src="https://www.mistercanne.fr/pub/media/catalog/product/cache/f1db97aae291dd0f66aad3e831efd877/f/l/flask-alcool.png"></figure>
          <button class="button is-small is-dark is-light"
            @click="alertCustomError">Flasque</button>
      </div>
      <div class="column is-3">
        <figure class="image is-128x128">
          <img src="https://www.pngfactory.net/_png/_thumb/19678-Ornorm-Ornormcigarettes.png"></figure>
      </div>
      <div class="column is-3">
        <figure class="image is-128x128">
          <img src="https://static.wixstatic.com/media/2cd43b_fe0ab3cf5f1244149931a9a77df263ef~mv2.png/v1/fill/w_320,h_249,fp_0.50_0.50/2cd43b_fe0ab3cf5f1244149931a9a77df263ef~mv2.png"></figure>
      </div>
      <div class="column is-3">
        <figure class="image is-128x128">
          <img src="https://pluspng.com/img-png/png-penny--727.png"></figure>
      </div>
    </div>
    </div>
    <footer class="card-footer">
      <a class="card-footer-item">See More</a>
    </footer>
</div>
</template>

<script>
export default {
  name: 'TemplateCard',
  props: {
    title: String,
  },
  data() {
    return {
      Nickname: 'El Sampico',
      Age: '33ans',
      Role: ' Le meilleur tueur à gage',
      ElementsJeu: ' Il parle avec un accent espagnol prononcé et fume comme un pompier. Ses manières attentionnées font de lui un véritable gentleman.',
      Objectifs: 'La mort du parrain s’annonce pour El Sampico comme une double opportunité : la place du boss est libre et sa femme est enfin seule ! Éperdument amoureux de Carla Gurzio, il va lui déclarer sa flamme pendant la soirée à l’aide d’un poème. Il ne sait pas si Carla est impliqué dans la mort de son mari, mais la protège à tout prix si elle vient à être l’objet de suspicions. ',
    };
  },
  methods: {
    alertCustom() {
      this.$buefy.dialog.alert({
        title: 'Flasque',
        message: 'Un  petit remontant pour se donner du courage.',
        confirmText: 'ok !',
      });
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
