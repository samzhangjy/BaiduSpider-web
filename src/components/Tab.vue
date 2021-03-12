<template>
  <bd-container>
    <span
      v-for="(link, index) in links"
      :key="index"
      :class="`${link.text == active ? 'bd-tab-active' : 'bd-tab'}`"
    >
      <router-link :to="link.to">
        <box-icon
          :name='link.icon'
          size="20px"
          :color="`${getColor(link)}`"
        ></box-icon>
        {{ link.text }}
      </router-link>
    </span>
    <div style="clear: both;"></div>
  </bd-container>
</template>

<script>
export default {
  name: 'bd-tab',
  props: {
    links: Array,
    active: String
  },
  methods: {
    getDark: function () {
      return document.getElementsByTagName('body')[0].classList.contains('bd-dark')
    },
    getColor: function (link) {
      const dark = this.getDark()
      if (dark && link.text == this.active) {
        return '#fff'
      } else if (!dark && link.text == this.active) {
        return '#000'
      } else if (dark) {
        return '#999'
      } else {
        return '#999EA6'
      }
    }
  }
}
</script>
