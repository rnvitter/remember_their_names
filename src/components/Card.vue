<template>
  <div class="rtn-card" :style="item.image ? '' : 'width: 133px;'">
    <img class="rtn-card-image" :src="item.image" v-if="item.image" />
    <div class="rtn-card-fallback" v-else>
      <h3>{{ item.name }}</h3>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

const props = {
  item: {
    type: Object,
    required: true
  }
}

const methods = {
  ...mapActions({
    getMetaData: 'resources/getMetaData'
  })
}

export default {
  props,
  methods,
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
}

.rtn-card-image {
  height: 100%;
  width: auto;
}

h3 {
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 10px;
}

.rtn-card-fallback {
  position: absolute;
  width: 133px;
  height: 100%;
  padding: 8px;
  height: 100%;
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
