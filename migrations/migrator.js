
const Helper = require('../utils/helper')
const UserDB = require('../models/user')
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

//backup user
const backup = async() =>{
    let users = await UserDB.find()
    fs.writeFileSync('./migrations/backups/users.json',JSON.stringify(users))
    console.log("User DB is backup")
}
module.exports = {
    migrate,
    backup
}