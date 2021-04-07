/* eslint-disable */

import Slider from './../custom-slider/custom-slider.js'

const presentControll = document.querySelector('.novelty__controlls')
const container = document.querySelector('.present-products__novelty')
const cardList = container.querySelector('.novelty__list')
const snapLeft = presentControll.querySelector(
  '.controlls-counter-list__btn--prev'
)
const snapRight = presentControll.querySelector(
  '.controlls-counter-list__btn--next'
)

const totalCount = presentControll.querySelector(
  '.controlls-counter-list__all-count'
)
const currentCount = presentControll.querySelector(
  '.controlls-counter-list__current-count'
)

const conf = {
  container,
  sliderList: cardList,
  nextButton: snapRight,
  prevButton: snapLeft,
  totalCount,
  currentCount,
}

const slider = new Slider(conf)
