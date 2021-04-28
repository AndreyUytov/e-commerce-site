const wrapperSubFilterList = document.querySelector('.subfilters-section')
const subFilterList = wrapperSubFilterList.querySelector(
  '.subfilters-section__popular-filter-list'
)

subFilterList.ondragstart = () => false

const subFilterListListener = (evt) => {
  let widthWrapper = wrapperSubFilterList.getBoundingClientRect().width
  let widthList = subFilterList.scrollWidth
  if (widthWrapper >= widthList) {
    subFilterList.style.transform = `translateX(${0}px)`
    return
  }

  let rightEdge = widthWrapper - widthList

  let shiftX = evt.clientX - subFilterList.getBoundingClientRect().left
  let currentX
  const moveAt = (evt) => {
    currentX =
      evt.clientX - shiftX - wrapperSubFilterList.getBoundingClientRect().left

    subFilterList.style.transform = `translateX(${currentX}px)`
  }

  const mouseMove = (evt) => {
    moveAt(evt)
  }

  const mouseUp = () => {
    if (currentX > 0) {
      subFilterList.style.transform = `translateX(${0}px)`
    } else if (currentX < rightEdge) {
      subFilterList.style.transform = `translateX(${rightEdge}px)`
    } else {
      subFilterList.style.transform = `translateX(${currentX}px)`
    }

    document.removeEventListener('pointermove', mouseMove)
    document.removeEventListener('pointerup', mouseUp)
  }

  document.addEventListener('pointermove', mouseMove)
  document.addEventListener('pointerup', mouseUp)
}

subFilterList.addEventListener('pointerdown', subFilterListListener)

// ползунок в range

const rangeInputsWrapper = document.querySelector('.range-inputs-wrapper')

const minInput = rangeInputsWrapper.querySelector(
  '.filter-section__price-input--min'
)
const maxInput = rangeInputsWrapper.querySelector(
  '.filter-section__price-input--max'
)
const rangeWrapper = rangeInputsWrapper.querySelector('.range__wrapper')

rangeWrapper.addEventListener('pointerdown', (evt) => {
  let toggle = evt.target.closest('.range__toggle')
  if (!toggle) return
  toggle.ondragstart = () => false
  toggle.style.touchAction = 'none'
  toggle.setPointerCapture(evt.pointerId)

  let mutableProperty
  toggle.classList.contains('range__toggle--left')
    ? (mutableProperty = '--min-position')
    : (mutableProperty = '--max-position')

  let shiftX = evt.clientX - toggle.getBoundingClientRect().left
  let newPosition

  const moveAt = (evt) => {
    newPosition = evt.pageX - shiftX - rangeWrapper.getBoundingClientRect().left
    if (newPosition < 0) newPosition = 0
    if (newPosition > rangeInputsWrapper.getBoundingClientRect().width) {
      newPosition = rangeInputsWrapper.getBoundingClientRect().right
    }

    rangeWrapper.style.setProperty(mutableProperty, `${newPosition}px`)
  }

  toggle.addEventListener('pointermove', moveAt)

  const mouseUp = (evt) => {
    let step = 100 / (rangeWrapper.getBoundingClientRect().width - 48)

    toggle.removeEventListener('pointermove', moveAt)
    toggle.removeEventListener('pointerup', mouseUp)
  }

  toggle.addEventListener('pointerup', mouseUp)
})
