<script>
module.exports = {
  components: {
    "name-input": httpVueLoader("components/subComponents/NameInputLoad.vue"),
    filters: httpVueLoader("components/subComponents/ProblemFilters.vue"),
    "loading-modal": httpVueLoader("components/LoadingModal.vue"),
    "slider-component": httpVueLoader("components/DoubleSlider.vue"),
    board: httpVueLoader("components/Board/Board.vue"),
    "comment-display": httpVueLoader(
      "components/subComponents/CommentDisplay.vue"
    ),
    "sorting-arrows": httpVueLoader(
      "components/subComponents/SortingArrows.vue"
    )
  },
  data() {
    return {
      listCollapsed: false,
      GRADES,
      gradeFilter: {
        from: 0,
        to: GRADES.length - 1
      },
      sliderInstance: undefined,
      mapGrade,
      parseName,
      ENABLE_GRADES,
      textInputHandle: undefined,
      sort: { key: "", order: false },
      isFilterCollapsed: true,
      textFilter: "",
      touchstartX: 0,
      isSwipeListenerSet: false,
      selectedProblemIndex: null,
      isProblemReloading: false
    };
  },
  methods: {
    setIsFilterCollapsed(isCollapsed) {
      this.isFilterCollapsed = isCollapsed;
    },
    handleFilterInputChange({ textFilter }) {
      this.textFilter = textFilter;
    },
    handleSort(key) {
      if (this.sort.key === key) this.sort.order = !this.sort.order;
      else this.sort = { key, order: true };
    },
    setNameFilter(newVal) {
      this.nameFilter = newVal;
    },
    setAuthorFilter(newVal) {
      this.authorFilter = newVal;
    },
    handleProblemSelect(problem, index) {
      if (!this.listCollapsed) {
        this.listCollapsed = true;
        this.selectedProblemIndex = index;
        this.$store.commit("selectProblem", problem);
      }
    },
    showProblemList() {
      this.handleListExpand();
      this.isFilterCollapsed = true;
      this.textFilter = "";
    },
    loadProblem() {
      this.$store.commit("selectScne", ACTIVE_PROBLEM);
      this.$store.commit("setActiveProblem", this.selectedProblem);
      sendProblem(this.selectedProblem);
    },
    editProblem() {
      this.$store.commit("selectScne", EDIT_PROBLEM);
      this.$store.commit(
        "setEditedProblem",
        JSON.parse(JSON.stringify(this.selectedProblem))
      );
    },
    listItemClass(index) {
      return `li-${index % 2}`;
    },
    liSelectedCondition(problem) {
      return this.listCollapsed && this.selectedProblem.name === problem.name;
    },
    handleListCollapsed() {
      const swipeHandle = document.getElementById("problem-swipe-container");
      swipeHandle.addEventListener("touchstart", this.handleSwipeStart);
      swipeHandle.addEventListener("touchend", this.handleSwipeEnd);
      this.isSwipeListenerSet = true;
    },
    handleListExpand() {
      const swipeHandle = document.getElementById("problem-swipe-container");
      swipeHandle.removeEventListener("touchstart", this.handleSwipeStart);
      swipeHandle.removeEventListener("touchend", this.handleSwipeEnd);
      this.listCollapsed = false;
      this.isSwipeListenerSet = false;
    },
    handleSwipeStart(e) {
      const touch = (this.touchstartX = e.changedTouches[0].screenX);
    },

    handleSwipeEnd(e) {
      const touchendX = e.changedTouches[0].screenX;
      const diff = Math.abs(touchendX - this.touchstartX);
      const diffCondition = diff > 50;
      if (diffCondition && touchendX < this.touchstartX)
        this.handleSwipe("right");
      if (diffCondition && touchendX > this.touchstartX)
        this.handleSwipe("left");

      this.touchstartX = 0;
      this.isSwipeListenerSet = false;
    },

    getNextIndex(dir) {
      let nextIndex;
      if (dir === "right") {
        nextIndex = this.selectedProblemIndex + 1;
      } else if (dir === "left") {
        nextIndex = this.selectedProblemIndex - 1;
      }
      const nextProblem = this.filteredList[nextIndex];
      if (Boolean(nextProblem)) {
        return nextIndex;
      }
      return null;
    },

    handleSwipe(dir) {
      const nextIndex = this.getNextIndex(dir);
      if (nextIndex !== null) {
        const nextProblem = this.filteredList[nextIndex];
        this.selectedProblemIndex = nextIndex;
        this.isProblemReloading = true;
        setTimeout(() => {
          this.isProblemReloading = false;
        }, 50);
        this.$store.commit("selectProblem", nextProblem);
      }
    }
  },
  beforeUnmount() {
    this.sliderInstance.destroy();
  },

  computed: {
    selectedProblem() {
      return this.$store.getters.getSelectedProblem;
    },
    problemList() {
      return [...this.$store.getters.getProblemList];
    },
    filteredList() {
      if (this.problemList) {
        let newList = [...this.problemList];
        //sort by timestamp
        newList = newList.sort((a, b) => {
          if (b.timestamp && a.timestamp) return b.timestamp - a.timestamp;
          if (b.timestamp) return 1;
          return -1;
        });
        console.log({ filterVal: this.textFilter });
        if (this.textFilter) {
          //filter by name
          //filter by author
          newList = newList.filter(
            (problem) =>
              problem.name.toUpperCase().match(this.textFilter.toUpperCase()) ||
              (problem.author &&
                problem.author
                  .toUpperCase()
                  .match(this.textFilter.toUpperCase()))
          );
        }

        console.log({ grade: this.filterGrades });
        //filter by grade
        if (this.ENABLE_GRADES) {
          const fromGrade = mapGrade(this.filterGrades.value1);
          const toGrade = mapGrade(this.filterGrades.value2);

          newList = newList.filter(
            (problem) => problem.grade >= fromGrade && problem.grade <= toGrade
          );
        }

        //sort list
        if (this.sort.key) {
          const { key, order } = this.sort;
          newList = newList.sort((p1, p2) => {
            if (order) return p1[key].localeCompare(p2[key]);
            return p2[key].localeCompare(p1[key]);
          });
        }

        return newList;
      } else return undefined;
    },
    filterGrades() {
      return this.$store.getters.getFilterSlider;
    },
    textInputFocus() {
      return this.$store.getters.getTextInputFocus;
    }
  },
  updated() {
    const { isSwipeListenerSet, listCollapsed } = this;
    if (!isSwipeListenerSet && listCollapsed) {
      this.handleListCollapsed();
    }
  }
};
</script>

