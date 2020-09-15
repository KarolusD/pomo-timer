import React, { Component } from 'react'
import breakSound from '../../assets/sounds/break-sound.mp3'
import longBreakSound from '../../assets/sounds/long-break-sound.mp3'
import pomoSound from '../../assets/sounds/pomo-sound.mp3'
import endSound from '../../assets/sounds/end-sound.mp3'
export const MenuContext = React.createContext()

class MenuContextProvider extends Component {
  state = {
    autoStartPomo: false,
    autoStartBreak: false,
    pomoTime: 3,
    breakTime: 3,
    longBreakTime: 4,
    longBreakEvery: 4,
    pomoRingtone: false,
    breakRingtone: false,
    soundOn: true,
    focusGoal: 10,
  }

  handleAutoStartBreak = () => {
    this.setState(({ autoStartBreak }) => ({
      autoStartBreak: !autoStartBreak,
    }))
  }

  handleAutoStartPomo = () => {
    this.setState(({ autoStartPomo }) => ({
      autoStartPomo: !autoStartPomo,
    }))
  }

  handlePomoTime = (time) => {
    this.setState({ pomoTime: time })
  }

  handleBreakTime = (time) => {
    this.setState({ breakTime: time })
  }

  handleLongBreakTime = (time) => {
    this.setState({ longBreakTime: time })
  }

  handleLongBreakEvery = (every) => {
    this.setState({ longBreakEvery: every })
  }

  handlePomoRingtone = () => {
    this.setState(({ pomoRingtone }) => ({ pomoRingtone: !pomoRingtone }))
  }

  handleBreakRingtone = () => {
    this.setState(({ breakRingtone }) => ({ breakRingtone: !breakRingtone }))
  }

  handlePlaySound = (sound) => {
    const pomoAudio = new Audio(pomoSound)
    const breakAudio = new Audio(breakSound)
    const endAudio = new Audio(endSound)

    switch (sound) {
      case 'pomo':
        pomoAudio.play()
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
    this.setState(({ soundOn }) => ({ soundOn: !soundOn }))
  }

  handleFocusGoal = (time) => {
    this.setState({ focusGoal: time })
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
