<template>
  <div id="popup-container" class="popup-container">
    <div class="popup-window add-problem-modal">
      <p>Wybierz typ problemu</p>

      <div class="button-container">
        <button class="button" @click="() => setProblemType(ProblemTypes.BALD)">
          Bald
        </button>
        <button class="button" @click="() => setProblemType(ProblemTypes.LOOP)">
          Obwód
        </button>
      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
  data() {
    return {
      ProblemTypes
    };
  },
  computed: {
    newProblem() {
      return this.$store.getters.getAddProblemNewProblem;
    }
  },
  props: {
    setProblemType: Function
  }
};
</script>

<style scoped type="text/css">
.add-problem-modal {
  height: 13em;
  flex-direction: column;
  padding: 1em;
}
</style>
