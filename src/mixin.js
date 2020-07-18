const methods = {
  goTo (link) {
    window.open(link, '_blank')
  },
  getImgUrl (name) {
    let imageName = this.$options.filters.snakeCase(name)
    return `https://remembertheirnames-assets.s3.us-east-1.amazonaws.com/images/${imageName}.jpg`
  }
}

export default {
  methods
}