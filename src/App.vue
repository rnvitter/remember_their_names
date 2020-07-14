<template>
  <div id="app">
    <div v-if="!loading">
      <h2 class="app-loading" v-if="loading">
        Loading Their Stories
      </h2>
      <router-view :key="$route.path" class="fade-in"></router-view>
      <rtn-footer></rtn-footer>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import { debounce } from '@/utils'
import RtnFooter from '@/components/layout/Footer'

const components = {
  RtnFooter
}

const methods = {
  ...mapActions({
    getPeople: 'people/get',
    setMonth: 'calendar/setMonth',
    setYear: 'calendar/setYear',
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
    loading: false
  }),
  mounted () {
    this.onResize()
    window.addEventListener('resize', debounce(() => {
      this.onResize()
    }, 1000), { passive: true })
  },
  beforeMount () {
    this.loading = true

    const d = new Date()

    let promises = [
      this.getPeople(),
      this.setYear(d.getFullYear()),
      this.setMonth(d.getMonth())
    ]

    Promise.all(promises).then(() => {
      this.loading = false
    })
  },
  beforeDestroy () {
    window.removeEventListener('resize', debounce(() => {
      this.onResize()
    }, 1000), { passive: true })
  }
}
</script>

<style>
/* z-index */
  /* profile */
    /* photo - 1 */
    /* title and description - 2 */
    /* timeline vertical line - 3 */
    /* timeline event marker - 4 */
  /* home buttons - 5 */
  /* footer - 6 */

:root {
  --primary-color: #000000;
  --accent-color: #FCE21B;
  --secondary-color: #979797;
  --light-text: #E0E0E0;
  --dark-text: #000000;
}

html, body {
  background-color: var(--primary-color);
  margin: 0;
  padding: 0;
  scroll-behavior: smooth;
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

.highlight {
  text-transform: uppercase;
  font-family: 'Oswald', sans-serif;
  font-weight: 700;
  color: var(--accent-color);
}

h1, h2, h3, .button, .link-title, .profile-name {
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
  font-size: 24px;
}

.text-center {
  text-align: center;
  justify-content: center;
}

.app-loading {
  font-family: 'Oswald', sans-serif;
  font-size: 18px;
  font-weight: 400;
  opacity: 0.7;
  text-align: center;
  margin: 100px 0;
  height: calc(100vh - 120px);
}

/* buttons */
.fixed-buttons {
  position: fixed;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
  display: inline-block;
  z-index: 5;
  width: 100%;
  animation: fadeIn ease 1s;
}

.button {
  color: var(--dark-text);
  border: none;
  font-size: 20px;
  height: 44px;
  letter-spacing: 0;
  display: flex;
  text-transform: uppercase;
  border-radius: 0;
  padding: 0 1.5rem;
  opacity: 0.95;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
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

.icon-button {
  cursor: pointer;
}

.icon-button span {
  color: var(--accent-color);
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
  margin: 20px 0;
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
  animation: fadeIn ease 1s;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@media only screen and (max-width: 330px) {
  .splash-screen-content h1 {
    font-size: 68px;
  }

  h1 {
    font-size: 32px;
  }
}
</style>
