class FieldSelect {
  static toggle = (target) => {
    const options = target.nextElementSibling //звертаємось до сусідніх опцій

    options.toggleAttribute('active') // встановлюємо статус актів

    setTimeout(() => {
      window.addEventListener(
        'click',
        (e) => {
          if (!options.parentElement.contains(e.target))
            //перевіряємо чи знаходиться момент клику в полі контейнер
            options.removeAttribute('active')
        },
        { once: true },
      )
    })
  }
  static change = (target) => {
    const parent = target.parentElement.parentElement //виходимо на філд контейнер
    const list = target.parentElement //отримуємо список опцій

    const active = list.querySelector('*[active]') //пінднімаємось в батьківський елемент ул і шукаємо активний елемент актів, якщо вона є то вимикаємо її

    if (active) active.toggleAttribute('active')

    //=====
    target.toggleAttribute('active') //додаємо активний елемент в актів
    //=====

    const value = parent.querySelector('.field__value') // в філд контейнері шукаємо field__value, місце куди будемо записувати значення

    if (value) {
      value.innerText = target.innerText //якщо знаходимо значення то в поле кладемо таке же значення як в опції
      value.classList.remove('.field__value--placeholder') //і прибираємо клас в плейсхолдері field__value--placeholder
    }

    //======

    list.toggleAttribute('active') //прибираємо актів атрибут щоб закрити вспливаюче поле
  }
}
window.fieldSelect = FieldSelect
