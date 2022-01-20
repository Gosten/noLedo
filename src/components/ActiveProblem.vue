<template>
	<div
		id="active-container"
		class="container"
		:class="{ 'overflow-scroll': aspectRatio > 1 }"
	>
		<div
			id="board-style"
			class="width-100 flex-container-blank"
			:style="scaleBoard"
			:class="{ 'left-0': ACTIVE_PROBLEM_SCALING && aspectRatio > 1 }"
		>
			<board board-id="board-AcP"></board>
		</div>
	</div>
</template>

<script>
	module.exports = {
		components: {
			board: httpVueLoader('components/Board.vue'),
		},
		data() {
			return {
				BOARD_CONFIG,
				aspectRatio: BOARD_CONFIG.columns / BOARD_CONFIG.rows,
				scaleBoard: {},
				ACTIVE_PROBLEM_SCALING,
			};
		},
		mounted() {
			uibuilder.send({
				topic: 'saveState',
				payload: JSON.stringify(this.activeProblem),
			});
			sendProblem(this.activeProblem);
			if (ACTIVE_PROBLEM_SCALING) {
				this.scaleBoard = { transform: this.getTransform() };
			}

			if (ACTIVE_PROBLEM_SCALING) {
				const container = document.getElementById('active-container');
				container.style = 'align-items: flex-start;';
			}
		},
		computed: {
			activeProblem() {
				return this.$store.getters.getActiveProblem;
			},
		},
		methods: {
			getScale() {
				if (this.aspectRatio < 1) {
					let { offsetWidth: boardWidth, offsetHeight: boardHeight } =
						document.getElementById('grid-container');
					let widthDiff = window.innerWidth - boardWidth;
					let heightDiff = window.innerHeight - 60 - boardHeight;
					let widthScale = window.innerWidth / boardWidth;
					let heightScale = (window.innerHeight - 60) / boardHeight;
					let scale = heightScale < widthScale ? heightScale : widthScale;
					console.log({
						widthDiff,
						heightDiff,
						widthScale,
						heightScale,
						scale,
					});
					return scale;
				}
				if (this.aspectRatio > 1) {
					let containerWidth = window.innerWidth; // window width - 2em
					let containerHeight = window.innerHeight; // window height - menu height
					console.log(containerHeight / containerWidth, this.aspectRatio);
					return (
						(containerHeight / containerWidth) *
						this.aspectRatio *
						this.BOARD_CONFIG.horizontalActiveBoardZoomModifier
					);
				}
				return 1;
			},
			getTransform() {
				return `scale(${this.getScale()})`;
			},
		},
	};
</script>

<style scoped>
	.container {
		display: flex;
		padding-top: 60px;
		height: 100vh;
		overflow: hidden;
		justify-content: center;
		align-items: center;
		position: relative;
		width: 100%;
	}
	.board-position {
		width: 100vw !important;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.left-0 {
		width: 100%;
		transform-origin: center center;
	}

	.overflow-scroll {
		overflow-x: scroll;
	}

	.width-100 {
		width: 100%;
		height: 100%;
		justify-content: center;
	}

	#board-style {
		/* transform-origin: center center; */
	}
</style>
