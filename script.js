const repeatButton = document.querySelector(".repeat-body")
const numbers = document.getElementById('numbers')
const from = document.getElementById('from')
const to = document.getElementById('to')
const playAgain = document.getElementById('play-again')

repeatButton.onclick = () => {
  const circle = document.getElementById("circle-repeat")
  circle.classList.toggle("circle-animation")
  repeatButton.classList.toggle("gray-filter")
}

function showResult() {
  let draws = 0
  const drawButton = document.querySelector("button")
  const resultBody = document.getElementById('result')
  const titleForm = document.getElementById('title-form')
  const form = document.getElementById('form')
  const resultNums = document.querySelector('.result-nums')

  drawButton.onclick = (e) => {
    e.preventDefault()

    resultNums.innerHTML = ""
    let noRepeat = true

    if (repeatButton.classList.contains("gray-filter")) {
      noRepeat = false;
    }  

    if (numbers.value == 0) {
      alert("Preencha os dados corretamente!")
      return
    } else if (Number(from.value) > Number(to.value)) {
      console.log(from.value, to.value)
      alert("Dados inválidos!")
      return
    } else if ((Number(to.value) - Number(from.value) + 1) < Number(numbers.value)) {
      alert("Dados inválidos!")
      return
    }
  
    const drawResult  = draw(Number(numbers.value), Number(from.value), Number(to.value), noRepeat)

    for (let i = 0; i < drawResult.length; i++) {
      const paragraph = document.createElement('p')
      paragraph.textContent = drawResult[i]
      resultNums.appendChild(paragraph)
    }
    
    resultBody.classList.remove('display-none')
    titleForm.classList.add('display-none')
    form.classList.add('display-none')

    draws++

    const resultParagraph = document.getElementById('result-paragraph')
    resultParagraph.textContent = `${draws}º Resultado`

    playAgain.style.display = 'flex'
    drawButton.style.display = 'none'
  }

  playAgain.onclick = (e) => {
    e.preventDefault()
    numbers.value = ""
    from.value = ""
    to.value = ""

    resultBody.classList.add('display-none')
    titleForm.classList.remove('display-none')
    form.classList.remove('display-none')
    drawButton.style.display = 'flex'
    playAgain.style.display = 'none'
  }

}

function draw(num, from, to, noRepeat) {
  let resultsList = []

  for (let i = 0; i < num; i++) {
    let random = drawer()

    while (noRepeat && resultsList.includes(random)) {
      random = drawer()
    }

    resultsList.push(random)
  }

  function drawer() {
    return Math.floor(Math.random() * (to - from + 1)) + from
  }

  return resultsList
}

function inputControl() {
  const regex = /^[0-9]+$/

  function validateInput(input, min, max) {
    input.addEventListener("input", () => {
      if (!regex.test(input.value)) {
        input.value = input.value.replace(/\D/g, '')
      } else if (input.value < min) {
        input.value = min
      } else if (input.value > max) {
        input.value = max
      }
    })
  }

  validateInput(numbers, 1, 5)
  validateInput(from, 0, 9999)
  validateInput(to, 0, 9999)
}

inputControl()
showResult()
