/* eslint-disable */


export function animate({timing, draw, duration}) {

  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    // timeFraction изменяется от 0 до 1
    let timeFraction = (time - start) / duration
    if (timeFraction > 1) timeFraction = 1

    // вычисление текущего состояния анимации
    let progress = timing(timeFraction)

    draw(progress)

    if (timeFraction < 1) {
      requestAnimationFrame(animate)
    }

  })
}

export function back(timeFraction, x = 1.5) {
  return Math.pow(timeFraction, 2) * ((x + 1) * timeFraction - x)
}

export function bounce(timeFraction) {
  for (let a = 0, b = 1, result; 1; a += b, b /= 2) {
    if (timeFraction >= (7 - 4 * a) / 11) {
      return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
    }
  }
}

// принимает функцию расчёта времени и возрващает преобразованный вариант
export function makeEaseOut(timing) {
  return function(timeFraction) {
    return 1 - timing(1 - timeFraction);
  }
}