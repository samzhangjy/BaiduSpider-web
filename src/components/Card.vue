<template>
  <div>
    <br v-if="coverType == 'imageFlip' && cover == undefined" />
    <div class="bd-card" v-if="coverType" :class="`${coverType == 'imageFlip' && cover != undefined ? 'bd-card-equal' : ''}`">
      <video
        :src="cover"
        v-if="coverType == 'video'"
        controls="controls"
        class="bd-card-video"
      ></video>
      <img class="bd-card-img" :src="cover" v-if="coverType == 'imageFlip' && cover != undefined" style="border-radius: 15px; width: 200%" />
      <div style="padding: 10px">
        <h2 class="grid" v-if="flip == undefined">
          <div class="bd-card-title" style="padding: 10px" v-if="coverType == 'none'">
            <span v-if="!url">{{ title }}</span>
            <a :href="url" target="_blank" v-else>
              {{ title }}
            </a>
          </div>
          <div class="bd-card-title" style="padding: 10px" v-if="coverType == 'imageFlip' && cover != undefined">
            <span v-if="!url" style="font-size: 70%">{{ title }}</span>
            <a :href="url" target="_blank" style="font-size: 70%" v-else>
              {{ title }}
            </a>
          </div>
          <div class="bd-card-title" style="padding: 10px; padding-top: 0px" v-if="coverType == 'imageFlip' && cover == undefined">
            <span v-if="!url" style="font-size: 70%">{{ title }}</span>
            <a :href="url" target="_blank" style="font-size: 70%" v-else>
              {{ title }}
            </a>
          </div>
          <div class="col-8 bd-card-title" style="padding: 10px" v-if="coverType == 'image'">
            <span v-if="!url">{{ title }}</span>
            <a :href="url" target="_blank" v-else>
              {{ title }}
            </a>
          </div>
          <div class="col-4" v-if="coverType == 'image'">
            <img class="bd-card-img" :src="cover" style="width: 200px" />
          </div>
          <div class="bd-card-title" style="padding: 10px" v-if="coverType == 'video'">
            <span v-if="!url">{{ title }}</span>
            <a :href="url" target="_blank" v-else>
              {{ title }}
            </a>
          </div>
        </h2>
        <p v-if="coverType == 'imageFlip' && cover == undefined" class="bd-card-subtitle" style="padding-bottom: 20px">{{ subtitle }}</p>
        <p v-else class="bd-card-subtitle" style="padding-bottom: 20px; padding-top: 20px" :class="`${coverType == 'imageFlip' && cover != undefined ? 'bd-card-subtitle-bottom' : ''}`">{{ subtitle }}</p>
        <slot></slot>
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
import SearchService from '../services/SearchService'

export default {
  name: 'bd-card',
  props: [
    'title',
    'subtitle',
    'cover',
    'url',
    'flip',
    'bottom',
    'coverType'
  ],
  created: function() {
    if (this.coverType === 'video') {
      SearchService.getVideoAddress(this.cover)
    }
  }
}
</script>
