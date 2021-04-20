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

    this.$catalogButton = document.querySelector('.menu-site__catalog-button')

    this.$activeFirstLevelItem = null
    this.$activeTwoLevelItem = null

    this.toggleVisibleBackButton()

    this.$catalogButton.addEventListener('click', () => {
      this.$wrapper.style.display = 'block'
    })

    this.$firstLevelList.addEventListener('click', (evt) => {
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
    })

    this.$backButton.addEventListener('click', () => {
      if (this.$activeTwoLevelItem) {
        this.$activeTwoLevelItem.classList.remove('active')
        this.$activeTwoLevelItem = null
      } else if (this.$activeFirstLevelItem) {
        this.$activeFirstLevelItem.classList.remove('active')
        this.$activeFirstLevelItem = null
        this.toggleVisibleBackButton()
      }
    })

    this.$closeButton.addEventListener('click', () => {
      this.$activeTwoLevelItem?.classList.remove('active')
      this.$activeFirstLevelItem?.classList.remove('active')
      this.$activeFirstLevelItem = null
      this.$activeTwoLevelItem = null
      this.toggleVisibleBackButton()
      this.$wrapper.style.display = ''
    })
  }

  toggleVisibleBackButton() {
    if (!this.$activeFirstLevelItem) {
      this.$backButton.classList.remove('show-back-button')
    } else {
      this.$backButton.classList.add('show-back-button')
    }
  }
}

const catalogMenu = new CatalogMenu()
