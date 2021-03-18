/* eslint-disable */

import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'

gsap.registerPlugin(Draggable)

const bannerContainer = document.querySelector('.page-main__banner')
const bannerList = bannerContainer.querySelector('.banner__carousel-list')
const bannerControllsCircles = bannerContainer.querySelectorAll(
  '.banner__controll-item'
)

Draggable.create(bannerList, {
  type: 'x',
  bounds: bannerContainer,
  edgeResistance: 0.65,
  zIndexBoost: false,
  onDragEnd: function() {
    let widthWindow = document.documentElement.clientWidth
    let bannerItemWidth = 94
    let marginRightBannerItem = 10

    let step = (widthWindow * bannerItemWidth) / 100 + marginRightBannerItem

    let isToggle =
      Math.abs((Math.abs(this.startX) - Math.abs(this.x)) / step) >= 0.2
        ? true
        : false

    let currentSlide = Math.abs(this.startX) / step
    let direction = this.getDirection('start')

    if (direction === 'right' && isToggle && this.startX !== 0) {
      gsap.to(this.target, {
        x: this.startX + step,
        duration: 0.3,
      })

      bannerControllsCircles[currentSlide].classList.remove(
        'banner__controll-item--active'
      )
      bannerControllsCircles[currentSlide - 1].classList.add(
        'banner__controll-item--active'
      )
      gsap.from(bannerControllsCircles[currentSlide - 1], {
        scale: 1.4,
        duration: 0.3,
      })
    } else if (
      direction === 'left' &&
      isToggle &&
      this.startX !== this.target.offsetWidth - step
    ) {
      gsap.to(this.target, {
        x: this.startX - step,
        duration: 0.3,
      })

      bannerControllsCircles[currentSlide].classList.remove(
        'banner__controll-item--active'
      )
      bannerControllsCircles[currentSlide + 1].classList.add(
        'banner__controll-item--active'
      )
      gsap.from(bannerControllsCircles[currentSlide + 1], {
        scale: 1.4,
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
