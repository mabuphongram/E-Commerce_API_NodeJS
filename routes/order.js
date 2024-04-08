const router = require('express').Router()
const controller = require('../controllers/order')
const  {validateToken} = require('../utils/validator')

router.post('/',[validateToken(),controller.addOrder])
router.get('/',[validateToken(),controller.getMyOrders])

// router.route('/:id')
//     .get(controller.get)
//     .delete(controller.drop)
//     .put([saveFile,controller.put])

module.exports = router