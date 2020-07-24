<template>
  <div
    :class="['rtn-card', isSelected ? 'selected-card' : '']"
    style="width: 228px;"
    :key="`stories-${index}`">
    <img
      class="rtn-card-image"
      style="height: 100%;"
      v-if="item.has_image_on_s3 === 'TRUE'"
      :id="`${$options.filters.snakeCase(item.name)}-image`"
      :src="getImgUrl(item.name)">
    <div class="rtn-profile-fallback" v-else>
      <div class="profile-header">
        <h2 class="profile-name">{{ item.name }}</h2>
        <div class="subtitle">{{ item.date_of_death | formatDate }}</div>
      </div>
    </div>
    <div :class="['rtn-card-footer']" v-if="featured">
      <div>Story</div>
      <information-outline size="18"></information-outline>
    </div>
  </div>
</template>

<script>
import InformationOutline from 'mdi-vue/InformationOutline.vue'

import mixin from '@/mixin'

const mixins = [mixin]

const components = {
  InformationOutline
}

const props = {
  item: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  },
  featured: {
    type: Boolean,
    required: false
  },
  isSelected: {
    type: Boolean,
    required: true
  }
}

export default {
  name: 'ProfileCard',
  mixins,
  props,
  components
}
</script>
