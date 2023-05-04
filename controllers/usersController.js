'use strict'

const controller = {}

controller.checkout = (req, res) => {
   // res.locals.cart = req.session.cart.getCart()
   res.render('checkout')
}

module.exports = controller