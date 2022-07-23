<template>
  <div v-if="ENABLE_ZOOM" class="zoom-container flex-container-blank">
    <button
      v-if="zoom.active"
      class="zoom-btn button"
      @click="dispatchZoomAction(ZOOM_TOGGLE)"
    >
      Powrót
    </button>
    <div class="zoom" @click="dispatchZoomAction(ZOOM_OUT)">
      <img v-if="zoom.active" src="images/zoomOut.svg" alt="zoomOut" />
    </div>
    <div
      class="zoom"
      :class="{
        'disable-zoomIn': isMaxZoom(),
        'zoom-icon-black': !zoom.active
      }"
      @click="!isMaxZoom() && dispatchZoomAction(ZOOM_IN)"
    >
      <img src="images/zoomIn.svg" alt="zoomIn" />
    </div>
  </div>
</template>

<script>
module.exports = {
  mounted() {
    this.setZoomScale(this.zoom.scale);
  },
  data() {
    return {
      boardZoom: false,
      ENABLE_ZOOM,
      ZOOM_IN: "zoomIn",
      ZOOM_OUT: "zoomOut",
      ZOOM_TOGGLE: "toggleZoom",
      zoomScale: {
        "--zoom": 2
      }
    };
  },
  computed: {
    zoom() {
      return this.$store.getters.getZoom(this.scene);
    }
  },
  methods: {
    isMaxZoom() {
      const { active, scale, max } = this.zoom;
      return active && scale === max;
    },
    setZoomScale(scale) {
      this.zoomScale["--zoom"] = scale;
    },
    dispatchZoomAction(action) {
      this.$store.commit(action, this.scene);
      this.setZoomScale(this.zoom.scale);
    }
  },
  props: {
    scene: String
  }
};
</script>

<style scoped>
.zoom-container {
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  padding: 1em;
  flex-direction: row;
  height: 4em;
}

.zoom-icon-black {
  background-color: black;
  border-radius: 5px;
}

.zoom-icon-black img {
  filter: invert(1);
}

.zoom-btn {
  margin: 0;
  width: fit-content;
}

.zoom {
  width: 35px;
  height: 35px;
  /* border: 2px solid black; */
  border-radius: 5px;
  z-index: 10;
  padding: 3px;
  margin-left: 10px;
}

.zoom img {
  width: 100%;
  height: 100%;
}

.disable-zoomIn {
  opacity: 0.5;
}
</style>
