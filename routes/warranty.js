const router = require('express').Router()
const controller = require('../controllers/warranty')
const {saveFile}= require('../utils/gallery')

router.post('/',[saveFile,controller.add])
router.get('/',controller.all)

router.route('/:id')
    .get(controller.get)
    .delete(controller.drop)
    .put([saveFile,controller.put])

module.exports = router