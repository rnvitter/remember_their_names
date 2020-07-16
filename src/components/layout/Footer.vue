<template>
  <div class="footer container">
    <button-wrapper
      v-if="$route.name === 'home'"
      style="max-width: 300px;"
      text="Read About Us"
      :onClick="() => goTo('about')"
      color="var(--accent-color)">
    </button-wrapper>
    <button-wrapper
      v-if="$route.name === 'about'"
      style="max-width: 300px;"
      text="Back to home"
      :onClick="() => goTo('home')"
      color="var(--accent-color)">
    </button-wrapper>
  </div>
</template>

<script>
import { ButtonWrapper, ContactButton } from '@/components'

const components = {
  ButtonWrapper,
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
  height: 100px;
  background-color: var(--primary-color);
  padding: 20px 10px !important;
  z-index: 6;
  margin-top: 20px;
  text-align: center;
}

.footer .link-title {
  margin-bottom: 5px;
}

.footer .link-title,
.contact-btn-wrapper .link-title {
  font-size: 16px;
}
</style>
