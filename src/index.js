"use strict";

let doubleSliderInstance = undefined;
const setInstance = (instance) => (doubleSliderInstance = instance);

function mapGrade(index) {
  return GRADES[index];
}

function getDiodeColor(diodeIndex, colorState) {
  if (!ENABLE_MULTI_TAP) {
    let diodeState = (gripState) => (gripState ? 255 : 0);
    return `${diodeIndex},0,${diodeState(colorState)},0`;
  }
  let diodeColor = [0, 0, 0];
  if (typeof colorState === "number")
    diodeColor = BOARD_CONFIG.multiTapColors[colorState];
  return `${diodeIndex},${diodeColor.join(",")}`;
}

function sendProblem({ grips }) {
  let msg = { topic: "display" };
  const colorMapGroupped = Object.keys(grips).map((key) => ({
    diodes: gripMap[key],
    color: grips[key]
  }));
  const colorMap = {};
  colorMapGroupped.forEach((grip) =>
    grip.diodes.forEach((d) => (colorMap[d] = grip.color))
  );
  msg.payload = Object.keys(colorMap)
    .map((diodeIndex) => getDiodeColor(diodeIndex, colorMap[diodeIndex]))
    .join("|");

  uibuilder.send(msg);
}

const app1 = new Vue({
  el: "#app",

  components: {
    "add-problem": httpVueLoader("components/AddProblem.vue"),
    "load-problem": httpVueLoader("components/LoadProblem.vue"),
    "active-problem": httpVueLoader("components/ActiveProblem.vue"),
    "app-component": httpVueLoader("components/AppComponent.vue"),
    "menu-bar": httpVueLoader("components/Menu.vue")
  },

  computed: {
    isAddProblem() {
      return this.$store.getters.getActiveScene === ADD_PROBLEM;
    },
    isLoadProblem() {
      return this.$store.getters.getActiveScene === LOAD_PROBLEM;
    },
    isActiveProblem() {
      return this.$store.getters.getActiveScene === ACTIVE_PROBLEM;
    }
  },

  methods: {},

  store,
  mounted: function () {
    uibuilder.start();

    var vueApp = this;
    uibuilder.send({ topic: TOPIC.LOAD_STATE });
    uibuilder.send({ topic: TOPIC.LOAD });

    uibuilder.onChange("msg", function (msg) {
      if (msg.topic === TOPIC.LOAD) {
        if (msg.payload.length === 0) {
          store.commit("setProblemList", []);
          return console.warn("EMPTY PROBLEM LIST");
        }
        let newProblemList = JSON.parse(msg.payload);
        console.log("loaded msg: ", newProblemList);
        store.commit("setProblemList", newProblemList);
      }
      if (msg.topic === TOPIC.LOAD_STATE) {
        //ActiveState
        const loadedState = JSON.parse(msg.payload);
        if (loadedState) {
          //console.log(loadedState, Object.entries(loadedState).length);
          store.commit("setActiveProblem", loadedState);
        }
        //console.log('loaded_state: ', loadedState);
      }
    });
  }
});
