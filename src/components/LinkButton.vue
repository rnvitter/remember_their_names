<template>
  <div
    class="link-button"
    :style="buttonStyles"
    @click="link ? goTo(link) : $emit('click')">
    <div class="link-button-content">
      <slot name="icon"></slot>
      <span :style="$slots['icon'] ? 'padding-left: 4px;' : ''" v-if="text">{{ text }}</span>
    </div>
  </div>
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
.link-button {
  height: 34px;
  font-family: 'Avenir';
  font-size: 13px;
  text-transform: uppercase;
  display: inline-block;
  font-weight: 900;
  letter-spacing: 1px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
}

.link-button:last-child {
  margin-right: 0;
}

.link-button:hover {
  opacity: 0.9;
}

.link-button-content {
  display: flex;
  align-items: center;
  padding: 3px 14px;
  height: 100%;
}
</style>
