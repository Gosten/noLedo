<script>
module.exports = {
  data() {
    return {
      loopState: {
        order: [],
        selectedGrip: "",
      },
    };
  },
  methods: {
    handleGripClick(id) {
      isGripSelected = Boolean(this.problemState[id]);
      if (!isGripSelected) return;

      this.loopState.selectedGrip = id;
      if (!this.loopState.order.includes(id)) {
        this.loopState.order.push(id);
      }
    },
    undo() {
      if (Boolean(this.loopState.order.length)) {
        const removed = this.loopState.order.pop();
        if (removed === this.loopState.selectedGrip) {
          this.loopState.selectedGrip = "";
        }
      }
    },
    clearOrder() {
      if (Boolean(this.loopState.order.length)) {
        this.loopState.order = [];
        this.loopState.selectedGrip = "";
      }
    },
    handleSubmit() {
      this.setLoopState(this.loopState.order);
      this.close();
    },
  },
  computed: {
    problemState() {
      return this.$store.getters.getAddProblemState;
    },
  },
  props: {
    setLoopState: Function,
    close: Function,
    initialOrder: Array,
  },
  mounted() {
    const initialOrder = this.initialOrder || [];
    this.loopState.order = initialOrder;

    const problemKeys = Object.keys(this.problemState);

    const selectedGrips = problemKeys.filter((key) => this.problemState[key]);

    this.startTopKeys = problemKeys.filter(
      (key) => this.problemState[key] === 2
    );

    const loopLength = selectedGrips.length;
    this.$store.commit("setAddProblemLoopLength", loopLength);

    // If there is only one startTopKey, assing first number to this grip.
    if (this.startTopKeys.length === 1) {
      setTimeout(() => this.handleGripClick(this.startTopKeys[0]), 300);
    }
  },
  components: {
    board: httpVueLoader("../Board/Board.vue"),
    "loop-number-display": httpVueLoader("./LoopGripNumbering.vue"),
  },
  computed: {
    problemState() {
      return this.$store.getters.getAddProblemState;
    },
  },
};
</script>

<style scoped type="text/css">
.add-problem-modal {
  height: calc(var(--window-height) - 2em - 60px);
  width: 100%;
  margin-block: calc(1em + 60px) 1em;
  margin-inline: 1em;
  padding: 1em;
  flex-direction: column;
}
.board-position-loop-setup {
  width: 100%;
  height: 100%;
}
.loop-modal {
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 4em auto 10em 6em;
  max-width: calc(100vw - 3em);
}
</style>

<template>
  <div id="popup-container" class="popup-container">
    <div class="popup-window add-problem-modal loop-modal">
      <p>Numeracja chwytów</p>
      <div id="board-style-AP" class="board-position-loop-setup">
        <board
          board-id="board-loop-setup"
          alt-pinch-id="loop-pinch"
          :grip-click-callback="handleGripClick"
          :loop-state="loopState"
          show-hide-numbers-button
        ></board>
      </div>
      <loop-number-display
        :loop-state="loopState"
        :set-selected-grip="handleGripClick"
        :undo="undo"
        :clear-order="clearOrder"
      ></loop-number-display>
      <button class="button" @click="handleSubmit">Zatwierdź</button>
      <button class="close-button" @click="close">
        <i class="mdi mdi-close"></i>
      </button>
    </div>
  </div>
</template>
