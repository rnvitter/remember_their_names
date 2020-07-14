<template>
  <div class="button-wrapper">
    <div
      :class="`button${disabled ? ' disabled' : ''}`"
      :style="leftAlign ? `justify-content: flex-start; ${this.buttonStyles}` : `${this.buttonStyles}`"
      @click="onClick">
      <span >{{ text }}</span>
    </div>
  </div>
</template>

<script>
const props = {
  onClick: {
    type: Function,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: false,
    default: '--secondary-color'
  },
  textColor: {
    type: String,
    required: false,
    default: 'black'
  },
  disabled: {
    type: Boolean,
    required: false
  },
  leftAlign: {
    type: Boolean,
    required: false
  }
}

const computed = {
  buttonColor () {
    if (this.color.startsWith('--')) {
      return getComputedStyle(document.documentElement).getPropertyValue(this.color)
    }
    return this.color
  },
  buttonStyles () {
    return `background-color: ${this.buttonColor}; color: ${this.textColor};`
  }
}

export default {
  props,
  computed
}
</script>

<style>
.button {
  border-radius: var(--border-radius);
}

.button-wrapper {
  display: inline-block;
  width: 100%;
}

.disabled {
  cursor: none;
  opacity: 0.5;
  pointer-events: none;
}
</style>
