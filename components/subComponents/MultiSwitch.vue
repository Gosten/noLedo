<script>
module.exports = {
  computed: {},
  data() {
    return {
      selectionIndex: null,
      selectAll: true
    };
  },
  mounted() {
    this.selectionIndex = this.defaultSelectionIndex;
    if (this.enableSelectAll) {
      this.setValue(this.selectionKinds);
    } else {
      this.setValue(this.selectionKinds[this.defaultSelectionIndex]);
    }
  },
  updated() {},
  components: {},
  props: {
    selectionKinds: Array,
    defaultSelectionIndex: Number,
    setValue: Function,
    enableSelectAll: Boolean
  },
  methods: {
    handleSwitch() {
      let newIndex = this.selectionIndex;
      if (this.enableSelectAll) {
        if (this.selectAll) {
          this.selectAll = false;
        } else if (this.selectionIndex === 0) {
          newIndex = 1;
        } else {
          this.selectAll = true;
          newIndex = 0;
        }
      } else {
        newIndex = this.selectionIndex === 0 ? 1 : 0;
      }
      this.selectionIndex = newIndex;

      let newVal;
      if (this.enableSelectAll) {
        newVal = this.selectAll
          ? this.selectionKinds
          : [this.selectionKinds[newIndex]];
      } else {
        newVal = this.selectionKinds[newIndex];
      }
      this.setValue(newVal);
    }
  }
};
</script>

<style scoped type="text/css">
.switch-container {
  flex-shrink: 0;
  position: relative;
  --switch-height: 2em;
  box-sizing: content-box;
  border: 3px solid black;
  height: var(--switch-height);
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-radius: calc(1em + 2px);
}
.select-all {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.switch-background {
  height: var(--switch-height);
  background: black;
}
.switch-selection,
.selection-pill {
  display: flex;
  align-items: center;
  justify-content: center;
}
.switch-selection {
  color: white;
}

.selection-pill {
  height: 2em;
  position: absolute;
  width: calc(50% - 2px);
  font-weight: 600;
  background: white;
  border-radius: 1em;
  transition: 0.15s;
}
.no-transition {
  transition: 0s;
}
.switch-index-1 {
  transform: translate(calc(100% + 4px));
}

.select-all {
  position: absolute;
  width: 100%;
}
.select-all > div {
  width: calc(50% - 2px);
  color: black;
  font-weight: 600;
  background: white;
  border-radius: 1em;
  height: var(--switch-height);
}
</style>

<template>
  <div class="switch-container switch-background" @click="handleSwitch">
    <div
      class="switch-selection"
      v-for="(selection, index) in selectionKinds"
      :key="selection"
      :id="`selection-${index}`"
    >
      {{ selection }}
    </div>
    <div
      class="selection-pill"
      :class="{
        'switch-index-1': enableSelectAll
          ? selectionIndex === 1 && !selectAll
          : selectionIndex === 1,
        'no-transition': selectAll && enableSelectAll
      }"
    >
      {{ selectionKinds[selectionIndex] }}
    </div>
    <div v-if="selectAll && enableSelectAll" class="select-all">
      <div
        class="switch-selection"
        v-for="(selection, index) in selectionKinds"
        :key="selection"
        :id="`selection-${index}`"
      >
        {{ selection }}
      </div>
    </div>
  </div>
</template>
