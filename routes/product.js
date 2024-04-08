const router = require('express').Router()
const controller = require('../controllers/product')
const {saveFiles} = require('../utils/gallery')

router.post('/',saveFiles,controller.add)
router.get('/',controller.all)
router.get('/paginate/:page',controller.paginate)
router.get('/paginate/byCat/:page/:id',controller.productByCat)
router.get('/paginate/byTag/:page/:id',controller.productByTag)

router.route('/:id')
    .get(controller.get)
    .delete(controller.drop)
    .put(controller.put)


module.exports = router