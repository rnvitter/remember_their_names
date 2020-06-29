<template>
  <div class="select disable-scrollbars">
    <a
      :class="`select-item-${item}`"
      :style="item === selected ? 'opacity: 1;' : 'opacity: 0.5;'"
      v-for="(item, index) in items"
      :key="index"
      @click="$emit('on-click', item)">
      {{ item }}
    </a>
  </div>
</template>

<script>
const props = {
  items: {
    type: Array,
    required: true
  },
  selected: {
    required: true
  }
}

export default {
  name: 'Select',
  props
}
</script>

<style>
.select {
  text-align: center;
  margin-bottom: 20px;
  user-select: none;
}

.select a {
  display: inline-block;
  font-family: 'Oswald', sans-serif;
  text-transform: uppercase;
  display: inline-block;
  margin-right: 20px;
  font-size: 28px;
  font-weight: 400;
  cursor: pointer;
  user-select: none;
  text-decoration: none;
}

.select-item:last-of-type {
  margin-right: 0;
}
</style>
