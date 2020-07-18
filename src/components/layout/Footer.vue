<template>
  <div class="footer container">
    <link-button
      v-if="$route.name === 'home'"
      style="max-width: 300px;"
      text="Read About Us"
      @click.native="routeTo('about')"
      color="var(--accent-color)">
    </link-button>
    <link-button
      v-if="$route.name === 'about'"
      style="max-width: 300px;"
      text="Back to home"
      @click.native="routeTo('home')"
      color="var(--accent-color)">
    </link-button>
  </div>
</template>

<script>
import { LinkButton } from '@/components'

const components = {
  LinkButton
}

const methods = {
  routeTo (route) {
    this.$router.push({ name: route }).catch(() => {})
  }
}

export default {
  name: 'Rtn-Footer',
  components,
  methods
}
</script>

<style>
.footer {
  height: 100px;
  background-color: var(--primary-color);
  padding: 20px 10px !important;
  z-index: 6;
  margin: 10px auto;
  text-align: center;
}
</style>
