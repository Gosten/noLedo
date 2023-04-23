<template>
  <div :id="boardId" class="board-container">
    <interactive-layer
      :handle-click="handleClick"
      :get-display-problem="getDisplayProblem"
      :selected-problem="selectedProblem"
      :active-problem="activeProblem"
      :problem-state="problemState"
      :edited-problem="editedProblem"
    >
    </interactive-layer>
  </div>
</template>

<script>
module.exports = {
  methods: {
    getDisplayProblem() {
      if (this.isScene(LOAD_PROBLEM)) return this.selectedProblem;
      if (this.isScene(ACTIVE_PROBLEM)) return this.activeProblem;
      if (this.isScene(ADD_PROBLEM)) {
        return this.problemState;
      }
      if (this.isScene(EDIT_PROBLEM)) {
        return this.editedProblem;
      }
    },
    getGripSelectionColor(grip) {
      const colorIndex = this.gripClassCondition(grip);
      if (typeof colorIndex === "number") {
        if (colorIndex === 0) {
          const lastKey = Object.keys(BOARD_CONFIG.multiTapColors)
            .map((key) => Number(key))
            .pop();
          if (Object.values(this.problemState).includes(lastKey)) {
            return `grip-selection-${colorIndex}-limit`;
          }
        }
        return `grip-selection-${colorIndex}`;
      }
    },
    handleClick(id) {
      if (this.isScene(ADD_PROBLEM))
        this.$store.commit("toggleProblemState", id);
      if (this.isScene(EDIT_PROBLEM))
        this.$store.commit("editProblemStateGrip", id);
      if (this.isScene(ADD_PROBLEM) || this.isScene(EDIT_PROBLEM))
        this.sendGripMessage(id);
    },
    sendGripMessage(id) {
      let diodes = gripMap[id];
      let color = "0,0,0";
      if (!ENABLE_MULTI_TAP) {
        let diodeState = this.problemState[id] ? 255 : 0;
        color = `0,${diodeState},0`;
      } else {
        const colorIndex = this.gripClassCondition(id);
        const diodeColor = BOARD_CONFIG.multiTapColors[colorIndex];
        color = `${diodeColor.join(",")}`;
      }
      const messages = diodes.map((index) => ({
        topic: "display",
        payload: `${index},${color}`
      }));
      // messages.forEach((msg) => uibuilder.send(msg));
    },
    gripClassCondition(id) {
      if (this.isScene(LOAD_PROBLEM)) return this.selectedProblem.grips[id];
      if (this.isScene(ACTIVE_PROBLEM)) return this.activeProblem.grips[id];
      if (this.isScene(ADD_PROBLEM)) {
        return this.problemState[id];
      }
      if (this.isScene(EDIT_PROBLEM)) {
        return this.editedProblem.grips[id];
      }
    },
    isScene(sceneType) {
      return this.$store.getters.getActiveScene === sceneType;
    }
  },
  computed: {
    problemState() {
      return this.$store.getters.getAddProblemState;
    },
    editedProblem() {
      return this.$store.getters.getEditedProblem;
    },
    interactionCondition() {
      return (
        this.activeScene === ADD_PROBLEM || this.activeScene === EDIT_PROBLEM
      );
    },
    activeProblem() {
      return this.$store.getters.getActiveProblem;
    },
    activeScene() {
      return this.$store.getters.getActiveScene;
    },
    selectedProblem() {
      return this.$store.getters.getSelectedProblem;
    },
    diodeIndexes: () => diodeIndexes,
    gripImages: () => gripImages
  },
  data() {
    return {
      ACTIVE_PROBLEM,
      BOARD_CONFIG
    };
  },
  props: {
    boardId: String
  },
  mounted() {},
  created() {},
  destroyed() {},
  components: {
    "board-image": httpVueLoader("components/Board/BoardImage.vue"),
    "interactive-layer": httpVueLoader("components/Board/InteractiveLayer.vue")
  }
};
</script>

<style scoped type="text/css">
@import "../../css/Board.css";
@import "../../css/app_config.css";

.board-description {
  font-size: var(--description-font-size);
  font-weight: 700;
}

.background-image-container {
  position: relative;
  width: var(--scroll-container-width);
  height: var(--scroll-container-height);
  padding: var(--board-image-padding);
}

.board-background-image {
  width: 100%;
  /* transform: translate(var(--board-image-left), var(--board-image-top)); */
}
</style>
