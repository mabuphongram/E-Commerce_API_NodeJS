
const Helper = require('../utils/helper')
const UserDB = require('../models/user')
const RoleDB = require('../models/role')
const PermitDB = require('../models/permit')
const fs = require('fs') // fire system module for read and write file

//migrating users
const migrate = () => {
    let data = fs.readFileSync('./migrations/users.json')
    let users = JSON.parse(data)
    
    users.forEach(async(user) => {
        user.password = Helper.encode(user.password)
        let result = await new UserDB(user).save()
        console.log(result)
    });

}

const role_permit_migrate= ()=>{
let data = fs.readFileSync('./migrations/role_and_permit.json')
let rp = JSON.parse(data)

rp.roles.forEach(async(role)=>{
    let result = await new RoleDB(role).save()
    console.log(result)
})

rp.permits.forEach(async(permit)=>{
    let result = await new PermitDB(permit).save()
    console.log(result)
})
}

//backup user
const backup = async() =>{
    let users = await UserDB.find()
    fs.writeFileSync('./migrations/backups/users.json',JSON.stringify(users))
    console.log("User DB is backup")
}
module.exports = {
    migrate,
    backup,
    role_permit_migrate
}