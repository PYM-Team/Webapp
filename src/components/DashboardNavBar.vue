<template>
    <b-navbar id="dashboard-nav"> <!-- barre de navigation du dashboard  renvoyant à l'acceuil-->
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img
                    src="https://i.imgur.com/vmOM3ZT.png"
                    alt="Lightweight UI components for Vue.js based on Bulma"
                >
            </b-navbar-item>
        </template>
        <template slot="start">
        </template>
    </b-navbar>
</template>

<style>
#dashboard-nav {
    background: none;
}
</style>
