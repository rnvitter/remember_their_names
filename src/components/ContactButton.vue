<template>
  <div class="contact-btn-wrapper">
    <tooltip :tooltipText="copied ? 'Our email was copied to your clipboard!' : 'Tap to copy our email to your clipboard!'">
      <a :class="['contact-us-btn', linkTitle ? 'link-title' : '']" @click="copyEmail">{{ text }}</a>
    </tooltip>
    <span id="contact-us-email" style="display: none;">help@remembertheirnames.io</span>
  </div>
</template>

<script>
import Tooltip from './Tooltip'

const components = {
  Tooltip
}

const props = {
  linkTitle: {
    type: Boolean,
    required: false
  },
  text: {
    type: String,
    required: false,
    default: 'Contact Us'
  }
}

const methods = {
  copyEmail () {
    var email = document.getElementById('contact-us-email')
    var textArea = document.createElement('textarea')
    textArea.value = email.textContent
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand("Copy")
    textArea.remove()
    this.copied = true
  }
}

export default {
  name: 'ContactButton',
  components,
  props,
  methods,
  data: () => ({
    copied: false
  })
}
</script>

<style>
.contact-btn-wrapper {
  display: inline-block;
}

.contact-us-btn {
  cursor: pointer;
  color: var(--accent-color);
  text-decoration: underline;
}
</style>
