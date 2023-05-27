<template>
  <div id="app-container" class="app-container" :style="{ height: '100vh' }">
    <menu-bar></menu-bar>

    <transition name="component-fade">
      <add-problem v-if="isAddProblem"></add-problem>
    </transition>
    <transition name="component-fade">
      <load-problem v-if="isLoadProblem"></load-problem>
    </transition>
    <transition name="active-component-fade">
      <active-problem v-if="isActiveProblem"></active-problem>
    </transition>
    <transition name="active-component-fade">
      <edit-problem v-if="isEditProblem"></edit-problem>
    </transition>
    <transition name="intro-component-fade">
      <intro v-if="intro"></intro>
    </transition>
    <landscape-block></landscape-block>
  </div>
</template>

<script>
module.exports = {
  components: {
    "add-problem": httpVueLoader("./subComponents/AddProblemWrapper.vue"),
    "load-problem": httpVueLoader("./LoadProblem.vue"),
    "active-problem": httpVueLoader("./ActiveProblem.vue"),
    "edit-problem": httpVueLoader("./EditProblem.vue"),
    "menu-bar": httpVueLoader("./Menu.vue"),
    intro: httpVueLoader("./Intro.vue"),
    "landscape-block": httpVueLoader("./LandscapeBlock.vue"),
  },
  computed: {
    isAddProblem() {
      return this.$store.getters.getActiveScene === ADD_PROBLEM;
    },
    isLoadProblem() {
      return this.$store.getters.getActiveScene === LOAD_PROBLEM;
    },
    isActiveProblem() {
      return this.$store.getters.getActiveScene === ACTIVE_PROBLEM;
    },
    isEditProblem() {
      return this.$store.getters.getActiveScene === EDIT_PROBLEM;
    },
    intro() {
      return this.$store.getters.getIntro;
    },
  },
  methods: {
    handleResize() {
      if (!this.isAddProblem) {
        console.log("resize");
        this.appHandle.style = `height: ${window.innerHeight}px; --window-height: ${window.innerHeight}px`;
      }
    },
  },
  data() {
    return {
      appHandle: undefined,
    };
  },
  mounted() {
    this.appHandle = document.getElementById("app-container");
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  },
};
</script>

<style scoped type="text/css">
@import url("../css/App.css");
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.5s;
}
.component-fade-enter, .component-fade-leave-to /* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.active-component-fade-enter-active {
  transition: opacity 0.5s;
  transition-delay: 0.5s;
}
.active-component-fade-leave-active {
  transition: opacity 0.5s;
}
.active-component-fade-enter, .active-component-fade-leave-to /* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.intro-component-fade-enter-active {
  transition: opacity 0s;
}
.intro-component-fade-leave-active {
  transition: opacity 0.5s;
}
.intro-component-fade-enter, .intro-component-fade-leave-to /* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
