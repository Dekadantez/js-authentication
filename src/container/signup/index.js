class SignupForm {
  static value = {} //сюди записується значення, яке вводиться в полях на сторінці

  static validate = (name, value) => {
    //функція яка робить перевірку та повертає результат в залежності від перевірки
    return true
  }

  //функція яка відправляє дані на сервер
  static submit = () => {
    console.log(this.value)
  }

  //функція якщо валідація проходить то значення буде записуватися
  static change = (name, value) => {
    console.log(name, value)

    if (this.validate(name, value)) this.value[name] = value
  }
}

window.signupForm = SignupForm
