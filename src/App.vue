<template>
  <div id="app">
    <!-- <rtn-header></rtn-header> -->
    <transition
      v-if="loading || minimumWait"
      name="fade"
      mode="out-in"
    >
      <div class="loading-wrapper">
        <div class="loading fade-in">
          <div class="loading-row">
            <div class="loading-text">Remember</div>
            <div class="loading-rect first-bar-animation"></div>
          </div>
          <div class="loading-row">
            <div class="loading-text">Their</div>
            <div class="loading-rect second-bar-animation"></div>
          </div>
          <div class="loading-row">
            <div class="loading-text">Names</div>
            <div class="loading-rect third-bar-animation"></div>
          </div>
          <!-- <img src="@/assets/logo.png" class="logo"> -->
        </div>
      </div>
    </transition>
    <template v-else>
      <router-view :key="$route.path"></router-view>
      <rtn-footer></rtn-footer>
    </template>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import { debounce } from '@/utils'
import RtnHeader from '@/components/layout/Header'
import RtnFooter from '@/components/layout/Footer'

const components = {
  RtnHeader,
  RtnFooter
}

const methods = {
  ...mapActions({
    getPeople: 'people/get',
    getResources: 'resources/get',
    getSchema: 'resources/getSchema',
    setScreenSize: 'ux/setScreenSize'
  }),
  onResize () {
    this.setScreenSize({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }
}

export default {
  name: 'app',
  components,
  methods,
  data: () => ({
    loading: false,
    minimumWait: true
  }),
  beforeMount () {
    this.loading = true

    setTimeout(() => {
      this.minimumWait = false
    }, 3500)

    const promises = [
      this.getPeople(),
      this.getSchema(),
      this.getResources({ endpoint: 'how_to_help', sheet: 'Resources' })
    ]

    Promise.all(promises).then(() => {
      this.loading = false
    })
  },
  mounted () {
    this.onResize()
    window.addEventListener('resize', debounce(() => {
      this.onResize()
    }, 1000), { passive: true })
  },
  beforeDestroy () {
    window.removeEventListener('resize', debounce(() => {
      this.onResize()
    }, 1000), { passive: true })
  }
}
</script>

<style>
:root {
  --primary-color: #121212;
  --accent-color: #FCE21B;
  --secondary-color: #979797;
  --light-text: #E0E0E0;
  --dark-text: #000000;
  --border-radius: 4px;
}

html, body {
  background-color: var(--primary-color);
  margin: 0;
  padding: 0;
  scroll-behavior: smooth;
  height: 100%;
}

* {
  box-sizing: border-box;
  -webkit-overflow-scrolling: touch;
}

a {
  color: #e0e0e0;
}

a:hover {
  color: #e0e0e0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #e0e0e0;
  height: 100%;
}

.container {
  max-width: 750px;
  padding: 0 10px;
}

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.disable-scrollbars::-webkit-scrollbar {
  width: 0px;
  background: transparent; /* Chrome/Safari/Webkit */
}

.disable-scrollbars {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none;  /* IE 10+ */
}

.yellow {
  color: var(--accent-color);
}

.selected-card {
  border-bottom: 3px solid var(--accent-color) !important;
}

h1, h2, h3, .loading-text, .link-title, .profile-name {
  font-family: 'Oswald', sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

h1 {
  text-align: center;
  font-size: 36px;
  line-height: 34px;
}

h2, .link-title {
  font-size: 22px;
}

.loading-wrapper {
  position: relative;
  height: 100%;
}

.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: 'Oswald', sans-serif;
  font-size: 80px;
  font-weight: 700;
  text-align: start;
  width: 430px;
  pointer-events: none;
}

.loading-row {
  position: relative
}

.loading-text {
  line-height: 80px;
  padding-bottom: 6px;
  letter-spacing: 0px;
}

.loading-rect {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
  height: 68px;
  background-color: var(--accent-color);
  z-index: 11;
  width: 100%;
}

.first-bar-animation {
  animation: firstBar ease 1s;
  animation-fill-mode: forwards;
  animation-delay: 1.5s;
}

@keyframes firstBar {
  0% {
    width: 100%;
  }
  100% {
    width: calc(100% - 376px);
  }
}

.second-bar-animation {
  animation: secondBar ease 1s;
  animation-fill-mode: forwards;
  animation-delay: 1.5s;
}

@keyframes secondBar {
  0% {
    width: 100%;
  }
  100% {
    width: calc(100% - 208px);
  }
}

.third-bar-animation {
  animation: thirdBar ease 1s;
  animation-fill-mode: forwards;
  animation-delay: 1.5s;
}

@keyframes thirdBar {
  0% {
    width: 100%;
  }
  100% {
    width: calc(100% - 237px);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 1s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}

/* buttons */
.button {
  color: var(--dark-text);
  font-weight: 900;
  font-size: 13px;
  border: none;
  height: 34px;
  display: flex;
  align-items: center;
  margin-bottom: 0;
  padding: 0 20px;
}

.button:hover {
  color: var(--dark-text);
  opacity: 0.88;
}

input.button.button-clear {
  color: var(--accent-color);
  font-size: 16px;
  padding: 0 10px;
}

input.button.button-clear:hover {
  color: var(--accent-color);
  opacity: 0.5;
}

input.button.button-clear:focus {
  color: var(--accent-color);
}

.text-button {
  cursor: pointer;
  color: var(--accent-color);
}

.text-button:hover {
  opacity: 0.7;
}

/* inputs */
input {
  font-family: 'Oswald', sans-serif;
  font-weight: 700;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.4px;
}

input:hover,
input:focus,
input:active,
input[type='email']:focus,
input[type='number']:focus,
input[type='password']:focus,
input[type='search']:focus,
input[type='tel']:focus,
input[type='text']:focus,
input[type='url']:focus,
textarea:focus,
select:focus {
  border-color: var(--accent-color);
}

/* shared */
.spacing {
  margin-bottom: 20px;
}

.bottom-divider {
  border-bottom: 1px solid var(--secondary-color);
  padding-bottom: 20px;
}

.link-title {
  color: var(--accent-color);
  text-decoration: underline;
  cursor: pointer;
}

.fade-in {
  animation: fadeIn ease 1.5s;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@media only screen and (max-width: 500px) {
  .loading {
    font-size: 58px;
    width: 300px;
  }

  .loading-text {
    line-height: 58px;
  }

  .loading-rect {
    height: 50px;
  }

  @keyframes firstBar {
    0% {
      width: 100%;
    }
    100% {
      width: calc(100% - 270px);
    }
  }

  @keyframes secondBar {
    0% {
      width: 100%;
    }
    100% {
      width: calc(100% - 150px);
    }
  }

  @keyframes thirdBar {
    0% {
      width: 100%;
    }
    100% {
      width: calc(100% - 172px);
    }
  }
}
</style>
