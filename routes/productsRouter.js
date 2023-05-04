'use strict'

let express = require('express');
let router = express.Router()
let controller = require('../controllers/productsController')
let cartController = require('../controllers/cartController')

router.get('/', controller.show)
router.get('/cart',cartController.show)         // dat truoc de xu ly
router.get('/:id', controller.showDetails)    // product detail

router.post('/cart', cartController.add)     // api add cart
router.put('/cart', cartController.update)     
router.delete('/cart', cartController.remove)     
router.delete('/cart/all',cartController.clear)

module.exports = router
