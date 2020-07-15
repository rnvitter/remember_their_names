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
      v-if="item.youtube"
      class="link-button"
      text="YouTube"
      :onClick="() => goTo(item.youtube)"
      color="#FF0000"
      textColor="#ffffff">
    </button-wrapper>
    <button-wrapper
      v-if="item.netflix"
      class="link-button"
      text="Netflix"
      :onClick="() => goTo(item.netflix)"
      color="#E50914"
      textColor="#ffffff">
    </button-wrapper>
    <button-wrapper
      v-if="item.hbo"
      class="link-button"
      text="HBO"
      :onClick="() => goTo(item.hbo)"
      color="#2bb0d8"
      textColor="#ffffff">
    </button-wrapper>
    <button-wrapper
      v-if="item.goodreads"
      class="link-button"
      text="goodreads"
      :onClick="() => goTo(item.goodreads)"
      color="#F4F1EA"
      textColor="#000000">
    </button-wrapper>
    <button-wrapper
      v-if="item.amazon"
      class="link-button"
      text="Amazon"
      :onClick="() => goTo(item.amazon)"
      color="#f2ad58"
      textColor="#000000">
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
    <button-wrapper
      v-if="item.apple_store"
      class="link-button"
      text="Apple Apps Store"
      :onClick="() => goTo(item.apple_store)"
      color="#0071e3"
      textColor="#ffffff">
    </button-wrapper>
    <button-wrapper
      v-if="item.google_play"
      class="link-button"
      text="Google Play Store"
      :onClick="() => goTo(item.google_play)"
      color="#689f38"
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
