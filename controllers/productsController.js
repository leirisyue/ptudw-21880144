let controller = {}
const models = require('../models');


controller.show = async (req, res) => {

   //--------------------------category - right-column --------------------------
   let categories = await models.Category.findAll({
      inClude: [{
         model: models.Product
      }]
   })
   res.locals.categories = categories
   //-----------------------right-column click category --------------------------
   let category = isNaN(req.query.category) ? 0 : parseInt(req.query.category)
   let options = {
      attributes: ['id', 'name', 'imagePath', 'stars', 'price', 'oldPrice'],
      where: {}
   }
   if (category > 0) {
      options.where.categoryId = category
   }
   //-------------------------------------brand----------------------------------
   let brand = isNaN(req.query.brand) ? 0 : parseInt(req.query.brand)
   let brands = await models.Brand.findAll({
      include: [{
         model: models.Product
      }]
   })
   res.locals.brands = brands
   if (brand > 0) {
      options.where.brandId = brand
   }
   //-------------------------------------tag------------------------------------
   let tag = isNaN(req.query.tag) ? 0 : parseInt(req.query.tag)
   let tags = await models.Tag.findAll()
   res.locals.tags = tags
   if (tag > 0) {
      // tìm nhung lien ket cua bang product den bang tag ma co idProduct = idTag (req.query)
      options.include = [{
         model: models.Tag,
         where: { id: tag }
      }]
   }
   //------------------------------------product-list----------------------------
   let products = await models.Product.findAll(options)
   res.locals.products = products
   res.render('product-list')
}

controller.showDetails = async (req, res) => {
   let id = isNaN(req.params.id) ? 0 : parseInt(req.params.id)
   let product = await models.Product.findOne({
      attributes: ['id', 'name', 'stars', 'price', 'oldPrice', 'summary', 'description', 'specification'],
      where: { id },
      include: [{
         model: models.Image,
         attributes: ['name', 'imagePath']
      }, {
         model: models.Review,
         attributes: ['id', 'review', 'stars','createdAt'],
         include:[{
            model:models.User,
            attributes:['firstName','lastName']
         }]
      }]
   })
   res.locals.product = product
   res.render('product-detail')
}

module.exports = controller;