<script>
module.exports = {
  data() {
    return {
      isPaused: false,
      isStopped: true,
      isLive: false,
      timeIntervalSeconds: 5,
      activeGripsPerStep: 4,
      currentStepGripIndex: null,
      interval: null,
      lastInvervalStepTimestamp: null,
      initialGrips: null,
      activeGrips: [],
      countdownTimeSeconds: LOOP_COUNTDOWN_TIME,
      infinityMode: false,
    };
  },
  methods: {
    handleStart() {
      if (!this.isPaused) {
        this.initializeLoop();
        // this.$store.commit("clearProblemState", gripMap);
        this.initialGrips.forEach((gripId) => {
          this.setGripDiodes(gripId, true);
        });

        this.startCountdown(this.countdownTimeSeconds);
      }

      const startDelay = this.isPaused
        ? this.timeIntervalSeconds
        : this.countdownTimeSeconds;

      setTimeout(() => this.startInterval(true), startDelay * 1000);

      this.isLive = true;
      this.setActiveLoopMode(true);
      this.isPaused = false;
      this.isStopped = false;
    },
    handlePause() {
      this.isLive = false;
      this.isPaused = true;
      this.isStopped = false;

      this.stopInterval();
    },
    handleStop() {
      this.isLive = false;
      this.setActiveLoopMode(false);
      this.isPaused = false;
      this.isStopped = true;

      this.activeGrips = [];
      // sendProblem(this.problem);
    },

    setGripDiodes(gripId, newState) {
      const msg = { topic: "display" };
      const colorState = newState ? this.problem.grips[gripId] : 0;
      const gripDiodes = gripMap[gripId];

      const diodeColorMessages = gripDiodes.map((diodeId) =>
        getDiodeColor(diodeId, colorState)
      );

      msg.payload = diodeColorMessages.join("|");
      // uibuilder.send(msg);
    },

    setNextSetp() {
      let nextIndex = this.currentStepGripIndex + 1;
      let nextGripId = this.problem.loopOrder[nextIndex];
      const nextGrips = [...this.activeGrips];

      // If there is no next grip, loop has come to an end.
      if (!nextGripId) {
        // If infinity mode isn't on, end the loop.
        if (!this.infinityMode) {
          return this.handleLoopEnd();
        }

        // If loop continues, set first index as next index.
        nextIndex = 0;
        nextGripId = this.problem.loopOrder[nextIndex];
      }
      const gripToDisable = nextGrips.shift();
      nextGrips.push(nextGripId);

      this.setGripDiodes(nextGripId, true);
      this.setGripDiodes(gripToDisable, false);

      this.currentStepGripIndex = nextIndex;
      this.activeGrips = nextGrips;
      this.setActiveLoopModeGrips(nextGrips);
    },

    handleLoopEnd() {
      //stop interval
      this.stopInterval();

      this.handleStop();
    },

    startInterval(instantStart = false) {
      instantStart && this.setNextSetp();
      this.interval = setInterval(() => {
        this.setNextSetp();
        this.lastInvervalStepTimestamp = Date.now();
      }, this.timeIntervalSeconds * 1000);
    },
    stopInterval() {
      clearInterval(this.interval);
      this.lastInvervalStepTimestamp = null;
      this.interval = null;
    },
    setInvervalTime(newTime) {
      this.timeIntervalSeconds = newTime;
      this.resetInterval();
    },
    incrementInterval() {
      const newIntervalTime = this.timeIntervalSeconds + 1;
      if (newIntervalTime < 20) {
        this.setInvervalTime(newIntervalTime);
      }
    },
    decrementInterval() {
      const newIntervalTime = this.timeIntervalSeconds - 1;
      if (newIntervalTime > 0) {
        this.setInvervalTime(newIntervalTime);
      }
    },
    initializeLoop() {
      this.setActiveLoopModeGrips(this.initialGrips);
      this.activeGrips = this.initialGrips;
      this.currentStepGripIndex = this.activeGripsPerStep;
    },
    resetInterval() {
      if (this.isLive) {
        this.stopInterval();
        this.startInterval();
      }
    },
  },
  computed: {},
  props: {
    setActiveLoopMode: Function,
    setActiveLoopModeGrips: Function,
    problem: Object,
    startCountdown: Function,
  },
  watch: {},
  updated() {},
  components: {},
  mounted() {
    const { loopOrder } = this.problem;
    this.initialGrips = loopOrder.slice(0, this.activeGripsPerStep);
  },
  components: {},
};
</script>

