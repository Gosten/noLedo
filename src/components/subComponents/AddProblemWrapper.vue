<script>
module.exports = {
  data() {
    return {
      ProblemTypes,
      selectedProblemType: null,
    };
  },
  methods: {
    setProblemType(type) {
      this.selectedProblemType = type;
    },
  },
  components: {
    "add-problem": httpVueLoader("../AddProblem.vue"),
    "problem-type-modal": httpVueLoader("./ProblemTypeModal.vue"),
  },
};
</script>

<style scoped type="text/css">
.add-problem-wrapper-container {
  height: var(--window-height);
}
</style>

<template>
  <div class="add-problem-wrapper-container">
    <problem-type-modal
      v-if="!selectedProblemType"
      :set-problem-type="setProblemType"
    ></problem-type-modal>
    <add-problem
      v-if="selectedProblemType"
      :is-loop-type="selectedProblemType === ProblemTypes.LOOP"
    ></add-problem>
  </div>
</template>
