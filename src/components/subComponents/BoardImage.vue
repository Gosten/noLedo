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
    },
    getScaledPosition(position) {},
    setupCanvas() {
      const canvas = document.getElementById("board-canvas");
      this.ctx = canvas.getContext("2d");
      this.ctx.strokeStyle = "#000";
      this.ctx.lineWidth = 2;
      this.ctx.fillStyle = "#000";
      const testPath =
        "M 376.73 40.11 A 112.26 112.26 0 0 1 410 79.77 c 2.32 1.18 2.2 3.16 1.74 5.26 c 1.06 8.75 3.16 17.54 2.92 26.25 a 77.08 77.08 0 0 1 -10.38 37.06 c -12.66 21.72 -31.7 34.15 -56 39.13 c -1.45 1.67 -3.73 0.59 -5.37 1.62 h 0 c -9.41 -0.47 -18.85 0.59 -28.27 -1.08 c -17.68 -3.14 -32.76 -11.31 -46.19 -22.89 c -19.41 -15.22 -29.32 -36 -33.81 -59.54 c -2.12 -11.12 6.26 -24.94 16.7 -29.7 c 8.35 -3.8 16.55 -8 25.78 -9.34 a 6.36 6.36 0 0 0 4 -1.84 c 5.66 -6.72 13.06 -8.65 21.47 -8.37 c 4.32 0.15 7.26 -2.38 9.06 -6.09 A 59.39 59.39 0 0 0 316 39.58 c 0.77 -3 2.32 -6.56 5.11 -6.76 c 8.08 -0.57 15.14 -7.25 23.78 -3.85 a 60.88 60.88 0 0 1 23.85 7.73 A 65.63 65.63 0 0 0 376.73 40.11 Z";
      // this.parsePath(testPath);
      // drawPath();
      console.log("canvas set");
    },
    drawPath(path) {
      const p = new Path2D(path);
      this.ctx.stroke(p);
    },
    parsePath(path) {
      let output = path.toLowerCase();
      console.log(output);
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
  computed: {},
  props: {
    canvasSize: Object
  },
  mounted() {
    const getScaledHeight = (scaledWidth) => {
      const scale = scaledWidth / BOARD_CONFIG.imageResolution.width;
      return BOARD_CONFIG.imageResolution.height * scale;
    };
    if (this.canvasSize)
      this.ownCanvasSize = {
        width: this.canvasSize.width,
        height: getScaledHeight(this.canvasSize.width)
      };
    this.isCanvasSet = true;
    console.log({ cs: this.ownCanvasSize });
  },
  updated() {
    if (this.firstUpdate) {
      this.setupCanvas();
      //console.log('first update');
      this.firstUpdate = false;
    }
  }
};
</script>

<style scoped>
.background-image-container {
  position: relative;
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
