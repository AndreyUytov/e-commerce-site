/* eslint-disable */

export default class {
  constructor (config) {
    this.container = config.container
    this.sliderList = config.sliderList
    this.sliderItem = this.sliderList.firstElementChild
    this.sliderItemsLength = this.sliderList.children.length
    this.markerList = config.markerList
    this.prevButton = config.prevButton
    this.nextButton = config.nextButton

    this.startX = null

    this.sliderList.ondragstart = () => false
    this.sliderList.style.touchAction = 'none'

    this.sliderList.addEventListener('pointerdown', (evt) => {
      evt.preventDefault()
      this.startX = evt.clientX
      this.sliderList.setPointerCapture(evt.pointerId)
      let shiftX = evt.clientX - this.sliderList.getBoundingClientRect().left
    
      const moveAt = (evt) => {
        let newX = evt.clientX - shiftX - this.container.getBoundingClientRect().left
        this.sliderList.style.transform = `translateX(${newX}px)`
      }
      
      const mouseMove = (evt) => {
        moveAt(evt)
      }
    
      const mouseUp = () => {
        this.sliderList.removeEventListener('pointermove', mouseMove)
        this.sliderList.removeEventListener('pointerup', mouseUp)  
      }
    
      this.sliderList.addEventListener('pointermove', mouseMove)
      this.sliderList.addEventListener('pointerup',mouseUp)
    })
    
    this.sliderList.addEventListener('click', (evt) => {
      let distance = Math.abs(this.startX - evt.clientX)
      if(distance > 20) {
        evt.preventDefault() // отмена действия по умолчанию, например по клике на ссылку в случае перемещения мыши более чем на 20 px
        evt.stopPropagation()
      }
    }, true)
  }
}