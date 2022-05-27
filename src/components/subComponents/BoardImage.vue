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
      this.ctx.strokeStyle = "#0f0";
      this.ctx.lineWidth = 5;
      this.ctx.fillStyle = "#000";
      const testPath =
        "M 376.73 40.11 A 112.26 112.26 0 0 1 410 79.77 c 2.32 1.18 2.2 3.16 1.74 5.26 c 1.06 8.75 3.16 17.54 2.92 26.25 a 77.08 77.08 0 0 1 -10.38 37.06 c -12.66 21.72 -31.7 34.15 -56 39.13 c -1.45 1.67 -3.73 0.59 -5.37 1.62 h 0 c -9.41 -0.47 -18.85 0.59 -28.27 -1.08 c -17.68 -3.14 -32.76 -11.31 -46.19 -22.89 c -19.41 -15.22 -29.32 -36 -33.81 -59.54 c -2.12 -11.12 6.26 -24.94 16.7 -29.7 c 8.35 -3.8 16.55 -8 25.78 -9.34 a 6.36 6.36 0 0 0 4 -1.84 c 5.66 -6.72 13.06 -8.65 21.47 -8.37 c 4.32 0.15 7.26 -2.38 9.06 -6.09 A 59.39 59.39 0 0 0 316 39.58 c 0.77 -3 2.32 -6.56 5.11 -6.76 c 8.08 -0.57 15.14 -7.25 23.78 -3.85 a 60.88 60.88 0 0 1 23.85 7.73 A 65.63 65.63 0 0 0 376.73 40.11 Z";
      const testPath2 =
        "M 1078 1379 c 12.62 0.79 25.35 0.76 37.81 2.6 c 12.81 1.88 25.21 0.18 37.77 -1.09 c 11.25 -1.14 22.49 -2.29 33.75 -3.21 a 127.53 127.53 0 0 0 13.87 -1.51 c 12.79 -2.46 25.54 0.33 37.49 3.6 c 21.67 5.93 43 3.67 64.39 0.68 c 23.79 -3.32 47.59 -5.39 71.61 -5 a 63.38 63.38 0 0 1 26.15 5.64 c 9.12 4.24 16 10 18.73 20.52 c 1.88 7.17 7.34 13.28 6.07 21.53 c -0.59 3.84 1.53 7.68 0 11.79 c -5.76 15.76 -8.61 32.75 -22.56 44.59 c -10.3 8.73 -21.66 12.63 -34.94 11.4 c -12.56 -1.15 -25.16 -1.35 -37.61 -4.34 c -8.48 -2 -17.26 0.74 -25.58 3 c -14.69 3.93 -29.42 3.61 -44.5 3.42 c -33.93 -0.43 -67.8 -4.59 -101.71 -2.65 c -11.81 0.68 -23.47 4.14 -35.54 3.87 c -11.31 -0.26 -22.59 0 -33.87 -1.6 c -8.9 -1.24 -17.9 -0.54 -26.88 0.63 c -12.6 1.63 -25.21 2.38 -37.09 -4 c -14.15 -7.56 -21.76 -18.92 -22 -35.21 c -0.16 -11 1 -22 -1.65 -32.83 c -1.11 -4.58 1.14 -8.39 4.39 -11.62 a 166.89 166.89 0 0 1 24.63 -20.27 c 11.33 -7.59 24.25 -8.64 37.24 -9.54 c 3.31 -0.23 6.65 0 10 0 Z";
      const testPath3 =
        "M 1168.28 231.11 c -34.78 -1.28 -61.26 -33 -59.37 -65.31 c 1 -17.58 -1.05 -35.3 2.35 -52.78 c 1.08 -5.54 2.11 -11.1 3.27 -16.63 a 19.12 19.12 0 0 1 5 -9.63 c 6.32 -6.51 9.12 -14.53 9.87 -23.42 a 58.93 58.93 0 0 1 5.75 -20 a 16.8 16.8 0 0 1 7.12 -8.13 c 3.58 -1.91 7.09 -1.75 10.13 1.12 s 5 6.81 2.38 9.8 c -7.11 8.23 -1.59 15.21 0.5 23.06 c 4.67 17.54 14.28 27.72 32.68 33.2 c 15.66 4.66 31.29 11 46.51 17.66 a 31.74 31.74 0 0 0 5.68 1.87 c 17.79 4 35.57 8 53.39 11.89 c 3 0.64 5.74 1.32 8.25 3.18 a 65.59 65.59 0 0 0 16.82 8.62 a 24.9 24.9 0 0 1 5.37 2.6 c 8.61 5.78 9.35 12 2.45 19.86 c -3.35 3.81 -7.13 7.56 -12.06 8.53 c -11.81 2.33 -20.92 10 -31.3 15.05 c -23.94 11.67 -48.29 22.37 -73.14 31.91 c -5.25 2 -9.92 5.66 -15.75 6.06 C 1185.84 230.15 1177.54 230.57 1168.28 231.11 Z";
      const testPath4 =
        "M 861.76 1258.65 c -7.19 5.37 -15 9.93 -21.15 16.62 a 7.93 7.93 0 0 1 -3.34 2.14 c -17.53 5.37 -31.6 17.12 -46.84 26.4 c -26.41 16.06 -53.72 18 -82.66 11 a 209.39 209.39 0 0 1 -31.32 -10.2 a 62.76 62.76 0 0 1 -20.1 -12.81 c -2 -2 -3.8 -3 -5.82 -3 l 8.13 -18.86 c 5.49 1.2 10.69 -0.45 16.9 -3.36 c 14.17 -6.63 29.9 -10.43 45.09 -12.37 c 21.12 -2.68 42 -7.23 63.2 -9 c 18.57 -1.56 36.72 -6.36 55.5 -6.52 a 53.14 53.14 0 0 1 20.38 4 C 868.27 1246.16 869.12 1253.16 861.76 1258.65 Z";
      const testPath5 =
        "M 2307.71 1951 c -5.76 -0.55 -13.28 -5.14 -21.31 -8 c -3.74 -1.33 -5.37 -5.76 -6.78 -9.55 a 67 67 0 0 0 -7.43 -13.91 c -6.86 -10.32 -8.61 -22.3 -6.87 -34.51 c 0.84 -5.92 4.86 -6.7 11.52 -4.31 c 11.94 4.27 23.35 10.34 36.23 11.58 c 6 0.57 12 0.65 17.95 1.06 c 10.66 0.74 20.43 5.62 31.25 6.2 c 6.49 0.35 9.9 9.44 5.86 16.1 c -4.39 7.22 -7.77 15.62 -16.56 19.38 c -3 1.28 -5.59 3.59 -8.28 5.55 C 2332.68 1948.24 2323.66 1951.16 2307.71 1951 Z";
      // this.parsePath(testPath);
      this.drawPath(this.scalePath(testPath));
      this.drawPath(this.scalePath(testPath2));
      this.drawPath(this.scalePath(testPath3));
      this.drawPath(this.scalePath(testPath4));
      this.drawPath(this.scalePath(testPath5));

      console.log("canvas set");
    },
    drawPath(path) {
      const p = new Path2D(path);
      this.ctx.stroke(p);
    },
    scalePath(path) {
      const scaleNum =
        this.ownCanvasSize.width / BOARD_CONFIG.imageResolution.width;
      const output = path.replace(/\d+(\.\d+)?/g, (strNum) => {
        const num = Number(strNum);
        if (num === 1 || num === 0) return strNum;
        let scaledNum = String(num * scaleNum);
        return scaledNum.replace(/(\d\.\d\d)\d*/, "$1");
      });
      console.log(output);
      return output;
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
