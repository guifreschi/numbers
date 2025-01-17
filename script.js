const repeatButton = document.querySelector(".repeat-body")

repeatButton.onclick = () => {
  const circle = document.getElementById("circle-repeat")
  circle.classList.toggle("circle-animation")
  repeatButton.classList.toggle("gray-filter")
}
