const $input = document.querySelector('.login__input')
const $button = document.querySelector('.login__button')
const $form = document.querySelector('.login')

const $title = document.querySelector('.login__header-title--text')


const titleText = 'Jogo da Memória'

const validateInput = ({ target }) => {
  if (target.value.length > 2) {
    $button.removeAttribute('disabled')
    return
  }

  $button.setAttribute('disabled', '')
}

const handleSubmit = (event) => {
    event.preventDefault()
    
    localStorage.setItem('player', $input.value)
    if (!localStorage.getItem('record')) {
      localStorage.setItem('record', 999)
    }
    window.location = 'pages/game.html'
}

const titleAnimation = (element) => {
    const textArray = element.split('')
    $title.textContent = ''
    textArray.forEach((letter, i) => {
        setTimeout(() => $title.textContent += letter,100 * i)
    })
}

$input.addEventListener('input', validateInput)
$form.addEventListener('submit', handleSubmit)

titleAnimation(titleText)
