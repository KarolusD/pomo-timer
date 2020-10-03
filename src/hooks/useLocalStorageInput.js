import { useState } from 'react'
import setLocalStorageObj from '../helpers/setLocalStorage'

/**
 * Custom hook which change state and update localStorage()
 * @param {*} initialValue The initial state value
 * @param {String} name The localStorage() key
 * @param {String} value The localStorage() value object value
 */

const useLocalStorageInput = (initialValue, name, key) => {
  const localStorageData = JSON.parse(localStorage.getItem(name))
    ? JSON.parse(localStorage.getItem(name))
    : null

  if (localStorageData && localStorageData[key]) {
    initialValue = localStorageData[key]
  }

  const [value, setValue] = useState(initialValue)

  const changeValue = (changedValue) => setValue(changedValue)

  setLocalStorageObj(name, key, value)

  return [value, changeValue]
}

export default useLocalStorageInput
