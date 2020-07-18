<template>
  <div
    class="share-button"
    :style="buttonStyles"
    @click="goTo(link)">
    <div class="share-button-content">
      <slot name="icon"></slot>
      <span :style="$slots['icon'] ? 'padding-left: 4px;' : ''" v-if="text">{{ text }}</span>
    </div>
  </div>
  <!-- <div
    v-if="item.youtube"
    class="share-button"
    color="#FF0000"
    textColor="#ffffff"
    style="border: 0.7px solid #fff; color: #ffffff;"
    @click="goTo(item.youtube)">
    <div class="share-button-content">
      <youtube-icon slot="icon" size="28"></youtube-icon>
      <span style="padding-left: 5px; font-weight: 500;">Trailer</span>
    </div>
  </div> -->
</template>

<script>
import mixin from '@/mixin'

const mixins = [mixin]

const props = {
  link: {
    type: String,
    required: false
  },
  text: {
    type: String,
    required: false
  },
  color: {
    type: String,
    required: false,
    default: 'var(--accent-color)'
  },
  textColor: {
    type: String,
    required: false,
    default: 'black'
  },
  textButton: {
    type: Boolean,
    required: false
  }
}

const computed = {
  buttonStyles () {
    let styles = ''
    if (this.color && !this.textButton && !this.outlineButton) {
      styles += `background-color: ${this.color};`
    }
    if (this.textColor) {
      styles += `color: ${this.textColor}`;
    }
    if (this.outlineButton) {
      styles += `border: 0.7px solid ${this.textColor};`
    }
    return styles
  }
}

export default {
  name: 'LinkButton',
  mixins,
  props,
  computed
}
</script>

<style>
.share-button {
  height: 34px;
  font-family: 'Avenir';
  font-size: 13px;
  text-transform: uppercase;
  display: inline-block;
  font-weight: 900;
  letter-spacing: 1px;
  border-radius: 4px;
  margin: 15px 10px 0 0;
  cursor: pointer;
}

.share-button:hover {
  opacity: 0.9;
}

.share-button-content {
  display: flex;
  align-items: center;
  padding: 3px 10px;
  height: 100%;
}
</style>
