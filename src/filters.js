import { monthsList } from '@/utils'

const commas = (x) => {
  if (typeof x !== 'undefined') {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
}

const formatDate = (date) => {
  let split = date.split('/')
  let month = monthsList[split[0] - 1]
  return `${month} ${split[1]}, ${split[2]}`
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

const snakeCase = (name) => {
  return name.replace(/ /g, '_').toLowerCase()
}

export default {
  commas,
  formatDate,
  genderPronoun,
  snakeCase
}
