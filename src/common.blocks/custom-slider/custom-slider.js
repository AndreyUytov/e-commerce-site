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
        if (this.isLeftEdge) {
          animate({
            duration: 500,
            draw: (progress) => {
              this.sliderList.style.transform = `translateX(${progress *
                this.currentX}px)`
            },
            timing: makeBackToZero,
          }).then(() => (this.currentX = 0))
        } else if (this.isRightEdge) {
          animate({
            duration: 500,
            draw: (progress) => {
              this.sliderList.style.transform = `translateX(${setupEndValue(
                this.currentX,
                this.getMaxX(),
                progress
              )}px)`
            },
            timing: makeBackToZero,
          }).then(() => (this.currentX = this.getMaxX()))
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

  getMaxX() {
    let widthContainer = this.container.getBoundingClientRect().width
    let sliderListWidth = this.sliderItemsLength * this.step()
    return widthContainer - sliderListWidth
  }

  get isRightEdge() {
    return this.currentX < this.getMaxX() ? true : false
  }

  get isLeftEdge() {
    return this.currentX > 0 ? true : false
  }

  updateCurrentX(newX) {
    let step = this.step()
    let newPosition = Math.round(newX / step) * step
    animate({
      duration: 500,
      draw: (progress) => {
        this.sliderList.style.transform = `translateX(${setupEndValue(
          this.currentX,
          newPosition,
          progress
        )}px)`
      },
      timing: makeBackToZero,
    }).then(() => {
      this.currentX = newPosition
    })
  }
}
