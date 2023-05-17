<script>
module.exports = {
  data() {
    return {};
  },
  props: {
    text: String,
    iconClassName: String,
    handleClick: Function,
    disabled: Boolean
  }
};
</script>

<style scoped type="text/css">
.button-icon {
  margin-top: 2px;
  position: absolute;
  right: 1em;
  font-size: 1.3em;
  width: fit-content;
  height: fit-content;
  color: white;
  font-weight: 400;
}

.button-disabled {
  opacity: 0.6;
}

.button-with-icon {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.color-warning {
  color: rgb(255, 166, 0);
}
.color-success {
  color: rgb(69, 187, 0);
}
</style>

<template>
  <button
    class="button button-with-icon"
    :class="{ 'button-disabled': disabled }"
    @click="() => !disabled && handleClick()"
  >
    {{ text }}
    <i
      v-if="iconClassName"
      class="mdi button-icon"
      :class="{ [iconClassName]: iconClassName }"
    ></i>
  </button>
</template>
