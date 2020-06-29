<template>
  <div>
    <div class="full-profile" :id="`${snakeCaseName}`">
      <div class="event-marker" data-html2canvas-ignore="true"></div>
      <div class="vertical-line" data-html2canvas-ignore="true"></div>
      <div class="title">
        <div class="subtitle">{{ person.date_of_death | formatDate }}</div>
        <h1 style="text-align: left;">{{ person.name }}</h1>
      </div>
      <div class="description" :style="`${showModal ? 'bottom: 0px;' : 'bottom: 10px;'}`">
        <div :class="`description-text${showModal ? '' : ' overflow-text'}`" v-if="showBio">{{ person.bio }}</div>
        <div :class="`description-text${showModal ? '' : ' overflow-text'}`" v-else>{{ person.description }}</div>
        <div v-if="loading">
          <div style="text-align: center; margin-top: 10px; font-size: 14px;">Learn more at</div>
          <div class="website-url">www.remembertheirnames.io</div>
        </div>
        <div data-html2canvas-ignore="true" style="display: flex; justify-content: center; margin-top: 10px;">
          <input
            v-if="showBio && person.description"
            class="button button-clear"
            type="submit"
            @click="showBio = false"
            :value="`Read How ${genderPronoun(person.gender_pronoun).subject} Died`">
          <input
            v-else-if="!showBio && person.bio"
            v-show="person.bio"
            class="button button-clear"
            type="submit"
            @click="showBio = true"
            :value="`Read About ${genderPronoun(person.gender_pronoun).possessive} Life`">
        </div>
      </div>
      <div class="photo-wrapper">
        <a class="photo-blur">
          <v-lazy-image
            :id="`${snakeCaseName}-image`"
            class="photo"
            :src="getImgUrl(person.name)"
            alt="bio-photo"
          ></v-lazy-image>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from '@/components'
import ButtonWrapper from './ButtonWrapper'
import { mapGetters } from 'vuex'

const props = {
  person: {
    type: Object,
    required: true
  }
}

const components = {
  ButtonWrapper,
  Modal
}

const computed = {
  ...mapGetters({
    screenSize: 'ux/screenSize'
  })
}

const methods = {
  getImgUrl (name) {
    let imageName = this.$options.filters.snakeCase(name)
    return `https://s3.us-east-1.amazonaws.com/remembertheirnames.io/images/${imageName}.jpg`
  },
  genderPronoun (gender) {
    return this.$options.filters.genderPronoun(gender)
  }
}

export default {
  name: 'Profile',
  props,
  components,
  computed,
  methods,
  data: () => ({
    showBio: false,
    snakeCaseName: null,
    loading: false,
    canvas: null
  }),
  beforeMount () {
    this.snakeCaseName = this.$options.filters.snakeCase(this.person.name)
  }
}
</script>

<style scoped>
.full-profile {
  position: relative;
  height: 100vh;
  max-height: 800px;
}

.full-profile .vertical-line {
  position: absolute;
  z-index: 3;
  left: 0px;
  top: 0px;
  height: 100%;
  border-left: 4px solid var(--secondary-color);
  z-index: 3;
}

.full-profile .event-marker {
  position: absolute;
  top: 12px;
  left: -6px;
  height: 18px;
  width: 18px;
  background-color: var(--primary-color);
  border: solid 4px var(--accent-color);
  border-radius: 50%;
  z-index: 4;
}

.title {
  position: absolute;
  top: 8px;
  z-index: 2;
  margin-left: 20px;
  /* animation: fadeIn ease 3s; */
}

.description {
  position: absolute;
  text-align: center;
  z-index: 2;
  font-size: 16px;
  line-height: 22px;
  /* animation: fadeIn ease 3s; */
}

.description-text {
  padding: 10px 20px;
}

.overflow-text {
  max-height: 180px;
  overflow-y: auto;
}

.photo-wrapper {
  position: absolute;
  top: 70px;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: auto;
  z-index: 1;
  animation: fadeIn ease 1s;
}

.photo-blur {
  display: block;
  position: relative;
}

.photo {
  width: 100%;
  opacity: 0.8;
}

/* .v-lazy-image {
  opacity: 0;
  transition: opacity 4s;
}

.v-lazy-image-loaded {
  opacity: 1;
} */

.photo-blur:before {
  display:block;
  content:'';
  position:absolute;
  width:100%;
  height:100%;
  box-shadow: inset 0px 0px 20px 6px #000;
}

.website-url {
  font-family: 'Oswald';
  color: var(--accent-color);
  text-align: center;
  margin-bottom: 10px;
  font-weight: 700;
  font-size: 18px;
}

#share-image-canvas {
  width: 100% !important;
  height: auto !important;
}

.modal-share-description {
  margin: 10px 0;
  padding-top: 10px;
  text-align: center;
  border-top: 1px solid var(--secondary-color);
}

.canvas-wrapper {
  height: 100%;
  position: relative;
  width: 100%;
}

.canvas-image {
  height: 100%;
  position: relative;
  width: 100%;
  z-index: 1;
}
.shareable-image {
  height: auto;
  width: 100%;
}
</style>
