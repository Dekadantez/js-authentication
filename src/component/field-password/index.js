class FieldPassword {
  static toggle = (target) => {
    target.toggleAttribute('show') // вмикаємо/вимикаємо атрибут шоу

    const input = target.previousElementSibling // за допомогою previousElementSibling звертаємось до елемента інпут, який є поруч

    const type = input.getAttribute('type') // отримуємо поточний тип

    if (type === 'password') {
      input.setAttribute('type', 'text')
    } else {
      input.setAttribute('type', 'password')
    }
  }
}

window.fieldPassword = FieldPassword
