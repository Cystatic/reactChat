const router = require("express").Router()
const Conversation = require("../models/Conversation")

//new conveersation
router.post("/",async(req,res)=>{
    const newConversation = Conversation({
        members:[req.body.senderId,req.body.recieverId]
    });
    try{
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation)
    }catch(err){
        res.status(500).json(err)
    }
})


//根据一个用户Id，获得该用户所有会话
router.get("/:userId", async (req, res) => {
    try {
      const conversation = await Conversation.find({
        members: { $in: [req.params.userId] },
      });
      res.status(200).json(conversation);
    } catch (err) {
      res.status(500).json(err);
    }
  });


//获得俩人间的会话
router.get("/find/:firstUserId/:SecondUserId",async (req,res)=>{
    try{
        const conversation = await Conversation.find({
            members:{ $all:[req.params.firstUserId,req.params.SecondUserId]},
        });
        res.status(200).json(conversation)
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router