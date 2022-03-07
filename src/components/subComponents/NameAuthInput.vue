<template>
	<div class="text-input-container" :class="{ 'no-author': !ENABLE_AUTHOR }">
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
				autocomplete="off"
				v-model="nameValue"
				@input="(e) => handleNameInput(e.target.value, true, setName)"
				@focusin="() => handleFocus(true)"
				@focusout="() => handleFocus(false)"
			/>
			<p :class="{ opacity: !nameLengthLimit }" v-if="!load">
				Nazwa nie może mieć więcej niż 20 znaków
			</p>
		</div>
		<div class="name-input-container" v-if="ENABLE_AUTHOR">
			<input
				id="add-problem-author-input"
				class="input-name input"
				:class="{
					'border-red': errorFlags.auth || authorLengthLimit,
					'limit-description': 1,
				}"
				name="nazwa"
				type="text"
				placeholder="autor"
				autocomplete="off"
				v-model="authNameValue"
				@input="(e) => handleNameInput(e.target.value, false, setAuthor)"
				@focusin="() => handleFocus(true)"
				@focusout="() => handleFocus(false)"
			/>
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
			setAuthor: Function,
			load: Boolean,
		},
		data() {
			return {
				BOARD_CONFIG,
				ENABLE_AUTHOR,
				nameValue: '',
				authNameValue: '',
				errorFlags: {
					name: false,
					auth: false,
				},
				boardZoom: false,
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

			handleNameInput(value, name, callback) {
				this.errorFlags.name = false;
				let newValue = value.replace(/ +/g, ' '); //reduce multiple spaces to a single one
				newValue = newValue.replace(/(^ *| *$)/g, ''); //remove space from begining end end of name
				callback(newValue);
				if (name) this.nameValue = newValue;
				else this.authNameValue = newValue;
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
	.border-red {
		border-color: red;
	}

	.name-grade-container {
		max-width: 500px;
	}

	.text-input-container {
		display: grid;
		grid-template-columns: 2fr 1fr;
	}
	.no-author {
		grid-template-columns: 1fr;
	}

	.text-input-container div:first-child {
		margin-right: 5px;
	}
</style>
