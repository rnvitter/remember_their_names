<template>
  <div>
    <h1 class="spacing" style="margin-bottom: 50px">Know The Statistics</h1>
    <div style="min-height: 50vh;">
      <h2>Fatal Police Shootings</h2>
      <div class="link-wrapper">
        <a class="link-title" style="font-size: 18px;" @click="openLink('https://www.washingtonpost.com/graphics/investigations/police-shootings-database/')">
          The Washington Post's Police Shooting Database
        </a>
        <div class="link-description">
          The Washington Post has been creating a database of every Fata shooting by a police while they are in the line of duty. The database goes back to January 1st 2015 and is actively maintained. You can find the data
          <a @click="openLink('https://github.com/washingtonpost/data-police-shootings')">here</a>.
          One of the key findings by the Post is that <span class="stat-highlight">black Americans are killed by police at more than twice the rate of white Americans.</span>
        </div>
      </div>
      <div class="spacing bottom-divider"></div>
      <h2>How Police Spend Their Time</h2>
      <div class="link-wrapper">
        <a class="link-title" style="font-size: 18px;" @click="openLink('https://www.nytimes.com/2020/06/19/upshot/unrest-police-time-violent-crime.html')">
          The New York Times - How Do the Police Actually Spend Their Time?
        </a>
        <div class="link-description">
          This article looks at how police spend their time in several different areas around the country using data that police departments post online. <span class="stat-highlight">Only about 4% of their time is spent dealing with violent crimes.</span>
        </div>
      </div>
      <div class="spacing bottom-divider"></div>
      <h2>Racial Homogeneity of Social Networks</h2>
      <div class="link-wrapper">
        <a class="link-title" style="font-size: 18px;" @click="openLink('https://www.prri.org/research/poll-race-religion-politics-americans-social-networks/')">
          Race, Religion, and Political Affiliation of Americans’ Core Social Networks
        </a>
        <div class="link-description">
          <span class="stat-highlight">75% of white Americans report having entirely white social networks.</span> Black Americans also have pretty homogenous core social networks as well (65%), where as Hispanics and Asians tend to have more diverse groups of friends than either black or white people.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const methods = {
  openLink (link) {
    window.open(link, '_blank')
  }
}

export default {
  name: 'Statistics',
  methods
}
</script>

<style>
/* a {
  cursor: pointer;
  color: var(--accent-color);
} */

.stat-highlight {
  font-family: 'Oswald', sans-serif;
  font-weight: 700;
  text-transform: uppercase;
}
</style>
