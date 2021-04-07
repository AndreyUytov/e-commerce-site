/* eslint-disable */

import {
  animate,
  back,
  makeToZero,
  setupEndValue,
} from './../animate/animate.js'

let makeBackToZero = makeToZero(back)

export default class {
  constructor(config) {
    this.$container = config.container
    this.$sliderList = config.sliderList
    this.$sliderItem = this.$sliderList.firstElementChild
    this.sliderItemsLength = this.$sliderList.children.length
    this.$prevButton = config.prevButton
    this.$nextButton = config.nextButton

    this.markerList = config.markerList
    this.$currentCount = config.currentCount
    this.$total = config.totalCount

    this.startX = null
    this.currentX = null
    this.distance = null

    this.$sliderList.ondragstart = () => false
    this.$sliderList.style.touchAction = 'none'

    this.$nextButton.addEventListener('click', () => {
      let nextSlidePosition = this.currentX - this.step()
      this.updateCurrentX(nextSlidePosition)
    })

    this.$prevButton.addEventListener('click', () => {
      let prevSliderPosition = this.currentX + this.step()
      this.updateCurrentX(prevSliderPosition)
    })

    this.$sliderList.addEventListener(
      'click',
      (evt) => {
        this.distance = Math.abs(this.startX - evt.clientX)
        if (this.distance > 20) {
          evt.preventDefault()
          evt.stopPropagation()
        }
      },
      true
    )

    this.$sliderList.addEventListener('pointerdown', (evt) => {
      evt.preventDefault()
      this.startX = evt.clientX

      let shiftX = evt.clientX - this.$sliderList.getBoundingClientRect().left

      const moveAt = (evt) => {
        this.currentX =
          evt.clientX - shiftX - this.$container.getBoundingClientRect().left
        this.$sliderList.style.transform = `translateX(${this.currentX}px)`
      }

      const mouseMove = (evt) => {
        moveAt(evt)
      }

      const mouseUp = () => {
        this.updateCurrentX(this.currentX)

        document.removeEventListener('pointermove', mouseMove)
        document.removeEventListener('pointerup', mouseUp)
      }

      document.addEventListener('pointermove', mouseMove)
      document.addEventListener('pointerup', mouseUp)
    })
  }

  get maxX() {
    let widthContainer = this.$container.getBoundingClientRect().width
    let sliderListWidth = this.sliderItemsLength * this.step()
    return widthContainer - sliderListWidth
  }

  isRightEdge(value) {
    return value <= this.maxX ? true : false
  }

  isLeftEdge(value) {
    return value >= 0 ? true : false
  }

  checkCounterSlider() {
    if (this.$total && this.$currentCount) {
      let step = this.step()
      let hiddenSlides =
        this.sliderItemsLength -
        Math.floor(this.$container.offsetWidth / step) +
        1
      this.$total.textContent = `/${hiddenSlides}`
      let slideNumber = Math.abs(Math.round(this.currentX / step)) + 1
      this.$currentCount.textContent = `${slideNumber}`
    }
  }

  checkButtonsDisabled() {
    if (this.isLeftEdge(this.currentX)) {
      this.$prevButton.disabled = true
    } else if (this.isRightEdge(this.currentX)) {
      this.$nextButton.disabled = true
    } else {
      this.$nextButton.disabled = false
      this.$prevButton.disabled = false
    }
  }

  checkBounds(newX) {
    if (this.isLeftEdge(newX)) {
      this.animationSlider(this.currentX, 0).then(() => {
        this.currentX = 0
        this.checkButtonsDisabled()
        this.checkCounterSlider()
      })
      return true
    } else if (this.isRightEdge(newX)) {
      this.animationSlider(this.currentX, this.maxX).then(() => {
        this.currentX = this.maxX
        this.checkButtonsDisabled()
        this.checkCounterSlider()
      })
      return true
    } else {
      return false
    }
  }

  step() {
    let marginItem = parseInt(getComputedStyle(this.$sliderItem).marginRight)
    let widthItem = this.$sliderItem.offsetWidth

    return marginItem + widthItem
  }

  animationSlider(initValue, endValue) {
    return animate({
      duration: 500,
      draw: (progress) => {
        this.$sliderList.style.transform = `translateX(${setupEndValue(
          initValue,
          endValue,
          progress
        )}px)`
      },
      timing: makeBackToZero,
    })
  }

  updateCurrentX(newX) {
    if (!this.checkBounds(newX)) {
      let step = this.step()
      let newPosition = Math.round(newX / step) * step

      this.animationSlider(this.currentX, newPosition).then(() => {
        this.currentX = newPosition
        this.checkButtonsDisabled()
        this.checkCounterSlider()
      })
    }
  }
}
