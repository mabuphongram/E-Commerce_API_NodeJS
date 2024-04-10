require('dotenv').config()
const express = require('express')
const { migrate, backup, role_permit_migrate, addOwnerRole } = require('./migrations/migrator')
app = express()
mongoose = require('mongoose')
fileupload = require('express-fileupload')
helper = require('./utils/helper')
jwt = require('jsonwebtoken')

//socket io setup
server = require('http').createServer(app)
io = require('socket.io')(server)

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
const orderRouter = require('./routes/order')
const { Socket } = require('dgram')


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
app.use('/orders',orderRouter)

app.use((err, req, res, next) => {
    err.status = err.status || 500
    res.status(err.status).json({con:false,msg:err.message})
  })

// migrate()
// backup()
// role_permit_migrate()
// addOwnerRole()


//use is middleware
io.of('/chat').use(async(socket,next)=>{

//how to take token from soket query token
let token = socket.handshake.query.token
if(token){
  let decodedData = jwt.decode(token, process.env.SECRET_KEY);

  let user = await helper.get(decodedData._id);
  if (user) {
    socket.userData = user
    next();
  } else {
    next(new Error("That data does not exist in Redis"));
  }
} else {
  next (new Error('Tokenization Error'))
}

}).on('connection',Socket=>{
require('./utils/chat').initialize(io,Socket)
})

server.listen(process.env.PORT,console.log(`Server is running at port: ${process.env.PORT}`))
