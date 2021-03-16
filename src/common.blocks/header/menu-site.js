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
      duration: 0.2,
    })
  })
}

const upRowHeader = pageHeader.querySelector('.page-header__menu-site')
const downRowHeader = pageHeader.querySelector('.header-page__popular-block')
const sticky = pageHeader.querySelector('.page-header__main-panel')
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
  gsap.to(downRowHeader, {
    y: -100,
    opacity: 0,
    duration: 0.2,
    display: 'none',
  })
  gsap.to(upRowHeader, {
    y: 100,
    opacity: 0,
    duration: 0.2,
    display: 'none',
  })
  pageHeader.style.position = 'sticky'
  pageHeader.style.top = 10 + 'px'
  gsap.to(pageHeader, {
    height: 84,
    opacity: 0.8,
  })
})

document.addEventListener('sticky-header-off', () => {
  isSticky = false
  gsap.to(downRowHeader, {
    y: '',
    opacity: '',
    display: '',
  })
  gsap.to(upRowHeader, {
    y: '',
    opacity: '',
    display: '',
  })
  pageHeader.style.position = ''
  pageHeader.style.top = ''
  gsap.to(pageHeader, {
    height: '',
    opacity: '',
  })
})
