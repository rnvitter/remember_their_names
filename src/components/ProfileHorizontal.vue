<template>
  <div class="profile-horizontal" :id="`${snakeCaseName}`">
    <!-- <div class="timeline-wrapper">
      <div class="event-marker"></div>
      <div class="horizontal-line"></div>
    </div> -->
    <div class="profile-information">
      <div>
        <div class="subtitle">{{ person.date_of_death | formatDate }}</div>
        <h1 style="text-align: left;">{{ person.name }}</h1>
      </div>
      <div class="description">
        <h3>{{ `How ${genderPronoun(person.gender_pronoun).subject} Died` }}</h3>
        <div>{{ person.description }}</div>
        <h3 style="margin-top: 20px;">{{ `About ${genderPronoun(person.gender_pronoun).possessive} Life` }}</h3>
        <div>{{ person.bio }}</div>
        <div style="display: flex; justify-content: center; margin-top: 10px;"></div>
        <input
          class="button button-clear"
          style="padding-left: 0;"
          type="submit"
          @click="showSources = !showSources"
          :value="`${!showSources ? 'See' : 'Hide'} our sources`">
        <div v-if="showSources">
          <a class="source" v-for="(source, index) in sources" :key="index" :href="source" target="_blank">{{ source }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonWrapper from './ButtonWrapper'
import { mapGetters } from 'vuex'

const props = {
  person: {
    type: Object,
    required: true
  }
}

const components = {
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
.profile-horizontal .description {
  font-size: 16px;
  line-height: 22px;
}

.profile-horizontal .profile-information {
  padding: 25px 10px;
}

.profile-horizontal .source {
  color: var(--accent-color);
  text-decoration: underline;
  display: block;
  max-width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
