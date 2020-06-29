<template>
  <div id="proportions-chart"></div>
</template>

<script>
import d3 from '@/plugins/d3'

const props = {
  data: {
    type: Object,
    required: true
  }
}

const methods = {
  drawChart () {
    const self = this

    const chart = d3.select('#proportions-chart')
    const width = document.getElementById('deaths-by-race-proportional').clientWidth
    const svg = chart
      .append('svg')
      .attrs({
        width,
        height: 250
      })

    const boxHeight = 40
    const percPopRowY = 0
    const percKilledRowY = 100

    // draw perc population
    const whitePopWidth = (self.data.population.percByRace.whiteNonHispanic / 100) * width
    const blackPopWidth = (self.data.population.percByRace.black / 100) * width
    const hispanicPopWidth = (self.data.population.percByRace.hispanic / 100) * width

    const other = (self.data.population.percByRace.asian + self.data.population.percByRace.nativeAmerican + self.data.population.percByRace.pacificIslander / 100 )
    const otherPopWidth = other * width

    svg.append('rect')
      .attrs({
        x: 0,
        y: percPopRowY,
        width: blackPopWidth,
        height: boxHeight,
        fill: 'var(--accent-color)'
      })
    svg.append('rect')
      .attrs({
        x: blackPopWidth,
        y: percPopRowY,
        width: hispanicPopWidth,
        height: boxHeight,
        fill: '#666'
      })
    svg.append('rect')
      .attrs({
        x: blackPopWidth + hispanicPopWidth,
        y: percPopRowY,
        width: whitePopWidth,
        height: boxHeight,
        fill: 'var(--secondary-color)'
      })
    svg.append('rect')
      .attrs({
        x: blackPopWidth + hispanicPopWidth + whitePopWidth,
        y: percPopRowY,
        width: otherPopWidth,
        height: boxHeight,
        fill: '#444'
      })

    // draw perc police shootings bar
    const whiteWidth = self.data.policeShootings.whites * width
    const blackWidth = self.data.policeShootings.blacks * width
    const hispanicWidth = self.data.policeShootings.hispanics * width
    const otherWidth = self.data.policeShootings.other * width

    svg.append('rect')
      .attrs({
        x: 0,
        y: percKilledRowY,
        width: blackWidth,
        height: boxHeight,
        fill: 'var(--accent-color)'
      })
    svg.append('rect')
      .attrs({
        x: blackWidth,
        y: percKilledRowY,
        width: hispanicWidth,
        height: boxHeight,
        fill: '#666'
      })
    svg.append('rect')
      .attrs({
        x: blackWidth + hispanicWidth,
        y: percKilledRowY,
        width: whiteWidth,
        height: boxHeight,
        fill: 'var(--secondary-color)'
      })
    svg.append('rect')
      .attrs({
        x: blackWidth + hispanicWidth + whiteWidth,
        y: percKilledRowY,
        width: otherWidth,
        height: boxHeight,
        fill: '#444'
      })
  }
}

export default {
  name: 'ProportionsChart',
  props,
  methods,
  mounted () {
    this.drawChart()
  }
}
</script>
