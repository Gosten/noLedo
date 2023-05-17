<script>
module.exports = {
  data() {
    return {};
  },
  methods: {},
  computed: {},
  props: {
    handleClick: Function,
    iconClassName: String,
    buttonText: String,
    disabled: Boolean
  }
};
</script>

<style scoped type="text/css">
.controlButton {
  height: 1em;
  justify-content: center;
  align-items: center;
  display: flex;
  background: white;
  border: 2px solid black;
  color: black;
  font-size: 2em;
  padding: 0.5em;
  margin-top: 0.5em;
}
.controlButton i {
  width: 1em;
  height: 1em;
}

.enabled:active {
  opacity: 0.5;
}
.disabled {
  opacity: 0.5;
}
</style>

<template>
  <button
    class="controlButton"
    :class="{ disabled, enabled: !disabled }"
    @click="() => !disabled && handleClick()"
  >
    <span
      v-if="buttonText"
      class="mdi"
      :class="{ [iconClassName]: iconClassName }"
      >{{ buttonText }}</span
    >
    <i
      v-if="iconClassName"
      class="mdi"
      :class="{ [iconClassName]: iconClassName }"
    ></i>
  </button>
</template>
