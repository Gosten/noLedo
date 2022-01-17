'use strict';

const LOAD_PROBLEM = 'LOAD_PROBLEM';
const ADD_PROBLEM = 'ADD_PROBLEM';
const EDIT_PROBLEM = 'EDIT_PROBLEM';
const ACTIVE_PROBLEM = 'ACTIVE_PROBLEM';
const TOPIC = {
	LOAD: 'load',
	SAVE: 'save',
	LOAD_STATE: 'loadState',
	SAVE_STATE: 'saveState',
};
let doubleSliderInstance = undefined;
const setInstance = (instance) => (doubleSliderInstance = instance);

function mapGrade(index) {
	return GRADES[index];
}

function sendProblem({ grips }) {
	let diodeState = (gripState) => (gripState ? 255 : 0);
	let msg = { topic: 'display' };
	msg.payload = Object.keys(grips)
		.map((key, index) => `${diodeIndexes[index]},0,${diodeState(grips[key])},0`)
		.filter((elem, index) => diodeIndexes[index] !== undefined)
		.join('|');
	uibuilder.send(msg);
}

function getBoardSize() {
	let board = document.getElementById('board-container');
	console.log(board);
}

const app1 = new Vue({
	el: '#app',

	components: {
		'add-problem': httpVueLoader('components/AddProblem.vue'),
		'load-problem': httpVueLoader('components/LoadProblem.vue'),
		'active-problem': httpVueLoader('components/ActiveProblem.vue'),
		'app-component': httpVueLoader('components/AppComponent.vue'),
		'menu-bar': httpVueLoader('components/Menu.vue'),
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
		},
	},

	methods: {},

	store,
	mounted: function () {
		uibuilder.start();

		var vueApp = this;
		uibuilder.send({ topic: TOPIC.LOAD_STATE });
		uibuilder.send({ topic: TOPIC.LOAD });

		uibuilder.onChange('msg', function (msg) {
			if (msg.topic === TOPIC.LOAD) {
				if (msg.payload.length === 0) {
					store.commit('setProblemList', []);
					return console.warn('EMPTY PROBLEM LIST');
				}
				let newProblemList = JSON.parse(msg.payload);
				console.log('loaded msg: ', newProblemList);
				store.commit('setProblemList', newProblemList);
			}
			if (msg.topic === TOPIC.LOAD_STATE) {
				if (msg.payload)
					store.commit('setActiveProblem', JSON.parse(msg.payload));
				console.log('loaded_state: ');
			}
		});
	},
});
