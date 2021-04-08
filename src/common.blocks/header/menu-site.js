/* eslint-disable */

import gsap from 'gsap'
import {
  animate,
  back,
  penta,
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
  // gsap.to(downRowHeader, {
  //   position: 'absolute',
  //   y: -20,
  //   opacity: 0,
  //   duration: 0.3,
  //   display: 'none',
  // })
  // gsap.to(upRowHeader, {
  //   position: 'absolute',
  //   y: 20,
  //   opacity: 0,
  //   duration: 0.3,
  //   display: 'none',
  // })

  downRowHeader.style.position = `absolute`
  upRowHeader.style.position = `absolute`

  animate({
    duration: 300,
    timing: penta,
    draw: (progress) => {
      downRowHeader.style.transform = `translateY(${-20 * progress}px)`
      downRowHeader.style.opacity = `${setupEndValue(1, 0, progress)}`
    },
  }).then(() => {
    downRowHeader.style.display = 'none'
  })

  animate({
    duration: 300,
    timing: penta,
    draw: (progress) => {
      upRowHeader.style.transform = `translateY(${50 * progress}px)`
      upRowHeader.style.opacity = `${setupEndValue(1, 0, progress)}`
    },
  }).then(() => {
    upRowHeader.style.display = 'none'
  })
})

document.addEventListener('sticky-header-off', () => {
  isSticky = false
  gsap.fromTo(
    downRowHeader,
    {
      y: -60,
      opacity: 0,
      duration: 0.3,
    },
    { display: '', y: '', opacity: 1, position: '' }
  )
  gsap.fromTo(
    upRowHeader,
    {
      y: 60,
      opacity: 0,
      duration: 0.3,
    },
    { display: '', y: '', opacity: 1, position: '' }
  )

  pageHeader.classList.remove('page-header--sticky')
  headerContent.classList.remove('page-header__inner--sticky')
})
