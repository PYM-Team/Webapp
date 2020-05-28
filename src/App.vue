<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">

// Import Bulma's core
@import "~bulma/sass/utilities/_all";

// Set your colors
$primary: #e00909;
$primary-invert: $white;
$danger: #1224c7;
$title-color:  #3b0f0f;

// police du text
// $title-family: "Luckiest Guy", cursive;
// $button-family: "Luckiest Guy", cursive;

// personnalisation élément card de bulma
$card-background-color: $white;
$card-header-color: $title-color;

// personnalisation élément message de buefy
$background: $primary-invert;


// personnalisation élément title de bulma
$title-color: $title-color;
$subtitle-color: $white;
$subtitle-family: false;
$subtitle-size: $size-3;
$subtitle-weight: 600;

// personnalisation élément menu de bulma
$menu-item-color: $white;

// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: (
    "white": ($white, $black),
    "black": ($black, $white),
    "light": ($light, $light-invert),
    "dark": ($dark, $dark-invert),
    "primary": ($primary, $primary-invert),
    "info": ($info, $info-invert),
    "success": ($success, $success-invert),
    "warning": ($warning, $warning-invert),
    "danger": ($danger, $danger-invert),
    // "twitter": ($twitter, $twitter-invert)
);

// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;


// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";


</style>

<style>
::-webkit-scrollbar {
  width: 0px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
