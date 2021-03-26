/* eslint-disable */

const details = document.querySelectorAll('.info-block__buyers')

details.forEach((el) => {
  el.addEventListener('toggle', (evt) => {
    if (evt.target.open) {
      details.forEach((elem) => {
        elem === evt.target ? false : (elem.open = false)
      })
    }
  })
})
