<template>
    <div id="app">
  <div :key="value" class="state has-text-centered">
    {{ value }} / 7
  </div>
  <div class="container has-text-centered">
    <transition-group name="fading">
      <span class="fading-item" v-for="i in value" v-bind:key="i"><img src="https://img.pngio.com/parent-directory-avatar-2png-avatar-png-256_256.png" /></span>
    </transition-group>
    <img v-if="value==0" class="empty" src="https://img.pngio.com/parent-directory-avatar-2png-avatar-png-256_256.png"/>
  </div>
  <div class="container has-text-centered addremove">
    <b-button @click="add">{{dote}}</b-button>
    <b-button @click="remove">Remove one</b-button>
  </div>
</div>
</template>

<script>


export default {
  name: 'Setup',
  data() {
    return {
      value: 3,
      dote: {},
    };
  },
  created() {
  },
  methods: {
    add() {
      this.value += 1;
    },
    remove() {
      this.value -= 1;
    },
  },
};

</script>
<style>
.fading-item {
  margin-left: 10px;
  margin-right: 10px;
  width: 100px;
  height: auto;
  display: inline-block;
  transition: all 1s;
}
.fading-enter,
.fading-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.fading-leave-active {
  position: absolute;
}
.state {
  margin-bottom: 20px;
}
.addremove {
  margin-top: 20px;
}
.empty {
  filter: grayscale(100%);
  width: 100px;
  height: auto;
}
</style>
