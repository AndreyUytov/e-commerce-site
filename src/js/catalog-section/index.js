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
