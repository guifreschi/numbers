const repeatButton = document.querySelector(".repeat-body")

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
    const numbers = document.getElementById('numbers')
    const from = document.getElementById('from')
    const to = document.getElementById('to')
    let noRepeat = true

    if (repeatButton.classList.contains("gray-filter")) {
      noRepeat = false;
    }  
  
    const drawResult  = draw(Number(numbers.value), Number(from.value), Number(to.value), noRepeat)

    for (let i = 0; i < drawResult.length; i++) {
      console.log("p")
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

    drawButton.innerHTML = 'Sortear novamente <img src="assets/play.svg" alt="Sortear novamente">'
  }

}

showResult()

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
