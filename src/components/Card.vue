<template>
  <div>
    <div class="bd-card grid" @click="$router.push(to)" v-if="img">
      <div class="col-8">
        <h2 class="bd-card-title">{{ title }}</h2>
        <p class="bd-card-subtitle">{{ subtitle }}</p>
      </div>
      <div class="col-4">
        <img class="bd-card-img" :src="img" />
      </div>
    </div>
    <div class="bd-card" style="padding-bottom: 40px" v-else-if="!flip">
      <h2 class="bd-card-title" v-html="title"></h2>
      <p class="bd-card-subtitle">{{ subtitle }}</p>
    </div>
    <div class="bd-card" style="padding-top: 30px; padding-left: 25px; padding-right: 25px; padding-bottom: 5px" v-else-if="flip">
      <p class="bd-card-subtitle">{{ subtitle }}</p>
      <h2 class="bd-card-title" v-html="title"></h2>
      <p class="text-secondary">{{ bottom }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'bd-card',
  props: [
    'title',
    'subtitle',
    'img',
    'to',
    'flip',
    'bottom'
  ]
}
</script>
