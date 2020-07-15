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
            <template v-for="(item, index) in shuffledStories">
              <profile-card
                :item="item"
                :index="index"
                :key="index"
                @click.native="cardClick(item, 'stories')">
              </profile-card>
            </template>
          </div>
          <profile-details :item="details" v-if="details && activeRow === 'stories'"></profile-details>
          <div>
            <h2 class="card-row-title">This Week's Curated Collection</h2>
            <div class="card-row">
              <template v-for="(item, rowIndex) in featured">
                <profile-card
                  v-if="item.bio"
                  :item="item"
                  :index="rowIndex"
                  :key="rowIndex"
                  :featured="true"
                  @click.native="cardClick(item, 'featured')">
                </profile-card>
                <card v-else
                  :item="item"
                  :key="rowIndex"
                  @click.native="cardClick(item, 'featured')"></card>
              </template>
            </div>
            <template v-if="details && activeRow === 'featured'">
              <profile-details :item="details" v-if="details.bio"></profile-details>
              <card-details :item="details" v-else></card-details>
            </template>
          </div>
          <div v-for="(collection, rowIndex) in collections" :key="rowIndex">
            <h2 class="card-row-title">{{ collection }}</h2>
            <div class="card-row">
              <template v-for="(item, index) in shuffledResources.filter(r => r.collections && r.collections.includes(collection))">
                <card :item="item" :key="index" @click.native="cardClick(item, rowIndex)"></card>
              </template>
            </div>
            <card-details :item="details" v-if="details && activeRow === rowIndex"></card-details>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import { Card, CardDetails, ProfileCard, ProfileDetails } from '@/components'
import mixin from '@/mixin'

const mixins = [mixin]

const components = {
  Card,
  CardDetails,
  ProfileCard,
  ProfileDetails
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
    let resources = this.resources.filter(r => r.featured === 'TRUE')
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
    if (item === this.details && this.activeRow === index) {
      this.details = null
      this.activeRow = null
    } else {
      this.details = item
      this.activeRow = index
    }
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
  }
}

export default {
  name: 'Directory',
  components,
  computed,
  methods,
  mixins,
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
    })
  }
}
</script>

<style>
.card-row {
  height: 228px;
  overflow-y: hidden;
  white-space: nowrap;
  text-align: center;
  margin-bottom: 10px;
  padding-left: 10px;
}

.card-row-title {
  margin: 20px;
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
