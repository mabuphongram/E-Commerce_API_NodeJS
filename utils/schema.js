const Joi = require('joi')

module.exports = {
    PermitSchema: {
        add:Joi.object({
            name:Joi.string().required()
        })
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