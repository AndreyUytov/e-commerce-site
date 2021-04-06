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
    this.container = config.container
    this.sliderList = config.sliderList
    this.sliderItem = this.sliderList.firstElementChild
    this.sliderItemsLength = this.sliderList.children.length
    this.markerList = config.markerList
    this.prevButton = config.prevButton
    this.nextButton = config.nextButton

    this.startX = null
    this.currentX = null
    this.distance = null

    this.sliderList.ondragstart = () => false
    this.sliderList.style.touchAction = 'none'

    this.nextButton.addEventListener('click', () => {
      let nextSlidePosition = this.currentX - this.step()
      if (!this.isRightEdge(nextSlidePosition)) {
        this.updateCurrentX(nextSlidePosition)
      } else {
        this.animationSlider(this.currentX, this.getMaxX()).then(() => {
          this.currentX = this.getMaxX()
          this.nextButton.disabled = true
        })
      }
    })

    this.prevButton.addEventListener('click', () => {
      let prevSliderPosition = this.currentX + this.step()
      if (!this.isLeftEdge(prevSliderPosition)) {
        this.updateCurrentX(prevSliderPosition)
      } else {
        this.animationSlider(this.currentX, 0).then(() => {
          this.currentX = 0
          this.prevButton.disabled = true
        })
      }
    })

    this.sliderList.addEventListener(
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

    this.sliderList.addEventListener('pointerdown', (evt) => {
      evt.preventDefault()
      this.startX = evt.clientX

      let shiftX = evt.clientX - this.sliderList.getBoundingClientRect().left

      const moveAt = (evt) => {
        this.currentX =
          evt.clientX - shiftX - this.container.getBoundingClientRect().left
        this.sliderList.style.transform = `translateX(${this.currentX}px)`
      }

      const mouseMove = (evt) => {
        moveAt(evt)
      }

      const mouseUp = () => {
        if (this.isLeftEdge(this.currentX)) {
          this.animationSlider(this.currentX, 0).then(() => (this.currentX = 0))
        } else if (this.isRightEdge(this.currentX)) {
          this.animationSlider(this.currentX, this.getMaxX()).then(
            () => (this.currentX = this.getMaxX())
          )
        } else {
          this.updateCurrentX(this.currentX)
        }

        this.sliderList.removeEventListener('pointermove', mouseMove)
        this.sliderList.removeEventListener('pointerup', mouseUp)
      }

      this.sliderList.addEventListener('pointermove', mouseMove)
      this.sliderList.addEventListener('pointerup', mouseUp)
    })
  }

  step() {
    let marginItem = parseInt(getComputedStyle(this.sliderItem).marginRight)
    let widthItem = this.sliderItem.offsetWidth

    return marginItem + widthItem
  }

  animationSlider(initValue, endValue) {
    return animate({
      duration: 500,
      draw: (progress) => {
        this.sliderList.style.transform = `translateX(${setupEndValue(
          initValue,
          endValue,
          progress
        )}px)`
      },
      timing: makeBackToZero,
    })
  }

  getMaxX() {
    let widthContainer = this.container.getBoundingClientRect().width
    let sliderListWidth = this.sliderItemsLength * this.step()
    return widthContainer - sliderListWidth
  }

  isRightEdge(value) {
    return value < this.getMaxX()
      ? (this.nextButton.disabled = true)
      : (this.nextButton.disabled = false)
  }

  isLeftEdge(value) {
    return value > 0
      ? (this.prevButton.disabled = true)
      : (this.prevButton.disabled = false)
  }

  updateCurrentX(newX) {
    let step = this.step()
    let newPosition = Math.round(newX / step) * step

    this.animationSlider(this.currentX, newPosition).then(() => {
      this.currentX = newPosition
      this.prevButton.disabled = false
      this.nextButton.disabled = false
    })
  }
}
