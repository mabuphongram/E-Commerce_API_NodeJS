const router = require('express').Router()
const controller = require('../controllers/category')
const  {saveFile}= require('../utils/gallery')

router.post('/',saveFile,controller.add)
router.get('/',controller.all)

router.route('/:id')
    .get(controller.get)
    .delete(controller.drop)

    //put will only update image, not name why?
    .put(saveFile,controller.put)

module.exports = router