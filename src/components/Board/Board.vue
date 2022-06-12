<template>
  <div
    :id="boardId"
    class="board-container"
    :style="{ ...boardVariables }"
    :class="{
      'more-cols': moreCols,
      'more-rows': moreRows,
      'even-size': evenSize
    }"
  >
    <div class="scroll-container">
      <div class="zoom-target">
        <board-image v-if="sizeSet"></board-image>
        <interactive-layer
          v-if="sizeSet"
          :handle-click="handleClick"
          :get-display-problem="getDisplayProblem"
          :selected-problem="selectedProblem"
          :active-problem="activeProblem"
          :problem-state="problemState"
          :edited-problem="editedProblem"
        >
        </interactive-layer>
      </div>
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
      messages.forEach((msg) => uibuilder.send(msg));
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
    handleBoardResize(reset = false) {
      const { offsetWidth: width, offsetHeight: height } = this.boardHandle;
      let { columns, rows } = this.BOARD_CONFIG;
      if (ENABLE_BOARD_DESCRIPTION) {
        columns += 2;
        rows += 2;
      }

      const condition = width / columns < height / rows;

      const minSize = condition ? width : height;

      let gripContSize = minSize / (condition ? columns : rows);

      // make gripContSize even number
      const getEvenNumber = (n) => n - (n % 2);
      gripContSize = getEvenNumber(gripContSize);

      const getFracSize = (baseSize) =>
        getEvenNumber(Math.floor((baseSize * gripContSize) / 100));

      const gripSize = getFracSize(BOARD_CONFIG.gripSize);

      const emptyGripSize = getFracSize(BOARD_CONFIG.emptyGripSize);
      const gripSelectionSize = getFracSize(BOARD_CONFIG.gripSelectionSize);
      const gripSelectionBorder =
        (BOARD_CONFIG.gripSelectionBorder * gripContSize) / 100;

      // hide board when grip size is samller than 3px
      let opacity = "1";
      // if (gripSize < 3) opacity = "0";

      // console.log({ width, height, minSize, gripContSize });

      // Board image offset
      const boardImgTop = getFracSize(BOARD_CONFIG.boardImgTop);
      const boardImgLeft = getFracSize(BOARD_CONFIG.boardImgLeft);
      const boardImgPadding = ENABLE_BOARD_DESCRIPTION ? gripContSize : 0;

      const scrollContainerWidth = gripContSize * columns;
      const scrollContainerHeight = gripContSize * rows;
      const canvasWidth = scrollContainerWidth - 2 * boardImgPadding;
      const canvasHeight = scrollContainerHeight - 2 * boardImgPadding;

      this.canvasSize = {
        width: canvasWidth,
        height: canvasHeight
      };

      const fontSize = getFracSize(BOARD_CONFIG.descriptionFontSize);
      this.boardVariables = {
        opacity,
        "--board-width": `calc(${width}px - 2em)`,
        "--board-height": `${height}px`,
        "--min-size": `${minSize}px`,
        "--grip-cont-size": `${gripContSize}px`,
        "--grip-size": `${gripSize}px`,
        "--empty-grip-size": `${emptyGripSize}px`,
        "--grip-selection-size": `${gripSelectionSize}px`,
        "--grip-selection-border": `${gripSelectionBorder}px`,
        "--scroll-container-width": `${scrollContainerWidth}px`,
        "--scroll-container-height": `${scrollContainerHeight}px`,
        "--columns": columns,
        "--rows": rows,
        "--grid-container-width": columns > rows ? "100%" : "auto",
        "--grid-container-height": columns > rows ? "auto" : "100%",
        "--description-font-size": `${fontSize}px`,
        "--board-image-top": `${boardImgTop}px`,
        "--board-image-left": `${boardImgLeft}px`,
        "--board-image-padding": `${boardImgPadding}px`
      };
      this.setSizeChanged(!reset);
    },
    setSizeChanged(state) {
      this.sizeSet = state;
      this.$emit("resize", state);
    },
    handleAppResize() {
      //reset board size
      this.setSizeChanged(false);

      //app resize without board resize
      setTimeout(() => {
        if (!this.sizeSet) this.setSizeChanged(true);
      }, 10);
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
    // describedBoard() {
    //   const tempBoard = [...BOARD_CONFIG.gripPositions]
    //     .map((color, index) => ({ color, index }))
    //     .filter(({ index }) => this.isSuppressed(index));
    //   if (!ENABLE_BOARD_DESCRIPTION) return [...tempBoard];
    //   const { rows, columns } = BOARD_CONFIG;

    //   let describedBoard = Array(rows)
    //     .fill(undefined)
    //     .map((x) => Array(columns).fill(undefined));
    //   for (let row = 0; row < rows; row++) {
    //     for (let col = 0; col < columns; col++) {
    //       const index = row * columns + col;
    //       // console.log(tempBoard[index]);
    //       // console.log(describedBoard[row][col]);
    //       describedBoard[row][col] = tempBoard[index];
    //       // console.table(describedBoard);
    //     }
    //   }
    //   // console.log(describedBoard);
    //   //   Add row labels
    //   describedBoard = describedBoard.map((row, index) => {
    //     // const rowLabel = rows - index;
    //     const ascii = rows - 1 - index;
    //     const rowLabel = String.fromCharCode(65 + ascii);
    //     // return [rowLabel, ...row, rowLabel];
    //     return [rowLabel, ...row, rowLabel];
    //   });

    //   // let colsLabel = new Array(columns).fill(undefined).map((x, index) => String.fromCharCode(65 + index));
    //   let colsLabel = new Array(columns)
    //     .fill(undefined)
    //     .map((x, index) => index + 1);
    //   colsLabel = [undefined, ...colsLabel, undefined];
    //   describedBoard = [colsLabel, ...describedBoard, colsLabel];
    //   const output = [];
    //   describedBoard.forEach((row) => row.forEach((elem) => output.push(elem)));
    //   return output;
    // }
  },
  data() {
    return {
      ACTIVE_PROBLEM,
      BOARD_CONFIG,
      ENABLE_BOARD_DESCRIPTION,
      boardSize: {},
      moreRows: BOARD_CONFIG.columns < BOARD_CONFIG.rows,
      moreCols: BOARD_CONFIG.columns > BOARD_CONFIG.rows,
      evenSize: BOARD_CONFIG.columns === BOARD_CONFIG.rows,
      sizeSet: false,
      boardHandle: undefined,
      appHandle: undefined,
      resizeObserver: undefined,
      appResizeObserver: undefined,
      firstUpdate: true,
      boardVariables: {},
      canvasSize: null
    };
  },
  props: {
    boardId: String
  },
  mounted() {
    this.resizeObserver = new ResizeObserver(() => this.handleBoardResize());
    this.boardHandle = document.getElementById(this.boardId);
    this.resizeObserver.observe(this.boardHandle);
    window.addEventListener("resize", this.handleAppResize);
  },
  updated() {
    if (this.firstUpdate) {
      this.handleAppResize();
      //console.log('first update');
      this.firstUpdate = false;
    }
  },
  created() {},
  destroyed() {
    this.resizeObserver.unobserve(this.boardHandle);

    window.removeEventListener("resize", this.handleAppResize);
  },
  components: {
    "board-image": httpVueLoader("components/Board/BoardImage.vue"),
    "interactive-layer": httpVueLoader("components/Board/InteractiveLayer.vue")
  }
};
</script>

<style scoped>
@import "../../css/Board.css";
@import "../../css/app_config.css";

.grip-container {
  height: var(--grip-cont-size);
  width: var(--grip-cont-size);
}

.even-size .board-grid-container {
  justify-content: center;
  align-items: center;
  grid-template-columns: repeat(
    var(--columns),
    calc(var(--min-size) / var(--rows))
  );
  grid-template-rows: repeat(
    var(--columns),
    calc(var(--min-size) / var(--rows))
  );
}

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
  transform: translate(var(--board-image-left), var(--board-image-top));
}

.grip {
  background: transparent !important;
  font-size: 0.7em;
}

.grip-container {
  box-sizing: border-box;
  border: 1px solid green;
}
</style>
