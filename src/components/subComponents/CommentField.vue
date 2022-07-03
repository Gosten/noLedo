<script>
module.exports = {
  data() {
    return {
      commentValue: ""
    };
  },
  methods: {
    handleChange(event, callback) {
      const value = event.target.value;
      let newValue = value.replace(/ +/g, " "); //reduce multiple spaces to a single one
      newValue = newValue.replace(/(^ *)/g, ""); //remove space from begining end end of name
      callback(newValue);
      this.commentValue = newValue;
    }
  },
  props: {
    setComment: Function
  }
};
</script>

<style scoped>
textarea {
  font-family: "Montserrat", sans-serif;
}
.text-field {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  max-height: 10em;
  margin-block: 1em;
  padding: 1em;
  border: 2px solid black;
  border-radius: 5px;
}
</style>

<template>
  <textarea
    class="text-field"
    placeholder="komentarz..."
    v-model="commentValue"
    @change="(e) => handleChange(e, setComment)"
  >
  </textarea>
</template>
