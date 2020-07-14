<template>
  <div>
    <button-wrapper
      v-if="item.custom_link_name && item.custom_link_value"
      class="link-button"
      style=""
      :text="item.custom_link_name"
      :onClick="() => goTo(item.custom_link_value)"
      color="--accent-color">
    </button-wrapper>
    <button-wrapper
      v-if="item.spotify"
      class="link-button"
      text="Spotify"
      :onClick="() => goTo(item.spotify)"
      color="#1DB954"
      textColor="#ffffff">
    </button-wrapper>
    <button-wrapper
      v-if="item.apple_music"
      class="link-button"
      text="Apple Music"
      :onClick="() => goTo(item.apple_music)"
      color="#B166CC"
      textColor="#ffffff">
    </button-wrapper>
  </div>
</template>

<script>
import ButtonWrapper from './ButtonWrapper'

const props = {
  item: {
    type: Object,
    required: true
  }
}

const methods = {
  goTo (link) {
    window.open(link, '_blank')
  }
}

const components = {
  ButtonWrapper
}

export default {
  name: 'Buttons',
  props,
  components,
  methods
}
</script>

<style>
.link-button {
  margin: 20px 10px 0 0;
  width: fit-content;
}
</style>
