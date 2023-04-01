<template>
  <div>
    <div>
      <div class="hello" cols="12">{{ greeting }} {{ who }}</div>
      <slot>
        Default slot content, replace with your own text between the component
        tags. See the
        <a
          href="https://vuejs.org/v2/guide/components-slots.html"
          target="_blank"
          >VueJS documentation for slots</a
        >
        for more information.
      </slot>
    </div>
    <button v-on:click="handleClick">message a</button>
    <menu-bar></menu-bar>
  </div>
</template>

<script>
module.exports = {
  components: {},

  props: {
    greeting: { type: String, default: "Hello" },
    who: { type: String, default: "World" }
  },

  /** Any data must be wrapped in a fn to isolate it in case this component is used multiple times */
  data: function () {
    return {};
  },

  methods: {
    handleClick: function () {
      console.log("clicked");
      uibuilder.send("abc");
    }
  }
};
</script>

<style scoped type="text/css">
.hello {
  background-color: #ffe;
  font-size: 2rem;
  text-align: center;
}
</style>
