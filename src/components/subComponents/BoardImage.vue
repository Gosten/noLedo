<template>
  <div class="background-image-container">
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
  computed: {
    data() {
      return {
        ACTIVE_PROBLEM,
        BOARD_CONFIG
      };
    }
  },
  props: {}
};
</script>

<style scoped>
@import "../css/Board.css";
@import "../css/app_config.css";

.background-image-container {
  position: relative;
  width: var(--scroll-container-width);
  height: var(--scroll-container-height);
  padding: var(--grip-cont-size);
}
.board-background-image {
  width: 100%;
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
