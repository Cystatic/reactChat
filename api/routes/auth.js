const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//register
router.post("/register",async (req,res)=>{
    
    try{
        //将密码加密
        const salt =  await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password,salt);

        //创建新对象
        const newUser = await new User({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword,
        });

        const user = await newUser.save();
        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
    }
});

// router.post("/register",async (req,res)=>{
//     const user = await new User({
//         username:"john",
//         email:"john@qq.com",
//         password:"123456"
//     })
//     await user.save();
//     res.send("ok")

// });
// router.get("/",(req,res)=>{
//     res.send("its auth route")
// });

//登录
router.post("/login",async (req,res)=>{
    try{
        const user = await User.findOne({email:req.body.email});
        !user && res.status(404).json("用户不存在");

        const vaildPassword = await bcrypt.compare(req.body.password,user.password)
        !vaildPassword && res.status(400).json("密码错误");

        res.status(200).json(user);

    }catch(err){
        res.status(500).json(err);
    }
    

});


module.exports = router