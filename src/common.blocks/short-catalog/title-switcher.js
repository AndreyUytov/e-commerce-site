/* eslint-disable */

const catalogTitle = document.querySelector('.short-catalog__title')

catalogTitle.addEventListener('click', (evt) => {

  let link = evt.target.closest('.short-catalog__title-link')

  if(link) {

    let linkDeleteActiveClass = catalogTitle.querySelector('.short-catalog__title-link--active')

    link.classList.add('short-catalog__title-link--active')
    
    linkDeleteActiveClass.classList.remove('short-catalog__title-link--active')
  }
})