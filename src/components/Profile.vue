<template>
  <div class="profile" :id="`${snakeCaseName}`">
    <div class="profile-header">
      <h2 class="profile-name">{{ person.name }}</h2>
      <div class="subtitle">{{ person.date_of_death | formatDate }}</div>
    </div>
    <vueper-slides
      :ref="`${snakeCaseName}-carousel`"
      class="no-shadow"
      bullets-outside
      :arrows="false"
      :infinite="true"
      :gap="10"
      :dragging-distance="150"
      :autoplay="isAutoplay"
      :pause-on-hover="true"
      :duration="randomNumber(4000, 7000)"
      prevent-y-scroll>
      <vueper-slide v-if="sections.includes('has_image_on_s3')" class="image-slide">
        <template v-slot:content>
          <v-lazy-image
            :id="`${snakeCaseName}-image`"
            class="photo"
            :src="getImgUrl(person.name)">
          </v-lazy-image>
        </template>
      </vueper-slide>
      <vueper-slide v-if="sections.includes('description')">
        <template v-slot:content>
          <div class="slide-content">
            <h3>How {{ genderPronoun(person.gender_pronoun).subject }} Died</h3>
            <div class="slide-text">{{ person.description }}</div>
          </div>
        </template>
      </vueper-slide>
      <vueper-slide v-if="sections.includes('petition')">
        <template v-slot:content>
          <div class="slide-content">
            <h3>{{ person.petition_title }}</h3>
            <div class="slide-text">{{ person.petition_description }}</div>
            <button-wrapper
              style="margin: 20px auto; max-width: 260px;"
              text="Sign the Petition"
              :onClick="() => goTo(person.petition_link)"
              color="--accent-color">
            </button-wrapper>
          </div>
        </template>
      </vueper-slide>
      <vueper-slide v-if="sections.includes('bio')">
        <template v-slot:content>
          <div class="slide-content">
            <h3>About {{ genderPronoun(person.gender_pronoun).possessive }} Life</h3>
            <div class="slide-text">{{ person.bio }}</div>
          </div>
        </template>
      </vueper-slide>
      <vueper-slide class="sources-slide">
        <template v-slot:content>
          <div class="slide-content">
            <h3>Our Sources</h3>
            <a class="source" v-for="(source, index) in sources" :key="index" :href="source" target="_blank">{{ source }}</a>
          </div>
        </template>
      </vueper-slide>
    </vueper-slides>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { VueperSlides, VueperSlide } from 'vueperslides'

import ButtonWrapper from './ButtonWrapper'

const props = {
  person: {
    type: Object,
    required: true
  }
}

const components = {
  ButtonWrapper,
  VueperSlides,
  VueperSlide
}

const computed = {
  ...mapGetters({
    screenSize: 'ux/screenSize'
  }),
  sections () {
    const person = this.person
    let sections = []
    if (person.has_image_on_s3 === 'TRUE') sections.push('has_image_on_s3')
    if (person.description) sections.push('description')
    if (person.petition_title && person.petition_description && person.petition_link) sections.push('petition')
    if (person.bio) sections.push('bio')
    return sections
  },
  sources () {
    return this.person.sources.split(',')
  },
  isAutoplay () {
    const odds = Math.floor((Math.random() * 6) + 0)
    return odds > 3 ? true : false
  }
}

const methods = {
  genderPronoun (gender) {
    return this.$options.filters.genderPronoun(gender)
  },
  getImgUrl (name) {
    let imageName = this.$options.filters.snakeCase(name)
    return `https://remembertheirnames-assets.s3.us-east-1.amazonaws.com/images/${imageName}.jpg`
  },
  goTo (link) {
    window.open(link, '_blank')
  },
  randomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }
}

export default {
  name: 'ProfileTwo',
  props,
  components,
  computed,
  methods,
  data: () => ({
    snakeCaseName: null,
    showSources: false
  }),
  beforeMount () {
    this.snakeCaseName = this.$options.filters.snakeCase(this.person.name)
  }
}
</script>

<style>
.profile {
  margin: 15px 5px;
  width: calc(50% - 10px);
  display: inline-block;
}

.profile-header {
  text-align: center;
  padding: 10px 0;
  /* margin-bottom: 10px; */
}

.profile-header:nth-child(even) {
  background-color: var(--secondary-color);
  text-align: center;
  padding: 10px 0;
  /* margin-bottom: 10px; */
}

.profile-name {
  margin-bottom: 0px;
}

.subtitle {
  color: var(--secondary-color);
  font-family: 'Oswald', sans-serif;
  font-size: 18px;
  font-weight: 400;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-left: 1px;
}

.vueperslide {
  overflow: auto;
}

.vueperslides__inner {
  position: relative;
  width: 100%;
  text-align: center;
  /* padding: 20px; */
}

.vueperslides__inner:after {
  content: "";
  display: block;
  padding-top: 100%;
}

.vueperslides__parallax-wrapper {
  position: absolute;
  width: 100%;
  height: 100% !important;
}

.slide-content {
  padding: 10px;
}

.vueperslide:nth-child(even) {
  background-color: var(--accent-color);
  color: var(--dark-text);
}

.image-slide {
  background-color: var(--primary-color) !important;
}

.sources-slide {
  background-color: var(--primary-color) !important;
  color: var(--light-text) !important;
}

.vueperslides__bullet {
  margin: 2px 4px;
}

.vueperslides__bullet .default {
  background-color: rgb(239, 239, 239);
  border: none;
  box-shadow: none;
  transition: 0.2s;
  width: 6px;
  height: 6px;
}

.vueperslides__bullet--active .default {
  background-color: var(--accent-color);
}

.vueperslides__bullets button {
  height: 30px;
}

.vueperslides__bullets button:focus,
.vueperslides__bullets button:hover {
  background-color: transparent;
}

.slide-text {
  /* font-family: 'Oswald', sans-serif; */
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
}

.source {
  word-break: break-all;
  margin-bottom: 8px;
  font-weight: 400;
  display: block;
  font-size: 12px;
  line-height: 16px;
}

.photo {
  width: 100%;
}

@media only screen and (max-width: 600px) {
  .profile {
    width: 100%;
  }
}
</style>
