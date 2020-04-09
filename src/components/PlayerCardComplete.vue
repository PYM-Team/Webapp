<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title is-centered player-name">
        <img class="player-profile-pic" src="https://i.imgur.com/SfvDmCx.png" />
        {{title}}
        <br/>aka "The Murderer"
      </p>
    </header>
    <div class="card-content">
      <div class="content Nickname">
        <p>
          <strong>Nickname :</strong>
          {{Nickname}}
        </p>
      </div>
      <div class="content Age">
        <p>
          <strong>Age :</strong>
          {{Age}}
        </p>
      </div>
      <div class="content Role">
        <p>
          <strong>Role :</strong>
          {{Role}}
        </p>
      </div>
      <div class="content Element de jeu">
        <p>
          <strong>Elements de jeu :</strong>
          {{ElementsJeu}}
        </p>
      </div>
      <div class="content Objectifs">
        <p>
          <strong>Objectifs :</strong>
          {{Objectifs}}
        </p>
      </div>
      <div class="content Inventaire">
        <p>
          <strong>Inventaire</strong>
        </p>
      </div>
      <div class="columns is-mobile">
          <li class="column is-mobile" v-for="(value, key) in Inventaire" :key="key">
            {{key}}
            <figure class='image is-64x64 is-centered'>
              <img class="is-rounded" :src= value.image></figure>
            {{value.description}} </li>
      </div>
      <div class="content AutrePerso ">
        <p><strong> AutrePerso  </Strong></p>
      </div>
      <div class="columns is-mobile">
          <li class="column is-mobile" v-for="(value, key) in AutrePerso" :key="key">
            {{key}}
            <figure class='image is-64x64 is-centered'>
              <img class="is-rounded" :src= value.image></figure>
            {{value.description}} </li>
      </div>
  </div>
    <footer class="card-footer">
      <a class="card-footer-item">I'm glad you're here</a>
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
      Inventaire: {
        Flasque: { image: 'https://www.mistercanne.fr/pub/media/catalog/product/cache/f1db97aae291dd0f66aad3e831efd877/f/l/flask-alcool.png', description: 'Sa flasque fetiche' },
        Flasq: { image: 'https://www.mistercanne.fr/pub/media/catalog/product/cache/f1db97aae291dd0f66aad3e831efd877/f/l/flask-alcool.png', description: 'Sa flasque fetiche' },
        Flas: { image: 'https://www.mistercanne.fr/pub/media/catalog/product/cache/f1db97aae291dd0f66aad3e831efd877/f/l/flask-alcool.png', description: 'Sa flasque fetiche' },
        Flae: { image: 'https://www.mistercanne.fr/pub/media/catalog/product/cache/f1db97aae291dd0f66aad3e831efd877/f/l/flask-alcool.png', description: 'Sa flasque fetiche' },
        Fla: { image: 'https://www.mistercanne.fr/pub/media/catalog/product/cache/f1db97aae291dd0f66aad3e831efd877/f/l/flask-alcool.png', description: 'Sa flasque fetiche' },

      },
      AutrePerso: {
        Flasque: { image: 'https://image.noelshack.com/fichiers/2017/26/4/1498692476-stiker-luigi.png', description: 'Le bras droit du parrain' },
        Flasq: { image: 'https://image.noelshack.com/fichiers/2017/26/4/1498692476-stiker-luigi.png', description: 'Le bras droit du parrain' },
        Flas: { image: 'https://image.noelshack.com/fichiers/2017/26/4/1498692476-stiker-luigi.png', description: 'Le bras droit du parrain' },
        Flae: { image: 'https://image.noelshack.com/fichiers/2017/26/4/1498692476-stiker-luigi.png', description: 'Le bras droit du parrain' },
        Fla: { image: 'https://image.noelshack.com/fichiers/2017/26/4/1498692476-stiker-luigi.png', description: 'Le bras droit du parrain' },

      },
      Nickname: 'El Sampico',
      Age: '33ans',
      Role: ' Le meilleur tueur à gage',
      ElementsJeu:
        ' Il parle avec un accent espagnol prononcé et fume comme un pompier. Ses manières attentionnées font de lui un véritable gentleman.',
      Objectifs:
        'La mort du parrain s’annonce pour El Sampico comme une double opportunité : la place du boss est libre et sa femme est enfin seule ! Éperdument amoureux de Carla Gurzio, il va lui déclarer sa flamme pendant la soirée à l’aide d’un poème. Il ne sait pas si Carla est impliqué dans la mort de son mari, mais la protège à tout prix si elle vient à être l’objet de suspicions. ',
    };
  },
  methods: {
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
