const { init } = require("../models/user");
const Helper = require("./helper");
const MessageDB = require("../models/message");
const UnreadDB = require("../models/unread");
const Message = require("../models/message");

const liveUser = async (socketId, user) => {
  user["socketId"] = socketId;
  Helper.set(socketId, user._id);
  Helper.set(user._id, user);
};

const initialize = async (io, socket) => {
  socket["currentUserId"] = socket.userData._id;
  await liveUser(socket.id, socket.userData);

  socket.on("message", (data) => incomingMessage(io, socket, data));
  socket.on("unreads", (data) => loadUnReadMsg(socket));
  socket.on("view-unreads",data => viewUnread(socket,data))
};

let viewUnread = async(socket,obj)=>{

  let limit =Number(process.env.MSG_LIMIT)
  let sk = Number(obj.page) ==1 ? 0 : (Number(obj.page) -1)
  let skipCount = sk * limit
let messages = await MessageDB.find({
  $or : [
    {from:socket.currentUserId},
    {to:socket.currentUserId},
  ]

  //{created : -1} is order of last in first show
}).sort({created : -1 }).skip(skipCount).limit(limit).populate('from to','name _id')
socket.emit('messages',messages)
}

const incomingMessage = async (io, socket, data) => {
  const saveMessage = await new MessageDB(data).save();
  const messageResult = await MessageDB.findById(saveMessage._id).populate(
    "from to",
    "name _id"
  );

  const toUser = await Helper.get(messageResult.to._id);

  //check whether owner is online or not
  //if not, it will null in toUser

  if (toUser) {
    let toSocket = io.of("/chat").to(toUser.socketId);
    if (toSocket) {
      toSocket.emit("message", messageResult);
    } else {
      next(new Error("To socket not found"));
    }
  } else {
    await new UnreadDB({
      from: messageResult.from._id,
      to: messageResult.to._id,
    }).save();
  }
  socket.emit("message", messageResult);
};

let loadUnReadMsg = async (socket) => {
  let unreads = await UnreadDB.find({ to: socket.currentUserId });
  if (unreads.length > 0) {
    //it simply delete unread messages
    unreads.forEach(async (unread) => {
      await UnreadDB.findByIdAndDelete(unread.id);
    });
  }
  socket.emit("unreads", { msg: unreads.length });
};
module.exports = { initialize };
