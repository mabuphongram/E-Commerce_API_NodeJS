const DB = require('../models/role')
const PermitDB = require('../models/permit')
const Helper = require('../utils/helper')

const add = async (req,res,next)=>{
let dbRole = await DB.findOne({name:req.body.name})

if(dbRole){
    next(new Error('Role name is already in use'))
} else {
    let result = await new DB(req.body).save()
    Helper.fMsg(res,'Role added!',result)
}
}
const all = async (req,res,next)=>{
let dbRoles = await DB.find().populate('permits','-__v')
Helper.fMsg(res,'All roles',dbRoles)
}

const get = async (req,res,next)=>{
let dbRole = await DB.findById(req.params.id).select('-__v')
if(dbRole){
    Helper.fMsg(res,'Single Role',dbRole)
} else {
    next(new Error('No role with that id'))
}
}

const put = async (req,res,next)=>{
    let dbRole = await DB.findById(req.params.id).select('-__v')
    if(dbRole){
        await DB.findByIdAndUpdate(dbRole._id,req.body)
        let updatedRole = await DB.findById(dbRole._id)
        Helper.fMsg(res,'Single Role',updatedRole)
    } else {
        next(new Error('No role with that id'))
    }

}

const drop = async (req,res,next)=>{
    let dbRole = await DB.findById(req.params.id).select('-__v')
    if(dbRole){
        await DB.findByIdAndDelete(dbRole._id)
        Helper.fMsg(res,'Role is deleted')
    }else {
        next(new Error('No role with that id'))
    }
}

const roleWithPermits = async (req,res,next)=>{
let dbRole = await DB.findById(req.body.roleId)
let dbPermit = await PermitDB.findById(req.body.permitId)
if (dbRole && dbPermit){
    //inserting value to array permits with &push
     await DB.findByIdAndUpdate(dbRole._id,{$push:{permits:dbPermit._id}})
     let result = await DB.findById(dbRole._id).populate('permits','-__v')
    Helper.fMsg(res,`A permit is added to Role of ${dbRole.name}`,result)
} else {
    next (new Error('valided role id and permit id is needed'))
}
}

const roleRemoveWithPermits = async (req,res,next)=>{
    console.log('true') 
let dbRole = await DB.findById(req.body.roleId)
let dbPermit = await PermitDB.findById(req.body.permitId)
if (dbRole && dbPermit){
       //inserting value to array permits with &push
     await DB.findByIdAndUpdate(dbRole._id,{$pull:{permits:dbPermit._id}})
     let result = await DB.findById(dbRole._id).populate('permits','-__v')
    Helper.fMsg(res,`A permit is removed to Role of ${dbRole.name}`,result)
} else {
    next (new Error('valided role id and permit id is needed'))
}
}

module.exports = {
    add,
    all,
    get,
    put,
    drop,
    roleWithPermits,
    roleRemoveWithPermits
}