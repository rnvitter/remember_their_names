<template>
  <div id="directory">
    <div>
      <div>
        <h2 class="card-row-title">Read Their Stories</h2>
        <div class="card-row fade-in">
          <DynamicScroller
            :items="shuffledStories"
            :min-item-size="128"
            key-field="name"
            direction="horizontal"
            class="card-row fade-in">
            <template slot-scope="{ item, index, active }">
              <DynamicScrollerItem
                :item="item"
                :active="active"
                :size-dependencies="[
                  item.image,
                ]"
                :data-index="index"
                style="height: 100%;">
                <profile-card
                  :item="item"
                  :index="index"
                  :key="index"
                  :isSelected="details === item && activeRow === 'stories'"
                  @click.native="cardClick(item, 'stories')">
                </profile-card>
              </DynamicScrollerItem>
            </template>
          </DynamicScroller>
        </div>
        <profile-details :item="details" v-if="details && activeRow === 'stories'"></profile-details>
        <div>
          <h2 class="card-row-title">This Week's Curated Collection</h2>
          <DynamicScroller
            :items="featured"
            :min-item-size="128"
            key-field="name"
            direction="horizontal"
            class="card-row fade-in">
            <template slot-scope="{ item, index, active }">
              <DynamicScrollerItem
                :item="item"
                :active="active"
                :size-dependencies="[
                  item.image,
                ]"
                :data-index="index"
                style="height: 100%;">
                <profile-card
                  v-if="item.bio"
                  :item="item"
                  :index="index"
                  :key="index"
                  :featured="true"
                  :isSelected="details === item && activeRow === 'featured'"
                  @click.native="cardClick(item, 'featured')">
                </profile-card>
                <card v-else
                  :item="item"
                  :key="index"
                  :isSelected="details === item && activeRow === 'featured'"
                  @click.native="cardClick(item, 'featured')"></card>
              </DynamicScrollerItem>
            </template>
          </DynamicScroller>
          <template v-if="details && activeRow === 'featured'">
            <profile-details :item="details" v-if="details.bio"></profile-details>
            <card-details :item="details" v-else></card-details>
          </template>
        </div>
        <div v-for="(collection, rowIndex) in collections" :key="rowIndex">
          <h2 class="card-row-title">{{ collection }}</h2>
          <DynamicScroller
            :items="shuffledResources.filter(r => r.collections && r.collections.includes(collection))"
            :min-item-size="128"
            key-field="name"
            direction="horizontal"
            class="card-row fade-in">
            <template slot-scope="{ item, index, active }">
              <DynamicScrollerItem
                :item="item"
                :active="active"
                :size-dependencies="[
                  item.image,
                ]"
                :data-index="index"
                style="height: 100%;">
                <card
                  :item="item"
                  :key="index"
                  :isSelected="details === item && activeRow === rowIndex"
                  :hideFooter="footerFilterList.includes(collection)"
                  @click.native="cardClick(item, rowIndex)">
                </card>
              </DynamicScrollerItem>
            </template>
          </DynamicScroller>
          <card-details :item="details" v-if="details && activeRow === rowIndex"></card-details>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

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
    collections: 'resources/collections',
    people: 'people/list',
    resources: 'resources/list'
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
  },
  footerFilterList () {
    // TODO: move this to google sheet
    return [
      'one article a day keeps the ignorance away',
      'Movie night suggestions',
      'need a new binge-watch?',
      'Fictional books by black authors',
      'support black owned businesses',
      'the anti-racist book list',
      'podcasts for people on the go'
    ]
  }
}

const methods = {
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
    activeRow: null,
    details: null
  })
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
  color: var(--accent-color);
  font-size: 20px;
  margin: 25px 25px 10px 25px;
  text-align: center;
  user-select: none;
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
