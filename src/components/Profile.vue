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
      :dragging-distance="120"
      :autoplay="isAutoplay"
      :pause-on-hover="true"
      :duration="randomNumber(4000, 7000)"
      prevent-y-scroll>
      <vueper-slide v-if="sections.includes('has_image_on_s3')" style="background-color: var(--primary-color);">
        <template v-slot:content>
          <v-lazy-image
            :id="`${snakeCaseName}-image`"
            class="photo"
            :src="getImgUrl(person.name)">
          </v-lazy-image>
        </template>
      </vueper-slide>
      <template v-if="sections.includes('description')">
        <vueper-slide v-for="(item, index) in descriptionSections" :key="index">>
          <template v-slot:content>
              <div class="slide-content">
                <h3>
                  How {{ genderPronoun(person.gender_pronoun).subject }} Died
                  <span style="font-weight: 500; opacity: 0.7;" v-if="index > 0">(cont.)</span>
                </h3>
                <div class="slide-text">{{ item }}</div>
                <div class="read-more" v-if="index !== descriptionSections.length - 1">
                  read more
                  <arrow-right size="14"></arrow-right>
                </div>
              </div>
            </template>
        </vueper-slide>
      </template>
      <vueper-slide v-if="sections.includes('petition')">
        <template v-slot:content>
          <div class="slide-content text-center">
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
      <template v-if="sections.includes('bio')">
        <vueper-slide v-for="(item, index) in aboutSections" :key="index" class="yellow-slide">
          <template v-slot:content>
            <div class="slide-content">
              <h3>
                About {{ genderPronoun(person.gender_pronoun).possessive }} Life
                <span style="font-weight: 500;" v-if="index > 0">(cont.)</span>
              </h3>
              <div class="slide-text">{{ item }}</div>
              <div class="read-more" v-if="index !== aboutSections.length - 1">
                read more
                <arrow-right size="14"></arrow-right>
              </div>
            </div>
          </template>
        </vueper-slide>
      </template>
      <vueper-slide style="background-color: var(--primary-color); color: var(--light-text);">
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
import ArrowRight from 'mdi-vue/ArrowRight.vue'

import ButtonWrapper from './ButtonWrapper'

const props = {
  person: {
    type: Object,
    required: true
  }
}

const components = {
  ArrowRight,
  ButtonWrapper,
  VueperSlides,
  VueperSlide
}

const computed = {
  ...mapGetters({
    screenSize: 'ux/screenSize'
  }),
  aboutSections () {
    let about = this.person.bio
    return this.splitByWordCount(about, 52)
  },
  descriptionSections () {
    let description = this.person.description
    return this.splitByWordCount(description, 52)
  },
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
  },
  splitByWordCount(str, count) {
    let arr = str.split(' ')
    let r = []
    while (arr.length) {
      r.push(arr.splice(0, count).join(' '))
    }
    return r.filter(i => i !== ' ')
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
  text-align: start;
  padding: 10px;
  /* margin-bottom: 10px; */
}

.profile-header:nth-child(even) {
  background-color: var(--secondary-color);
  text-align: center;
  padding: 10px 0;
  /* margin-bottom: 10px; */
}

.profile-name {
  font-size: 20px;
  margin-bottom: 0px;
}

.subtitle {
  color: var(--secondary-color);
  font-family: 'Oswald', sans-serif;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-left: 1px;
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
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  text-align: start;
}

.yellow-slide {
  background-color: var(--accent-color);
  color: var(--dark-text);
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
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  width: 100%;
}

.source {
  word-break: break-all;
  margin-bottom: 4px;
  font-weight: 400;
  display: block;
  font-size: 10px;
  line-height: 14px;
  width: 100%;
}

.photo {
  width: 100%;
}

.read-more {
  margin: 5px 0;
  font-weight: 700;
  opacity: 0.7;
  font-size: 13px;
  width: 100%;
  text-align: right;
}

@media only screen and (max-width: 600px) {
  .profile {
    width: 100%;
  }
}
</style>
