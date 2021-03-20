/* eslint-disable */

import Slider from './../slider/slider.js'


const bannerContainer = document.querySelector('.page-main__banner')
const bannerList = bannerContainer.querySelector('.banner__carousel-list')
const bannerListItem = bannerList.querySelector('.banner__carousel-item')
const slidersLength = bannerList.querySelectorAll('.banner__carousel-item')
  .length
const bannerControllsCircles = bannerContainer.querySelectorAll(
  '.banner__controll-item'
)
const bannerSnapLeft = document.querySelector(
  '.banner-wrapper__controll-snap--left'
)
const bannerSnapRight = document.querySelector(
  '.banner-wrapper__controll-snap--right'
)

const config = {
  sliderWrapper: bannerContainer,
  sliderList: bannerList,
  slide: bannerListItem,
  sliderLength: slidersLength,
  sliderMarkers: bannerControllsCircles,
  prevButton: bannerSnapLeft,
  nextButton: bannerSnapRight
}

const sliderBanner = new Slider(config)