export const monthsList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
export const monthsAbbrevList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

export function debounce (fn, time) {
  let timeout

  return function () {
    const functionCall = () => fn.apply(this, arguments)

    clearTimeout(timeout)
    timeout = setTimeout(functionCall, time)
  }
}

export function shuffle (arr) {
  let array = arr;
  for (let i = array.length - 1; i > 0; i--) {
    // pickup a random element
    const j = Math.floor(Math.random() * i);
    const temp = array[i];

    // swap it with the current element
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
