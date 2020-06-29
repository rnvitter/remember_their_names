<template>
  <div id="home" class="fade-in">
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
    <div class="nav-wrapper">
      <tabs :tabs="['shuffle', 'timeline']" :selected="view" @tab-click="toggleView($event)"></tabs>
      <div v-if="view === 'shuffle'" style="margin: 0 10px;">
        <a class="icon-button" @click="autoPlay = !autoPlay" style="margin: 0 5px;">
          <pause size="36" v-if="autoPlay"></pause>
          <play size="36" v-else></play>
        </a>
        <a class="icon-button" @click="carouselMove('next')" style="margin: 0 5px;">
          <skip-next size="36"></skip-next>
        </a>
      </div>
    </div>
    <div v-if="view === 'timeline'" class="timeline">
      <profile-two
        v-for="(person, index) in filteredPeople"
        :person="person"
        :key="index">
      </profile-two>
      <div class="timeline-btn">
        <a class="icon-button" @click="scrollToStories()">
          <chevron-up-circle size="24"></chevron-up-circle>
        </a>
      </div>
    </div>
    <carousel
      v-if="view === 'shuffle'"
      ref="carousel"
      :autoplay="autoPlay"
      :autoplayTimeout="5000"
      :autoplayHoverPause="false"
      :perPage="1"
      :paginationEnabled="false"
      style="overflow: hidden;">
      <slide v-for="(person, index) in filteredPeople" :key="index">
        <profile-horizontal :person="person"></profile-horizontal>
      </slide>
    </carousel>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { Carousel, Slide } from 'vue-carousel'
import Pause from 'mdi-vue/Pause.vue'
import Play from 'mdi-vue/Play.vue'
import SkipNext from 'mdi-vue/SkipNext.vue'
import ChevronUpCircle from 'mdi-vue/ChevronUpCircle.vue'

import { ButtonWrapper, CalendarWrapper, ContactButton, Profile, ProfileTwo, ProfileHorizontal, Tabs } from '@/components'

const components = {
  ButtonWrapper,
  CalendarWrapper,
  Carousel,
  ChevronUpCircle,
  ContactButton,
  Pause,
  Play,
  Profile,
  ProfileTwo,
  ProfileHorizontal,
  Slide,
  SkipNext,
  Tabs
}

const computed = {
  ...mapGetters({
    people: 'people/list',
    screenSize: 'ux/screenSize',
    view: 'ux/view'
  }),
  filteredPeople () {
    const people = [...this.people]
    if (this.search !== '') {
      return people.filter(p => p.name.toLowerCase().startsWith(this.search.toLowerCase()))
    } else if (this.view === 'shuffle') {
      return this.shuffle(people)
    } else {
      return people
    }
  }
}

const methods = {
  ...mapActions({
    toggleView: 'ux/toggleView'
  }),
  scrollToStories () {
    let target = document.querySelector('#read-their-stories')
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  },
  carouselMove (dir) {
    if (this.autoPlay) {
      this.autoPlay = false
    }
    const carousel = this.$refs.carousel
    const currentPage = carousel.currentPage
    const pageCount = carousel.pageCount
    if (dir === 'prev') {
      let page
      if (currentPage === 0) {
        page = pageCount
      }
      this.$refs.carousel.goToPage(page)
    } else {
      const page = currentPage + 1 > pageCount ? 0 : currentPage + 1
      this.$refs.carousel.goToPage(page)
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
  name: 'Home',
  components,
  computed,
  methods,
  data: () => ({
    autoPlay: true,
    search: '',
    showCalendar: false
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
  /* opacity: 0;
  animation: 1s normal forwards fadeIn;
  animation-timing-function: ease-in;
  animation-delay: 2s; */
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

/* .splash-screen-action-btn {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 20px;
} */

.nav-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.VueCarousel-inner {
  transition: none !important;
}

/* .VueCarousel-slide {
  transition: ease 1s;
  opacity: 0 !important;
}

.VueCarousel-slide-active {
  opacity: 1 !important;
} */

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
</style>
