<template>
  <div class="slider-container">
    <input type="text" id="slider3" class="slider" />
  </div>
</template>

<script>
module.exports = {
  data() {
    return {
      GRADES,
      doubleSliderInstance,
      setInstance
    };
  },
  mounted() {
    console.log(doubleSliderInstance);
    if (!this.doubleSliderInstance) {
      this.doubleSliderInstance = new rSlider({
        target: "#slider3",
        values: { min: 0, max: this.GRADES.length - 1 },
        step: 1,
        range: true,
        scale: true,
        labels: false,
        onChange: function (vals) {
          [x, from, to] = vals.match(/(\d+),(\d+)/);
          store.commit("setFilterSlider", [from, to]);
        }
      });
      //this.setInstance(this.doubleSliderInstance)
    }
  },
  computed: {
    filterGrades() {
      return this.$store.getters.getFilterSlider;
    }
  },
  beforeUnmount() {
    this.doubleSliderInstance.destroy();
  }
};
</script>

<style scoped type="text/css">
.slider-container {
  width: 90%;
  margin: 2em 1em 0 1em;
}

.rs-container .rs-scale span:last-child {
  position: absolute;
  right: 0;
}
</style>
