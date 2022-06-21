<script>
module.exports = {
  computed: {},
  methods: {}
};
</script>

<style scoped>
.legend-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 1em;
  flex-direction: row;
  height: 4em;
}

.legend-container img {
  width: 1.5em;
  height: 1.5em;
}
.legend-item {
  min-width: 20%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-inline: 2px;
}
.legend-item p {
  margin-inline: 3px;
  font-size: 0.9em;
}
.legend-grip {
  position: relative;
}
.outline {
  left: 0;
  width: 1.5em;
  height: 1.5em;
  position: absolute;
}
.outline path {
  fill: none;
  stroke-width: 0.6em;
}
</style>

<template>
  <div class="legend-container">
    <div class="legend-item">
      <div class="legend-grip">
        <img src="images/legend-grip-color.svg" alt="legend-green" />
        <svg class="outline" viewBox="0 0 76.32 71.15">
          <path
            class="grip-selection-1"
            d="M43.62,67c-13.22-.39-24-4.61-30.2-17.34-1.66-3.44-4.59-6.24-6.66-9.5C-1.18,27.6,3.57,11.88,17.22,6.42,30.4,1.15,42.79,1.49,54.09,11.76c9.85,9,15.64,19.52,16.12,32.84.34,9.29-8,19.23-17.95,21.39A82.73,82.73,0,0,1,43.62,67Z"
          />
        </svg>
      </div>
      <p>- chwyt</p>
    </div>
    <div class="legend-item">
      <div class="legend-grip">
        <img src="images/legend-grip-color.svg" alt="legend-green" />
        <svg class="outline" viewBox="0 0 76.32 71.15">
          <path
            class="grip-selection-2"
            d="M43.62,67c-13.22-.39-24-4.61-30.2-17.34-1.66-3.44-4.59-6.24-6.66-9.5C-1.18,27.6,3.57,11.88,17.22,6.42,30.4,1.15,42.79,1.49,54.09,11.76c9.85,9,15.64,19.52,16.12,32.84.34,9.29-8,19.23-17.95,21.39A82.73,82.73,0,0,1,43.62,67Z"
          />
        </svg>
      </div>
      <p>- start / top</p>
    </div>
    <div class="legend-item">
      <div class="legend-grip">
        <img src="images/legend-grip-color.svg" alt="legend-green" />
        <svg class="outline" viewBox="0 0 76.32 71.15">
          <path
            class="grip-selection-3"
            d="M43.62,67c-13.22-.39-24-4.61-30.2-17.34-1.66-3.44-4.59-6.24-6.66-9.5C-1.18,27.6,3.57,11.88,17.22,6.42,30.4,1.15,42.79,1.49,54.09,11.76c9.85,9,15.64,19.52,16.12,32.84.34,9.29-8,19.23-17.95,21.39A82.73,82.73,0,0,1,43.62,67Z"
          />
        </svg>
      </div>
      <p>- stopień</p>
    </div>
</template>
