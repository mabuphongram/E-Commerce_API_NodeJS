const DB = require('../models/permit')
const helper = require('../utils/helper')
const Helper = require('../utils/helper')

const add = async (req,res,next)=>{
    let dbPermit = await DB.findOne({name:req.body.name})
    if(dbPermit){
        next(new Error('This Permission is already exist'))
    } else {
        let result = await new DB(req.body).save()
        Helper.fMsg(res,'Permission saved!',result)
       

    }
}

const all = async (req,res,next)=>{
let permits = await DB.find().select('-__v')
Helper.fMsg(res,'All Permission',permits)
}

const get = async (req,res,next)=>{
let permit = await DB.findById(req.params.id).select('-__v')
if(permit){
    helper.fMsg(res,'Permit', permit)
} else {
    next(new Error('No permission with that id'))
}
}

const put = async (req,res,next)=>{
 let dbPermit = await DB.findById(req.params.id)
 if(dbPermit){
   await DB.findByIdAndUpdate(dbPermit._id,req.body)
   let result = await DB.findById(dbPermit._id)
    helper.fMsg(res,'Permit', result)
} else {
    next(new Error('No permission with that id'))
}
}

const drop = async (req,res,next)=>{
let result = await DB.findById(req.params.id)
if(result){
await await DB.findByIdAndDelete(req.params.id)
Helper.fMsg(res,'Permission is deleted')
} else {
    next(new Error('That permission id does not exist'))
}
}

module.exports = {
    add,
    all,
    get,
    put,
    drop
}