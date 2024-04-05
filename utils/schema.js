const Joi = require('joi')

module.exports = {
    PermitSchema: {
        add:Joi.object({
            name:Joi.string().required()
        })
    },
    UserSchema :{
        register:Joi.object({
            name:Joi.string().required().min(5),
            email:Joi.string().email().required(),
            phone:Joi.string().min(7).max(11).required(),
            password:Joi.string().min(6).required()
        }),
        login:Joi.object({
            phone:Joi.string().min(7).max(11).required(),
            password:Joi.string().min(6).required()
        }),
    },
    AllSchema:{
        id:Joi.object({
            id:Joi.string().regex(/^[0-9a-fA-F]{24}$/)
        })
    },
    RoleSchema:{
        addPermits: Joi.object({
                roleId: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
                permitId: Joi.string().regex(/^[0-9a-fA-F]{24}$/)
        })
    }
}