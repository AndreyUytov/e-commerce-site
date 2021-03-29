/* eslint-disable */

import { animate, back, makeToZero, makeEaseOut } from './../animate/animate.js'

let makeBackToZero = makeToZero(back)

let makeEasyOutBack = makeEaseOut(back)

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

    this.sliderList.ondragstart = () => false
    this.sliderList.style.touchAction = 'none'

    this.sliderList.addEventListener(
      'click',
      (evt) => {
        let distance = Math.abs(this.startX - evt.clientX)
        if (distance > 20) {
          evt.preventDefault() // отмена действия по умолчанию, например по клике на ссылку в случае перемещения мыши более чем на 20 px
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

      const mouseUp = (evt) => {
        if (this.currentX > 0) {
          animate({
            duration: 500,
            draw: (progress) => {
              this.sliderList.style.transform = `translateX(${progress *
                this.currentX}px)`
            },
            timing: makeBackToZero,
          })
        }

        console.log(this.getMaxX())

        if (this.currentX < this.getMaxX()) {
          animate({
            duration: 500,
            draw: (progress) => {
              this.sliderList.style.transform = `translateX(${progress *
                this.getMaxX()}px)`
            },
            timing: makeEasyOutBack,
          })
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
}
