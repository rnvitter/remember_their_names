<template>
  <div class="profile-two" :id="`${snakeCaseName}`">
    <!-- <div class="profile-header">
      <h2 class="profile-name">{{ person.name }}</h2>
      <div class="subtitle">{{ person.date_of_death | formatDate }}</div>
    </div> -->
    <div class="row">
      <v-lazy-image
        v-if="person.has_image_on_s3"
        :id="`${snakeCaseName}-image`"
        class="profile-two-photo"
        :src="getImgUrl(person.name)">
      </v-lazy-image>
      <div class="profile-info">
        <div class="profile-two-header">
          <h2 style="margin-bottom: 0;">{{ person.name }}</h2>
          <div>
            <input
              v-if="person.donation_link"
              class="button button-clear"
              style="margin-right: 10px;"
              type="submit"
              value="Donate"
              @click="goTo(person.donation_link)">
            <input
              v-if="person.petition_link"
              class="button button-clear"
              type="submit"
              value="Sign The Petition"
              @click="goTo(person.petition_link)">
          </div>
        </div>
        <div style="height: calc(100% - 40px); overflow: auto; padding-bottom: 30px;">
          <div class="slide-content">
            <h3>How {{ genderPronoun(person.gender_pronoun).subject }} Died</h3>
            <div class="slide-text">{{ person.description }}</div>
          </div>
          <div class="slide-content">
            <h3>About {{ genderPronoun(person.gender_pronoun).possessive }} Life</h3>
            <div class="slide-text">{{ person.bio }}</div>
          </div>
          <div class="slide-content">
            <h3>Our Sources</h3>
            <a class="source" v-for="(source, index) in sources" :key="index" :href="source" target="_blank">{{ source }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
  ButtonWrapper
}

const computed = {
  ...mapGetters({
    screenSize: 'ux/screenSize'
  }),
  sources () {
    return this.person.sources.split(',')
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
  name: 'Profile',
  props,
  components,
  computed,
  methods,
  data: () => ({
    snakeCaseName: null
  }),
  beforeMount () {
    this.snakeCaseName = this.$options.filters.snakeCase(this.person.name)
  }
}
</script>

<style>
.profile-two {
  margin: 10px auto;
  width: 100%;
  padding: 0 10px;
  height: 300px;
  overflow: hidden;
}

.profile-info {
  position : relative;
  height: 300px;
  background-color: #222;
  padding: 15px 10px 0 10px;
}

.profile-info:after {
  content  : "";
  position : absolute;
  z-index  : 1;
  bottom   : 0;
  left     : 0;
  pointer-events   : none;
  background-image : linear-gradient(to bottom,
                    rgba(255,255,255, 0),
                    rgba(34,34,34, 1) 90%);
  width    : 100%;
  height   : 4em;
}

.profile-two-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
  height: 30px;
  padding: 0 10px;
}

.profile-name {
  font-size: 34px;
  line-height: 38px;
  margin-bottom: 5px;
}

.subtitle {
  color: var(--secondary-color);
  font-family: 'Oswald', sans-serif;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 1px;
  text-transform: uppercase;
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

.profile-two-photo {
  width: 300px;
  height: 300px;
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
