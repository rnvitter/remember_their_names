<template>
  <div class="calendar-wrapper">
    <div class="calendar-header">
      <a :class="disablePrev ? 'disabled-btn' : 'icon-button'" @click="updateDate('prev')" style="margin: 0 5px;">
        <chevron-left size="36"></chevron-left>
      </a>
      <div class="calendar-current-date">
        <span class="current-month">{{ selectedMonth }}</span>
        <div>
          <select id="year-select" @change="onYearSelect($event)" :value="year">
            <option :value="year" v-for="(year, index) in years" :key="index">{{ year }}</option>
          </select>
        </div>
      </div>
      <a :class="disableNext ? 'disabled-btn' : 'icon-button'" @click="updateDate('next')" style="margin: 0 5px;">
        <chevron-right size="36"></chevron-right>
      </a>
    </div>
    <calendar :peopleInMonth="peopleInMonth"></calendar>
    <div class="help-text">Tap on a yellow date to scroll to read their stories.</div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ChevronLeft from 'mdi-vue/ChevronLeft.vue'
import ChevronRight from 'mdi-vue/ChevronRight.vue'

import Calendar from '@/components/Calendar'
import SelectList from '@/components/SelectList'
import { monthsList } from '@/utils'

const components = {
  Calendar,
  ChevronLeft,
  ChevronRight,
  SelectList
}

const computed = {
  ...mapGetters({
    people: 'people/list',
    month: 'calendar/month',
    year: 'calendar/year'
  }),
  selectedMonth () {
    return this.months[this.month]
  },
  months () {
    let months = [...monthsList]
    const now = new Date()
    if (this.year === now.getFullYear()) {
      months = months.splice(0, now.getMonth() + 1)
    }
    return months
  },
  years () {
    let years = this.people.map(p => {
      let date = p.date_of_death.split('/')
      return parseInt(date[2])
    })
    return [...new Set(years)].sort((a, b) => a - b)
  },
  peopleInYear () {
    let people = [...this.people]
    return people.filter(p => {
      let date = p.date_of_death.split('/')
      return date[2] === this.year.toString()
    }).length
  },
  peopleInMonth () {
    let people = [...this.people]
    return people.filter(p => {
      let date = p.date_of_death.split('/')
      const month = this.months[this.month]
      const monthNumber = (this.months.indexOf(month) + 1).toString()
      return date[0] === monthNumber && date[2] === this.year.toString()
    })
  }
}

const methods = {
  ...mapActions({
    setMonth: 'calendar/setMonth',
    setYear: 'calendar/setYear'
  }),
  onYearSelect (event) {
    this.setYear(event.target.value)
    this.updateNavState()
  },
  updateDate (dir) {
    const currentMonthIndex = this.month
    const monthsInCurrentYear = this.months.length
    let currentYearIndex = this.years.indexOf(this.year)
    if (dir === 'prev') {
      if (currentMonthIndex === 0) {
        const newYear = this.years[currentYearIndex - 1]
        this.setYear(newYear)
        const newMonthIndex = this.months.length - 1
        this.setMonth(newMonthIndex)
      } else {
        const newMonthIndex = this.month - 1
        this.setMonth(newMonthIndex)
      }
    }

    if (dir === 'next') {
      if (currentMonthIndex === monthsInCurrentYear - 1) {
        const newYear = this.years[currentYearIndex + 1]
        this.setYear(newYear)
        const newMonthIndex = 0
        this.setMonth(newMonthIndex)
      } else {
        const newMonthIndex = this.month + 1
        this.setMonth(newMonthIndex)
      }
    }
    this.updateNavState()
  },
  updateNavState () {
    const currentYearIndex = this.years.indexOf(parseInt(this.year))
    if (currentYearIndex === 0 && this.month === 0) {
      this.disablePrev = true
    } else {
      this.disablePrev = false
    }
    if (currentYearIndex + 1 === this.years.length && this.month + 1 === this.months.length) {
      this.disableNext = true
    } else {
      this.disableNext = false
    }
  }
}

export default {
  name: 'CalendarView',
  components,
  computed,
  methods,
  data: () => ({
    disableNext: false,
    disablePrev: false
  }),
  beforeMount () {
    this.updateNavState()
  }
}
</script>

<style>
.calendar-current-date {
  display: flex;
  align-items: baseline;
  padding-top: 14px;
}

.current-month {
  margin-right: 5px;
}

.current-month,
#year-select {
  font-family: 'Oswald', serif;
  font-size: 20px;
  font-weight: 700;
}

#year-select {
  border: none;
  color: var(--accent-color);
  border-bottom: 1px solid var(--accent-color);
  border-radius: 0;
  width: auto;
  text-align-last: center;
  text-align: -webkit-center;
  padding: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
}

#year-select option {
  font-size: 14px;
}

.calendar-wrapper {
  font-family: 'Oswald', serif;
  text-align: left;
  margin-bottom: 50px;
}

.calendar-wrapper * {
  user-select: none;
}

.calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 20px;
  font-weight: 700;
  text-transform: uppercase;
}

.help-text {
  text-align: center;
  margin: 5px 0;
  opacity: 0.7;
}

.calendar-nav {
  color: var(--light-text);
}

.disabled-btn {
  cursor: default;
  pointer-events: none;
  color: #666666;
}
</style>
