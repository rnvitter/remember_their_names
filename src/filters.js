import { monthsList } from '@/utils'

const commas = (x) => {
  if (typeof x !== 'undefined') {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
}

const capitalize = (value) => {
  if (!value) return ''
  return value.toLowerCase().replace(/(^| )(\w)/g, s => s.toUpperCase())
}

const formatDate = (date) => {
  let split = date.split('/')
  let month = monthsList[split[0] - 1]
  return `${month} ${split[1]}, ${split[2]}`
}

const formatWpDates = (date) => {
  let split = date.split('-')
  let month = monthsList[parseInt(split[1]) - 1]
  return `${month} ${split[2]}, ${split[0]}`
}

const genderPronoun = (gender) => {
  const dict = {
    'he': {
      subject: 'he',
      possessive: 'his'
    },
    'she': {
      subject: 'she',
      possessive: 'her'
    }
  }

  if (typeof dict[gender.toLowerCase()] === 'undefined') {
    console.error('Need to update gender dictionary, value is not present')
    return {
      subject: 'they',
      possessive: 'their'
    }
  }
  return dict[gender.toLowerCase()]
}

const percentage = (value) => {
  if (typeof value === 'number') {
    const perc = Math.round((value * 100)).toString()
    return `${perc}%`
  }
  return value
}

const reverseSnakeCase = (name) => {
  return name.replace(/_/g, ' ').toLowerCase()
}

const snakeCase = (name) => {
  return name.replace(/ /g, '_').toLowerCase()
}

export default {
  commas,
  capitalize,
  formatDate,
  formatWpDates,
  genderPronoun,
  percentage,
  reverseSnakeCase,
  snakeCase
}
