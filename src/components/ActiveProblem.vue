<template>
  <div id="active-container" class="container">
    <div class="active-problem-top-container">
      <button class="back-to-load-problem-btn" @click="goToLoadProblem">
        <i class="mdi mdi-arrow-left"></i>
        <!-- <p class="back-to-load-problem-btn-text">powrót</p> -->
      </button>
    </div>
    <div id="board-style" class="width-100 flex-container-blank">
      <board board-id="board-AcP"></board>
    </div>
    <comment-display :comment-value="activeProblem.comment"></comment-display>
    <div class="active-problem-bottom-container">
      <board-legend></board-legend>
    </div>
  </div>
</template>

<script>
module.exports = {
  components: {
    board: httpVueLoader("components/Board/Board.vue"),
    "board-legend": httpVueLoader("components/subComponents/BoardLegend.vue"),
    "comment-display": httpVueLoader(
      "components/subComponents/CommentDisplay.vue"
    )
  },
  data() {
    return {
      BOARD_CONFIG,
      ACTIVE_PROBLEM,
      LOAD_PROBLEM,
      scaleBoard: {},
      isCommentModalOpen: false
    };
  },
  mounted() {
    // uibuilder.send({
    //   topic: "saveState",
    //   payload: JSON.stringify(this.activeProblem)
    // });
    // sendProblem(this.activeProblem);
  },
  computed: {
    activeProblem() {
      return this.$store.getters.getActiveProblem;
    },
    zoom() {
      return this.$store.getters.getZoom(ACTIVE_PROBLEM);
    },
    zoomScale() {
      return this.$store.getters.getZoomScale(ACTIVE_PROBLEM);
    }
  },
  methods: {
    goToLoadProblem() {
      this.$store.commit("selectScne", LOAD_PROBLEM);
    }
  }
};
</script>

<style scoped type="text/css">
.active-problem-top-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-inline: 1em;
}
.back-to-load-problem-btn {
  width: fit-content;
  height: fit-content;
  background: transparent;
  border-radius: 5px;
  padding: 0;
}

/* remove this class after removing text button */
.back-to-load-problem-btn-text {
  color: white;
  background: black;
  padding: 1em 0.5em;
  margin: 0 !important;
  border-radius: 5px;
}

.back-to-load-problem-btn i {
  font-size: 2em;
  color: black;
}
.container {
  display: flex;
  flex-direction: column;
  padding-top: 60px;
  height: 100%;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
}
.board-position {
  width: 100vw !important;
  display: flex;
  justify-content: center;
  align-items: center;
}

.width-100 {
  width: 100%;
  height: 100%;
  justify-content: center;
  padding: 1em;
}
</style>
