const mongoose = require('mongoose')
const {Schema} =   mongoose

const SubCatSchema = new Schema({
    name: {type: String, required:true,unique:true},
    image: {type:String,required:true},
    catId:{type:Schema.Types.ObjectId,ref:'cat'},
    childcats: [{type:Schema.Types.ObjectId,ref:'childcat'}],
    created: {type: Date, default: Date.now}
})

const SubCat= mongoose.model('subcat', SubCatSchema)
module.exports = SubCat