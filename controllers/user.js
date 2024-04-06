const Helper = require('../utils/helper')
const DB = require('../models/user')
const RoleDB = require('../models/role')

//all users
const all = async (req,res,next)=>{
let users = await DB.find()
Helper.fMsg(res,'All users',users)
}

//user login
const register = async (req,res,next)=>{

    let dbEmailUser = await DB.findOne({email:req.body.email})
    if(dbEmailUser){
        next(new Error('Email is already existed'))
        return
    } 
    let dbUser = await DB.findOne({phone:req.body.phone})
    if(dbUser){
        next(new Error('Phone is already existed'))
        return
    }
  req.body.password = Helper.encode(req.body.password)
  let result = await new DB(req.body).save()
  Helper.fMsg(res,'Register success',result)
}

//user login
const login = async (req,res,next)=>{
    let dbUser = await DB.findOne({phone:req.body.phone}).select('-__v -created').populate('roles permits')
    if(dbUser){
        if(Helper.compare(req.body.password ,dbUser.password)){

            //we need to convert to object format for removing password
            dbUser = dbUser.toObject()
            delete dbUser.password

            //append token
            dbUser.token = Helper.makeToken(dbUser)

            //redis
            Helper.set(dbUser._id,dbUser)
            Helper.fMsg(res,'Login success',dbUser )
        } else {
            next(new Error('Creditial error'))
        }
    } else {
        next(new Error('Creditial error'))
    }
 
}

//add role 
const addRole = async (req,res,next)=>{
let dbUser = await DB.findById(req.body.userId)
let dbRole = await RoleDB.findById(req.body.roleId)

let foundRole = dbUser.roles.find(rid=> rid.equals(dbRole._id))
if(foundRole) {
 next(new Error('Role already exist'))
} else {
    await DB.findByIdAndUpdate(dbUser._id,{$push:{roles:dbRole._id}})
    let user = await DB.findById(dbUser._id)
        Helper.fMsg(res,'user detail after adding role',user)
}
}

//remove a role 
const removeRole = async (req,res,next)=>{
let dbUser = await DB.findById(req.body.userId)
let dbRole = await RoleDB.findById(req.body.roleId)

let foundRole = dbUser.roles.find(rid=> rid.equals(dbRole._id))

if(foundRole) {
    await DB.findByIdAndUpdate(dbUser._id,{$pull:{roles:dbRole._id}})
    let user = await DB.findById(dbUser._id)
    Helper.fMsg(res,'user detail after removing role',user)
}else {
    next(new Error('Role does not exist'))
}
} 
module.exports = {
    all,
    register,
    login,
    addRole,
    removeRole
}