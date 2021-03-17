/* eslint-disable */

import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'

gsap.registerPlugin(Draggable)

const eventsUnify = function(e) {
  return e.changedTouches ? e.changedTouches[0] : e
}

const bannerContainer = document.querySelector('.page-main__banner')
const bannerList = bannerContainer.querySelector('.banner__carousel-list')

Draggable.create(bannerList, {
  type: 'x',
  bounds: bannerContainer,
})
