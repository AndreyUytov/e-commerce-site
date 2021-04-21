class CatalogMenu {
  constructor() {
    this.$wrapper = document.querySelector('.catalog-popup__wrapper')
    this.$backButton = this.$wrapper.querySelector('.catalog-popup__back-link')
    this.$closeButton = this.$wrapper.querySelector(
      '.catalog-popup__close-link'
    )
    this.$firstLevelList = this.$wrapper.querySelector(
      '.catalog-popup__master-list'
    )

    this.$catalogButtons = document.querySelectorAll('.catalog-button')

    this.$activeFirstLevelItem = null
    this.$activeTwoLevelItem = null

    this.toggleVisibleBackButton()

    this.showCatalog = () => {
      this.$wrapper.style.display = 'block'
    }

    this.showSubmenu = (evt) => {
      if (!this.$activeFirstLevelItem) {
        let newActiveElem = evt.target.closest('.master-list__item')

        if (!newActiveElem) return

        this.$activeFirstLevelItem = newActiveElem
        this.$activeFirstLevelItem.classList.add('active')
        this.toggleVisibleBackButton()
      } else if (!this.$activeTwoLevelItem) {
        let newActiveSubElem = evt.target.closest('.sub-list__item')
        if (!newActiveSubElem) return

        this.$activeTwoLevelItem = newActiveSubElem
        this.$activeTwoLevelItem.classList.add('active')
      }
    }

    this.closeSubMenu = () => {
      if (this.$activeTwoLevelItem) {
        this.$activeTwoLevelItem.classList.remove('active')
        this.$activeTwoLevelItem = null
      } else if (this.$activeFirstLevelItem) {
        this.$activeFirstLevelItem.classList.remove('active')
        this.$activeFirstLevelItem = null
        this.toggleVisibleBackButton()
      }
    }

    this.closePopup = () => {
      this.$activeTwoLevelItem?.classList.remove('active')
      this.$activeFirstLevelItem?.classList.remove('active')
      this.$activeFirstLevelItem = null
      this.$activeTwoLevelItem = null
      this.toggleVisibleBackButton()
      this.$wrapper.style.display = ''
    }

    this.init()
  }

  toggleVisibleBackButton() {
    if (!this.$activeFirstLevelItem) {
      this.$backButton.classList.remove('show-back-button')
    } else {
      this.$backButton.classList.add('show-back-button')
    }
  }

  destroy() {
    this.$catalogButtons.forEach((el) => {
      el.removeEventListener('click', this.showCatalog)
    })

    this.$firstLevelList.removeEventListener('click', this.showSubmenu)

    this.$backButton.removeEventListener('click', this.closeSubMenu)

    this.$closeButton.removeEventListener('click', this.closePopup)
  }

  init() {
    this.$catalogButtons.forEach((el) => {
      el.addEventListener('click', this.showCatalog)
    })

    this.$firstLevelList.addEventListener('click', this.showSubmenu)

    this.$backButton.addEventListener('click', this.closeSubMenu)

    this.$closeButton.addEventListener('click', this.closePopup)
  }
}

class BigCatalogMenu {
  constructor() {
    this.$catalogButton = document.querySelector(
      '.search-block__catalog-button'
    )
    this.$wrapper = document.querySelector('.catalog-popup__wrapper')
    this.$firstLevelList = this.$wrapper.querySelector(
      '.catalog-popup__master-list'
    )
    this.$currentActiveElement = this.$firstLevelList.firstElementChild

    this.showPopup = (evt) => {
      this.$wrapper.style.display = 'block'
      this.$catalogButton.firstElementChild.innerHTML = `<use href="#close" />`
      this.$catalogButton.removeEventListener('click', this.showPopup)
      this.$catalogButton.addEventListener('click', this.closePopup)
    }

    this.closePopup = (evt) => {
      this.$wrapper.style.display = ''
      this.$catalogButton.firstElementChild.innerHTML = `<use href="#burger" />`
      this.$catalogButton.removeEventListener('click', this.closePopup)
      this.$catalogButton.addEventListener('click', this.showPopup)
    }

    this.toggleActiveSublist = (evt) => {
      let newActiveSubList = evt.target.closest('.master-list__item')

      if (!newActiveSubList) return

      this.$currentActiveElement.classList.remove('active')
      newActiveSubList.classList.add('active')
      this.$currentActiveElement = newActiveSubList
    }

    this.init()
  }

  init() {
    this.$catalogButton.addEventListener('click', this.showPopup)
    this.$currentActiveElement.classList.add('active')
    this.$firstLevelList.addEventListener('click', this.toggleActiveSublist)
  }

  destroy() {
    this.$catalogButton.removeEventListener('click', this.showPopup)
    this.$currentActiveElement.classList.remove('active')
    this.$firstLevelList.removeEventListener('click', this.toggleActiveSublist)
  }
}

let menuCatalog

if (document.documentElement.clientWidth < 1100) {
  menuCatalog = new CatalogMenu()
} else {
  menuCatalog = new BigCatalogMenu()
}

window.addEventListener('resize', () => {
  if (document.documentElement.clientWidth < 1100) {
    menuCatalog.destroy()
    menuCatalog = new CatalogMenu()
  } else {
    menuCatalog.destroy()
    menuCatalog = new BigCatalogMenu()
  }
})