<style scoped type="text/css">
.control-panel-container {
  width: 100%;
  height: 100%;
  padding: 0 1em;
}
.control-panel-main-buttons-container {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
}
.control-panel-time-control-buttons-container {
  display: grid;
  width: 100%;
  grid-template-columns: 33% 33% 33%;
}
.control-panel-pause-action-buttons-container {
  width: 100%;
  display: flex;
}
.control-panel-pause-action-buttons-container button {
  width: 45%;
  flex-grow: 1;
}
.control-panel-pause-action-buttons-container button:first-child {
  margin-right: 5px;
}
.control-panel-pause-action-buttons-container button:last-child {
  margin-left: 5px;
}

.control-panel-start-button,
.control-panel-pause-button {
  width: 100%;
}

.control-panel-time-interval-display {
  border: 2px solid black;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 37px;
  margin-inline: 10px;
  margin-top: 1em;
  position: relative;
}

.interval-time-label-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2em;
  padding-top: 1em;
}
.infinity-button-container {
  display: grid;
  width: 100%;
  grid-template-columns: 60px auto 60px;
  align-items: center;
}

.toggle-btn {
  display: flex;
  justify-content: center;
  position: relative;
  width: 60px;
  height: 34px;
  background-color: black;
  border-radius: 17px;
  overflow: hidden;
}

.toggle-btn.checked {
  background-color: green;
}

.toggle-btn input[type="checkbox"] {
  display: none;
}

.toggle-circle {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 30px;
  height: 30px;
  background-color: white;
  border-radius: 50%;
  transition: transform 0.2s ease-in-out;
}

.toggle-btn input[type="checkbox"]:checked + .toggle-circle {
  transform: translateX(26px);
}

.infinity-button-container p {
  display: flex;
  justify-content: center;
}
.divider {
  width: 100%;
  height: 3px;
  border-radius: 1.5px;
  background: black;
  margin-block: 20px 5px;
}
</style>

<template>
  <div class="control-panel-container">
    <div class="control-panel-main-buttons-container">
      <button
        v-if="isStopped"
        @click="handleStart"
        class="control-panel-start-button"
      >
        Start
      </button>
      <button
        v-if="isLive"
        @click="handlePause"
        class="control-panel-pause-button"
      >
        Pauza
      </button>
      <div v-if="isPaused" class="control-panel-pause-action-buttons-container">
        <button @click="handleStart" class="control-panel-resume-button">
          Wznów
        </button>
        <button @click="handleStop" class="control-panel-stop-button">
          Przerwij
        </button>
      </div>
    </div>
    <div class="control-panel-time-control-buttons-container">
      <button
        class="control-panel-time-control-button"
        @click="incrementInterval"
      >
        <i class="mdi mdi-plus"></i>
      </button>
      <div class="control-panel-time-interval-display">
        {{ timeIntervalSeconds }}s
      </div>
      <button
        class="control-panel-time-control-button"
        @click="decrementInterval"
      >
        <i class="mdi mdi-minus"></i>
      </button>
    </div>
    <div class="interval-time-label-container">Prędkość obwodu</div>
    <div class="divider"></div>
    <div class="infinity-button-container">
      <label class="toggle-btn" :class="{ checked: infinityMode }">
        <input type="checkbox" v-model="infinityMode" @change="resetInterval" />
        <span class="toggle-circle"></span>
      </label>
      <p>Tryb nieskończonej pętli</p>
    </div>
  </div>
</template>
