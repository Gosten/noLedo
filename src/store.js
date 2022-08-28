function multiClick(gripState, allGrips) {
  if (!ENABLE_MULTI_TAP) return !gripState;
  const lastKey = Object.keys(BOARD_CONFIG.multiTapColors)
    .map((key) => Number(key))
    .pop();
  const currentState = gripState ? gripState : 0;
  let newState = currentState + 1;

  if (newState > lastKey) newState = 0;

  // If there is another top grip, change new state to 0
  // if (newState === lastKey) {
  //   if (Object.values(allGrips).includes(lastKey)) {
  //     newState = 0;
  //   }
  // }

  return newState;
}

const store = new Vuex.Store({
  state: {
    menu: {
      // menuActive: true,
      // activeScene: "",
      menuActive: false,
      activeScene: "LOAD_PROBLEM",
      sceneLoaded: true,
      activeProblem: undefined
    },
    selectedProblem: {},
    editProblem: {
      editedProblem: {},
      newName: "",
      newGrade: "",
      newComment: "",
      deleteModal: false
    },
    addProblem: {
      problemState: {},
      errorState: {
        active: false,
        message: "asdasd"
      },
      addModal: false,
      selectedGrade: 0,
      newProblem: {}
    },
    problemList: [],
    filterSlider: {
      value1: 0,
      value2: 0
    },
    intro: INTRO,
    textInputFocus: false,
    zoomMap: {
      [ADD_PROBLEM]: {
        active: false,
        scale: 2,
        max: 8
      },
      [ACTIVE_PROBLEM]: {
        active: false,
        scale: 2,
        max: 8
      }
    }
  },
  mutations: {
    zoomIn(state, scene) {
      console.log("zoomIn", scene);
      const { scale, max, active } = state.zoomMap[scene];
      if (active && scale < max) state.zoomMap[scene].scale += 2;
      if (!active) state.zoomMap[scene].active = true;
      console.log(state.zoomMap);
    },
    zoomOut(state, scene) {
      console.log("zoomOut");
      const { scale } = state.zoomMap[scene];
      if (scale > 2) state.zoomMap[scene].scale -= 2;
      if (scale === 2) state.zoomMap[scene].active = false;
    },
    toggleZoom({ zoomMap }, scene) {
      console.log("Togglezoom");
      zoomMap[scene].active = !zoomMap[scene].active;
    },
    toggleTextInputFocus(state) {
      state.textInputFocus = !state.textInputFocus;
    },
    selectProblem(state, payload) {
      state.selectedProblem = payload;
    },
    selectScne(state, payload) {
      state.menu.activeScene = payload;
    },
    toggleMenu(state) {
      state.menu.menuActive = !state.menu.menuActive;
    },
    setProblemState(state, { index, value }) {
      state.addProblem.problemState[index] = value;
    },
    toggleProblemState(state, payload) {
      const newState = multiClick(
        state.addProblem.problemState[payload],
        state.addProblem.problemState
      );
      state.addProblem.problemState[payload] = newState;
    },
    clearProblemState(state, payload) {
      const newProblemState = {};
      Object.keys(payload).forEach((key) => (newProblemState[key] = false));
      state.addProblem.problemState = newProblemState;
      sendProblem({ grips: newProblemState });
    },
    setErrorState(state, payload) {
      state.addProblem.errorState = payload;
    },
    setSceneLoaded(state, payload) {
      state.menu.sceneLoaded = payload;
    },
    setProblemList(state, payload) {
      state.problemList = payload;
    },
    toggleAddProblemModal(state) {
      state.addProblem.addModal = !state.addProblem.addModal;
    },
    setFilterSlider(state, payload) {
      state.filterSlider.value1 = payload[0];
      state.filterSlider.value2 = payload[1];
    },
    setSelectedGrade(state, payload) {
      state.addProblem.selectedGrade = payload;
    },
    setActiveProblem(state, payload) {
      state.menu.activeProblem = payload;
    },
    setEditedProblem(state, payload) {
      state.editProblem.editedProblem = payload;
    },
    editProblemStateName(state, payload) {
      state.editProblem.newName = payload;
    },
    editProblemStateComment(state, payload) {
      state.editProblem.newComment = payload;
    },
    editProblemStateGrade(state, payload) {
      state.editProblem.newGrade = payload;
    },
    editProblemStateGrip(state, payload) {
      const newState = multiClick(
        state.editProblem.editedProblem.grips[payload],
        state.editProblem.editedProblem.grips
      );
      state.editProblem.editedProblem.grips[payload] = newState;
    },
    setAddProblemNewProblem(state, payload) {
      state.addProblem.newProblem = payload;
    },
    toggleDeleteProblemModal(state) {
      state.editProblem.deleteModal = !state.editProblem.deleteModal;
    },
    toggleIntro(state) {
      state.intro = !state.intro;
    }
  },
  actions: {
    toggleErrorModal(state, payload) {
      this.commit("setErrorState", payload);
      setTimeout(
        () => this.commit("setErrorState", { active: false, message: "" }),
        1300
      );
    },
    toggleEditModal(state, payload) {
      this.commit("setErrorState", payload);
      setTimeout(() => {
        this.commit("setErrorState", { active: false, message: "" });
        this.commit("selectScne", LOAD_PROBLEM);
      }, 1300);
    },
    selectScne(state, payload) {
      this.commit("selectScne", payload);
      setTimeout(() => this.commit("toggleMenu"), 250);
    }
  },
  getters: {
    getActiveScene: (state) => state.menu.activeScene,
    getSelectedProblem: (state) => state.selectedProblem,
    getMenuState: (state) => state.menu.menuActive,
    getAddProblemState: (state) => state.addProblem.problemState,
    getAddProblemModal: (state) => state.addProblem.addModal,
    getAddProblemNewProblem: (state) => state.addProblem.newProblem,
    getErrorState: (state) => state.addProblem.errorState,
    getProblemList: (state) => state.problemList,
    getFilterSlider: (state) => state.filterSlider,
    getSelectedGrade: (state) => state.addProblem.selectedGrade,
    getActiveProblem: (state) => state.menu.activeProblem,
    getEditedProblem: (state) => state.editProblem.editedProblem,
    getEditProblemState: (state) => state.editProblem,
    getDeleteModalState: (state) => state.editProblem.deleteModal,
    getIntro: (state) => state.intro,
    getTextInputFocus: (state) => state.textInputFocus,
    getZoom: (state) => (scene) => state.zoomMap[scene],
    getZoomScale: (state) => (scene) => `--zoom: ${state.zoomMap[scene].scale}`
  }
});
