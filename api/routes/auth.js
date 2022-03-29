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
        console.log(err)
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


module.exports = router