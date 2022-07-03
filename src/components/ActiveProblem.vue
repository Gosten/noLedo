<template>
  <div id="active-container" class="container">
    <zoom-component :scene="ACTIVE_PROBLEM"></zoom-component>
    <div
      id="board-style"
      class="width-100 flex-container-blank"
      :class="{ 'board-zoom': zoom.active }"
      :style="zoomScale"
    >
      <board board-id="board-AcP"></board>
    </div>
    <comment-display
      :comment-value="activeProblem.comment"
      :show-modal="showCommentModal"
    ></comment-display>
    <div class="active-problem-bottom-container">
      <board-legend></board-legend>
    </div>
    <transition name="fade">
      <comment-modal
        v-if="isCommentModalOpen"
        :hide-modal="hideCommentModal"
        :comment="activeProblem.comment"
      ></comment-modal>
    </transition>
  </div>
</template>

<script>
module.exports = {
  components: {
    board: httpVueLoader("components/Board/Board.vue"),
    "board-legend": httpVueLoader("components/subComponents/BoardLegend.vue"),
    "zoom-component": httpVueLoader(
      "components/subComponents/ZoomComponent.vue"
    ),
    "comment-display": httpVueLoader(
      "components/subComponents/CommentDisplay.vue"
    ),
    "comment-modal": httpVueLoader("components/subComponents/CommentModal.vue")
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
  },
  methods: {
    hideCommentModal() {
      this.isCommentModalOpen = false;
    },
    showCommentModal() {
      this.isCommentModalOpen = true;
    }
  }
};
</script>

<style scoped>
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
