<template>
  <div class="profile" :id="`${snakeCaseName}`">
    <div class="profile-header">
      <h2 class="profile-name">{{ person.name }}</h2>
      <div class="subtitle">{{ person.date_of_death | formatDate }}</div>
    </div>
    <carousel
      :ref="`${snakeCaseName}-carousel`"
      class="content-square"
      paginationActiveColor="var(--accent-color)"
      :perPage="1"
      :paginationPadding="3"
      :paginationSize="5"
      :minSwipeDistance="150"
      :navigateTo="startingIndex">
      <slide v-if="sections.includes('has_image_on_s3')" class="square">
        <v-lazy-image
          :id="`${snakeCaseName}-image`"
          class="photo"
          :src="getImgUrl(person.name)"
          alt="bio-photo">
        </v-lazy-image>
      </slide>
      <slide v-if="sections.includes('description')">
        <div class="slide-content">
          <h3>How {{ genderPronoun(person.gender_pronoun).subject }} Died</h3>
          <div class="slide-text">{{ person.description }}</div>
        </div>
      </slide>
      <slide v-if="sections.includes('petition')">
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
      </slide>
      <slide v-if="sections.includes('bio')">
        <div class="slide-content">
          <h3>About {{ genderPronoun(person.gender_pronoun).possessive }} Life</h3>
          <div class="slide-text">{{ person.bio }}</div>
        </div>
        <div class="slide-text">{{ person.bio }}</div>
      </slide>
      <slide>
        <div class="slide-content">
          <h3>Our Sources</h3>
          <a class="source" v-for="(source, index) in sources" :key="index" :href="source" target="_blank">{{ source }}</a>
        </div>
      </slide>
    </carousel>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Carousel, Slide } from 'vue-carousel'

import ButtonWrapper from './ButtonWrapper'

const props = {
  person: {
    type: Object,
    required: true
  }
}

const components = {
  ButtonWrapper,
  Carousel,
  Slide
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
  startingIndex () {
    if (this.sections.includes('has_image_on_s3')) {
      return 0
    }
    return Math.floor((Math.random() * this.sections.length) + 0)
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
  margin: 20px 5px;
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

.VueCarousel-wrapper {
  position: relative;
  width: 100%;
  /* padding: 20px; */
}

.VueCarousel-wrapper:after {
  content: "";
  display: block;
  padding-top: 100%;
}

.VueCarousel-inner {
  position: absolute;
  width: 100%;
  height: 100% !important;
}

.slide-content {
  height: 100%;
  width: 100%;
  overflow: auto;
  text-align: center;
  padding: 10px 20px;
}

.VueCarousel-slide {
  border: 1px solid var(--primary-color);
}

.VueCarousel-slide:nth-child(even) {
  background-color: var(--accent-color);
  color: var(--dark-text);
  opacity: 0.95;
}

.VueCarousel-slide:nth-child(odd),
.VueCarousel-slide:last-child {
  background-color: var(--primary-color);
  color: var(--light-text);
  font-weight: 400;
}

.VueCarousel-dot-container,
.VueCarousel-dot,
.VueCarousel-dot--active {
  margin-top: 5px !important;
  margin-bottom: 0 !important;
}

.slide-text {
  /* font-family: 'Oswald', sans-serif; */
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
}

.source {
  color: var(--light-text);
  /* text-decoration: underline; */
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
