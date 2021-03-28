/* eslint-disable */

import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'

gsap.registerPlugin(Draggable)


export default class SliderCreator {
  constructor(config) {
    this.sliderWrapper = config.sliderWrapper
    this.sliderList = config.sliderList
    this.slide = config.slide
    this.sliderLength = config.sliderLength
    this.sliderMarkers = config.sliderMarkers
    this.prevButton = config.prevButton
    this.nextButton = config.nextButton
    this.currentSlide = 0

    this.nextButton.addEventListener('click', () => {
      if (this.currentSlide !== this.sliderLength - 1) {
        let step = this.stepInPixels()
        this.currentSliderUpdater(this.currentSlide + 1, step)
      }
    })

    this.prevButton.addEventListener('click', () => {
      if (this.currentSlide !== 0) {
        let step = this.stepInPixels()
        this.currentSliderUpdater(this.currentSlide - 1, step)
      }
    })

    window.addEventListener('resize', () => {
      if (this.currentSlide) {
        gsap.to(this.sliderList, {
          x: 0,
          duration: 0.3,
        })
        let step = this.stepInPixels()
        this.currentSliderUpdater(0, step)
      }
    })

    this.draggable = new Draggable(this.sliderList, {
      type: 'x',
      callbackScope: this, // на всякий случай 
      bounds: this.sliderWrapper,
      edgeResistance: 0.65,
      zIndexBoost: false,
      onDragEnd: () => {
        let step = this.stepInPixels()
        let isToggle =
          Math.abs((Math.abs(this.draggable.startX) - Math.abs(this.draggable.x)) / step) >= 0.2
            ? true
            : false

        let direction = this.draggable.getDirection('start')
    
        if (direction === 'right' && isToggle && this.currentSlide !== 0) {

          this.currentSliderUpdater(this.currentSlide - 1, step)
          
        } else if (
          direction === 'left' &&
          isToggle &&
          this.currentSlide !== this.sliderLength - 1
        ) {

          this.currentSliderUpdater(this.currentSlide + 1, step)
        } else {
          gsap.to(this.draggable.target, {
            x: this.draggable.startX,

          })
        }
      },
    })
  }

  stepInPixels() {
    let bannerItemWidth = this.slide.offsetWidth
    let marginRightBannerItem = parseInt(
      getComputedStyle(this.slide).marginRight
    )
    let step = bannerItemWidth + marginRightBannerItem
    return step
  }

  currentSliderUpdater(nextSlideIndex, step) {
    if (this.prevButton && this.nextButton) {
      if (nextSlideIndex > 0 && nextSlideIndex < this.sliderLength - 1) {
        this.prevButton.disabled = false
        this.nextButton.disabled = false
      }
      if (nextSlideIndex === 0) {
        this.prevButton.disabled = true
        this.nextButton.disabled = false
      }
    
      if (nextSlideIndex === this.sliderLength - 1) {
  
        this.nextButton.disabled = true
        this.prevButton.disabled = false
      }
    }
  
    if (this.sliderMarkers) {
      this.sliderMarkers[this.currentSlide].classList.remove(
        'banner__controll-item--active'
      )
      this.sliderMarkers[nextSlideIndex].classList.add(
        'banner__controll-item--active'
      )
      
    
      gsap.from(this.sliderMarkers[nextSlideIndex], {
        scale: 1.4,
        duration: 0.3,
      })
    }
  
    gsap.to(this.draggable.target, {
      x: -nextSlideIndex * step,
      callbackScope: this, // на всякий случай)
      duration: 0.3,
      onStart:  () => { // стрелочная функция берет контекст из окружения
        this.draggable.disable()
        this.prevButton.style.pointerEvents = "none"
        this.nextButton.style.pointerEvents = "none"
      },
      onComplete: () => {
        this.draggable.enable()
        this.prevButton.style.pointerEvents = ""
        this.nextButton.style.pointerEvents = ""
      }
    })
  
    this.currentSlide = nextSlideIndex
  }
}