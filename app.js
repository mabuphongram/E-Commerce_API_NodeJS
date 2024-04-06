require('dotenv').config()
const express = require('express')
const { migrate, backup, role_permit_migrate, addOwnerRole } = require('./migrations/migrator')
app = express()
mongoose = require('mongoose')

app.use(express.json())

mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`)


const permitRouter = require('./routes/permit')
const roleRouter = require('./routes/role')
const userRouter = require('./routes/user')

app.use('/permits',permitRouter)
app.use('/roles',roleRouter)
app.use('/users',userRouter)

app.use((err, req, res, next) => {
    err.status = err.status || 500
    res.status(err.status).json({con:false,msg:err.message})
  })

// migrate()
// backup()
// role_permit_migrate()
addOwnerRole()
app.listen(process.env.PORT,console.log(`Server is running at port: ${process.env.PORT}`))