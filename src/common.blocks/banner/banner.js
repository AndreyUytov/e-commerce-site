/* eslint-disable */

import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'

gsap.registerPlugin(Draggable)

const bannerContainer = document.querySelector('.page-main__banner')
const bannerList = bannerContainer.querySelector('.banner__carousel-list')
const bannerListItem = bannerList.querySelector('.banner__carousel-item')
const slidersLength = bannerList.querySelectorAll('.banner__carousel-item')
  .length
const bannerControllsCircles = bannerContainer.querySelectorAll(
  '.banner__controll-item'
)
const bannerSnapLeft = document.querySelector(
  '.banner-wrapper__controll-snap--left'
)
const bannerSnapRight = document.querySelector(
  '.banner-wrapper__controll-snap--right'
)

let currentSlide = 0 //1st Slide = 0, 2st Slide = 1

const stepInPixels = (bannerListItem) => {
  let bannerItemWidth = bannerListItem.offsetWidth
  let marginRightBannerItem = parseInt(
    getComputedStyle(bannerListItem).marginRight
  )
  let step = bannerItemWidth + marginRightBannerItem

  return step
}

const currentSliderUpdater = (nextSlideIndex) => {
  if (nextSlideIndex > 0 && nextSlideIndex < slidersLength - 1) {
    bannerSnapLeft.disabled = false
    bannerSnapRight.disabled = false
  }
  if (nextSlideIndex === 0) {
    bannerSnapLeft.disabled = true
    bannerSnapRight.disabled = false
  }

  if (nextSlideIndex === slidersLength - 1) {
    bannerSnapRight.disabled = true
    bannerSnapLeft.disabled = false
  }

  bannerControllsCircles[currentSlide].classList.remove(
    'banner__controll-item--active'
  )
  bannerControllsCircles[nextSlideIndex].classList.add(
    'banner__controll-item--active'
  )
  currentSlide = nextSlideIndex

  gsap.from(bannerControllsCircles[currentSlide], {
    scale: 1.4,
    duration: 0.3,
  })
}

bannerSnapRight.addEventListener('click', () => {
  if (currentSlide !== slidersLength - 1) {
    let step = stepInPixels(bannerListItem)
    let currentSlidePosistion = gsap.getProperty(bannerList, 'x')
    gsap.to(bannerList, {
      x: currentSlidePosistion - step,
      duration: 0.3,
    })
    currentSliderUpdater(currentSlide + 1)
  }
})

bannerSnapLeft.addEventListener('click', () => {
  if (currentSlide !== 0) {
    let step = stepInPixels(bannerListItem)
    let currentSlidePosistion = gsap.getProperty(bannerList, 'x')
    gsap.to(bannerList, {
      x: currentSlidePosistion + step,
      duration: 0.3,
    })
    currentSliderUpdater(currentSlide - 1)
  }
})

window.addEventListener('resize', () => {
  if (currentSlide) {
    gsap.to(bannerList, {
      x: 0,
      duration: 0.3,
    })

    currentSliderUpdater(0)
  }
})

Draggable.create(bannerList, {
  type: 'x',
  bounds: bannerContainer,
  edgeResistance: 0.65,
  zIndexBoost: false,
  onDragEnd: function() {
    let step = stepInPixels(bannerListItem)
    let isToggle =
      Math.abs((Math.abs(this.startX) - Math.abs(this.x)) / step) >= 0.2
        ? true
        : false

    // currentSlide = Math.floor(Math.abs(this.startX) / step)
    let direction = this.getDirection('start')

    if (direction === 'right' && isToggle && currentSlide !== 0) {
      currentSliderUpdater(currentSlide - 1)
      gsap.to(this.target, {
        x: -currentSlide * step,
        duration: 0.3,
      })
    } else if (
      direction === 'left' &&
      isToggle &&
      currentSlide !== slidersLength - 1
    ) {
      currentSliderUpdater(currentSlide + 1)
      gsap.to(this.target, {
        x: -currentSlide * step,
        duration: 0.3,
      })
    } else {
      gsap.to(this.target, {
        x: this.startX,
        duration: 0.3,
      })
    }
  },
})
