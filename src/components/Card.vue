<template>
  <div
    :class="['rtn-card', isSelected ? 'selected-card' : '']"
    :style="item.image && !fallback ? '' : 'width: 133px;'">
    <img
      v-if="item.image"
      v-show="!fallback"
      :class="['rtn-card-image', hideFooter ? 'rtn-card-content-fullheight' : '']"
      :style="item.text_overlay === 'TRUE' ? 'opacity: 0.3;' : ''"
      :src="item.image"
      @error="fallback = true">
    <div :class="['rtn-card-fallback', hideFooter ? 'rtn-card-content-fullheight' : '']" v-else-if="!item.image || fallback">
      <h3>{{ item.name }}</h3>
    </div>
    <div class="overlay-text" v-if="(item.text_overlay === 'TRUE' && item.image) || fallback">
      <h3>{{ item.name }}</h3>
    </div>
    <div :class="['rtn-card-footer']" v-if="!hideFooter">
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
  },
  hideFooter: {
    type: Boolean,
    required: false,
    default: false
  }
}

const components = {
  InformationOutline
}

const methods = {
  getFallback () {

  }
}

export default {
  props,
  components,
  methods,
  data: () => ({
    fallback: false
  })
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
  border-bottom: 3px solid #222;
  border-bottom-left-radius: var(--border-radius);
  border-bottom-right-radius: var(--border-radius);
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
}

.rtn-card-image {
  height: 197px;
  width: auto;
  border-top-left-radius: var(--border-radius);
  border-top-right-radius: var(--border-radius);
  user-drag: none;
  opacity: 0.95;
}

.rtn-card-content-fullheight {
  height: 228px !important;
  border-bottom: 3px solid #222;
  border-bottom-left-radius: var(--border-radius);
  border-bottom-right-radius: var(--border-radius);
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
  display: flex;
  align-items: center;
  justify-content: center;
}

.overlay-text {
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  white-space: break-spaces;
  padding: 10px;
}

/* .rtn-card-fallback:nth-child(odd) {
  color: var(--accent-color);
}

.rtn-card-fallback:nth-child(even) {
  color: var(--light-text);
} */
</style>
