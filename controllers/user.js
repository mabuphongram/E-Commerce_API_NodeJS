const Helper = require('../utils/helper')
const DB = require('../models/user')


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

module.exports = {
    register,
    login
}