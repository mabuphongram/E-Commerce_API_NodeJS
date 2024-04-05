
const Helper = require('../utils/helper')
const UserDB = require('../models/user')
const fs = require('fs') // fire system module for read and write file

const migrate = () => {
    let data = fs.readFileSync('./migrations/users.json')
    let users = JSON.parse(data)
    
    users.forEach(async(user) => {
        user.password = Helper.encode(user.password)
        let result = await new UserDB(user).save()
        console.log(result)
    });

}
module.exports = {
    migrate
}