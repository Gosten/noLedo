<script>
module.exports = {
  computed: {},
  methods: {
    handleInputChange() {
      this.handleFilterInputChange({
        textFilter: this.inputValue
      });
    },
    showFilters() {
      if (this.isCollapsed) {
        this.isCollapsed = false;
        this.setIsFilterCollapsed(false);
      }
      // console.log("show");
    },
    collapseFilters() {
      this.isCollapsed = true;
      this.setIsFilterCollapsed(true);
    }
  },
  data() {
    return {
      ENABLE_GRADES,
      inputValue: "",
      isCollapsed: true
    };
  },
  mounted() {},
  updated() {},
  components: {
    "name-input": httpVueLoader("components/subComponents/NameInputLoad.vue"),
    "slider-component": httpVueLoader("components/DoubleSlider.vue")
  },
  props: {
    setIsFilterCollapsed: Function,
    handleFilterInputChange: Function
  }
};
</script>

<style scoped type="text/css">
@import url("../../css/LoadProblem.css");
.border-red {
  border-color: red;
}

.name-grade-container {
  max-width: 500px;
}

.no-author {
  grid-template-columns: 1fr;
}

.inner-container {
  width: inherit;
  padding: 1em;
  padding-top: 3em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  max-width: inherit;
}

.board-fade-enter-active {
  transition: opacity 0.2s;
  transition-delay: 0.15s;
}
.board-fade-leave-active {
  transition: opacity 0s;
  transition-delay: 0;
}
.board-fade-enter, .board-fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.filter-header-fade-enter-active {
  /* transition: opacity .1s; */
  transition-delay: 0.3s;
}
.filter-header-fade-leave-active {
  transition: opacity 0s;
}
.filter-header-fade-enter, .filter-header-fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.filter-container {
  border: 1px solid black;
  background: white;
  padding: 0 1em;
  transition: height 0.15s ease-in-out;
  height: 13.5em;
  position: relative;
}
.filter-collapsed {
  height: 3em !important;
  justify-content: center;
}
.filter-collapsed h3 {
  margin: 0.3em;
}

.close-button {
  width: 24px;
  height: 24px;
  font-size: 24px;
  padding: 0;
  margin: 0;
  background: transparent;
  color: black;
  position: absolute;
  top: 5px;
  right: 5px;
}

.filter-header-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<template>
  <div
    class="bottom-section filter-container"
    :class="{ 'filter-collapsed': isCollapsed }"
    id="bottom"
  >
    <transition name="filter-header-fade">
      <div
        class="filter-header-container"
        v-if="isCollapsed"
        @click="showFilters"
      >
        <h3>Filtr<span :v-if="ENABLE_GRADES">y</span></h3>
      </div>
    </transition>
    <transition name="board-fade">
      <div class="inner-container" v-if="!isCollapsed">
        <div :v-if="ENABLE_GRADES" class="slider-width">
          <slider-component></slider-component>
        </div>
        <input
          id="add-problem-author-input"
          class="input-name input"
          name="name-author-filter"
          type="text"
          placeholder="nazwa/autor"
          autocomplete="off"
          v-model="inputValue"
          @input="handleInputChange"
        />
        <button class="close-button" @click="collapseFilters">
          <i class="mdi mdi-close"></i>
        </button>
      </div>
    </transition>
  </div>
</template>
