let cardButtons = document.querySelectorAll('.present-card__buy-button')
let popupBasket = document.querySelector('.popup-basket')
let closePupupBasket = popupBasket.querySelector('.popup-basket__close-snap')
let closePopupListener = (evt) => {
  if (evt.target.closest('.popup-basket')) return
  document.removeEventListener('click', closePopupListener)
  popupBasket.classList.remove('show-popup-basket')
}
cardButtons.forEach((btn) => {
  btn.addEventListener('click', (evt) => {
    popupBasket.classList.add('show-popup-basket')
    document.addEventListener('click', closePopupListener)
    evt.stopPropagation()
  })
})

closePupupBasket.addEventListener('click', () => {
  popupBasket.classList.remove('show-popup-basket')
  document.removeEventListener('click', closePopupListener)
})
