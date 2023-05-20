'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/usersController')
const { body, validationResult } = require('express-validator')

router.get('/checkout', controller.checkout)
router.post('/placeorders',
   body('firstName').notEmpty().withMessage('First Name is required'),
   body('lastName').notEmpty().withMessage('Last Name is required'),
   body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalis email address!'),
   body('mobile').notEmpty().withMessage('mobile No. is required'),
   body('address').notEmpty().withMessage('address is required'),
   (req, res, next) => {
      let errors = validationResult(req);
      if (req.body.addressId =="0" && !errors.isEmpty()) {
         let errorArray = errors.array();
         let message = ''
         for (let i = 0; i < errorArray.length; i++) {
            message += errorArray[i].msg + "<br/>"
         }
         return res.render('error', { Message: message })
      }
      next()
   },
   controller.placeorders
)

module.exports = router
