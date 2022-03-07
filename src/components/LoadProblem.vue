<template>
	<div id="load-problem" class="flex-container content-container">
		<transition name="fade">
			<loading-modal v-if="!problemList"></loading-modal>
		</transition>

		<ul
			id="problem-list"
			:class="{
				collapsed: listCollapsed,
				'focus-transition': textInputFocus,
			}"
		>
			<li class="list-label">
				<span>Nazwa</span>
				<span v-if="ENABLE_GRADES">Wycena</span>
			</li>
			<li
				class="li-0"
				v-if="filteredList ? Object.keys(filteredList).length === 0 : false"
			>
				<span>brak wyników</span>
			</li>
			<li
				v-for="(problem, index) in filteredList"
				:key="problem.name"
				:class="{
					[listItemClass(index)]: true,
					'li-selected': liSelectedCondition(problem),
				}"
				@click="() => handleProblemSelect(problem)"
			>
				<span>{{ parseName(problem) }}</span>
				<span v-if="ENABLE_GRADES">{{ problem.grade }}</span>
			</li>
		</ul>

		<transition name="board-fade">
			<div
				class="bottom-section filter-container"
				v-if="!listCollapsed"
				id="bottom"
			>
				<h3>Filtr<span v-if="ENABLE_GRADES">y</span></h3>
				<div v-if="ENABLE_GRADES" class="slider-width">
					<slider-component></slider-component>
				</div>
				<name-input
					:set-name="setNameFilter"
					:set-author="setAuthorFilter"
					:load="true"
				></name-input>
			</div>
		</transition>

		<transition name="button-fade">
			<div id="bottom" class="bottom-section preview" v-if="listCollapsed">
				<div id="board-style-L" class="board-position-container">
					<board board-id="board-L"></board>
				</div>
				<div id="list-buttons" class="button-container" v-if="listCollapsed">
					<button class="button" @click="editProblem">Edytuj problem</button>
					<button class="button" @click="showProblemList">Pokaż listę</button>
					<button class="button" @click="loadProblem">Wczytaj</button>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	module.exports = {
		components: {
			'name-input': httpVueLoader('components/subComponents/NameAuthInput.vue'),
			'loading-modal': httpVueLoader('components/LoadingModal.vue'),
			'slider-component': httpVueLoader('components/DoubleSlider.vue'),
			board: httpVueLoader('components/Board.vue'),
		},
		data() {
			return {
				listCollapsed: false,
				nameFilter: '',
				authorFilter: '',
				GRADES,
				gradeFilter: {
					from: 0,
					to: GRADES.length - 1,
				},
				sliderInstance: undefined,
				mapGrade,
				parseName,
				ENABLE_GRADES,
				textInputHandle: undefined,
			};
		},
		methods: {
			setNameFilter(newVal) {
				this.nameFilter = newVal;
			},
			setAuthorFilter(newVal) {
				this.authorFilter = newVal;
			},
			handleProblemSelect(problem) {
				if (!this.listCollapsed) {
					this.listCollapsed = true;
					this.$store.commit('selectProblem', problem);
				}
				getBoardSize();
			},
			showProblemList() {
				this.listCollapsed = false;
			},
			loadProblem() {
				this.$store.commit('selectScne', ACTIVE_PROBLEM);
				this.$store.commit('setActiveProblem', this.selectedProblem);
				sendProblem(this.selectedProblem);
			},
			editProblem() {
				this.$store.commit('selectScne', EDIT_PROBLEM);
				this.$store.commit(
					'setEditedProblem',
					JSON.parse(JSON.stringify(this.selectedProblem))
				);
			},
			listItemClass(index) {
				return `li-${index % 2}`;
			},
			liSelectedCondition(problem) {
				return this.listCollapsed && this.selectedProblem.name === problem.name;
			},
		},
		beforeUnmount() {
			this.sliderInstance.destroy();
		},

		computed: {
			selectedProblem() {
				return this.$store.getters.getSelectedProblem;
			},
			problemList() {
				return [...this.$store.getters.getProblemList];
			},
			filteredList() {
				if (this.problemList) {
					if (this.ENABLE_GRADES) {
						const fromGrade = mapGrade(this.filterGrades.value1);
						const toGrade = mapGrade(this.filterGrades.value2);
						//filter by grade
						let filteredList = this.problemList.filter(
							(problem) =>
								problem.grade >= fromGrade && problem.grade <= toGrade
						);
						//filter by name
						filteredList = filteredList.filter((problem) =>
							problem.name.toUpperCase().match(this.nameFilter.toUpperCase())
						);

						//filter by author
						if (this.authorFilter) {
							filteredList = filteredList.filter((problem) => {
								if (problem.author) {
									return problem.author
										.toUpperCase()
										.match(this.authorFilter.toUpperCase());
								}
							});
						}

						return filteredList;
					}
					return this.problemList;
				} else return undefined;
			},
			filterGrades() {
				return this.$store.getters.getFilterSlider;
			},
			textInputFocus() {
				return this.$store.getters.getTextInputFocus;
			},
		},
	};
</script>

<style scoped>
	@import url('../css/LoadProblem.css');
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.3s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
		opacity: 0;
	}

	.board-fade-enter-active {
		/* transition: opacity .1s; */
		transition-delay: 0.3s;
	}
	.board-fade-leave-active {
		transition: opacity 0.1s;
	}
	.board-fade-enter, .board-fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
		opacity: 0;
	}

	.button-fade-enter-active {
		transition: opacity 0.3s;
		transition-delay: 0.4s;
	}
	.button-fade-leave-active {
		transition: opacity 0.3s;
	}
	.button-fade-enter, .button-fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
		opacity: 0;
	}

	.board-position-container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		width: calc(100% - 2em);
	}
	.board-position {
		display: flex;
	}

	.bottom-section {
		position: absolute;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		width: calc(100vw - 2em);
		border-radius: 5px;
		bottom: 1em;
	}

	.preview {
		padding-top: calc(70px + 60px + 3em); /* list+menu+paddings */
		height: 100%;
	}

	.filter-container {
		border: 1px solid black;
		background: white;
		padding: 0 1em;
	}

	.focus-transition {
		transition: 0.05s height ease-out !important;
	}
</style>
