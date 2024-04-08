require('dotenv').config()
const express = require('express')
const { migrate, backup, role_permit_migrate, addOwnerRole } = require('./migrations/migrator')
app = express()
mongoose = require('mongoose')
fileupload = require('express-fileupload')

app.use(express.json())
app.use(fileupload())

mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`)


const permitRouter = require('./routes/permit')
const roleRouter = require('./routes/role')
const userRouter = require('./routes/user')
const categoryRouter = require('./routes/category')
const subCatRouter = require('./routes/subcat')
const childCatRouter  = require('./routes/childcat')
const tagRouter = require('./routes/tag')
const deliveryRouter = require('./routes/delivery')
const warrantyRouter = require('./routes/warranty')
const productRouter = require('./routes/product')

app.use('/permits',permitRouter)
app.use('/roles',roleRouter)
app.use('/users',userRouter)
app.use('/cats',categoryRouter)
app.use('/subcats',subCatRouter)
app.use('/childcats',childCatRouter)
app.use('/tags',tagRouter)
app.use('/deliverys',deliveryRouter)
app.use('/warranties/',warrantyRouter)
app.use('/products',productRouter)

app.use((err, req, res, next) => {
    err.status = err.status || 500
    res.status(err.status).json({con:false,msg:err.message})
  })

// migrate()
// backup()
// role_permit_migrate()
// addOwnerRole()
app.listen(process.env.PORT,console.log(`Server is running at port: ${process.env.PORT}`))