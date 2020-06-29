<template>
  <div>
    <h1 class="spacing" style="margin-bottom: 50px;">Be Part of the Change</h1>
    <div class="spacing bottom-divider" v-for="(link, index) in links" :key="index">
      <a class="link-title" @click="$router.push({ name: link.route })">{{ link.title }}</a>
      <div class="link-description">{{ link.description }}</div>
    </div>
    <!-- <div class="fixed-buttons container">
      <button-wrapper
        text="Read Their Stories"
        :onClick="() => $router.push({ name: 'home' })">
      </button-wrapper>
      <button-wrapper
        text="Contact Us"
        :onClick="() => {}"
        color="--accent-color">
      </button-wrapper>
    </div> -->
  </div>
</template>

<script>
import { ButtonWrapper } from '@/components'

const components = {
  ButtonWrapper
}

const computed = {
  links () {
    let links = []
    this.$router.options.routes.filter(r => r.meta && r.meta.howToHelpView)
      .forEach(r => {
        links.push({
          title: r.props.title,
          description: r.props.description,
          route: r.name
        })
      })
    return links
  }
}

export default {
  name: 'HowToHelp',
  components,
  computed
}
</script>
