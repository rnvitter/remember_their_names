<template>
  <div>
    <div class="calendar">
      <div class="calendar-dates">
        <div class="days">
          <div
            class="day label"
            v-for="(day, index) in days"
            :key="index">
            {{ day }}
          </div>
        </div>
        <div id="calendar-days" class="days"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

const props = {
  peopleInMonth: {
    type: Array,
    required: true
  }
}

const computed = {
  ...mapGetters({
    people: 'people/list',
    month: 'calendar/month',
    year: 'calendar/year'
  })
}

const methods = {
  ...mapActions({
    toggleView: 'ux/toggleView'
  }),
  daysInMonth () {
    let d = new Date(this.year, this.month + 1, 0)
    return d.getDate()
  },
  loadCalendarDays () {
    document.getElementById('calendar-days').innerHTML = ''

    var tmpDate = new Date(this.year, this.month, 0)
    var num = this.daysInMonth(this.month, this.year)
    var dayOfWeek = tmpDate.getDay()

    for (let i = 0; i <= dayOfWeek; i++) {
      var blankDay = document.createElement('div')
      blankDay.classList.add('day')
      blankDay.classList.add('blank')
      document.getElementById('calendar-days').appendChild(blankDay)
    }

    for (let i = 0; i < num; i++) {
      var tmp = i + 1
      var hasAnniversary = this.hasAnniversary(tmp)
      var d = document.createElement('div')
      d.className = `day ${hasAnniversary ? `death-anniversary ${this.getId(tmp)}` : ''}`
      d.innerHTML = tmp
      document.getElementById('calendar-days').appendChild(d)
    }
  },
  getId (day) {
    let id
    this.peopleInMonth.forEach(p => {
      let splitDate = p.date_of_death.split('/')
      if (splitDate[1] === day.toString()) {
        id = this.$options.filters.snakeCase(p.name)
      }
    })
    return id ? id : ''
  },
  hasAnniversary (day) {
    return this.peopleInMonth.some(p => {
      let date = p.date_of_death.split('/')
      return date[1] === day.toString()
    })
  }
}

const watch = {
  month () {
    this.loadCalendarDays()
  },
  year () {
    this.loadCalendarDays()
  }
}

export default {
  props,
  computed,
  methods,
  watch,
  data: () => ({
    days: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
  }),
  mounted () {
    this.loadCalendarDays()
  },
  beforeMount () {
    document.addEventListener('click', (event) => {
      if (!event.target.matches('.death-anniversary')) return
      this.toggleView('timeline')
      setTimeout(() => {}, 250)
      let name = event.target.classList[2]
      let target = document.getElementById(name)
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    });
  },
  beforeDestroy () {
    document.removeEventListener('click', (event) => {
      if (!event.target.matches('.death-anniversary')) return
      this.toggleView('timeline')
      setTimeout(() => {}, 250)
      let name = event.target.classList[2]
      let target = document.getElementById(name)
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    })
  }
}
</script>

<style>
.calendar {
  text-align: start;
}

.calendar .calendar-dates .days .day {
  display: inline-block;
  width: calc((100% / 7) - 4px);
  padding: 5px 0;
  margin: 2px;
  text-align: center;
  border-radius: 0;
  font-family: 'Oswald', sans-serif;
  font-weight: 500;
  font-size: 15px;
}

.death-anniversary {
  font-weight: 700 !important;
  background-color: var(--accent-color);
  color: var(--dark-text);
  cursor: pointer;
}

.calendar .calendar-dates .days .day.blank{
  background-color: transparent;
  border: none;
}

.calendar .calendar-dates .days .day.selected:hover {
  opacity: 1;
}

.calendar .calendar-dates .days .day.label {
  height: 20px;
  color: var(--light-text);
  border: none;
  font-weight: bold;
  font-size: 12px;
  opacity: 0.6;
  text-transform: uppercase;
}

@media only screen and (max-width: 960px) {
  .calendar {
    width: 100%;
    margin: 0px;
    margin: 0px;
    box-sizing: border-box;
    position: relative;
    left: 0px;
  }
}

</style>
