<template>
  <div class="board-main-container">
    <div v-if="showHideNumbersButton" class="hide-numbers-button-container">
      <button class="hide-numbers-button" @click="toggleShowNumbers">
        <i :class="`mdi mdi-numeric${showNumbers ? '-off' : ''}`"></i>
      </button>
    </div>
    <div :id="boardId" class="board-container">
      <interactive-layer
        :handle-click="handleClick"
        :get-display-problem="getDisplayProblem"
        :selected-problem="selectedProblem"
        :active-problem="activeProblem"
        :problem-state="problemState"
        :edited-problem="editedProblem"
        :alt-pinch-id="altPinchId"
        :loop-state="loopState"
        :is-active-loop-mode="isActiveLoopMode"
        :active-loop-mode-grips="activeLoopModeGrips"
        :show-numbers="showNumbers"
      >
      </interactive-layer>
    </div>
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
      if (this.isLoopBoard) {
        this.gripClickCallback && this.gripClickCallback(id);
      } else {
        if (this.isScene(ADD_PROBLEM))
          this.$store.commit("toggleProblemState", id);
        if (this.isScene(EDIT_PROBLEM))
          this.$store.commit("editProblemStateGrip", id);
        if (this.isScene(ADD_PROBLEM) || this.isScene(EDIT_PROBLEM))
          this.sendGripMessage(id);
      }
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
        payload: `${index},${color}`,
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
    },
    toggleShowNumbers() {
      this.showNumbers = !this.showNumbers;
    },
  },
  computed: {
    isLoopBoard() {
      return this.altPinchId === "loop-pinch";
    },
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
    gripImages: () => gripImages,
  },
  data() {
    return {
      ACTIVE_PROBLEM,
      BOARD_CONFIG,
      showNumbers: true,
    };
  },
  props: {
    boardId: String,
    altPinchId: String,
    gripClickCallback: Function,
    loopState: Object,
    isActiveLoopMode: Boolean,
    activeLoopModeGrips: Array,
    showHideNumbersButton: Boolean,
  },
  mounted() {},
  created() {},
  destroyed() {},
  components: {
    "board-image": httpVueLoader("./Board/BoardImage.vue"),
    "interactive-layer": httpVueLoader(
      `../../../${LOCATION_NAME}/InteractiveLayer.vue`
    ),
  },
};
</script>

<style scoped type="text/css">
@import "../../css/Board.css";
@import ".src/css/app_config.css";

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

.hide-numbers-button-container {
  width: 100%;
  height: 32px;
  display: flex;
  justify-content: flex-end;
}

.hide-numbers-button {
  width: 32px;
  height: 32px;
  border: 2px solid black;
  border-radius: 5px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
}

.hide-numbers-button i {
  font-size: 23px;
  color: black;
  padding: 0;
}

.board-main-container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
