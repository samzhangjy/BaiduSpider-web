<template>
  <input
    v-bind:value="modelValue"
    v-on:input="updateVal($event.target.value)"
    class="bd-input"
    :class="`bd-input-size-${size}`"
  >
</template>

<script>
export default {
  name: 'bd-input',
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'md'
    }
  },
  methods: {
    updateVal: function (val) {
      this.$emit('update:modelValue', val)
    }
  }
}
</script>
