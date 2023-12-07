import {
  Form,
  REG_EXP_EMAIL,
  REG_EXP_PASSWORD,
} from '../../script/form'

class RecoveryConfirmForm extends Form {
  FIELD_NAME = {
    CODE: 'code',
    PASSWORD: 'password',
    PASSWORD_AGAIN: 'passwordAgain',
  }

  FIELD_ERROR = {
    IS_EMPTY: 'Введіть значення в поле',
    IS_BIG: 'Дуже довге значення, приберіть зайве',
    PASSWORD:
      'Пароль повинен складатися з не менще ніж 8 символів',
    PASSWORD_AGAIN:
      'Ваш другий пароль не співпадає з першим',
  }

  validate = (name, value) => {
    //функція яка робить перевірку та повертає результат в залежності від перевірки
    if (String(value).length < 1) {
      return this.FIELD_ERROR.IS_EMPTY
    }
    //=====
    if (String(value).length > 20) {
      return this.FIELD_ERROR.IS_BIG
    }
    //=====

    if (name === this.FIELD_NAME.PASSWORD) {
      if (!REG_EXP_PASSWORD.test(String(value))) {
        return this.FIELD_ERROR.PASSWORD
      }
    }
    //=====
    if (name === this.FIELD_NAME.PASSWORD_AGAIN) {
      if (
        String(value) !==
        this.value[this.FIELD_NAME.PASSWORD]
      ) {
        return this.FIELD_ERROR.PASSWORD_AGAIN
      }
    }
    //=====
  }

  //функція яка відправляє дані на сервер
  submit = async () => {
    if (this.disabled === true) {
      this.validateAll()
    } else {
      console.log(this.value)
      this.setAlert('progress', 'Завантаження...')

      try {
        const res = await fetch('/recovery-confirm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: this.convertData(),
        })

        const data = await res.json()

        if (res.ok) {
          this.setAlert('success', data.message)
        } else {
          this.setAlert('error', data.message)
        }
      } catch (error) {
        this.setAlert('error', error.message)
      }
    }
  }

  convertData = () => {
    //витягуємо дані для відправки на сервер,конвертує дані з фронтенда в бекенд
    return JSON.stringify({
      [this.FIELD_NAME.CODE]: Number(
        this.value[this.FIELD_NAME.CODE],
      ),
      [this.FIELD_NAME.PASSWORD]:
        this.value[this.FIELD_NAME.PASSWORD],
    })
  }

  setAlert = (status, text) => {
    const el = document.querySelector(`.alert`)

    if (status === 'progress') {
      el.className = 'alert alert--progress'
    } else if (status === 'success') {
      el.className = 'alert alert--success'
    } else if (status === 'error') {
      el.className = 'alert alert--error'
    } else {
      el.className = 'alert alert--disabled'
    }

    if (text) el.innerText = text
  }
}

window.recoveryConfirmForm = new RecoveryConfirmForm()
