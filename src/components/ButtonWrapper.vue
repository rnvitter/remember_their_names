<template>
  <div class="button-wrapper">
    <div
      :class="`button${disabled ? ' disabled' : ''}`"
      :style="leftAlign ? `justify-content: flex-start; background-color: ${this.buttonColor};` : `background-color: ${this.buttonColor};`"
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
    return getComputedStyle(document.documentElement).getPropertyValue(this.color)
  }
}

export default {
  props,
  computed
}
</script>

<style>
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
