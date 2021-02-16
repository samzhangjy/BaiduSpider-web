<template>
  <button class="bd-btn" :class="`bd-btn-size-${size} bd-btn-color-${color}`" :type="type_">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'bd-button',
  props: {
    size: {
      type: String,
      default: 'md'
    },
    color: {
      type: String,
      default: 'primary'
    },
    type_: {
      type: String,
      default: 'button'
    }
  }
}
</script>
