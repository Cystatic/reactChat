const router = require("express").Router();

const User = require("../models/User");

//register
router.post("/register",async (req,res)=>{
    const newUser = await new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });
    try{
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