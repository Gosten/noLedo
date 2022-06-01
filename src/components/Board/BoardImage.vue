<template>
  <div class="background-image-container">
    <canvas
      v-if="isCanvasSet"
      id="board-canvas"
      class="selection-canvas"
      :width="ownCanvasSize.width"
      :height="ownCanvasSize.height"
    ></canvas>
    <p class="temp" v-if="tempCondition()">WERSJA TYMCZASOWA</p>
    <img
      class="board-background-image"
      src="images/board-background.svg"
      alt="background-image"
    />
  </div>
</template>

<script>
module.exports = {
  methods: {
    tempCondition() {
      return (
        this.isScene(ADD_PROBLEM) ||
        this.isScene(ACTIVE_PROBLEM) ||
        this.isScene(EDIT_PROBLEM)
      );
    },
    isScene(sceneType) {
      return this.$store.getters.getActiveScene === sceneType;
    }
  },
  data() {
    return {
      ACTIVE_PROBLEM,
      BOARD_CONFIG,
      ownCanvasSize: {
        width: 0,
        height: 0
      },
      isCanvasSet: false,
      firstUpdate: true,
      ctx: null
    };
  },
  computed: {}
};
</script>

<style scoped>
.background-image-container {
  position: absolute;
  width: var(--scroll-container-width);
  height: var(--scroll-container-height);
  padding: var(--board-image-padding);
}
.board-background-image {
  width: 100%;
  transform: translate(var(--board-image-left), var(--board-image-top));
}

.selection-canvas {
  position: absolute;
  left: var(--board-image-padding);
  top: var(--board-image-padding);
  transform: translate(var(--board-image-left), var(--board-image-top));
}

.temp {
  position: absolute;
  width: var(--scroll-container-width);
  left: 0;
  display: block;
  text-align: center;
  color: grey;
  top: -2.5em;
}
</style>
