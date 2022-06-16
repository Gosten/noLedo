<script>
module.exports = {
  data() {
    return {
      scrollContainer: null,
      scrollY: 0,
      containerHeight: 0,
      scrollTarget: null
    };
  },
  methods: {
    isVisible() {
      if (this.reverse) return this.scrollY > this.containerHeight - 80;
      return this.scrollY === 0;
    },
    handleClick() {
      const scrollTarget = this.reverse ? 0 : this.containerHeight;
      this.scrollContainer.scroll({
        top: scrollTarget,
        bahavior: "smooth"
      });
    }
  },
  mounted() {
    this.scrollContainer = document.getElementById("add-problem");
    this.containerHeight = this.scrollContainer.offsetHeight;

    const getScrollPosition = () => {
      this.scrollY = this.scrollContainer.scrollTop;
    };
    this.scrollContainer.addEventListener("scroll", getScrollPosition);
  },
  props: {
    reverse: Boolean
  }
};
</script>

<style scoped>
.scroll-arrow {
  background: white;
  width: fit-content;
  height: fit-content;
  padding: 0;
  margin: 1em;
}
.scroll-arrow img {
  width: 16em;
  height: 2.5em;
}
.reverse {
  transform: rotate(180deg);
}
.scroll-arrow-container {
  display: flex;
  justify-content: center;
  width: 100%;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
}
.visible {
  opacity: 1;
}
</style>

<template>
  <div class="scroll-arrow-container" :class="{ visible: isVisible() }">
    <button class="scroll-arrow" :class="{ reverse }" @click="handleClick">
      <img src="images/arrow.svg" alt="" />
    </button>
  </div>
</template>
