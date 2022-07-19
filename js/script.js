const $grid = document.querySelector('.game__grid')
const $game = document.querySelector('.game')
const $spanPlayer = document.querySelector('.game__header-player')
const $timer = document.querySelector('.game__header-time-timer')

const characters = [
  'cheep',
  'dinorhino',
  'koopa',
  'piranhaplant',
  'pokey',
  'rex',
  'spiney',
  'superkoopa',
  'thwomp',
  'wiggler',
]

let firstCard = ''
let secondCard = ''

const createElement = (tag, className) => {
  const element = document.createElement(tag)
  element.className = className
  return element
}

const printWinScreen = () => {
  const $congratStrong = document.querySelector('.game__win-screen--strong')
  const $timeSpan = document.querySelector('.time')
  const $recordSpan = document.querySelector('.record')
  const $restartButton = document.querySelector('.game__win-screen--button')
  const $winScreen = document.querySelector('.game__win-screen')
  $congratStrong.textContent = `Parabens ${localStorage.getItem('player')}, Você venceu!`
  $timeSpan.textContent = $timer.textContent
  $recordSpan.textContent = localStorage.getItem('record')

  $winScreen.style.display = 'flex'

  $restartButton.addEventListener('click', () => {
    window.location = '../index.html'
  })
}

const checkRecord = () => {
  const record = +localStorage.getItem('record')
  console.log(record)
  if ($timer.textContent < record) {
    localStorage.setItem('record', $timer.textContent)
  }
  return
}

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card')
  if (disabledCards.length === 20) {
    clearInterval(this.loop)
    checkRecord()
    printWinScreen()
  }
}

const checkCards = () => {
  const firstCharacter = firstCard.getAttribute('data-character')
  const secondCharacter = secondCard.getAttribute('data-character')

  if (firstCharacter === secondCharacter) {
    firstCard.firstChild.classList.add('disabled-card')
    secondCard.firstChild.classList.add('disabled-card')
    firstCard = ''
    secondCard = ''

    checkEndGame()
  } else {
    setTimeout(() => {
      firstCard.classList.remove('reveal-card')
      secondCard.classList.remove('reveal-card')

      firstCard = ''
      secondCard = ''
    }, 500)
  }
}

const revealCard = ({ target }) => {
  if (target.parentNode.className.includes('reveal-card')) {
    return
  }

  if (firstCard === '') {
    target.parentNode.classList.add('reveal-card')
    firstCard = target.parentNode
  } else if (secondCard === '') {
    target.parentNode.classList.add('reveal-card')
    secondCard = target.parentNode

    checkCards()
  }
}

const createCard = (character) => {
  const card = createElement('div', 'game__grid-card')
  const front = createElement('div', 'game__grid-card--face game__grid-card--front')
  const back = createElement('div', 'game__grid-card--face game__grid-card--back')

  front.style.backgroundImage = `url('../assets/${character}.gif')`

  card.appendChild(front)
  card.appendChild(back)

  front.addEventListener('click', revealCard)
  back.addEventListener('click', revealCard)
  card.setAttribute('data-character', character)

  return card
}

const loadGame = () => {
  const duplicateCharacters = [...characters, ...characters]

  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5)

  shuffledArray.forEach((character) => {
    const card = createCard(character)
    $grid.appendChild(card)
  })
}

const startTimer = () => {
  this.loop = setInterval(() => {
    const currentTime = +$timer.textContent
    $timer.textContent = currentTime + 1
  }, 1000)
}

window.onload = () => {
  $spanPlayer.textContent = localStorage.getItem('player')
  startTimer()
  loadGame()
}
