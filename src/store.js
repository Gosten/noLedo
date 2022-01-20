const store = new Vuex.Store({
	state: {
		menu: {
			menuActive: true,
			activeScene: '',
			// menuActive: false,
			// activeScene: 'ADD_PROBLEM',
			sceneLoaded: true,
			activeProblem: undefined,
		},
		selectedProblem: {},
		editProblem: {
			editedProblem: {},
			newName: '',
			newGrade: '',
			deleteModal: false,
		},
		addProblem: {
			problemState: {},
			errorState: {
				active: false,
				message: 'asdasd',
			},
			addModal: false,
			selectedGrade: 0,
			newProblem: {},
		},
		problemList: [],
		filterSlider: {
			value1: 0,
			value2: 0,
		},
		intro: INTRO,
		textInputFocus: false,
	},
	mutations: {
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
			state.addProblem.problemState[payload] =
				!state.addProblem.problemState[payload];
		},
		clearProblemState(state, payloaod) {
			let newProblemState = {};
			payloaod.forEach((grip, index) => (newProblemState[index] = false));
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
		editProblemStateGrade(state, payload) {
			state.editProblem.newGrade = payload;
		},
		editProblemStateGrip(state, payload) {
			state.editProblem.editedProblem.grips[payload] =
				!state.editProblem.editedProblem.grips[payload];
		},
		setAddProblemNewProblem(state, payload) {
			state.addProblem.newProblem = payload;
		},
		toggleDeleteProblemModal(state) {
			state.editProblem.deleteModal = !state.editProblem.deleteModal;
		},
		toggleIntro(state) {
			state.intro = !state.intro;
		},
	},
	actions: {
		toggleErrorModal(state, payload) {
			this.commit('setErrorState', payload);
			setTimeout(
				() => this.commit('setErrorState', { active: false, message: '' }),
				1300
			);
		},
		toggleEditModal(state, payload) {
			this.commit('setErrorState', payload);
			setTimeout(() => {
				this.commit('setErrorState', { active: false, message: '' });
				this.commit('selectScne', LOAD_PROBLEM);
			}, 1300);
		},
		selectScne(state, payload) {
			this.commit('selectScne', payload);
			setTimeout(() => this.commit('toggleMenu'), 250);
		},
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
	},
});
