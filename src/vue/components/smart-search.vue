<template>
  <div class="smart-search__wrapper"
  :class="{'smart-search__wrapper--hide': !isOpen}">
    <button @click="smartSearchToggle" 
    v-show="!isOpen"
     class="smart-search__show-snap">
      <svg class="smart-search__show-snap-svg">
        <use href="#search" />
      </svg>
    </button>
    <div v-if="isOpen" class="smart-search">
      <div class="label-and-result-wrapper">
        <label class="smart-search__label">
        <input type="text" placeholder="example, 'black'" class="smart-search__input" v-model="inputValue" v-focus />
        <button class="smart-search__submit">
          <svg class="smart-search__submit-svg">
            <use href="#search" />
          </svg>
        </button>
      </label>
      <ul v-if="inputValue.trim()" class="smart-search__result-list">

          <li v-for="item in itemsForShowing" :key="item.id" class="result-list__item">
            <a :href="item.image_url" v-html="highColor(item.name)" class="result-list__link"></a>
          </li>

          <li v-if="isOverFlowItems" class="result-list__item">
            <a href="#" class="result-list__link result-list__link--overflow">
              Все результаты
            </a>
          </li>

          <li v-if="!items.length" class="not-found">
            <h3 class="not-found__title">По вашему запросу ничего не найдено</h3>
            <p class="not-found__info">
              Попробуйте изменить формулировку или воспользуйтесь нашим <a href="#" class="not-found__link">прайсом</a>
            </p>
          </li>
        </ul>
      </div>
      <button @click="smartSearchToggle" class="smart-search__close-snap">
        <svg class="smart-search__close-snap-svg">
          <use href="#close" />
        </svg>
      </button>
    </div>
    
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'SmartSearch',
  data() {
    return {
      inputValue: '',
      isOpen: false,
      items: []
    }
  },
  watch: {
    inputValue() {
      this.debounceGetItems()
    }
  },
  created () {
    // время игнора перед следующим запуском getItems поставил на 1секунду
    this.debounceGetItems = this.debounce(this.getItems, 1000)
  },
  computed: {
    // показываю только первые пять результатов
    isOverFlowItems() {
      return this.items.length > 5 ? true : false
    },
    // если их больше 5 - добавляем "Показать все результаты"
    itemsForShowing() {
      return this.items.slice(0,5)
    },
  },
  methods: {

    smartSearchToggle() {
      this.isOpen = !this.isOpen
      this.isOpen ? document.body.style.overflow = 'hidden' : document.body.style.overflow = ''
    },

    // для выделения совпадающего текста цветом
    highColor(itemName) {
      let reg = new RegExp(`${this.inputValue}`,'i')
      return itemName.replace(reg, `<span style="color: rgba(255, 255, 255, 0.446);">$&</span>`)
    },

    getItems () {
      if(!this.inputValue.trim()) {
        return
      }
      // нашел сервер с бесплатным API по поиску пива - поисковик там работает только на !!латинице
      axios.get(`https://api.punkapi.com/v2/beers?beer_name=${this.inputValue.trim()}`).then((res) => {
        this.items = res.data
      }).catch(e => console.log(`Error: ${e}`))
    },

    // обертка для getItems, которая регулирует частоту отправки запросов на сервер
    // (вызывает последний проигнорированный вызов с актуальным inputValue)
    debounce(func, ms) {
      let isCoolDown = false,
      savedArgs,
      savedThis;

      function wrapper() {

        if (isCoolDown) { 
          savedArgs = arguments
          savedThis = this
          return
        }

        func.apply(this, arguments)

        isCoolDown = true

        setTimeout(function() {
          isCoolDown = false
          if (savedArgs) {
            wrapper.apply(savedThis, savedArgs)
            savedArgs = savedThis = null
          }
        }, ms)
      }

      return wrapper
    }
  },
  // autofocus не работал на некоторых браузерах - добавил директиву
  directives: {
    
  focus: {
    inserted: function (el) {
      el.focus()
    }
  }
}
}
</script>

<style lang="less" scoped>
  .smart-search__wrapper {
    position: fixed;
    top: 0px;
    left: 0px;

    width: 100%;
    height: 56px;
    padding: 0 16px;

    display: flex;
    justify-content: space-between;
    align-items: center;


    background: #2B2831;
  }

    .smart-search__wrapper--hide {
    position: static;
    width: 24px;
    height: 24px;
    padding: 0;

    overflow: hidden;
    filter: none;
  }

  .smart-search__show-snap {
    width: 24px;
    height: 24px;
    padding: 0;

    display: flex;
    justify-content: center;
    align-items: center;

    background: transparent;
    cursor: pointer;
    border: none;

    outline: none;
    &:active {
      transform: translateY(1px);
    }
  }

  .smart-search__show-snap-svg {
    width: 24px;
    height: 24px;
  }

  .smart-search {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .label-and-result-wrapper {
    width: 100%;
    margin-right: 24px;
  }

  .smart-search__label {
    position: relative;
    width: 100%;
    height: 40px;

    display: flex;
  }

  .smart-search__input {
    width: 100%;
    padding: 8px 48px 8px 16px;

    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: #fff;

    background: transparent;
    border: 1px solid #858585;
    border-radius: 20px;

    outline: none;
  }

  .smart-search__submit {
    position: absolute;
    top: 8px;
    right: 16px;
    width: 24px;
    height: 24px;
    padding: 0px;

    display: flex;
    justify-content: center;
    align-items: center;

    background: transparent;
    border: none;
    cursor: pointer;
  }

  .smart-search__submit-svg {
    width: 24px;
    height: 24px;

    --svg-fill: #858585;
  }

  .smart-search__result-list {
    position: fixed;
    top: 56px;
    left: 0px;
    width: 100%;
    max-height: 296px;
    margin: 0;
    padding: 0;
    padding-top: 24px;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    list-style: none;

    background: #2B2831;
  }

  .not-found {
    width: 100%;
    height: 296px;
    padding: 42px 16px;

    display: flex;
    flex-direction: column;
    align-content: flex-start;
    justify-content: flex-start;
  }

  .not-found__title {
    margin-bottom: 8px;

    font-family: 'Montserrat';
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 32px;

    color: #FFFFFF;
  }

  .not-found__info {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;

    color: #858585;
  }

  .not-found__link {
    text-decoration: underline;
    color: #FFFFFF;

    &:hover {
      text-decoration: none;
    }
  }

  .result-list__item {
    width: 100%;

    &:hover {
      background: #3A3A47;
    }
  }

  .result-list__link {
    max-width: 100%;
    height: 40px;
    padding: 8px 16px;

    display: block;

    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;

/* identical to box height, or 150% */

/* белый */
color: #FFFFFF;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &--overflow {
      text-decoration: underline;
      &:hover {
      text-decoration: none;
    }
    }
  }

  .smart-search__close-snap {
    width: 24px;
    height: 24px;
    padding: 0px;

    display: flex;
    justify-content: center;
    align-items: center;

    background: transparent;
    border: none;
    cursor: pointer;
  }

  .smart-search__close-snap-svg {
    width: 24px;
    height: 24px;

    --svg-fill: #858585;
  }

  @media(min-width:1550px) {
    .smart-search__wrapper {
      height: 72px;
      filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    }

    .smart-search__wrapper--hide {
      filter: none;
    }

    .smart-search {
      width: 1450px;
      padding: 0 16px;
      margin: 0 auto;
    }

    .label-and-result-wrapper {
      position: relative;
    }
    .smart-search__result-list {
      position: absolute;
      padding-top: 8px;

      box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
    }
  }
</style>