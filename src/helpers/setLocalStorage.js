/**
 * Add an item to a localStorage() object
 * @param {String} name  The localStorage() key
 * @param {String} key   The localStorage() value object key
 * @param {String} value The localStorage() value object value
 */
const setLocalStorageObj = (name, key, value) => {
  if (typeof Storage !== 'undefined') {
    // Get the existing data
    let data = localStorage.getItem(name)

    // If no existing data, create an array
    // Otherwise, convert the localStorage string to an array
    data = data ? JSON.parse(data) : {}

    // Add new data to localStorage Array
    if (key) {
      data[key] = value
    } else {
      data = value
    }

    // Save back to localStorage
    localStorage.setItem(name, JSON.stringify(data))
  } else {
    console.info("Your browser doesn't support local storage")
  }
}

export default setLocalStorageObj
