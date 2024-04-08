const DB = require("../models/order");
const OrderItemDB = require("../models/orderItem");
const ProductDB = require("../models/product");
const { fMsg } = require("../utils/helper");

const addOrder = async (req, res, next) => {
  const user = req.user;
  const items = req.body.items;
  let saveOrder = new DB();
  let orderItemObj = [];
  let total = 0;

  for await (let item of items) {
    let product = await ProductDB.findById(item.id);
    let obj = {
      order: saveOrder._id,
      count: item.count,
      productId: product._id,
      name: product.name,
      price: product.price,
    };
    orderItemObj.push(obj);
    total += product.price * item.count;
  }

  let orderItemResult = await OrderItemDB.insertMany(orderItemObj);

  let orderItemIds = orderItemResult.map((item) => item._id);
  saveOrder.user = user;
  saveOrder.items = orderItemIds;
  saveOrder.count = items.length;
  saveOrder.total = total;
  let result = await saveOrder.save();

  fMsg(res, "Order accepted", result);
};

const getMyOrders = async (req,res,next)=>{
    let authUser = req.user
    let orders = await DB.find({user:authUser._id}).populate('items')
    fMsg(res,'All your orders',orders)

}
module.exports = {
  addOrder,
  getMyOrders

};
