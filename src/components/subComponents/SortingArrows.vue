<script>
module.exports = {
  computed: {
    direction() {
      const { key, order } = this.sortObject;
      if (key === this.sortKey) {
        return order ? -1 : 1;
      }
      return null;
    }
  },
  methods: {},
  data() {
    return {};
  },
  mounted() {},
  updated() {},
  components: {},
  props: {
    sortObject: Object,
    sortKey: String
  }
};
</script>

<style scoped type="text/css">
.sorting-arrow-highlight {
  color: white;
}
.sorting-arrows-container {
  display: flex;
  flex-direction: column;
  color: grey;
  position: relative;
}

.sort-arrow {
  position: absolute;
}
.sort-top {
  transform: translateY(5px);
}
.sort-bottom {
  transform: translateY(-5px);
}
</style>

<template>
  <div class="sorting-arrows-container">
    <i
      class="mdi mdi-menu-up sorting-arrow sort-top"
      :class="{ 'sorting-arrow-highlight': direction === 1 }"
    ></i>
    <i
      class="mdi mdi-menu-down sorting-arrow sort-bottom"
      :class="{ 'sorting-arrow-highlight': direction === -1 }"
    ></i>
  </div>
</template>
