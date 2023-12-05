// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

// Підключіть файли роутів
// Підключіть інші файли роутів, якщо є

// Об'єднайте файли роутів за потреби
router.get('/', function (req, res) {
  res.render('index', {
    name: 'index',
    component: [],
    title: 'Home page',
    data: {},
  })
})

const auth = require('./auth')

router.use('/', auth)

// Експортуємо глобальний роутер
module.exports = router
