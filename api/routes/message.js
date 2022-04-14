const router = require("express").Router()
const Message = require("../models/Message")

//单聊添加信息
router.post("/",async (req,res)=>{
    const newMessage = Message(req.body);
    try{
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage) 
    }catch(err){
        res.status(500).json(err)
    }
})

//查找某会话的信息
router.get("/conversation/:id", async (req, res) => {
    try {
      const messages = await Message.find({
        conversationId: req.params.id,
      });
      res.status(200).json(messages);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//群聊添加信息
router.post("/group",async(req,res)=>{
  const newMessage = Message(req.body);
    try{
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage) 
    }catch(err){
        res.status(500).json(err)
    }
})

//查找群聊信息
router.get("/group/:id", async (req, res) => {
  try {
    const messages = await Message.find({
      groupId: req.params.id,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router