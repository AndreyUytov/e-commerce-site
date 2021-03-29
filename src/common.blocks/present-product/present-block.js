/* eslint-disable */

import Slider from './../custom-slider/custom-slider.js'

const presentControll = document.querySelector('.novelty__controlls')
const container = document.querySelector('.present-products__novelty')
const cardList = container.querySelector('.novelty__list')
const cardListItem = cardList.querySelector('.present-card')
const cardListLength = cardList.querySelectorAll('.present-card').length
const snapLeft = presentControll.querySelector(
  '.controlls-counter-list__btn--prev'
)
const snapRight = presentControll.querySelector(
  '.controlls-counter-list__btn--next'
)

const conf = {
  container,
  sliderList: cardList,
}

const slider = new Slider(conf)
