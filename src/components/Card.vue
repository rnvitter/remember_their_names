<template>
  <div
    class="rtn-card"
    :style="item.image ? '' : 'width: 133px;'">
    <img
      v-if="item.image"
      class="rtn-card-image fade-in"
      :src="item.image"
      :draggable="false">
    <!-- <v-lazy-image
      v-if="item.image"
      class="rtn-card-image fade-in"
      :src="item.image">
    </v-lazy-image> -->
    <div class="rtn-card-fallback" v-else>
      <h3>{{ item.name }}</h3>
    </div>
    <div :class="['rtn-card-footer', isSelected ? 'selected-card' : '']">
      <div>{{ item.type }}</div>
      <information-outline size="18"></information-outline>
    </div>
  </div>
</template>

<script>
import InformationOutline from 'mdi-vue/InformationOutline.vue'

const props = {
  item: {
    type: Object,
    required: true
  },
  isSelected: {
    type: Boolean,
    required: true
  }
}

const components = {
  InformationOutline
}

export default {
  props,
  components
}
</script>

<style>
.rtn-card {
  position: relative;
  display: inline-block;
  height: 100%;
  margin-right: 10px;
  cursor: pointer;
  vertical-align: top;
  border-radius: 4px;
  overflow: hidden;
}

.rtn-card-footer {
  height: 28px;
  background: #333;
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px 0;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.2px;
  opacity: 0.95;
  border-bottom: 3px solid #222;
  border-bottom-left-radius: var(--border-radius);
  border-bottom-right-radius: var(--border-radius);
}

.rtn-card-image {
  height: 200px;
  width: auto;
  border-top-left-radius: var(--border-radius);
  border-top-right-radius: var(--border-radius);
  user-drag: none;
}

h3 {
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 10px;
}

.rtn-card-fallback {
  position: absolute;
  width: 133px;
  height: 200px;
  padding: 8px;
  white-space: initial;
  background-color: #222;
  /* border: 2px solid var(--accent-color); */
}

/* .rtn-card-fallback:nth-child(odd) {
  color: var(--accent-color);
}

.rtn-card-fallback:nth-child(even) {
  color: var(--light-text);
} */
</style>
