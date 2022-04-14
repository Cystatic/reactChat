const express = require("express");
const app = express();

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users") 
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")
const conversationRoute = require("./routes/conversation")
const messageRoute = require("./routes/message")
const groupRoute = require("./routes/group")
const multer = require("multer")
const path = require("path");

dotenv.config();

//设置跨域访问，
app.use(function(req, res, next) {  
  res.header('Access-Control-Allow-Origin', "*");
  next();
});  

mongoose.connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log("Connected to MongoDB");
    }
);

//中间件
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// app.get("/",(req,res)=>{
//     res.send("welcome to home page")
// });

// app.get("/user",(req,res)=>{
//     res.send("welcome to user page")
// });
app.use("/api/users",userRoute);
app.use("/api/auth",authRoute);
app.use("/api/post",postRoute);
app.use("/api/conversation",conversationRoute);
app.use("/api/message",messageRoute);
app.use("/api/group",groupRoute);

// 上传文件
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});

app.use("/images",express.static(path.join(__dirname,"public/images")));  

app.listen(8800,()=>{
    console.log("Backend server is running!")
})
