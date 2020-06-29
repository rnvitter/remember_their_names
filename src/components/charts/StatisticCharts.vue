<template>
  <div>
    <h1 class="spacing" style="margin-bottom: 50px;">Know the statistics</h1>
    <div v-if="loading">Loading</div>
    <div v-else>
      <div class="spacing">
        <h2><span class="yellow">{{ totalKilled | commas }}</span> people were
        <span class="highlight-underline">fatally shot</span> by police between
        <span style="opacity: 0.7;">{{ firstRecorded.date | formatWpDates }}</span> and
        <span style="opacity: 0.7;">{{ lastRecorded.date | formatWpDates }}</span> in the United States.
        </h2>
        <div></div>
      </div>
      <div id="deaths-by-month-chart" style="margin-bottom: 50px;">
        <div class="deaths-by-month-headers">
          <div class="month-abbrev">Month</div>
          <div class="deaths-by-month-header">
            People fatally shot by police
            <template v-if="screenSize.width < 600">(scroll for more)</template>
          </div>
        </div>
        <div
          v-for="(month, monthIndex) in groupByMonth"
          :key="monthIndex"
          class="month-wrapper"
          :style="monthIndex === 0 ? 'margin-top: 1px;' : ''">
          <div class="month-abbrev">{{ getMonth(month[0]) }}</div>
          <div class="deaths-in-month">
            <div
              v-for="(item, index) in month[1]"
              :key="index"
              class="wp-box"
              :style="getBoxStyle(item)">
            </div>
          </div>
        </div>
      </div>
      <div id="deaths-by-race" class="spacing" style="margin-bottom: 50px;">
        <h2>Police shootings are not just a <span class="yellow">black</span> issue</h2>
        <div class="bars">
          <div class="bar-wrapper">
            <div>
              <div class="bar-text">White</div>
              <div class="bar-value">{{ whitesKilled.length | commas }}</div>
            </div>
            <div class="bar" :style="getBarChartStyle(whitesKilled)"></div>
          </div>
          <div class="bar-wrapper">
            <div>
              <div class="bar-text">Black</div>
              <div class="bar-value">{{ blacksKilled.length | commas }}</div>
            </div>
            <div class="bar" :style="getBarChartStyle(blacksKilled)"></div>
          </div>
          <div class="bar-wrapper">
            <div>
              <div class="bar-text">Hispanic</div>
              <div class="bar-value">{{ hispanicsKilled.length | commas }}</div>
            </div>
            <div class="bar" :style="getBarChartStyle(hispanicsKilled)"></div>
          </div>
          <div class="bar-wrapper">
            <div>
              <div class="bar-text">Unknown</div>
              <div class="bar-value">{{ unkownKilled.length | commas }}</div>
            </div>
            <div class="bar" :style="getBarChartStyle(unkownKilled)"></div>
          </div>
          <div class="bar-wrapper">
            <div>
              <div class="bar-text">Asian</div>
              <div class="bar-value">{{ asiansKilled.length | commas }}</div>
            </div>
            <div class="bar" :style="getBarChartStyle(asiansKilled)"></div>
          </div>
          <div class="bar-wrapper">
            <div>
              <div class="bar-text">Native American</div>
              <div class="bar-value">{{ nativeAmericansKilled.length | commas }}</div>
            </div>
            <div class="bar" :style="getBarChartStyle(nativeAmericansKilled)"></div>
          </div>
          <div class="bar-wrapper">
            <div>
              <div class="bar-text">Other</div>
              <div class="bar-value">{{ otherKilled.length | commas }}</div>
            </div>
            <div class="bar" :style="getBarChartStyle(otherKilled)"></div>
          </div>
        </div>
      </div>
      <div id="deaths-by-race-proportional" class="spacing">
        <h2>But they <span class="highlight-underline">disproportionally</span> affect black people.</h2>
        <proportions-chart :data="ProportionsChartData"></proportions-chart>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import { monthsAbbrevList } from '@/utils'
import ProportionsChart from '@/components/charts/ProportionsChart'

const components = {
  ProportionsChart
}

