<template>
	<div class="text-input-container">
		<div class="name-input-container">
			<input
				id="add-problem-name-input"
				class="input-name input"
				:class="{
					'border-red': errorFlags.name || nameLengthLimit,
					'limit-description': 1,
				}"
				name="nazwa"
				type="text"
				placeholder="nazwa"
				v-model="nameValue"
				@change="(e) => handleNameInput(e.target.value)"
				@focusin="() => handleFocus(true)"
				@focusout="() => handleFocus(false)"
			/>
			<p :class="{ opacity: !nameLengthLimit }">
				Nazwa nie może mieć więcej niż 20 znaków
			</p>
		</div>
	</div>
</template>

<script>
	module.exports = {
		mounted() {
			this.textInputHandle = document.getElementById('add-problem-name-input');
			this.textInputHandle.addEventListener('keyup', this.blurInput);
		},
		beforeUnmount() {
			this.textInputHandle.removeEventListener('keyup', this.blurInput);
		},
		props: {
			setName: Function,
		},
		data() {
			return {
				BOARD_CONFIG,
				nameValue: '',
				errorFlags: {
					name: false,
				},
				mapGrade,
				boardZoom: false,
				ENABLE_ZOOM,
				ENABLE_GRADES,
				textInputHandle: undefined,
			};
		},
		computed: {
			nameLengthLimit() {
				return this.nameValue.length >= 20;
			},
			authorLengthLimit() {
				return this.nameValue.length >= 10;
			},
			textInputFocus() {
				return this.$store.getters.getTextInputFocus;
			},
		},
		methods: {
			blurInput(e) {
				if (e.key == 'Enter') this.textInputHandle.blur();
			},

			checkNameUniqueness(name) {
				let matchArray = this.problemList.filter(
					(problem) => problem.name === name
				);
				if (matchArray.length === 0) return true;
				return this.handleNameError('Ta nazwa już istnieje');
			},

			handleNameInput(value) {
				this.errorFlags.name = false;
				let newValue = value.replace(/ +/g, ' '); //reduce multiple spaces to a single one
				newValue = newValue.replace(/(^ *| *$)/g, ''); //remove space from begining end end of name
				this.setName(newValue);
				return (this.nameValue = newValue);
			},

			handleFocus(inOut) {
				if (inOut) return this.$store.commit('toggleTextInputFocus');
				return setTimeout(
					() => this.$store.commit('toggleTextInputFocus'),
					200
				);
			},
		},
	};
</script>

<style scoped>
	@import url('../../css/AddProblem.css');
</style>
