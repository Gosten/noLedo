<template>
	<div id="edit-problem" class="grid-content">
		<div class="top-conainer" :class="{ 'zoom-off': !ENABLE_ZOOM }">
			<div v-if="ENABLE_ZOOM" class="zoom-container flex-container-blank">
				<div class="zoom" @click="toggleZoom()">
					<img v-if="!boardZoom" src="images/zoomIn.svg" alt="zoomIn" />
					<img v-if="boardZoom" src="images/zoomOut.svg" alt="zoomOut" />
				</div>
			</div>

			<div
				id="board-style-EP"
				class="board-position"
				:class="{ 'board-zoom': boardZoom }"
			>
				<transition name="board-fade">
					<board board-id="board-E"></board>
				</transition>
			</div>
		</div>

		<div class="flex-container-blank">
			<div class="bottom">
				<div class="input-container">
					<div class="name-grade-container">
						<div v-if="ENABLE_GRADES" class="slider-width">
							<grade-slider></grade-slider>
						</div>
						<name-input
							:init-value="{ name: nameValue, author: authorNameValue }"
							:set-name="setName"
							:set-author="setAuthor"
							:error-name="errorFlags.name"
							:set-error-name="setErrorFlag"
							v-if="inputReady"
						></name-input>
					</div>
				</div>

				<div class="button-container">
					<button class="button" @click="deleteProblem">Usuń</button>
					<button class="button" @click="saveProblem">Zapisz</button>
				</div>
			</div>
		</div>

		<transition name="fade">
			<error-modal v-if="errorState.active"></error-modal>
		</transition>

		<transition name="fade">
			<delete-modal v-if="editProblemState.deleteModal"></delete-modal>
		</transition>
	</div>
</template>

<script>
	module.exports = {
		components: {
			board: httpVueLoader('components/Board.vue'),
			'name-input': httpVueLoader('components/subComponents/NameAuthInput.vue'),
			'grade-slider': httpVueLoader('components/SingleSlider.vue'),
			'error-modal': httpVueLoader('components/ErrorModal.vue'),
			'delete-modal': httpVueLoader('components/DeleteModal.vue'),
		},
		data() {
			return {
				nameValue: '',
				authorNameValue: '',
				inputReady: false,
				errorFlags: {
					name: false,
				},
				mapGrade,
				oldGrips: [],
				oldName: '',
				saveNewList,
				textInputHandle: undefined,
				boardZoom: false,
				ENABLE_ZOOM,
				ENABLE_GRADES,
			};
		},
		mounted() {
			//set text input initial values
			const editProblem = this.editProblemState.editedProblem;
			this.nameValue = editProblem.name;
			if (editProblem.author) this.authorNameValue = editProblem.author;

			//after setting input initial values render input
			this.inputReady = true;

			// set reference grips and name value
			this.oldGrips = Object.assign({}, editProblem).grips;
			this.oldName = this.editProblemState.editedProblem.name;

			//display problem
			sendProblem(this.editProblemState.editedProblem);
		},
		computed: {
			editProblemState() {
				return this.$store.getters.getEditProblemState;
			},
			problemList() {
				return [...this.$store.getters.getProblemList];
			},
			selectedProblem() {
				return this.$store.getters.getSelectedProblem;
			},
			errorState() {
				return this.$store.getters.getErrorState;
			},
			activeProblem() {
				return this.$store.getters.getActiveProblem;
			},
		},
		methods: {
			setName(newName) {
				this.nameValue = newName;
			},
			setAuthor(newAuthor) {
				this.authorNameValue = newAuthor;
			},
			setErrorFlag(newState) {
				this.errorFlags.name = newState;
			},
			toggleZoom() {
				this.boardZoom = !this.boardZoom;
			},

			deleteProblem() {
				this.$store.commit('toggleDeleteProblemModal');
			},

			blurInput(e) {
				if (e.key == 'Enter') this.textInputHandle.blur();
			},

			saveProblem() {
				let errorMessage = 'Nie wprowadzono zmian';
				let editModalmessage = 'Wprowadzono zmiany';
				if (!this.hasProblemChanged()) return this.handleError(errorMessage);
				let newGrade = this.editProblemState.newGrade
					? this.editProblemState.newGrade
					: this.editProblemState.editedProblem.grade;
				let newProblem = {
					name: this.nameValue,
					grade: newGrade,
					grips: this.editProblemState.editedProblem.grips,
					author: this.authorNameValue,
				};
				if (this.validateProblem(newProblem)) {
					let newList = this.problemList.map((problem) => {
						if (problem.name === this.oldName) return newProblem;
						return problem;
					});
					if (this.activeProblem)
						if (this.activeProblem.name === this.oldName)
							this.$store.commit('setActiveProblem', newProblem);

					this.$store.dispatch('toggleEditModal', {
						active: true,
						message: editModalmessage,
					});
					this.saveNewList(newList);
				}
			},

			hasProblemChanged() {
				let nameChanged = this.nameValue !== this.oldName;
				let gripsChanged = !this.compareGrips(
					this.selectedProblem.grips,
					this.editProblemState.editedProblem.grips
				);
				let gradeChanged =
					this.editProblemState.newGrade !== this.selectedProblem.grade;

				let authorChanged =
					this.editProblemState.editedProblem.author !== this.authorNameValue;
				let condition =
					gripsChanged || nameChanged || gradeChanged || authorChanged;
				if (condition) return true;
				return false;
			},

			compareGrips(grips1, grips2) {
				let difference = Object.keys(grips1).filter(
					(key) => grips1[key] !== grips2[key]
				);
				if (difference.length == 0) return true;
				return false;
			},

			handleError(errorMessage) {
				this.$store.dispatch('toggleErrorModal', {
					active: true,
					message: errorMessage,
				});
				console.warn(errorMessage);
				return false;
			},

			validateProblem({ name, grips }) {
				if (!name) return this.handleNameError('Wpisz nazwę problemu');

				let selecterGripsAmount = Object.keys(grips).filter(
					(key) => grips[key]
				).length;

				if (selecterGripsAmount === 0)
					return this.handleError('Nie wybrano żadnego chwytu');

				return this.checkNameUniqueness(name);
			},

			handleNameError(errorMessage) {
				this.handleError(errorMessage);
				this.errorFlags.name = true;
			},

			checkNameUniqueness(name) {
				let matchArray = this.problemList.filter(
					(problem) => problem.name === name
				);
				if (matchArray.length === 0) return true;
				if (matchArray[0].name === this.oldName) return true;
				return this.handleNameError('Ta nazwa już istnieje');
			},
		},
	};
</script>

<style>
	@import url('../css/AddProblem.css');

	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.3s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
		opacity: 0;
	}

	.content-container {
		padding-top: calc(60px + 1em) !important;
	}
</style>
