const router = require('express').Router()
const controller = require('../controllers/product')
const {saveFiles} = require('../utils/gallery')

router.post('/',saveFiles,controller.add)
router.get('/',controller.all)
router.get('/paginate/:page',controller.paginate)
router.get('/filter/:type/:page/:id',controller.filterBy)

router.route('/:id')
    .get(controller.get)
    .delete(controller.drop)
    .put(controller.put)


module.exports = router