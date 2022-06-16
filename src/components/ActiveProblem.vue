<template>
  <div id="active-container" class="container">
    <div id="board-style" class="width-100 flex-container-blank">
      <board board-id="board-AcP"></board>
    </div>
  </div>
</template>

<script>
module.exports = {
  components: {
    board: httpVueLoader("components/Board/Board.vue")
  },
  data() {
    return {
      BOARD_CONFIG,
      scaleBoard: {}
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
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
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
