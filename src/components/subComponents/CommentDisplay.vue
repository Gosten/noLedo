<template>
  <div class="comment-container">
    <div v-if="commentValue" class="comment-box" @click="showModal">
      {{ comment }}
    </div>
  </div>
</template>

<script>
module.exports = {
  computed: {
    comment() {
      if (this.commentValue.length < COMMENT_DISPLAY_LENGTH)
        return this.commentValue;

      return this.commentValue
        .slice(0, COMMENT_DISPLAY_LENGTH)
        .trim()
        .concat("...");
    }
  },
  data() {
    return {
      COMMENT_DISPLAY_LENGTH
    };
  },
  props: {
    commentValue: String,
    showModal: Function
  }
};
</script>

<style scoped>
.comment-container {
  width: 100%;
  padding-inline: 1em;
  margin-block: 1em;
}
.comment-box {
  border-radius: 5px;
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  text-align: justify;
  padding: 1em;
  direction: ltr;
  width: 100%;
  max-height: 15em;
  overflow: hidden;
  height: fit-content;
}
</style>