<style scoped type="text/css">
@import url("../css/LoadProblem.css");
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.board-fade-enter-active {
  /* transition: opacity .1s; */
  transition-delay: 0.3s;
}
.board-fade-leave-active {
  transition: opacity 0.1s;
}
.board-fade-enter, .board-fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.swipe-fade-enter-active {
  /* transition: opacity .1s; */
  transition: opacity 0.1s;
}
.swipe-fade-leave-active {
  transition: opacity 0.1s;
}
.swipe-fade-enter, .swipe-fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.button-fade-enter-active {
  transition: opacity 0.3s;
  transition-delay: 0.4s;
}
.button-fade-leave-active {
  transition: opacity 0s;
}
.button-fade-enter, .button-fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.board-position-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: calc(100% - 2em);
}
.board-position {
  display: flex;
}

.bottom-section {
  max-width: 500px;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: calc(100vw - 2em);
  border-radius: 5px;
  bottom: 1em;
}

.preview {
  padding-top: calc(70px + 60px + 3em); /* list+menu+paddings */
  height: 100%;
}

.focus-transition {
  transition: 0.05s height ease-out !important;
}

#problem-swipe-container {
  width: 100%;
  height: 100%;
}

.problem-swipe-inner-container {
  /* width: 100%; */
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.problem-swipe-mid-container {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1.5em 1fr 1.5em;
}
.problem-swipe-arrow {
  display: flex;
  align-items: center;
  width: 1.5em;
  height: 100%;
}
.problem-swipe-arrow img {
  width: 1.5em;
  left: 0;
  opacity: 0.15;
  transform: translate(-0.6em);
}

.swipe-arrow-right {
  transform: rotate(180deg);
}

.problem-swipe-arrow-disabled {
  opacity: 0 !important;
}
</style>

<template>
  <div id="load-problem" class="flex-container content-container">
    <transition name="fade">
      <loading-modal v-if="!problemList"></loading-modal>
    </transition>

    <ul
      id="problem-list"
      :class="{
        collapsed: listCollapsed,
        'focus-transition': textInputFocus,
        'filter-section-collapsed': isFilterCollapsed
      }"
    >
      <li class="list-label">
        <span @click="() => handleSort('name')"
          >Nazwa
          <sorting-arrows :sort-object="sort" sort-key="name"></sorting-arrows
        ></span>
        <span v-if="ENABLE_GRADES" @click="() => handleSort('grade')"
          >Wycena
          <sorting-arrows :sort-object="sort" sort-key="grade"></sorting-arrows>
        </span>
      </li>
      <li
        class="li-0"
        v-if="filteredList ? Object.keys(filteredList).length === 0 : false"
      >
        <span>brak wyników</span>
      </li>
      <li
        v-for="(problem, index) in filteredList"
        :key="problem.name"
        :class="{
          [listItemClass(index)]: true,
          'li-selected': liSelectedCondition(problem)
        }"
        @click="() => handleProblemSelect(problem, index)"
      >
        <span>{{ parseName(problem) }}</span>
        <span v-if="ENABLE_GRADES">{{ problem.grade }}</span>
      </li>
    </ul>

    <transition name="board-fade">
      <!-- <div
        class="bottom-section filter-container"
        v-if="!listCollapsed"
        id="bottom"
      >
        <h3>Filtr<span v-if="ENABLE_GRADES">y</span></h3>
        <div v-if="ENABLE_GRADES" class="slider-width">
          <slider-component></slider-component>
        </div>
        <name-input
          :set-name="setNameFilter"
          :set-author="setAuthorFilter"
          :load="true"
        ></name-input>
      </div> -->

      <filters
        v-if="!listCollapsed"
        :handle-filter-input-change="handleFilterInputChange"
        :set-is-filter-collapsed="setIsFilterCollapsed"
      ></filters>
    </transition>

    <transition name="button-fade">
      <div id="bottom" class="bottom-section preview" v-if="listCollapsed">
        <div id="problem-swipe-container">
          <transition name="swipe-fade">
            <div class="problem-swipe-mid-container" v-if="!isProblemReloading">
              <div class="problem-swipe-arrow swipe-arrow-left">
                <img
                  src="images/arrow_slim_horizontal.svg"
                  alt=""
                  :class="{
                    'problem-swipe-arrow-disabled':
                      getNextIndex('left') === null
                  }"
                  @click="() => handleSwipe('left')"
                />
              </div>
              <div class="problem-swipe-inner-container">
                <div id="board-style-L" class="board-position-container">
                  <board board-id="board-L"></board>
                </div>
                <comment-display
                  :comment-value="selectedProblem.comment"
                ></comment-display>
              </div>
              <div class="problem-swipe-arrow swipe-arrow-right">
                <img
                  src="images/arrow_slim_horizontal.svg"
                  alt=""
                  :class="{
                    'problem-swipe-arrow-disabled':
                      getNextIndex('right') === null
                  }"
                  @click="() => handleSwipe('right')"
                />
              </div>
            </div>
          </transition>
        </div>
        <div id="list-buttons" class="button-container" v-if="listCollapsed">
          <!-- <button class="button" @click="editProblem">Edytuj problem</button> -->
          <button class="button" @click="showProblemList">Pokaż listę</button>
          <button class="button" @click="loadProblem">Wczytaj</button>
        </div>
      </div>
    </transition>
  </div>
</template>
