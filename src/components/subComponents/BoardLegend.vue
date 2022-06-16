<script>
module.exports = {
  computed: {},
  methods: {}
};
</script>

<style scoped>
.legend-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 1em;
  flex-direction: row;
  height: 4em;
}
.legend-container img {
  width: 1em;
  height: 1em;
}
.legend-item {
  min-width: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-inline: 2px;
}
.legend-item p {
  margin-inline: 3px;
  font-size: 0.9em;
}
</style>

<template>
  <div class="legend-container">
    <div class="legend-item">
      <img src="images/legend-green.png" alt="legend-green" />
      <p>- chwyt</p>
    </div>
    <div class="legend-item">
      <img src="images/legend-red.png" alt="legend-red" />
      <p>- start/stop</p>
    </div>
    <div class="legend-item">
      <img src="images/legend-blue.png" alt="legend-blue" />
      <p>- stopień</p>
    </div>
    <div class="legend-item">
      <img src="images/legend-yellow.png" alt="legend-yellow" />
      <p>- ????</p>
    </div>
  </div>
</template>
