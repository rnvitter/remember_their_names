<template>
  <div id="directory">
    <!-- <h1 class="spacing" :style="`margin-bottom: ${collections.length === 0 ? '50px' : '20px'};`">Directory</h1> -->
    <h2 class="app-loading" v-if="loading">
      Loading Resources
    </h2>
    <div class="fade-in" v-else>
      <div>
        <div v-if="resources.length === 0" style="text-align: center;">No Resources</div>
        <template v-else>
          <h2 class="card-row-title">Read Their Stories</h2>
          <div class="card-row">
            <template v-for="(person, rowIndex) in shuffledStories">
              <div
                class="rtn-card"
                style="width: 200px"
                :key="`profile-${rowIndex}`"
                @click="cardClick(person, 'stories')">
                <v-lazy-image
                  class="rtn-card-image"
                  v-if="person.has_image_on_s3 === 'TRUE'"
                  :id="`${$options.filters.snakeCase(person.name)}-image`"
                  :src="getImgUrl(person.name)">
                </v-lazy-image>
                <div class="rtn-profile-fallback" v-else>
                  <div class="profile-header">
                    <h2 class="profile-name">{{ person.name }}</h2>
                    <div class="subtitle">{{ person.date_of_death | formatDate }}</div>
                  </div>
                </div>
              </div>
            </template>
          </div>
          <profile-two :person="details" v-if="details && activeRow === 'stories'"></profile-two>
          <div>
            <h2 class="card-row-title">This Week's Curated Collection</h2>
            <div class="card-row">
              <template v-for="(item, index) in featured">
                <card :item="item" :key="index" @click.native="cardClick(item, rowIndex)"></card>
              </template>
            </div>
            <div class="card-details" v-if="details && activeRow === rowIndex">
              <div class="card-details-name">{{ details.name }}</div>
              <div class="card-details-description">{{ details.description }}</div>
            </div>
          </div>
          <div v-for="(collection, rowIndex) in collections" :key="rowIndex">
            <h2 class="card-row-title">{{ collection }}</h2>
            <div class="card-row">
              <template v-for="(item, index) in shuffledResources.filter(r => r.collections && r.collections.includes(collection))">
                <card :item="item" :key="index" @click.native="cardClick(item, rowIndex)"></card>
              </template>
            </div>
            <div class="card-details" v-if="details && activeRow === rowIndex">
              <div class="card-details-name">{{ details.name }}</div>
              <div class="card-details-description">{{ details.description }}</div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import LinkPrevue from 'link-prevue'
import { VueperSlides, VueperSlide } from 'vueperslides'

import { Card, Profile, ProfileTwo, SelectList } from '@/components'

const components = {
  Card,
  Profile,
  ProfileTwo,
  SelectList,
  LinkPrevue,
  VueperSlides,
  VueperSlide
}

const computed = {
  ...mapGetters({
    people: 'people/list'
  }),
  shuffledStories () {
    let stories = [...this.people]
    stories = this.shuffle(stories)
    return stories
  },
  shuffledResources () {
    let resources = [...this.resources]
    resources = this.shuffle(resources)
    return resources
  },
  featured () {
    const resources = this.resources.filter(r => r.featured === 'TRUE')
    let stories = this.people.filter(r => r.featured === 'TRUE')
    // stories = stories.forEach(r => r.isStory = true)
    return this.shuffle([...resources, ...stories])
  }
}

const methods = {
  ...mapActions({
    getResources: 'resources/get',
    getSchema: 'resources/getSchema'
  }),
  cardClick (item, index) {
    if (item === this.details) {
      this.details = null
      this.activeRow = null
    } else {
      this.details = item
      this.activeRow = index
    }
  },
  openLink (link) {
    window.open(link, '_blank')
  },
  shuffle (array) {
    var currentIndex = array.length;
    var temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1

      // And swap it with the current element.
      temporaryValue = array[currentIndex]
      array[currentIndex] = array[randomIndex]
      array[randomIndex] = temporaryValue
    }
    return array
  },
  getImgUrl (name) {
    let imageName = this.$options.filters.snakeCase(name)
    return `https://remembertheirnames-assets.s3.us-east-1.amazonaws.com/images/${imageName}.jpg`
  }
}

export default {
  name: 'Directory',
  components,
  computed,
  methods,
  data: () => ({
    loading: false,
    resources: [],
    collections: [],
    details: null,
    activeRow: null
  }),
  beforeMount () {
    this.loading = true

    const promises = [
      this.getSchema().then((response) => {
        this.collections = response
      }),
      this.getResources({ endpoint: 'how_to_help', sheet: 'Resources' }).then((response) => {
        this.resources.push(...response)
      })
    ]

    Promise.all(promises).then(() => {
      this.loading = false
      console.log(this.people)
    })
  }
}
</script>

<style>
#directory {
  /* padding: 10px; */
}

.card-row {
  height: 200px;
  overflow-y: hidden;
  white-space: nowrap;
  text-align: center;
  margin-bottom: 40px;
}

.card-row-title {
  margin: 20px 0 20px 10px;
  /* color: var(--accent-color); */
  text-align: center;
  opacity: 0.9;
}

.rtn-profile-fallback {
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: initial;
  background-color: #222;
  /* border: 2px solid var(--accent-color); */
}
</style>
