<template>
  <div class="card-details">
    <h2 class="card-details-name">{{ item.name }}</h2>
    <div class="card-details-description">{{ item.description ? item.description : 'No description provided.' }}</div>
    <buttons :item="item"></buttons>
  </div>
</template>

<script>
import { Buttons } from '@/components'

const props = {
  item: {
    type: Object,
    required: true
  }
}

const components = {
  Buttons
}

export default {
  name: 'CardDetails',
  props,
  components
}
</script>

<style>
.card-details {
  margin: 0 10px;
  background: #222;
  padding: 20px;
  border-radius: var(--border-radius);
}

.card-details-description {
  max-height: 300px;
  overflow: auto;
}
</style>
