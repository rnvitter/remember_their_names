<template>
  <div id="home" class="fade-in container">
    <div class="splash-screen">
      <div class="splash-screen-content">
        <h1 style="word-spacing: 400px;">Remember Their Names</h1>
        <div class="home-buttons">
          <button-wrapper
            text="Read Their Stories"
            :onClick="() => scrollToStories()"
            color="--accent-color"
            :leftAlign="true">
          </button-wrapper>
          <button-wrapper
            text="Know the Statistics"
            :onClick="() => $router.push({ name: 'statistics' })"
            color="--accent-color"
            :leftAlign="true">
          </button-wrapper>
          <button-wrapper
            text="Be part of the change"
            :onClick="() => $router.push({ name: 'how_to_help' })"
            color="--accent-color"
            :leftAlign="true">
          </button-wrapper>
        </div>
      </div>
    </div>
    <div class="bottom-divider" style="padding-bottom: 0px;" id="read-their-stories">
      <h2>We've recorded <span class="highlight">{{ people.length }}</span> of the countless people who have been murdered by police brutality or racially motivated violence.</h2>
      <h2>These are their stories.</h2>
    </div>
    <template v-for="(person, index) in featuredview">
      <profile :person="person" :key="`featuredview-${index}`"></profile>
    </template>
    <div class="timeline-menu">
      <div class="timeline-inputs">
        <input
          class="timeline-search"
          type="text"
          placeholder="Search"
          @input="search = $event.target.value">
        <input
          class="calendar-btn button button-clear"
          type="submit"
          @click="showCalendar = !showCalendar"
          :value="`${showCalendar ? 'Hide Calendar' : 'Show Calendar'}`">
      </div>
      <div>if you know someone we are missing from our records, please <contact-button></contact-button> at this email with their name and news sources we can use to verify. Also, please let us know if you see any incorrect information.</div>
      <calendar-wrapper v-if="showCalendar"></calendar-wrapper>
    </div>
    <template v-if="storiesLength > 0">
      <template v-for="(person, index) in allView">
        <profile :person="person" :key="`allview-${index}`"></profile>
      </template>
    </template>
    <div class="read-more-wrapper" v-if="storiesLength + featuredStories < people.length">
      <input
        class="calendar-btn button button-clear"
        type="submit"
        @click="showMore"
        value="Read More Stories">
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import { ButtonWrapper, CalendarWrapper, ContactButton, Profile, Tabs } from '@/components'

const components = {
  ButtonWrapper,
  CalendarWrapper,
  ContactButton,
  Profile,
  Tabs
}

const computed = {
  ...mapGetters({
    people: 'people/list',
    screenSize: 'ux/screenSize'
  }),
  shuffledList () {
    let people = [...this.people]
    people = this.shuffle(people)
    return people
  },
  featuredview () {
    return this.shuffledList.filter((item, index) => index <= this.featuredStories - 1)
  },
  allView () {
    if (this.search !== '') {
      return this.shuffledList.filter(p => p.name.toLowerCase().startsWith(this.search.toLowerCase()))
    } else {
      let filtered = this.shuffledList.filter((item, index) => index > this.featuredStories - 1)
      return filtered.filter((item, index) => index <= this.storiesLength - 1)
    }
  }
}

const methods = {
  scrollToStories () {
    let target = document.querySelector('#read-their-stories')
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
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
  showMore () {
    let storiesMinusFeatured = this.shuffledList.length - this.featuredStories
    if (storiesMinusFeatured - this.storiesLength < this.featuredStories) {
      this.storiesLength = storiesMinusFeatured
    } else {
      this.storiesLength = this.storiesLength + this.featuredStories
    }
  }
}

export default {
  name: 'Home',
  components,
  computed,
  methods,
  data: () => ({
    search: '',
    showCalendar: false,
    showAll: false,
    featuredStories: 6,
    storiesLength: 6
  }),
  mounted () {
    if (this.$route.hash) {
      let target = document.querySelector(this.$route.hash)
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }
}
</script>

<style>
.splash-screen {
  position: relative;
  height: 100vh;
  max-width: 400px;
  margin: 0 auto;
}

.splash-screen-content {
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
}

.splash-screen-content h1 {
  font-size: 72px;
  line-height: 80px;
  text-align: left;
}

.home-buttons .button-wrapper {
  margin-bottom: 10px;
}

.timeline-menu {
  margin-bottom: 40px;
}

.timeline-inputs {
  display: flex;
  align-items: center;
  margin: 20px 0;
}

.timeline-search {
  margin-bottom: 0;
}

.calendar-btn {
  padding-left: 0;
  margin-bottom: 0;
}

.horizontal-scroll {
  position: relative;
  display: flex;
  width: 100vw;
  overflow-x: auto;
  left: 50%;
  transform: translateX(-50vw);
}

.nav-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.timeline {
  margin-top: 20px;
}

.timeline-btn {
  position: sticky;
  bottom: 25px;
  margin-left: -7px;
  z-index: 3;
}

.timeline-btn span {
  padding: 1px 0 3px;
  background-color: var(--primary-color);
}

.read-more-wrapper {
  text-align: center;
}
</style>
