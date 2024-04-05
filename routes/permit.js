const router = require('express').Router()
const controller = require('../controllers/permit')
const {PermitSchema,AllSchema} = require('../utils/schema')
const {validateBody,validateParam} = require('../utils/validator')


router.post('/',[validateBody(PermitSchema.add),controller.add])
router.get('/',controller.all)

router.route('/:id')
    .get(validateParam(AllSchema.id,'id'),controller.get )
    .put(validateParam(AllSchema.id,'id'),controller.put)
    .delete(validateParam(AllSchema.id,'id'),controller.drop)
module.exports = router