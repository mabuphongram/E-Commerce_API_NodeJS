const router = require('express').Router()
const controller = require('../controllers/user')
const {UserSchema} = require('../utils/schema')
const {validateBody,validateToken,validateRole,hasAnyRole,hasAnyPermit} = require('../utils/validator')

router.post('/register',[validateBody(UserSchema.register),controller.register])
router.post('/login',[validateBody(UserSchema.login),controller.login])
router.get('/',controller.all)

router.post('/add/role',[validateToken(),validateRole('Owner'),validateBody(UserSchema.addRole),controller.addRole])
router.post('/remove/role',[validateToken(),validateRole('Owner'),validateBody(UserSchema.removeRole),controller.removeRole])


router.post('/add/permit',[validateToken(),validateRole('Owner'),validateBody(UserSchema.addPermit),controller.addPermit])
router.post('/remove/permit',[validateToken(),hasAnyRole(['Manager','Supervisor','Owner']),validateBody(UserSchema.removePermit),controller.removePermit])
// router.post('/remove/permit',[validateToken(),hasAnyPermit(['Create_category','Edit_category','Delete_category']),validateBody(UserSchema.removePermit),controller.removePermit])

module.exports = router