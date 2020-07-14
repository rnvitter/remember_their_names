<template>
  <div class="rtn-card" :style="item.image ? '' : 'width: 133px;'">
    <img class="rtn-card-image" :src="item.image" v-if="item.image" />
    <div class="rtn-card-fallback" v-else>
      <h3>{{ item.name }}</h3>
    </div>
    <div class="rtn-card-footer">
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
  }
}

const components = {
  InformationOutline
}

export default {
  props,
  components,
  data: () => ({
    loading: true,
    img: null,
    width: null
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
  padding: 0 8px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.2px;
  opacity: 0.95;
  border-bottom-left-radius: var(--border-radius);
  border-bottom-right-radius: var(--border-radius);
}

.rtn-card-image {
  height: 200px;
  width: auto;
  border-top-left-radius: var(--border-radius);
  border-top-right-radius: var(--border-radius);
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

.rtn-card-fallback:nth-child(odd) {
  color: var(--accent-color);
}

.rtn-card-fallback:nth-child(even) {
  color: var(--light-text);
}
</style>
