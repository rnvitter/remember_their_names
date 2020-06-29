<template>
  <div class="tooltip">
    <slot name="default"></slot>
    <span class="tooltiptext">{{ tooltipText }}</span>
  </div>
</template>

<script>
const props = {
  tooltipText: {
    type: String,
    required: true
  }
}

export default {
  name: 'Tooltip',
  props
}
</script>

<style>
.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 200px;
  background-color: var(--accent-color);
  color: var(--dark-text);
  font-weight: 700;
  opacity: 0.98;
  text-align: center;
  padding: 5px 10px;
  position: absolute;
  top: 24px;
  left: -20px;
  z-index: 5;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>
