import React, { Component } from 'react'
import setLocalStorageObj from '../../helpers/setLocalStorage'
import breakSound from '../../assets/sounds/break-sound.mp3'
import longBreakSound from '../../assets/sounds/long-break-sound.mp3'
import pomoSound from '../../assets/sounds/pomo-sound.mp3'
import endSound from '../../assets/sounds/end-sound.mp3'
export const MenuContext = React.createContext()

class MenuContextProvider extends Component {
  state = {
    autoStartPomo: false,
    autoStartBreak: false,
    pomoTime: 1500,
    breakTime: 300,
    longBreakTime: 900,
    longBreakEvery: 4,
    pomoRingtone: true,
    breakRingtone: true,
    soundOn: true,
    focusGoal: 6000,
  }

  componentDidMount() {
    if (!localStorage.getItem('localPomodoroSettings')) {
      setLocalStorageObj('localPomodoroSettings', null, this.state)
    } else {
      const localStorageData = JSON.parse(
        localStorage.getItem('localPomodoroSettings')
      )
      this.setState({
        ...localStorageData,
      })
    }
  }

  handleAutoStartBreak = () => {
    this.setState(
      ({ autoStartBreak }) => ({
        autoStartBreak: !autoStartBreak,
      }),
      () =>
        setLocalStorageObj(
          'localPomodoroSettings',
          'autoStartBreak',
          this.state.autoStartBreak
        )
    )
  }

  handleAutoStartPomo = () => {
    this.setState(
      ({ autoStartPomo }) => ({
        autoStartPomo: !autoStartPomo,
      }),
      () =>
        setLocalStorageObj(
          'localPomodoroSettings',
          'autoStartPomo',
          this.state.autoStartPomo
        )
    )
  }

  handlePomoTime = (time) => {
    this.setState({ pomoTime: time }, () =>
      setLocalStorageObj(
        'localPomodoroSettings',
        'pomoTime',
        this.state.pomoTime
      )
    )
  }

  handleBreakTime = (time) => {
    this.setState({ breakTime: time }, () =>
      setLocalStorageObj(
        'localPomodoroSettings',
        'breakTime',
        this.state.breakTime
      )
    )
  }

  handleLongBreakTime = (time) => {
    this.setState({ longBreakTime: time }, () =>
      setLocalStorageObj(
        'localPomodoroSettings',
        'longBreakTime',
        this.state.longBreakTime
      )
    )
  }

  handleLongBreakEvery = (every) => {
    this.setState({ longBreakEvery: every }, () =>
      setLocalStorageObj(
        'localPomodoroSettings',
        'longBreakEvery',
        this.state.longBreakEvery
      )
    )
  }

  handlePomoRingtone = () => {
    this.setState(
      ({ pomoRingtone }) => ({ pomoRingtone: !pomoRingtone }),
      () =>
        setLocalStorageObj(
          'localPomodoroSettings',
          'pomoRingtone',
          this.state.pomoRingtone
        )
    )
  }

  handleBreakRingtone = () => {
    this.setState(
      ({ breakRingtone }) => ({ breakRingtone: !breakRingtone }),
      () =>
        setLocalStorageObj(
          'localPomodoroSettings',
          'breakRingtone',
          this.state.breakRingtone
        )
    )
  }

  handlePlaySound = (sound) => {
    const pomoAudio = new Audio(pomoSound)
    const breakAudio = new Audio(breakSound)
    const longBreakAudio = new Audio(longBreakSound)
    const endAudio = new Audio(endSound)

    switch (sound) {
      case 'pomo':
        pomoAudio.play()
        break
      case 'long break':
        longBreakAudio.play()
        break
      case 'break':
        breakAudio.play()
        break
      case 'end':
        endAudio.play()
        break
      default:
        break
    }
  }

  handleSoundOn = () => {
    this.setState(
      ({ soundOn }) => ({ soundOn: !soundOn }),
      () =>
        setLocalStorageObj(
          'localPomodoroSettings',
          'soundOn',
          this.state.soundOn
        )
    )
  }

  handleFocusGoal = (time) => {
    this.setState({ focusGoal: time }, () =>
      setLocalStorageObj(
        'localPomodoroSettings',
        'focusGoal',
        this.state.focusGoal
      )
    )
  }

  render() {
    const { Provider } = MenuContext
    const { children } = this.props
    return (
      <Provider
        value={{
          ...this.state,
          handleAutoStartBreak: this.handleAutoStartBreak,
          handleAutoStartPomo: this.handleAutoStartPomo,
          handlePomoTime: this.handlePomoTime,
          handleBreakTime: this.handleBreakTime,
          handleLongBreakTime: this.handleLongBreakTime,
          handleLongBreakEvery: this.handleLongBreakEvery,
          handlePomoRingtone: this.handlePomoRingtone,
          handleBreakRingtone: this.handleBreakRingtone,
          handlePlaySound: this.handlePlaySound,
          handleSoundOn: this.handleSoundOn,
          handleFocusGoal: this.handleFocusGoal,
        }}
      >
        {children}
      </Provider>
    )
  }
}

export default MenuContextProvider
