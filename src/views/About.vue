<template>
  <div>
    <h1 class="spacing" style="margin-bottom: 50px">About Us</h1>
    <h2 class="spacing">About this project</h2>
    <div class="spacing">Welcome to Remember Their Names. This project aims to further the Black Lives Movement and bring awareness to social justice issues in America, as well as remember the lives and stories of those who have been lost. Remember Their Names intends to accurately represent America’s history of racial inequality and provide educational content for those who are willing to broaden their perspectives. This project is open sourced and relies on our many great volunteers to collect and record the information on our site.</div>
    <h2 class="spacing">Request an addition, edit, or removal of a profile</h2>
    <div class="spacing">If you believe we missed someone, if you are a representative of a victim and would like them removed from our website, or if you would like to propose a change to a profile, please contact us.</div>
    <h2 class="spacing">Disclaimer</h2>
    <div class="spacing">This project is open sourced and relies on our many great volunteers to collect and record the information on our site. We’re doing our best to ensure that all resources provided are reliable; but like any human effort, we may make mistakes. We encourage you to examine each source critically, and please reach out if you feel we’ve provided an unreliable resource.</div>
    <h2 class="spacing">Contact Us</h2>
    <contact-button text="help@remembertheirnames.io"></contact-button>
  </div>
</template>

<script>
import { ContactButton } from '@/components'

const components = {
  ContactButton
}

export default {
  name: 'About',
  components
}
</script>
