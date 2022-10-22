<template>
  <div id="intro-scene">
    <div class="intro-container">
      <transition name="intro">
        <img v-if="fade" class="splash-img" src="./images/LW_Logo.png" alt="" />
        <!-- <h1 v-if="fade">LED<span class="green">o</span>Wall</h1> -->
      </transition>
    </div>
  </div>
</template>

<script>
module.exports = {
  data() {
    return {
      fade: true
    };
  },
  mounted() {
    setTimeout(() => (this.fade = false), 2000);
    setTimeout(() => this.$store.commit("toggleIntro"), 4000);
  }
};
</script>

<style scoped type="text/css">
#intro-scene {
  background: black;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 200;
  width: 100vw;
  height: 100vh;
  font-family: "Russo One", sans-serif;
}
.intro-container {
  font-size: 1.5em;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.green {
  color: hsl(125, 100%, 50%);
}
.intro-enter-active {
  transition: opacity 0s;
}
.intro-leave-active {
  transition: opacity 0.5s;
}
.intro-enter, .intro-leave-to /* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.splash-img {
  width: 80%;
}
</style>
