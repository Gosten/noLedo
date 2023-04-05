<template>
  <div class="text-input-container" :class="{ 'no-author': !ENABLE_AUTHOR }">
    <div class="name-input-container">
      <input
        id="add-problem-name-input"
        class="input-name input"
        :class="{
          'border-red': errorName
        }"
        name="name"
        type="text"
        placeholder="nazwa"
        :maxlength="nameLengthLimit"
        autocomplete="off"
        v-model="inputVal.name"
        @input="(e) => handleNameInput(e, setName)"
        @change="(e) => handleChange(e, setName)"
      />
    </div>
    <div class="name-input-container" v-if="ENABLE_AUTHOR">
      <input
        id="add-problem-author-input"
        class="input-name input"
        name="author"
        type="text"
        placeholder="autor"
        :maxlength="authorLengthLimit"
        autocomplete="off"
        v-model="inputVal.author"
        @input="(e) => handleAuthInput(e, setAuthor)"
      />
    </div>
  </div>
</template>

<script>
module.exports = {
  mounted() {
    this.textInputHandle = document.getElementById("add-problem-name-input");
    this.textInputHandle.addEventListener("keyup", this.blurInput);

    if (this.initValue) {
      this.inputVal.name = this.initValue.name;
      this.inputVal.author = this.initValue.author;
    }
  },
  beforeUnmount() {
    this.textInputHandle.removeEventListener("keyup", this.blurInput);
  },
  props: {
    setName: Function,
    setAuthor: Function,
    setErrorName: Function,
    errorName: Boolean,
    load: Boolean,
    initValue: Object
  },
  data() {
    return {
      BOARD_CONFIG,
      ENABLE_AUTHOR,
      ENABLE_SPACE_NAMES,
      inputVal: {
        name: "",
        author: ""
      },
      nameLengthLimit: 20,
      authorLengthLimit: 10,
      boardZoom: false,
      textInputHandle: undefined
    };
  },
  computed: {
    textInputFocus() {
      return this.$store.getters.getTextInputFocus;
    }
  },
  methods: {
    blurInput(e) {
      if (e.key == "Enter") this.textInputHandle.blur();
    },

    handleNameInput(event, callback) {
      const value = event.target.value;
      if (!this.load) this.setErrorName(false);
      let newValue = value.replace(/ +/g, " "); //reduce multiple spaces to a single one
      newValue = newValue.replace(/(^ *)/g, ""); //remove space from begining end end of name
      if (!this.ENABLE_SPACE_NAMES) newValue = value.replace(/ /g, "");
      callback(newValue);
      this.inputVal.name = newValue;
    },
    handleChange(event, callback) {
      //remove trailing space
      const value = event.target.value;
      const newValue = value.replace(/( $)/g, "");
      console.log("change type", event.type);
      console.log({ value, newValue });
      callback(newValue);
      this.inputVal.name = newValue;
    },
    handleAuthInput(event, callback) {
      const value = event.target.value;
      if (!this.load) this.setErrorName(false);
      let newValue = value.replace(/ /g, ""); //remove space
      callback(newValue);
      this.inputVal.author = newValue;
    }
  }
};
</script>

<style scoped type="text/css">
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
