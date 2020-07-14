<template>
  <div class="footer container">
    <div class="row" style="display: flex; justify-content: space-around;">
      <div class="link-title" @click="goTo('home')">Home</div>
      <div class="link-title" @click="goTo('about')">About Us</div>
      <!-- TODO: hook up contact us button -->
      <contact-button :linkTitle="true"></contact-button>
    </div>
  </div>
</template>

<script>
import { ContactButton } from '@/components'

const components = {
  ContactButton
}

const methods = {
  goTo (route) {
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
  height: auto;
  background-color: var(--primary-color);
  padding: 20px 10px !important;
  z-index: 6;
  margin-top: 20px;
}

.footer .link-title,
.contact-btn-wrapper .link-title {
  font-size: 16px;
}
</style>
