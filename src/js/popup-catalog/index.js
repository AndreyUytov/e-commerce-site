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

    this.$catalogButtons.forEach((el) => {
      el.addEventListener('click', this.showCatalog)
    })

    this.$firstLevelList.addEventListener('click', this.showSubmenu)

    this.$backButton.addEventListener('click', this.closeSubMenu)

    this.$closeButton.addEventListener('click', this.closePopup)
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

    this.isDestroyed = true
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

let catalogMenu

if (document.documentElement.clientWidth < 1100) {
  catalogMenu = new CatalogMenu()
}

window.addEventListener('resize', () => {
  if (document.documentElement.clientWidth < 1100) {
    catalogMenu?.isDestroyed
      ? catalogMenu.init()
      : (catalogMenu = new CatalogMenu())
  } else {
    catalogMenu.destroy()
  }
})
