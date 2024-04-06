const router = require('express').Router()
const controller = require('../controllers/user')
const {UserSchema} = require('../utils/schema')
const {validateBody,validateToken,validateRole} = require('../utils/validator')

router.post('/register',[validateBody(UserSchema.register),controller.register])
router.post('/login',[validateBody(UserSchema.login),controller.login])
router.get('/',controller.all)

router.post('/add/role',[validateToken(),validateRole('Owner'),validateBody(UserSchema.addRole),controller.addRole])

//need to validate
router.post('/remove/role',[validateToken(),validateBody(UserSchema.removeRole),controller.removeRole])

module.exports = router