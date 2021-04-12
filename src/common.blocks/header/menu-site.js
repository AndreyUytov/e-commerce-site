/* eslint-disable */

import {
  animate,
  back,
  makeToZero,
  setupEndValue,
} from './../animate/animate.js'

const backOut = makeToZero(back)

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

    animate({
      duration: 300,
      timing: backOut,
      draw: (proggres) => {
        menuInner.style.transform = `translateX(${setupEndValue(
          -300,
          0,
          proggres
        )}px)`
      },
    })
  })
}

const upRowHeader = pageHeader.querySelector('.page-header__menu-site')
const downRowHeader = pageHeader.querySelector('.header-page__popular-block')
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

  upRowHeader.style.display = 'none'
  downRowHeader.style.display = 'none'
})

document.addEventListener('sticky-header-off', () => {
  isSticky = false

  upRowHeader.style.display = ''
  downRowHeader.style.display = ''

  pageHeader.classList.remove('page-header--sticky')
  headerContent.classList.remove('page-header__inner--sticky')
})
