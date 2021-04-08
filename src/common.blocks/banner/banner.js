/* eslint-disable */

import Slider from './../custom-slider/custom-slider.js'

const bannerContainer = document.querySelector('.page-main__banner')
const bannerList = bannerContainer.querySelector('.banner__carousel-list')
const bannerControllsCircles = bannerContainer.querySelector(
  '.banner__controll-list'
)
const bannerSnapLeft = document.querySelector(
  '.banner-wrapper__controll-snap--left'
)
const bannerSnapRight = document.querySelector(
  '.banner-wrapper__controll-snap--right'
)

const config = {
  container: bannerContainer,
  sliderList: bannerList,
  markerList: bannerControllsCircles,
  prevButton: bannerSnapLeft,
  nextButton: bannerSnapRight,
}

const sliderBanner = new Slider(config)
