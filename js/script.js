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

const createWinScreen = () => {
  const mainContainer = createElement('section', 'game__win-screen')
  const containerTitle = createElement('strong', 'game__win-screen--strong')

  const doubleDiv = createElement('div', 'game__win-screen-double-div')

  const singleDiv1 = createElement('div', 'game__win-screen-double-div--div')
  const singleDiv1Span = createElement('span', 'game__win-screen--span')
  const singleDiv1Time = createElement('span', 'game__win-screen--span time')

  const singleDiv2 = createElement('div', 'game__win-screen-double-div--div')
  const singleDiv2Span = createElement('span', 'game__win-screen--span')
  const singleDiv2Time = createElement('span', 'game__win-screen--span record')

  const restartMessage = createElement('span', 'game__win-screen--span')
  const restartButton = createElement('button', 'game__win-screen--button login__button')

  mainContainer.appendChild(containerTitle)
  mainContainer.appendChild(doubleDiv)
  mainContainer.appendChild(restartMessage)
  mainContainer.appendChild(restartButton)

  doubleDiv.appendChild(singleDiv1)
  singleDiv1.appendChild(singleDiv1Span)
  singleDiv1.appendChild(singleDiv1Time)

  doubleDiv.appendChild(singleDiv2)
  singleDiv2.appendChild(singleDiv2Span)
  singleDiv2.appendChild(singleDiv2Time)

  containerTitle.textContent = `Parabens ${localStorage.getItem('player')}, Você venceu!`

  singleDiv1Span.textContent = 'Seu tempo:'
  singleDiv1Time.textContent = $timer.textContent
  singleDiv2Span.textContent = 'Melhor tempo:'
  singleDiv2Time.textContent = localStorage.getItem('record')

  restartMessage.textContent = 'Deseja jogar novamente?'
  restartButton.textContent = 'Jogar Novamente'

  restartButton.addEventListener('click', () => {
    window.location = '../index.html'
  })
  return mainContainer
}

const printWinScreen = () => {
  $game.appendChild(createWinScreen())
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
