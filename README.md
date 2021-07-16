# site

> Многостарничный сайт в стиле e-commerce с адаптивной резиновой версткой и самописным слайдером и js-анимацией.
> <a href="https://andreyuytov.github.io/e-commerce-site/">Посмотреть сайт</a>

## Установка и запуск

````bash
# установка модулей
npm install

# веб сервер с автоперезагрузкой по адресу localhost:8080
npm run dev

# сборка проекта в директорию public
npm run build


Для добавления новой html страницы, например `new-page.html` в `webpack.config.js` нужно добавить в `plugins` новый инстанс `HtmlWebpackPlugin`:

```js
new HtmlWebpackPlugin({
      template: 'src/pages/views/new-page.html',
      filename: 'new-page.html',
    }),
````
