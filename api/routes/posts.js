const router = require("express").Router();
const Post = require("../models/Post")
const User = require("../models/User")


router.get("/",(req,res)=>{
    res.send("its a Post")
})

//创建一个帖子
router.post("/",async (req,res)=>{
    const newPost = new Post(req.body);
    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    }catch(err){
        res.status(500).json(err);
    }
})

//更新一个帖子
router.put("/:id",async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.updateOne({$set:req.body});
            res.status(200).json(post)
        }else{
            res.status(403).json("只能修改自己的帖子")
        }
    }
    catch(err){
        res.status(500).json(err);
    }
})

//删除一个帖子
router.delete("/:id",async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.deleteOne();
            res.status(200).json(post)
        }else{
            res.status(403).json("只能删除自己的帖子")
        }
    }
    catch(err){
        res.status(500).json(err);
    }
})

//喜欢一个帖子
router.put("/:id/like",async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push:{likes:req.body.userId}});
            res.status(200).json("帖子已设为喜欢");
        }else{
            await post.updateOne({$pull:{likes:req.body.userId}});
            res.status(200).json("帖子已设为不喜欢");       
        }
    }catch(err){
        res.status(500).json(err);
    }
})

//获得一个帖子
router.get("/:id",async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    }catch(err){
        res.status(500).json(err);
    }
})

//获取一个时间线之前的所有关注者和自己的帖子
router.get("/timeline/all",async (req,res)=>{
    try{
        const curUser = await User.findById(req.body.userId);
        const userPosts = await Post.find({userId:curUser._id});
        //Promise 保证取完整
        const friendsPosts = await Promise.all(
            curUser.followings.map((friendId)=>{
                return Post.find({userId:friendId});
            })
        );
        res.status(200).json(userPosts.concat(...friendsPosts));
    }catch(err){
        res.status(200).json(err);
    }
})
module.exports = router 