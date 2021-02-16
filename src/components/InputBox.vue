<template>
  <div class="bd-inputbox-container">
    <form>
      <input
        v-bind:value="modelValue"
        v-on:input="updateVal($event.target.value)"
        class="bd-input bd-inputbox"
        :class="`bd-input-size-${size}`"
      >
      <slot class="bd-inputbox-button"></slot>
    </form>
  </div>
</template>

<script>
export default {
  name: 'bd-inputbox',
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'lg'
    }
  },
  methods: {
    updateVal: function (val) {
      this.$emit('update:modelValue', val)
    }
  }
}
</script>
