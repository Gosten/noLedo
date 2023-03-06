<script>
module.exports = {
  data() {
    return {
      fade: true
    };
  },
  mounted() {
    setTimeout(() => (this.fade = false), 3100);
    setTimeout(() => this.$store.commit("toggleIntro"), 3900);
    const introIds = ["_1_L", "_2_E", "_3_D", "_4_WALLS", "_5_O"];
    const introIntervals = {
      [introIds[0]]: 100,
      [introIds[1]]: 600,
      [introIds[2]]: 1100,
      [introIds[3]]: 1600,
      [introIds[4]]: 2000
    };
    introIds.forEach((id) => {
      const handle = document.getElementById(id);
      setTimeout(() => {
        handle.style.opacity = 1;
      }, introIntervals[id]);
    });
  }
};
</script>

<style scoped type="text/css">
#intro-scene {
  background: black;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 200;
  width: 100vw;
  height: 100vh;
  font-family: "Russo One", sans-serif;
}
.intro-container {
  font-size: 1.5em;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.green {
  color: hsl(125, 100%, 50%);
}
.intro-enter-active {
  transition: opacity 0s;
}
.intro-leave-active {
  transition: opacity 0.5s;
}
.intro-enter, .intro-leave-to /* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.intro-initial {
  opacity: 0;
}
#splash-svg {
  width: 80%;
}

#_1_L,
#_2_E,
#_3_D,
#_4_WALLS {
  transition: opacity ease-in-out 0.4s;
}

#_5_O {
  transition: opacity ease-in 0.8s;
}

#splash-svg .splash-white,
#splash-svg .splash-text {
  fill: #fff;
}

#splash-svg .splash-o {
  fill: #44ad4d;
}

#splash-svg .splash-text {
  font-size: 45.25px;
  font-family: Impact;
  letter-spacing: 0.01em;
}

#splash-svg .splash-text1 {
  letter-spacing: 0.03em;
}

#splash-svg .splash-text2 {
  letter-spacing: 0.02em;
}

#splash-svg .splash-text3 {
  letter-spacing: 0.03em;
}

#splash-svg .splash-text4 {
  letter-spacing: 0.02em;
}
</style>

<template>
  <div id="intro-scene">
    <div class="intro-container">
      <transition name="intro">
        <!-- <img class="splash-img" src="./images/LW_logo.svg" alt="" /> -->
        <!-- <img v-if="fade" class="splash-img" src="./images/LW_logo.png" alt="" /> -->
        <!-- <img
          v-if="fade"
          class="splash-img"
          src="./images/LW_logo_gif.gif"
          alt=""
        /> -->
        <svg v-if="fade" id="splash-svg" viewBox="0 0 594.75 296.84">
          <path
            id="_1_L"
            data-name="1_L"
            class="splash-white intro-initial"
            d="M153.07,207,37.1,24.08a9,9,0,0,0-16.54,4.8V211.81a9,9,0,0,0,9,9h116A9,9,0,0,0,153.07,207Z"
          />
          <g id="_2_E" class="intro-initial" data-name="2_E">
            <rect
              class="splash-white"
              x="202.15"
              y="18"
              width="141.24"
              height="42.34"
              rx="8.97"
            />
            <rect
              class="splash-white"
              x="202.15"
              y="178.43"
              width="141.24"
              height="42.34"
              rx="8.97"
            />
            <rect
              class="splash-white"
              x="202.15"
              y="97.72"
              width="100.89"
              height="42.34"
              rx="8.97"
            />
          </g>
          <rect
            id="_5_O"
            data-name="5_O"
            class="splash-o intro-initial"
            x="432.97"
            y="78.38"
            width="141.41"
            height="141.41"
            rx="70.7"
            transform="translate(652.76 -354.59) rotate(90)"
          />
          <path
            id="_3_D"
            data-name="3_D"
            class="splash-white intro-initial"
            d="M534.18,120.58c0,47.35-47.33,87-111,97.53A204.54,204.54,0,0,1,395,220.77h0a5,5,0,0,1-5-5V25.32a5,5,0,0,1,5-4.95h0A204.56,204.56,0,0,1,423.18,23C486.85,33.53,534.18,73.21,534.18,120.58Z"
          />
          <text
            id="_4_WALLS"
            data-name="4_WALLS"
            class="splash-text intro-initial"
            transform="translate(390.04 277) scale(1.14 1)"
          >
            W
            <tspan class="splash-text1" x="37.21" y="0">A</tspan>
            <tspan class="splash-text2" x="61.52" y="0">L</tspan>
            <tspan class="splash-text3" x="79.71" y="0">L</tspan>
            <tspan class="splash-text4" x="98.12" y="0">S</tspan>
          </text>
        </svg>
      </transition>
    </div>
  </div>
</template>