const computed = {
  ...mapGetters({
    screenSize: 'ux/screenSize',
    wpFatalPoliceShootings: 'stats/wpFatalPoliceShootings'
  }),
  // dates
  firstRecorded () {
    return this.wpFatalPoliceShootings[0]
  },
  lastRecorded () {
    return this.wpFatalPoliceShootings[this.wpFatalPoliceShootings.length - 1]
  },
  groupByMonth () {
    let data = [...this.wpFatalPoliceShootings]
    const map = new Map()
    data.forEach((item) => {
      const month = item.date.slice(0,-3)
      const collection = map.get(month)
      if (!collection) {
        map.set(month, [item])
      } else {
        collection.push(item)
      }
    })
    return map
  },
  // raw numbers by race
  totalKilled () {
    return this.wpFatalPoliceShootings.length
  },
  whitesKilled () {
    return this.wpFatalPoliceShootings.filter(p => p.race === 'W')
  },
  blacksKilled () {
    return this.wpFatalPoliceShootings.filter(p => p.race === 'B')
  },
  asiansKilled () {
    return this.wpFatalPoliceShootings.filter(p => p.race === 'A')
  },
  nativeAmericansKilled () {
    return this.wpFatalPoliceShootings.filter(p => p.race === 'N')
  },
  hispanicsKilled () {
    return this.wpFatalPoliceShootings.filter(p => p.race === 'H')
  },
  otherKilled () {
    return this.wpFatalPoliceShootings.filter(p => p.race === 'O')
  },
  unkownKilled () {
    return this.wpFatalPoliceShootings.filter(p => p.race === '' || !p.race)
  },
  topTick () {
    if (this.whitesKilled > this.blacksKilled) {
      return Math.ceil(this.whitesKilled.length / 1000) * 1000
    } else {
      return Math.ceil(this.blacksKilled.length / 1000) * 1000
    }
  },
  ProportionsChartData () {
    const other = this.asiansKilled.length + this.nativeAmericansKilled.length + this.otherKilled.length
    const total = this.totalKilled - this.unkownKilled.length
    return {
      policeShootings: {
        whites: this.whitesKilled.length / total,
        blacks: this.blacksKilled.length / total,
        hispanics: this.hispanicsKilled.length / total,
        other: other / total
      },
      population: this.censusBureauStats
    }
  }
}

const methods = {
  ...mapActions({
    getWpFatalPoliceShootingsData: 'stats/getWpFatalPoliceShootingsData'
  }),
  getMonth (date) {
    const dateSplit = date.split('-')
    const month = monthsAbbrevList[parseInt(dateSplit[1]) - 1]
    if (month === 'Jan') {
      return `${dateSplit[0]} ${month}`
    }
    return month
  },
  getBoxStyle (item) {
    // if (item.race === 'W') {
    //   return 'background-color: var(--secondary-color);'
    // }
    if (item.race === 'B') {
      return 'background-color: var(--accent-color);'
    }
    // else if (item.race === 'A') {
    //   return 'background-color: #666666;'
    // } else if (item.race === 'N') {
    //   return 'background-color: #e0e0e0;'
    // } else if (item.race === 'O') {
    //   return 'background-color: #f5f5f5;'
    // }
  },
  getBarChartStyle (group) {
    let styles = ''
    const height = `height: ${(group.length / this.topTick) * 100}%;`
    styles += height
    const color = this.getBoxStyle(group[0])
    styles += color
    return styles
  }
}

export default {
  components,
  computed,
  methods,
  data: () => ({
    loading: false,
    // TODO:
    // https://github.com/washingtonpost/data-police-shootings
    raceKey: {
      'W': 'White/non-Hispanic',
      'B': 'Black/non-Hispanic',
      'A': 'Asian',
      'N': 'Native American',
      'H': 'Hispanic',
      'O': 'Other',
      'None': 'unknown'
    },
    genderKey: {
      'M': 'Male',
      'F': 'Female',
      'None': 'unknown'
    },
    // TODO:
    // https://www.census.gov/quickfacts/fact/table/US/PST045219
    censusBureauStats: {
      population: {
        estimate: 328239523,
        footnote: 'Estimates as of July, 1 2019'
      },
      percByRace: {
        white: 76.5,
        black: 13.4,
        nativeAmerican: 1.3,
        asian: 5.9,
        pacificIslander: 0.2,
        hispanic: 18.3,
        whiteNonHispanic: 60.4
      }
    }
  }),
  beforeMount () {
    this.loading = true

    this.getWpFatalPoliceShootingsData().then(() => {
      this.loading = false;
    })
  }
}
</script>

<style>
#deaths-by-month-chart {
  overflow-x: auto;
  overflow-y: hidden;
}

.month-wrapper,
.deaths-by-month-headers {
  display: flex;
  align-items: center;
  width: 100%;
  height: 15px;
}

.deaths-by-month-headers {
  height: 20px;
  border-bottom: 0.5px solid #666666;
}

.deaths-by-month-headers .deaths-by-month-header,
.deaths-by-month-headers .month-abbrev {
  padding-bottom: 1px;
  color: #fff;
}

.deaths-by-month-header {
  font-size: 14px;
  padding-left: 5px;
}

.month-abbrev {
  min-width: 60px;
  font-size: 12px;
  text-align: end;
  padding-right: 5px;
  margin-right: 0px;
  border-right: 0.5px solid #666666;
  color: var(--secondary-color);
}

.deaths-in-month {
  display: flex;
  margin-left: 2px;
}

.wp-box {
  float: left;
  height: 12px;
  width: 2px;
  background-color: var(--secondary-color);
  margin: 1px;
}

.bars {
  display: flex;
  align-items: flex-end;
}

.bar-wrapper {
  height: 400px;
  width: calc(100% / 4);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.bar {
  margin: 10px;
  background-color: var(--secondary-color);
}

.bar-text {
  font-size: 12px;
  text-align: center;
  line-height: 12px;
}

.bar-value {
  font-family: 'Oswald', sans-serif;
  font-weight: 700;
  font-size: 20px;
  text-align: center;
  margin-top: 2px;
}
</style>
