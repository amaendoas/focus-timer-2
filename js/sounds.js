
export default function Sounds() {
  const forestAudio = document.querySelector('.forestAudio')
  const rainAudio = document.querySelector('.rainAudio')
  const coffeeAudio = document.querySelector('.coffeeAudio')
  const fireplaceAudio = document.querySelector('.fireplaceAudio')
  const buttonPressAudio = new Audio(
    'https://github.com/maykbrito/automatic-video-creator/blob/master/audios/button-press.wav?raw=true'
  )
  const kitchenTimer = new Audio(
    'https://github.com/maykbrito/automatic-video-creator/blob/master/audios/kichen-timer.mp3?raw=true'
  )

  function pressButton () {
    buttonPressAudio.play()
  }

  function endTimer () {
    kitchenTimer.play()
  }

  return {
    endTimer,
    pressButton,
    forestAudio,
    rainAudio,
    coffeeAudio,
    fireplaceAudio
  }
}