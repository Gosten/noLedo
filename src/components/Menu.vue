<template>
  <nav id="nav-bar" :class="{ 'menu-dropdown': menuActive }">
    <transition name="fade">
      <menu-options v-if="menuActive" v-model="menuSelection"></menu-options>
    </transition>

    <div id="header-container" v-if="!menuActive">
      <h1 v-if="menuSelection !== ACTIVE_PROBLEM">{{ getHeader() }}</h1>
      <h1 class="active-problem-header" v-if="menuSelection === ACTIVE_PROBLEM">
        <span>{{ parseName(activeProblem).toUpperCase() }}</span>
        <span v-if="ENABLE_GRADES">: {{ activeProblem.grade }}</span>
      </h1>

      <div id="menu-button" @click="handleMenuClick">
        <img id="hamburger" src="../src/images/hamburger-icon.png" alt="menu" />
      </div>
    </div>
  </nav>
</template>

<script>
module.exports = {
  components: {
    "menu-options": httpVueLoader("./MenuOptions.vue")
  },
  data() {
    return {
      ACTIVE_PROBLEM,
      ENABLE_GRADES,
      parseName
    };
  },
  methods: {
    handleMenuClick() {
      this.$store.commit("toggleMenu");
    },
    getHeader() {
      switch (this.menuSelection) {
        case ADD_PROBLEM:
          return "Dodaj problem";
        case LOAD_PROBLEM:
          return "Wczytaj problem";
        case EDIT_PROBLEM:
          return "Edytuj problem";
        default:
          break;
      }
    }
  },
  computed: {
    menuSelection() {
      return this.$store.getters.getActiveScene;
    },
    menuActive() {
      return this.$store.getters.getMenuState;
    },
    selectedProblem() {
      return this.$store.getters.getSelectedProblem;
    },
    activeProblem() {
      return this.$store.getters.getActiveProblem;
    }
  }
};
</script>

<style scoped type="text/css">
@import "../css/Menu.css";

.fade-enter-active {
  transition: opacity 0.5s;
}
.fade-leave-active {
  transition: opacity 0s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
