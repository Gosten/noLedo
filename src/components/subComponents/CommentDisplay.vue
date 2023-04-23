<template>
  <div v-if="commentValue" class="comment-container">
    <div class="comment-box" @click="showCommentModal">
      {{ comment }}
    </div>
    <transition name="fade">
      <comment-modal
        v-if="isCommentModalOpen"
        :hide-modal="hideCommentModal"
        :comment="commentValue"
      ></comment-modal>
    </transition>
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
  components: {
    "comment-modal": httpVueLoader("./subComponents/CommentModal.vue")
  },
  methods: {
    hideCommentModal() {
      this.isCommentModalOpen = false;
    },
    showCommentModal() {
      this.isCommentModalOpen = true;
    }
  },
  data() {
    return {
      COMMENT_DISPLAY_LENGTH,
      isCommentModalOpen: false
    };
  },
  props: {
    commentValue: String
  }
};
</script>

<style scoped type="text/css">
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
