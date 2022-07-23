<script>
module.exports = {};
</script>

<style scoped>
#landscape-block {
  width: 100vw;
  height: 100vh;
  background: black;
  z-index: 999999999;
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  color: white;
  font-size: 1.5em;
  font-weight: 600;
  justify-content: center;
  align-items: center;
}
@media screen and (orientation: landscape) {
  #landscape-block {
    display: flex !important;
  }
}
</style>

<template>
  <div id="landscape-block"><p>Brak obsługi dla trybu horyzontalnego</p></div>
</template>
