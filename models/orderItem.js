const mongoose = require('mongoose')
const {Schema} =   mongoose

const OrderItemSchema = new Schema({
    order: {type:Schema.Types.ObjectId,ref:'order',required:true},
    count:{type:Number,default:1},
    productId:{type:Schema.Types.ObjectId,ref:'product',required:true},
    name:{type:String,required:true},
    price:{type:Number,required:true},
    status: {type:String,enum:["Accept","Pending","Delivered"],default:"Accept"},
    created: {type: Date, default: Date.now}
})

const OrderItem= mongoose.model('orderItem', OrderItemSchema)
module.exports = OrderItem