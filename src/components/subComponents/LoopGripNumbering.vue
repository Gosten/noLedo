<script>
module.exports = {
  data() {
    return {
      loopNumberItemInView: null,
      startTopKeys: [],
    };
  },
  methods: {
    scrollToSelected(id) {
      const selectedElementHandle = document.getElementById(
        `loop-number-item-${id}`
      );
      if (selectedElementHandle && id !== this.loopNumberItemInView) {
        selectedElementHandle.scrollIntoView({ behavior: "smooth" });
        this.loopNumberItemInView = id;
      }
    },
  },
  computed: {
    isLoopOrderEmpty() {
      return Boolean(
        this.loopState && this.loopState.order && this.loopState.order.length
      );
    },
  },
  props: {
    loopState: Object,
    setSelectedGrip: Function,
    undo: Function,
    clearOrder: Function,
  },
  watch: {
    "loopState.selectedGrip": {
      handler(newSelectedGripId, o) {
        this.scrollToSelected(newSelectedGripId);
      },
      deep: true,
    },
  },
  updated() {
    this.scrollToSelected(this.loopState.selectedGrip);
  },
  components: {},
  mounted() {},
  components: {
    "control-button": httpVueLoader("./ControlButton.vue"),
  },
};
</script>

<style scoped type="text/css">
.loop-grip-numbers-container {
  flex-grow: 0;
  width: 100%;
  padding-bottom: 10px;
  position: relative;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  overflow-x: scroll;
}
.loop-numbers-wrapper-container {
  /* position: absolute; */
  display: flex;
  height: 4em;
  width: fit-content;
}
.loop-number-item {
  font-size: 2em;
  display: flex;
  /* padding: 0.2em 0.35em; */
  width: 2em;
  justify-content: center;
  align-items: center;
  transition-duration: 0.15s ease-in-out;
  box-sizing: border-box;
  margin: 2px;
  border: 1px solid grey;
  border-radius: 3px;
}
.selected-number {
  border: 2px solid rgb(0, 47, 255);
  /* font-size: 3em; */
}

.loop-numbering-controls {
  align-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4em;
}

.loop-numbering-controls > .controlButton:nth-child(2) {
  margin-left: 1em;
}
</style>

<template>
  <div class="loop-grip-numbering-container">
    <div class="loop-grip-numbers-container" id="loop-numbering-display">
      <div class="loop-numbers-wrapper-container">
        <div
          class="loop-number-item"
          v-for="(id, index) in loopState.order"
          :key="`${id}-${index}`"
          :class="{ 'selected-number': id === loopState.selectedGrip }"
          :id="`loop-number-item-${id}`"
          @click="() => setSelectedGrip(id)"
        >
          {{ index + 1 }}
        </div>
      </div>
    </div>
    <div class="loop-numbering-controls">
      <control-button
        :disabled="!isLoopOrderEmpty"
        :handle-click="undo"
        icon-class-name="mdi-arrow-u-left-top"
      ></control-button>
      <control-button
        :disabled="!isLoopOrderEmpty"
        :handle-click="clearOrder"
        icon-class-name="mdi-trash-can-outline"
      ></control-button>
    </div>
  </div>
</template>
