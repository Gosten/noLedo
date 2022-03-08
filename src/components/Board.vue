<template>
	<div
		:id="boardId"
		class="board-container"
		:style="{ ...boardVariables, ...boardSize }"
		:class="{
			'more-cols': moreCols,
			'more-rows': moreRows,
			'even-size': evenSize,
		}"
	>
		<div v-if="sizeSet" id="grid-container" class="board-grid-container">
			<div
				v-for="(grip, index) in BOARD_CONFIG.gripPositions"
				:key="index"
				class="grip-container grip-selector"
				:class="{ 'grip-active': gripClassCondition(index) }"
				@click="handleClick(index)"
			>
				<div class="grip" :class="{ [gripColors[index]]: true }"></div>
			</div>
		</div>
	</div>
</template>

<script>
	module.exports = {
		methods: {
			handleClick(index) {
				if (this.BOARD_CONFIG.gripPositions[index]) {
					if (this.isScene(ADD_PROBLEM))
						this.$store.commit('toggleProblemState', index);
					if (this.isScene(EDIT_PROBLEM))
						this.$store.commit('editProblemStateGrip', index);
					if (this.isScene(ADD_PROBLEM) || this.isScene(EDIT_PROBLEM))
						this.sendGripMessage(index);
				}
			},
			sendGripMessage(index) {
				let i = this.diodeIndexes[index];
				let diodeState = this.problemState[index] ? 255 : 0;
				let msg = { topic: 'display' };
				msg.payload = `${i},0,${diodeState},0`;
				uibuilder.send(msg);
			},
			gripClassCondition(index) {
				if (this.isScene(LOAD_PROBLEM))
					return this.selectedProblem.grips[index];
				if (this.isScene(ACTIVE_PROBLEM))
					return this.activeProblem.grips[index];
				if (this.isScene(ADD_PROBLEM)) {
					return this.problemState[index];
				}
				if (this.isScene(EDIT_PROBLEM)) {
					return this.editedProblem.grips[index];
				}
			},
			isScene(sceneType) {
				return this.$store.getters.getActiveScene === sceneType;
			},
			handleBoardResize(reset = false) {
				const { offsetWidth: width, offsetHeight: height } = this.boardHandle;
				const { columns, rows } = this.BOARD_CONFIG;
				const condition = width / columns < height / rows;

				const minSize = condition ? width : height;

				let gripContSize = minSize / (condition ? columns : rows);

				// make gripContSize even number
				const getEvenNumber = (n) => n - (n % 2);
				gripContSize = getEvenNumber(gripContSize);

				const getFracSize = (baseSize) =>
					getEvenNumber(Math.floor((baseSize * gripContSize) / 100));

				const gripSize = getFracSize(BOARD_CONFIG.gripSize);

				const emptyGripSize = getFracSize(BOARD_CONFIG.emptyGripSize);
				const gripSelectionSize = getFracSize(BOARD_CONFIG.gripSelectionSize);
				const gripSelectionBorder =
					(BOARD_CONFIG.gripSelectionBorder * gripContSize) / 100;

				// hide board when grip size is samller than 3px
				let opacity = '1';
				if (gripSize < 3) opacity = '0';

				// console.log({ width, height, minSize, gripContSize });
				this.boardSize = {
					opacity,
					'--board-width': `calc(${width}px - 2em)`,
					'--board-height': `${height}px`,
					'--min-size': `${minSize}px`,
					'--grip-cont-size': `${gripContSize}px`,
					'--grip-size': `${gripSize}px`,
					'--empty-grip-size': `${emptyGripSize}px`,
					'--grip-selection-size': `${gripSelectionSize}px`,
					'--grip-selection-border': `${gripSelectionBorder}px`,
				};
				this.setSizeChanged(!reset);
			},
			setSizeChanged(state) {
				this.sizeSet = state;
				this.$emit('resize', state);
			},
			handleAppResize() {
				//reset board size
				this.setSizeChanged(false);

				//app resize without board resize
				setTimeout(() => {
					if (!this.sizeSet) this.setSizeChanged(true);
				}, 10);
			},
		},
		computed: {
			problemState() {
				return this.$store.getters.getAddProblemState;
			},
			editedProblem() {
				return this.$store.getters.getEditedProblem;
			},
			interactionCondition() {
				return (
					this.activeScene === ADD_PROBLEM || this.activeScene === EDIT_PROBLEM
				);
			},
			activeProblem() {
				return this.$store.getters.getActiveProblem;
			},
			activeScene() {
				return this.$store.getters.getActiveScene;
			},
			selectedProblem() {
				return this.$store.getters.getSelectedProblem;
			},
			diodeIndexes: () => diodeIndexes,
			gripImages: () => gripImages,
		},
		data() {
			return {
				ACTIVE_PROBLEM,
				BOARD_CONFIG,
				gripColors: BOARD_CONFIG.gripPositions.map(
					(color) => `grip-color-${color}`
				),
				boardVariables: {
					'--columns': BOARD_CONFIG.columns,
					'--rows': BOARD_CONFIG.rows,
					'--grid-container-width':
						BOARD_CONFIG.columns > BOARD_CONFIG.rows ? '100%' : 'auto',
					'--grid-container-height':
						BOARD_CONFIG.columns > BOARD_CONFIG.rows ? 'auto' : '100%',
				},
				boardSize: {},
				moreRows: BOARD_CONFIG.columns < BOARD_CONFIG.rows,
				moreCols: BOARD_CONFIG.columns > BOARD_CONFIG.rows,
				evenSize: BOARD_CONFIG.columns === BOARD_CONFIG.rows,
				sizeSet: false,
				boardHandle: undefined,
				appHandle: undefined,
				resizeObserver: undefined,
				appResizeObserver: undefined,
				firstUpdate: true,
			};
		},
		props: {
			boardId: String,
		},
		mounted() {
			this.resizeObserver = new ResizeObserver(() => this.handleBoardResize());
			this.boardHandle = document.getElementById(this.boardId);
			this.resizeObserver.observe(this.boardHandle);
			window.addEventListener('resize', this.handleAppResize);
		},
		updated() {
			if (this.firstUpdate) {
				this.handleAppResize();
				//console.log('first update');
				this.firstUpdate = false;
			}
		},
		created() {},
		destroyed() {
			this.resizeObserver.unobserve(this.boardHandle);

			window.removeEventListener('resize', this.handleAppResize);
		},
	};
</script>

<style scoped>
	@import '../css/Board.css';
	@import '../css/app_config.css';

	.grip-container {
		height: var(--grip-cont-size);
		width: var(--grip-cont-size);
	}

	.even-size .board-grid-container {
		justify-content: center;
		align-items: center;
		grid-template-columns: repeat(
			var(--columns),
			calc(var(--min-size) / var(--rows))
		);
		grid-template-rows: repeat(
			var(--columns),
			calc(var(--min-size) / var(--rows))
		);
	}
</style>
