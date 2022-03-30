const express = require("express");
const app = express();

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users") 
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")

dotenv.config();

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


app.listen(8800,()=>{
    console.log("Backend server is running!")
})