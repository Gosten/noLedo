<template>
  <div>
    <div id="nav-container" class="nav-container">
      <div class="menu-option-container">
        <div
          class="menu-option"
          :class="{ 'selected-option': menuSelection === LOAD_PROBLEM }"
          @click="handleMenuSelection(LOAD_PROBLEM)"
        >
          <span>Wczytaj</span><span>problem</span>
        </div>
        <div
          class="menu-option"
          :class="{ 'selected-option': menuSelection === ADD_PROBLEM }"
          @click="handleMenuSelection(ADD_PROBLEM)"
        >
          <span>Dodaj</span><span>problem</span>
        </div>
        <div
          v-if="activeProblem"
          class="menu-option"
          :class="{ 'selected-option': menuSelection === ACTIVE_PROBLEM }"
          @click="handleMenuSelection(ACTIVE_PROBLEM)"
        >
          <span>Aktywny</span><span>problem</span>
        </div>
        <!-- <div
          class="menu-option"
          :class="{ 'selected-option': menuSelection === ACTIVE_PROBLEM }"
          @click="goFullscreen()"
        >
          <span>Fullscreen</span>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
  data() {
    return {
      ADD_PROBLEM,
      LOAD_PROBLEM,
      ACTIVE_PROBLEM
    };
  },
  methods: {
    handleMenuSelection(option) {
      console.log(option);
      this.$store.dispatch("selectScne", option);
      //this.$emit('on-menu-select', option)
    },
    goFullscreen() {
      document.body.requestFullscreen();
    }
  },
  computed: {
    menuSelection() {
      return this.$store.getters.getActiveScene;
    },
    activeProblem() {
      return this.$store.getters.getActiveProblem;
    }
  }
};
</script>

<style scoped></style>
