<template>
  <div id="popup-container" class="popup-container">
    <div class="popup-window countdown-modal">
      <p>{{ countdownCount }}</p>
    </div>
  </div>
</template>

<script>
module.exports = {
  props: {
    hideModal: Function,
    countdownTimeSeconds: Number
  },
  data() {
    return {
      countdownCount: 0
    };
  },
  methods: {
    startCountdown() {
      let localCount = this.countdownTimeSeconds;
      localCount--;
      this.countdownCount = localCount;
      const countDownInterval = setInterval(() => {
        localCount--;
        if (localCount > 0) {
          this.countdownCount = localCount;
        } else {
          clearInterval(countDownInterval);
          this.hideModal();
        }
      }, 1000);
    }
  },
  mounted() {
    this.startCountdown();
  }
};
</script>

<style scoped type="text/css">
.countdown-modal {
  overflow: hidden;
  height: 2em;
  width: 2.5em;
  font-size: 5em;
}
</style>
