const router = require("express").Router();
const User = require("../models/User")
const bcrypt = require("bcrypt")
const Group = require("../models/Group")

router.get("/",(req,res)=>{
    res.send("its user route")
});

//更新用户信息
router.put("/:id",async (req,res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
        //密码要多一道处理
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password,salt);
            }catch(err){
                return res.status(500).json(err);   
            }
        }
        try{
            //更新
            const user = await User.findByIdAndUpdate(req.params.id,{
                $set:req.body,
            });
            res.status(200).json("账户更新完成")

        }catch(err){
            res.status(500).json(err)
        }
    }else{
        res.status(403).json("只能更改自己的账户！")
    }
})

//删除账号
router.delete("/:id",async (req,res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
        try{
            const user = await User.deleteOne(req.params.id);
            res.status(200).json("账户删除完成")

        }catch(err){
            res.status(500).json(err)
        }
    }else{
        res.status(403).json("只能删除自己的账户！")
    }
})

//获取用户信息
router.get("/:id",async (req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        //不能查看用户密码等私密信息
        const {password,updatedAt,...other} = user._doc;
        return res.status(200).json(other);
    }catch(err){
        return res.status(500).json(err);
    }
})
//获取用户信息
router.get("/",async (req,res)=>{
    // const userId = req.query.userId;
    const username = req.query.username;
    try{
        const user = await User.findOne({username:username});
        //不能查看用户密码等私密信息
        // const {password,updatedAt,...other} = user._doc;
        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
    }
})

// 得到朋友列表
router.get("/friends/:userId",async (req,res)=>{
    try{
        const user = await User.findById(req.params.userId);
        const friends = await Promise.all(
            user.followings.map((friendId)=>{
                return User.findById(friendId)
            })
        );
        let friendList = [];
        friends.map((friend) => {
            const { _id, username, profilePicture } = friend;
            friendList.push({ _id, username, profilePicture });
        });
        res.status(200).json(friendList)
    }catch(err){
        res.status(500).json(err)
    }
    
})

//关注用户
router.put("/:id/follow",async (req,res)=>{
    if(req.params.id !== req.body.userId){
        try{
            const user = await User.findById(req.params.id);
            const curUser = await User.findById(req.body.userId);
            if(!user.followers.includes(req.body.userId)){
                //推进去
                await user.updateOne({ $push: {followers:req.body.userId}});
                await curUser.updateOne({$push: {followings:req.params.id}})
                res.status(200).json("关注成功");
            }else{
                res.status(403).json("你已经关注过该用户")
            }
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("不能关注自己")
    }
});

//取关用户
router.put("/:id/unfollow", async (req,res)=>{
    if(req.params.id !== req.body.userId){
        try{
            const user = await User.findById(req.params.id);
            const curUser = await User.findById(req.body.userId);
            if(user.followers.includes(req.body.userId)){
                //拉出来
                await user.updateOne({ $pull: {followers:req.body.userId}});
                await curUser.updateOne({$pull: {followings:req.params.id}})
                res.status(200).json("取关成功");
            }else{
                res.status(403).json("你未关注过该用户")
            }
        }catch(err){
            res.status(500).json();
        }
    }else{
        res.status(403).json("对自己不存在取关")
    }
})

//获得所有用户(除自身)
router.get("/allUsers/:id",async(req,res)=>{
    try{
        const users = await User.find({_id:{$ne:req.params.id}});
        res.status(200).json(users)
    }catch(err){
        res.status(500).json(err)
    }
})


//获取用户加入的所有群聊
router.get("/allGroups/:id",async(req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        const groups = await Promise.all(
            user.joinedGroups.map((groupId)=>{
                return Group.findById(groupId)
            })
        );
        res.status(200).json(groups)
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router