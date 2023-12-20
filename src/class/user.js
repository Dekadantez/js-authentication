class User {
  static USER_ROLE = {
    //ролі, під якими можна буде заходити на сайт
    USER: 1,
    ADMIN: 2,
    DEVELOPER: 3,
  }
  static #list = []

  static #count = 0

  constructor({ email, password, role }) {
    this.id = User.#count++

    this.email = String(email).toLowerCase()
    this.password = String(password)
    this.role = User.#convertRole(role)

    this.isConfirm = false
  }
  // перевіряємо чи потрібна роль
  static #convertRole = (role) => {
    role = Number(role) //конвертуємо роль в число

    if (isNaN(role)) {
      role = this.USER_ROLE.USER
    } //перевіряємо яким числом є роль (1,2,3), якщо не співпадає, то по замовченню ставимо роль юзера

    role = Object.values(this.USER_ROLE).includes(role)
      ? role
      : this.USER_ROLE.USER
    //дивимось, чи є така роль у списку наших значень, якщо є записуємо, якщо ні ставимо роль юзера за замовченням
    return role
  }
  //створюємо метод який приймає данні юзера та додає його до бази юзерів
  static create(data) {
    const user = new User(data)

    this.#list.push(user)

    console.log(this.#list)

    return user
  }

  //=====

  static getByEmail(email) {
    //повертає нам користувача по емайлу, якщо не знаходить повертає нулл
    return (
      this.#list.find(
        (user) =>
          user.email === String(email).toLowerCase(),
      ) || null
    )
  }

  static getById(id) {
    return (
      this.#list.find((user) => user.id === Number(id)) ||
      null
    )
  }

  static getList = () => this.#list
}

module.exports = { User }
