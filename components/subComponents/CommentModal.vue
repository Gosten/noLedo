<template>
  <div id="popup-container" class="popup-container" @click="hideModal">
    <div class="popup-window comment-modal">
      <p>{{ comment }}</p>
    </div>
  </div>
</template>

<script>
module.exports = {
  props: {
    hideModal: Function,
    comment: String
  }
};
</script>

<style scoped type="text/css">
.comment-modal {
  display: block;
  text-overflow: ellipsis;
  overflow: hidden;
  overflow-y: scroll;
  text-align: justify;
  height: fit-content;
  max-height: 70vh;
  padding: 1em;
}
</style>
