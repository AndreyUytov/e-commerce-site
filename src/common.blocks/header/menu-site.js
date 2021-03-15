/* eslint-disable */

const menuToggle = document.querySelector('.menu-site__toggle-snap')
const menuInner = document.querySelector('.menu-site__inner')
const pageHeader = document.querySelector('.page-header')

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    menuInner.classList.toggle('show')
    menuToggle.classList.toggle('show')
    document.body.style.overflow === 'hidden'
      ? (document.body.style.overflow = '')
      : (document.body.style.overflow = 'hidden')

    menuInner.classList.contains('show')
      ? (pageHeader.style.boxShadow = 'none')
      : (pageHeader.style.boxShadow = '')
  })
}
