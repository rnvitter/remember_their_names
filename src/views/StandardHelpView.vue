<template>
  <div>
    <h1 class="spacing" :style="`margin-bottom: ${selects.length === 0 ? '50px' : '20px'};`">{{ title }}</h1>
    <h2 class="app-loading" v-if="loading">
      Loading Resources
    </h2>
    <div class="fade-in" v-else>
      <div v-if="selects.length > 0">
        <div v-for="(select, index) in selects" :key="index">
          <div class="help-text">select {{ select.field | reverseSnakeCase }}</div>
          <select-list
            :items="select.values"
            :selected="selected[select.field]"
            @on-click="$set(selected, select.field, $event)">
          </select-list>
        </div>
      </div>
      <div style="min-height: 50vh;">
        <div v-if="filteredResources.length === 0" style="text-align: center;">No Resources</div>
        <template v-else>
          <div class="link-wrapper" v-for="(item, index) in filteredResources" :key="index">
            <a class="link-title" style="font-size: 18px;" @click="openLink(item.link)">
              {{ item.name }}
            </a>
            <div class="link-description">{{ item.description }}</div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import { SelectList } from '@/components'

const components = {
  SelectList
}

const props = {
  title: {
    type: String,
    required: true
  }
}

const computed = {
  filteredResources () {
    if (this.selects.length === 0) {
      return this.resources
    }
    return this.resources.filter(r => {
      const bools = []
      Object.entries(this.selected).forEach(s => {
        bools.push(r[s[0]] === s[1])
      })
      return bools.every(b => b === true) ? true : false
    })
  }
}

const methods = {
  ...mapActions({
    getResources: 'resources/get',
    getSchema: 'resources/getSchema'
  }),
  openLink (link) {
    window.open(link, '_blank')
  }
}

export default {
  name: 'StandardHelpView',
  props,
  components,
  computed,
  methods,
  data: () => ({
    loading: false,
    resources: [],
    selects: [],
    selected: {}
  }),
  beforeMount () {
    this.loading = true

    const promises = [
      this.getSchema().then((response) => {
        this.selects = response.filter(s => s.sheet.toLowerCase() === this.title.toLowerCase())
        this.selects.forEach(s => {
          s.values = s.values.split(',')
          this.$set(this.selected, s.field, s.values[0])
        })
      }),
      this.getResources({ endpoint: 'how_to_help', sheet: this.title }).then((response) => {
        this.resources = response
      })
    ]

    Promise.all(promises).then(() => {
      this.loading = false
    })
  }
}
</script>

<style>
.link-wrapper {
  margin-bottom: 20px;
}
</style>
