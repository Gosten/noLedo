<template>
  <div id="active-container" class="container">
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
      scaleBoard: {},
      isCommentModalOpen: false
    };
  },
  mounted() {
    uibuilder.send({
      topic: "saveState",
      payload: JSON.stringify(this.activeProblem)
    });
    sendProblem(this.activeProblem);
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
  }
};
</script>

<style scoped type="text/css">
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
