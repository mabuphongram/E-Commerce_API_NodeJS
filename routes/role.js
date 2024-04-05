const router = require('express').Router()
const controller = require('../controllers/role')
const {PermitSchema, AllSchema,RoleSchema} = require('../utils/schema')
const {validateBody,validateParam} = require('../utils/validator')


router.post('/',[validateBody(PermitSchema.add),controller.add])

//role with permits
router.post('/add/permit',validateBody(RoleSchema.addPermits),controller.roleWithPermits)
router.post('/remove/permit',validateBody(RoleSchema.addPermits),controller.roleRemoveWithPermits)
router.get('/',[controller.all])
router.route('/:id')
    .get(validateParam(AllSchema.id,'id'),controller.get)
    .put(validateBody(PermitSchema.add),validateParam(AllSchema.id,'id'),controller.put)
    .delete(validateParam(AllSchema.id,'id'),controller.drop)
module.exports = router