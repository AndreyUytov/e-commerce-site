/* eslint-disable */

import gsap from 'gsap'

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

    gsap.from(menuInner, {
      x: -300,
      duration: 0.3,
    })
  })
}

const upRowHeader = pageHeader.querySelector('.page-header__menu-site')
const downRowHeader = pageHeader.querySelector('.header-page__popular-block')
const sticky = pageHeader.querySelector('.page-header__main-panel')
const headerContent = document.querySelector('.page-header__inner')
let isSticky = false
document.addEventListener('scroll', () => {
  if (document.documentElement.clientWidth < 1100) return

  if (window.pageYOffset > 48 && !isSticky) {
    document.dispatchEvent(new CustomEvent('sticky-header-on'))
  }

  if (window.pageYOffset < 48 && isSticky) {
    document.dispatchEvent(new CustomEvent('sticky-header-off'))
    isSticky = false
  }
})

document.addEventListener('sticky-header-on', () => {
  isSticky = true

  pageHeader.classList.add('page-header--sticky')
  headerContent.classList.add('page-header__inner--sticky')
  gsap.to(downRowHeader, {
    display: 'none',
    duration: 0
  })
  gsap.to(upRowHeader, {
    display: 'none',
    duration: 0
  })
})

document.addEventListener('sticky-header-off', () => {
  isSticky = false
  gsap.fromTo(downRowHeader, {
    y: -60,
    opacity: 0,
    duration: 0.3
  },{display: '', y: '',
  opacity: 1,})
  gsap.fromTo(upRowHeader, {
    y: 60,
    opacity: 0,
    duration: 0.3
  }, {display: '',y: '',
  opacity: 1,})

  pageHeader.classList.remove('page-header--sticky')
  headerContent.classList.remove('page-header__inner--sticky')
})
