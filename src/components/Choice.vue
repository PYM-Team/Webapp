<template>
<div class="container">
    <section class="hero is-primary"> <!-- affichage de texte -->
        <div class="hero-body">
            <div class="container">
                <h1 class="title">
                    Choisissez votre rôle
                </h1>
                <h2 class="subtitle">
                    Joueur ou maitre du jeu
                </h2>
            </div>
        </div>
     </section>

    <div class="columns is-desktop is-vcentered is-centered is-flex"> <!-- Affichage de deux images avec boutons associés -->
        <figure class="image is-128x128">
            <img class="is-rounded" src = "https://lh3.googleusercontent.com/proxy/U3JcDK__5VHtN63QxXIMk2WA1LA4bRBCttKQFrzD9mgbHvnh1mwx9M6uL6OAoL9caWJbmkqKbtFHfkaqwDCCLLkew1whL1S60Og5XVjWhnijXouXrG6Zun9mQOfFzj0MQXksSivHcBhvdVtzC68mCPMekaATXYj_glgfz2AUVdeQQgsDykc"/>
            <button class="button is-primary is-small" @click="GameMaster = true"/> <!-- permet de choisir GameMaster et lance le modal de confirmation associé -->
        </figure>

        <figure class="image is-128x128" >
            <img class="is-rounded " src = "https://freesvg.org/img/movie_star-actor.png"/>
            <b-button class="button is-primary is-small" tag="router-link" :to="{ path: '/Overview' }" /> <!-- Choisi player et renvoi à l'overview-->
        </figure>
    </div>

    <b-modal :active.sync="GameMaster" scroll="keep"> <!-- Modal de confirmation de l'accès à l'espace GameMaster -->
        <b-message class= "is-primary has-text-centered is-size-5">
            <article class="is-centered has-text-centered"> Attention, ceci est un espace réservé au maitre du jeu qui contient des solutions !</article>
            <b-button tag="router-link" :to="{ path: '/Dashboard' }" class="button is-primary tile is-centered is-12"> Je suis le maitre du jeu </b-button>
        </b-message>
    </b-modal>
</div>
</template>

<script>
export default {
  name: 'Choice',
  data() {
    return {
      GameMaster: false,
      Player: false,
    };
  },
};
</script>

<style>
.columns.is-vcentered {
  height: 60vh ;
  border-width: 50px;
}
</style>
