const router = require("express").Router();

router.get("/",(req,res)=>{
    res.send("its a Post")
})

//创建一个帖子



//更新一个帖子

//删除一个帖子
//喜欢一个帖子
//获得一个帖子
//获取一个时间线之前的所有关注者和自己的帖子
module.exports = router 