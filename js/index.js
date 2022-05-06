const buttonPlay = document.querySelector('.play')
const buttonPause = document.querySelector('.pause')
const buttonStop = document.querySelector('.stop')
const buttonSet = document.querySelector('.set')
const buttonPlus = document.querySelector('.plus')
const buttonMinus = document.querySelector('.minus')
let minutesDisplay = document.querySelector('.minutes')
let secondsDisplay = document.querySelector('.seconds')
let minutes = Number(minutesDisplay.textContent)
let timerTimeOut
let buttonForest = document.querySelector('.forest')
let buttonRain = document.querySelector('.rain')
let buttonCoffee = document.querySelector('.coffee')
let buttonFireplace = document.querySelector('.fireplace')

import Sounds from './sounds.js'

const sounds = Sounds()

function resetControls() {
  buttonStop.classList.add('hide')
  buttonSet.classList.remove('hide')
  buttonPlay.classList.remove('hide')
  buttonPause.classList.add('hide')
}

function updateDisplay(newMinutes, seconds) {
  newMinutes = newMinutes === undefined ? minutes : newMinutes
  seconds = seconds === undefined ? 0 : seconds
  minutesDisplay.textContent = String(newMinutes).padStart(2, '0')
  secondsDisplay.textContent = String(seconds).padStart(2, '0')
}

function resetTimer() {
  updateDisplay(minutes, 0)
  clearTimeout(timerTimeOut)
}

function countdown() {
  timerTimeOut = setTimeout(function () {
    let minutes = Number(minutesDisplay.textContent)
    let seconds = Number(secondsDisplay.textContent)

    if (minutes <= 0 && seconds <= 0) {
      updateDisplay()
      resetControls()
      sounds.endTimer()
      return
    }

    if (seconds <= 0) {
      seconds = 60
      --minutes
    }

    updateDisplay(minutes, seconds - 1)

    countdown()
  }, 1000)
}

buttonPlay.addEventListener('click', function () {
  buttonPlay.classList.add('hide')
  buttonPause.classList.remove('hide')
  buttonStop.classList.remove('hide')
  buttonSet.classList.add('hide')
  sounds.pressButton()
  countdown()
})

buttonPause.addEventListener('click', function () {
  buttonPause.classList.add('hide')
  buttonPlay.classList.remove('hide')
  sounds.pressButton()
  clearTimeout(timerTimeOut)
})

buttonStop.addEventListener('click', function () {
  sounds.pressButton()
  resetControls()
  resetTimer()
})

buttonSet.addEventListener('click', function () {
  let newMinutes = Number(prompt('Quantos minutos?'))
  if (!newMinutes) {
    resetTimer()
    return
  }
  minutes = newMinutes
  updateDisplay(minutes, 0)
})

buttonPlus.addEventListener('click', function () {
  minutesDisplay.textContent = String(minutes + 5).padStart(2, '0')
  minutes = Number(minutesDisplay.textContent)
  if (minutes <= 0) {
    updateDisplay(0, 0)
  }
  sounds.pressButton()
})

buttonMinus.addEventListener('click', function () {
  minutesDisplay.textContent = String(minutes - 5).padStart(2, '0')
  minutes = Number(minutesDisplay.textContent)
  if (minutes <= 0) {
    minutes = 0
    updateDisplay(0, 0)
  }
  sounds.pressButton()
})

function turnItOff(button) {
  if (button.classList.contains('active')) {
    button.classList.remove('active')
  }
}

function music() {
  if (buttonForest.classList.contains('active')) {
    sounds.forestAudio.play()
  } else {
    sounds.forestAudio.pause()
  }
  if (buttonRain.classList.contains('active')) {
    sounds.rainAudio.play()
  } else {
    sounds.rainAudio.pause()
  }
  if (buttonCoffee.classList.contains('active')) {
    sounds.coffeeAudio.play()
  } else {
    sounds.coffeeAudio.pause()
  }
  if (buttonFireplace.classList.contains('active')) {
    sounds.fireplaceAudio.play()
  } else {
    sounds.fireplaceAudio.pause()
  }
}

buttonForest.addEventListener('click', function () {
  buttonForest.classList.toggle('active')
  turnItOff(buttonCoffee)
  turnItOff(buttonRain)
  turnItOff(buttonFireplace)
  music()
})

buttonRain.addEventListener('click', function () {
  buttonRain.classList.toggle('active')
  turnItOff(buttonCoffee)
  turnItOff(buttonForest)
  turnItOff(buttonFireplace)
  music()
})

buttonCoffee.addEventListener('click', function () {
  buttonCoffee.classList.toggle('active')
  turnItOff(buttonRain)
  turnItOff(buttonForest)
  turnItOff(buttonFireplace)
  music()
})

buttonFireplace.addEventListener('click', function () {
  buttonFireplace.classList.toggle('active')
  turnItOff(buttonCoffee)
  turnItOff(buttonForest)
  turnItOff(buttonRain)
  music()
})
