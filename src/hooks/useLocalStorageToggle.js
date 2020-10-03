import { useState } from 'react'
import setLocalStorageObj from '../helpers/setLocalStorage'

/**
 * Custom hook which toggle ON/OFF boolean state and update localStorage()
 * @param {*} initialValue The initial state value
 * @param {String} name The localStorage() key
 * @param {String} value The localStorage() value object value
 */

const useLocalStorageToggle = (initialValue, name, key) => {
  const localStorageData = JSON.parse(localStorage.getItem(name))
    ? JSON.parse(localStorage.getItem(name))
    : null

  if (localStorageData && localStorageData[key]) {
    initialValue = localStorageData[key]
  }

  const [value, setValue] = useState(initialValue)

  const toggleValue = () => setValue(!value)

  setLocalStorageObj(name, key, value)

  return [value, toggleValue]
}

export default useLocalStorageToggle
