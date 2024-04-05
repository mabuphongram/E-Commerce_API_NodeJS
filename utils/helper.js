const bcrypt = require('bcryptjs')
const Redis = require('async-redis').createClient()
module.exports = {
    fMsg :  (res,msg = "",result=[]) => res.status(200).json({con:true,msg,result}),
    encode : payload => bcrypt.hashSync(payload),
    compare: (userPassword,hashPassword)=> bcrypt.compareSync(userPassword,hashPassword),

    //radis 
    set: async(id,value)=> await Redis.set(id.toString(),JSON.stringify(value)),
    get: async(id,value)=> JSON.parse(await Redis.get(id.toString())),
    drop: async(id)=> await Redis.del(id.toString())

}