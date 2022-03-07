<template>
	<div class="text-input-container" :class="{ 'no-author': !ENABLE_AUTHOR }">
		<div class="name-input-container">
			<input
				id="add-problem-name-input"
				class="input-name input"
				:class="{
					'border-red': errorName,
				}"
				name="nazwa"
				type="text"
				placeholder="nazwa"
				:maxlength="nameLengthLimit"
				autocomplete="off"
				v-model="nameValue"
				@input="(e) => handleNameInput(e, true, setName)"
				@focusin="() => handleFocus(true)"
				@focusout="() => handleFocus(false)"
			/>
		</div>
		<div class="name-input-container" v-if="ENABLE_AUTHOR">
			<input
				id="add-problem-author-input"
				class="input-name input"
				name="nazwa"
				type="text"
				placeholder="autor"
				:maxlength="authorLengthLimit"
				autocomplete="off"
				v-model="authNameValue"
				@input="(e) => handleNameInput(e, false, setAuthor)"
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

			console.log({ ...this.initValue });
			if (this.initValue) {
				this.nameValue = this.initValue.name;
				this.authNameValue = this.initValue.author;
			}
		},
		beforeUnmount() {
			this.textInputHandle.removeEventListener('keyup', this.blurInput);
		},
		props: {
			setName: Function,
			setAuthor: Function,
			setErrorName: Function,
			errorName: Boolean,
			load: Boolean,
			initValue: Object,
		},
		data() {
			return {
				BOARD_CONFIG,
				ENABLE_AUTHOR,
				nameValue: '',
				authNameValue: '',
				nameLengthLimit: 20,
				authorLengthLimit: 10,
				boardZoom: false,
				textInputHandle: undefined,
			};
		},
		computed: {
			textInputFocus() {
				return this.$store.getters.getTextInputFocus;
			},
		},
		methods: {
			blurInput(e) {
				if (e.key == 'Enter') this.textInputHandle.blur();
			},

			handleNameInput(event, name, callback) {
				const value = event.target.value;
				if (!this.load) this.setErrorName(false);
				// let newValue = value.replace(/ +/g, ' '); //reduce multiple spaces to a single one
				// newValue = newValue.replace(/(^ *| *$)/g, ''); //remove space from begining end end of name

				newValue = value.replace(/(^ *| *$)/g, ''); //remove space
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
		width: 100%;
		grid-template-columns: 2fr 1fr;
	}
	.no-author {
		grid-template-columns: 1fr;
	}

	.text-input-container div:first-child {
		margin-right: 5px;
	}
</style>
