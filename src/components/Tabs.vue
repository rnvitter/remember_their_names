<template>
  <div class="tabs-wrapper">
    <template v-if="typeof tabs[0] === 'string'">
      <button-wrapper
        v-for="(tab, index) in tabs"
        :key="index"
        :text="tab"
        :onClick="() => $emit('tab-click', tab)"
        :color="selected === tab ? '--accent-color' : '--secondary-color'">
      </button-wrapper>
    </template>
    <template v-else>
      <button-wrapper
        v-for="(tab, index) in tabs"
        :key="index"
        :text="tab.text"
        :onClick="() => $emit('tab-click', tab.value)"
        :color="selected === tab.value ? '--accent-color' : '--secondary-color'">
      </button-wrapper>
    </template>
  </div>
</template>

<script>
import ButtonWrapper from './ButtonWrapper'

const props = {
  tabs: {
    type: Array,
    required: true
  },
  selected: {
    type: String,
    required: true
  }
}

const components = {
  ButtonWrapper
}

export default {
  props,
  components
}
</script>

<style>
.tabs-wrapper {
  display: inline-block;
}

.tabs-wrapper .button-wrapper {
  width: 100px;
}

.tabs-wrapper .button-wrapper .button {
  font-size: 16px;
  height: 36px;
}

@media only screen and (max-width: 330px) {
  .tabs-wrapper .button-wrapper {
    width: 90px;
  }
}
</style>
